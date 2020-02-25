import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";
import { When } from "../if";
import Modal from "../modal";

import "./todo.scss";

function ToDo() {
  const [toDoList, setToDoList] = useState([]);
  const [item, setItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [status, setStatus] = useState("Incomplete");

  useEffect(() => {
    document.title = `Task status: ${status}`;
  });

  const handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const complete = e => {
    setStatus("complete");
    setToDoList([]);
  };

  const addItem = e => {
    e.preventDefault();
    e.target.reset();

    const defaults = { _id: uuid(), complete: false };
    const items = Object.assign({}, item, defaults);

    setToDoList([...toDoList, items]);
    setItem({});
  };

  const deleteItem = id => {
    setToDoList(toDoList.filter(item => item._id !== id));
  };

  const saveItem = updatedItem => {
    setToDoList(
      toDoList.map(item => (item._id === updatedItem._id ? updatedItem : item))
    );
  };

  const toggleComplete = id => {
    let item = toDoList.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      saveItem(item);
    }
  };

  const toggleDetails = id => {
    let showDetail = !showDetails;
    let details = toDoList.filter(item => item._id === id)[0] || {};
    setDetails(details);
    setShowDetails(showDetail);
  };

  return (
    <>
      <header id="todoHeader">
        <h2>
          There are {toDoList.filter(item => !item.complete).length} Items To
          Complete
        </h2>
      </header>

      <section className="todo">
        <div>
          <h3>Add Item</h3>
          <form onSubmit={addItem}>
            <label>
              <span>To Do Item</span>
              <input
                name="text"
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Difficulty Rating</span>
              <input
                type="range"
                min="1"
                max="5"
                name="difficulty"
                defaultValue="3"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Assigned To</span>
              <input
                type="text"
                name="assignee"
                placeholder="Assigned To"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Due</span>
              <input type="date" name="due" onChange={handleInputChange} />
            </label>
            <button>Add Item</button>
          </form>
        </div>

        <div>
          <ul>
            {toDoList.map(item => (
              <li
                className={`complete-${item.complete.toString()}`}
                key={item._id}
              >
                <span onClick={() => toggleComplete(item._id)}>
                  {item.text}
                </span>
                <button onClick={() => toggleDetails(item._id)}>Details</button>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <When condition={showDetails}>
        <Modal title="To Do Item" close={toggleDetails}>
          <div className="todo-details">
            <header>
              <span>Assigned To: {details.assignee}</span>
              <span>Due: {details.due}</span>
              <span>Difficulty: {details.difficulty} out of 5</span>
            </header>
            <div className="item">{details.text}</div>
            <div>{status}</div>
            <button onClick={complete}>Done</button>
          </div>
        </Modal>
      </When>
    </>
  );
}

export default ToDo;
