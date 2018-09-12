import { observable, action, computed } from "mobx";
import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { observer, PropTypes as ObservablePropTypes } from "mobx-react";
import PropTypes from "prop-types";

class Todo {
  id = Math.random();
  @observable
  title = "";
  @observable
  finished = false;

  constructor(title) {
    this.title = title;
  }

  @action.bound
  toggle() {
    this.finished = !this.finished;
  }
}
class Store {
  @observable
  todos = [];

  @action.bound
  createToDo(title) {
    this.todos.unshift(new Todo(title));
  }

  @action.bound
  removeTodo(todo) {
    this.todos.remove(todo);
  }

  @computed
  get left() {
    return this.todos.filter(todo => !todo.finished).length;
  }
}

const store = new Store();

@observer
class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired
    }).isRequired
  };

  handleChange = e => {
    this.props.todo.toggle();
  };

  render() {
    const todo = this.props.todo;
    return (
      <Fragment>
        <input
          type="checkbox"
          className="toggle"
          checked={todo.finished}
          onChange={this.handleChange}
        />
        <span className={["title", todo.finished && "finished"].join(" ")}>
          {todo.title}
        </span>
      </Fragment>
    );
  }
}

@observer
class TodoList extends Component {
  static propTypes = {
    store: PropTypes.shape({
      createToDo: PropTypes.func,
      todos: ObservablePropTypes.observableArrayOf(
        ObservablePropTypes.observableObject
      ).isRequired
    }).isRequired
  };

  state = {
    inputValue: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const store = this.props.store;
    const inputValue = this.state.inputValue;

    store.createToDo(inputValue);

    this.setState({
      inputValue: ""
    });
  };

  handleChange = e => {
    const inputValue = e.target.value;
    this.setState({
      inputValue
    });
  };

  render() {
    const store = this.props.store;
    const todos = store.todos;
    return (
      <div className="todo-list">
        <header>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.inputValue}
              className="input"
              placeholder="What needs to be finished?"
            />
          </form>
        </header>
        <ul>
          {todos.map(todo => {
            return (
              <li key={todo.id} className="todo-item">
                <TodoItem todo={todo} />
                <span className="delete" onClick={e => store.removeTodo(todo)}>
                  X
                </span>
              </li>
            );
          })}
        </ul>
        <footer>{store.left} item(s) unfinished</footer>
      </div>
    );
  }
}

ReactDOM.render(<TodoList store={store} />, document.querySelector("#root"));
