'use strict';
import React from 'react';
import store from '../storage';
import TodoItem from './item';

class Todo extends React.Component {
    constructor() {
        super();
        this.state = { todos: store.getAll() };

        store.addEventListener(['add', 'remove'], () => this.setState({ todos: store.getAll() }));
    }

    render() {
        return (
            <div className="todo">
                <h1>Awesome todo!</h1>

                <section>
                    <h2>Add new item</h2>
                    <input type="text" onChange={this.change.bind(this)} value={this.state.current} placeholder="Write a talk..." />
                    <i className="fa fa-plus" onClick={this.save.bind(this)}></i>
                </section>

                <aside>
                    <h2>Things to do</h2>
                    <ul>
                        {this.state.todos.map(todo => <TodoItem item={todo} />)}
                    </ul>
                </aside>

            </div>
        );
    }

    change(e) {
        this.setState({
            current: e.target.value
        });
    }

    save() {
        if (this.state.current) {
            store.set(Math.random(), this.state.current);
            this.setState({ current: null });
        }
    }
}

export default Todo;
