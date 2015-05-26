'use strict';
import React from 'react';
import store from '../storage';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li key={this.props.item.key}>
                {this.props.item.value}
                <i className="fa fa-check" onClick={this.done.bind(this)}></i>
            </li>
        );
    }

    done() {
        store.remove(this.props.item.key);
    }
}

export default TodoItem;
