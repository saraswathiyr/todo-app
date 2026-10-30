
import React, { Component } from "react";
import "./App.css";

// Function Component
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <span
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.done ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task.text}
      </span>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

// Class Component
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      tasks: []
    };
  }

  handleAdd = () => {
    if (this.state.text.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: this.state.text,
      done: false
    };

    this.setState({
      tasks: [...this.state.tasks, newTask],
      text: ""
    });
  };

  handleToggle = (id) => {
    this.setState({
      tasks: this.state.tasks.map(task =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    });
  };

  handleDelete = (id) => {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== id)
    });
  };

  render() {
    const completed = this.state.tasks.filter(
      task => task.done
    ).length;

    return (
      <div className="container">
        <h2>To-Do App</h2>

        <input
          type="text"
          placeholder="Enter a task"
          value={this.state.text}
          onChange={(e) =>
            this.setState({ text: e.target.value })
          }
        />

        <button onClick={this.handleAdd}>Add</button>

        <h4>
          {completed} of {this.state.tasks.length} tasks done
        </h4>

        {this.state.tasks.length === 0 ? (
          <p>No tasks yet. Add one!</p>
        ) : (
          <ul>
            {this.state.tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={this.handleToggle}
                onDelete={this.handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
