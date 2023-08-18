import React, { Component } from 'react';

export default class PagePersist extends Component {
  state = {
    inputValue: '',
  };

  handleChangeInput = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleAddTodo = () => {
    const { actions } = this.props;

    actions.addTodoList(this.state.inputValue);
  }

  render() {
    const { todo } = this.props;
    return (
      <div className="data">
        <input type="text" className="todo-in" onChange={this.handleChangeInput} />
        <button onClick={this.handleAddTodo} >add</button>
        <br />
        <br />
        <ul>
          {
            todo.length > 0 ? todo.map((item, idx) => {
              return (
                <div key={idx}  style={{display: 'flex', marginBottom: 10}}>
                  <li style={{width: 120}} >{item}</li>
                  <button>delete</button>
                </div>
              )
            }) : (
              <div>tidak ada</div>
            )
          }
        </ul>
      </div>
    )
  }
}

