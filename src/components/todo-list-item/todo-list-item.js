import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
    //
    // constructor(props){
    //     super(props);
    //
    //     //состояние элемента
    //     // this.state = {
    //     //     done: false,
    //     //     important: false
    //     // };
    //
    //     this.onLabelClick = () => {
    //         //console.log(`Done: ${this.props.label}`);
    //         this.setState((state) => {
    //             return {
    //                 done: !state.done
    //             }
    //         })
    //     };
    //
    //     this.onMarkImportant = () => {
    //         this.setState((state) =>{
    //             return {
    //                 important: !state.important
    //             }
    //         })
    //     };
    // }

    //то же самое, но без вызова конструктора
    // onLabelClick = () => {
    //     console.log(`Done: ${this.props.label}`);
    // };

    render() {
        const {label, onDeleted,
            onToggleImportant,
            onToggleDone,
            important,
            done} = this.props;

        //const {done, important} = this.state;

        let classNames = "todo-list-item";
        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }

        return (
            <span className={ classNames }>
                  <span
                      className="todo-list-item-label"
                      // onClick={ this.onLabelClick }>
                      onClick={onToggleDone}>
                      {label}
                  </span>

                  <button type="button"
                          className="btn btn-outline-success btn-sm float-right"
                      // onClick={ this.onMarkImportant }>
                          onClick={onToggleImportant}>
                      <i className="fa fa-exclamation"/>
                  </button>

                <button type="button"
                      className="btn btn-outline-danger btn-sm float-right"
                      onClick={onDeleted}>
                      <i className="fa fa-trash-o"/>
                </button>
        </span>
        );
    }
}