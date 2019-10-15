import React, { Component } from 'react'

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

//порядок имеет значение
export default class App extends Component{

    maxId = 1;

    //деструтуризация без использования конструкторов
    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make awesome app'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all' //active, all, done
    };

    //функция добавления элемента
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        //console.log(id);
        //передаем функцию удаления элемента в todoData
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            //todoData.splice(idx, 1); - так лучше не делать
            /* лучше делать так:
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);

            const newArray = [...before, ...after];
            */
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        })
    };

    addItem = (text) => {
        //console.log('added ', text)
        //generate id
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArray
            }
        })
    };

    /**
     * Функция обновления одного из property элемента списка
     */
    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        //1. create new item
        const oldItem = arr[idx];
        const newItem = {...oldItem,
            [propName]: !oldItem[propName]};

        //2. update and return new array
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        //console.log('Toggle important ', id)
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        //console.log('Toggle done ', id)
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    search = (items, term) => {
        if (term.length === 0){
            return items;
        }

        return items.filter((item) => {
           return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    onSearchChange = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    filter(items, filter) {

        // eslint-disable-next-line default-case
        switch(filter){
            case 'all':
                return items;
            case 'active':
                return items.filter((items) => !items.done);
            case 'done':
                return items.filter((items) => items.done);
            default:
                return items;
        }
    }

    render() {
        // const isLoggedIn = true;
        // const loginBox = <span>Log in please</span>;
        // const welcomeBox = <span>Welcome Back</span>;
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);   //отфильтрованные данные
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;


        return (
            <div className="todo-app">
                {/*при помощи фигурных скобок можно вставлять другие React элементы, использовать логику для отображения*/}
                {/* isLoggedIn ? welcomeBox : loginBox */}
                {/*<span>{ (new Date()).toString() }</span>*/}

                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                {/**теперь список можно использовать как элемент реакт*/}
                <TodoList
                    //через props передаем данные и события
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }
};