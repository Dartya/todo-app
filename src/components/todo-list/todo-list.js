import React from 'react';
import TodoListItem from "../todo-list-item";
import './todo-list.css'

//элемент, который далее будет отрендерен
//создаем компоненты
//компонент списка дел
//нужно называть с большой буквы и CamelCase'ом

//из props получаем данные и события
const TodoList = (
        //параметры, передаваемые из App, в которой вызван этот элемент
        { todos, onDeleted, onToggleImportant, onToggleDone } ) => {

    //to-do лист содержит элементы, которые по сути своей состоят из данных, смаппированных из массива todos
    const elements = todos.map((item) => {
        const { id, ...itemProps } = item;  //id маппируется на id, все остальное - на массив itemProps

        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    { ...itemProps }
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
                />
                    {/*<TodoListItem*/}
                    {/*label = {item.label}*/}
                    {/*important={item.important}*/}
                    {/*/>*/}
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

export default TodoList;
