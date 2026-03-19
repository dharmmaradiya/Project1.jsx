import React, { useState } from "react";

export default function Todo() {

  const [text, setText] = useState('');
  const [state, setstate] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function handlechange(e) {
    setText(e.target.value);
  }

  function handlesubmit(e) {
    e.preventDefault();

    if (text.trim() === "") return;

    if (editIndex !== null) {
      const updated = state.map((el, i) =>
        i === editIndex ? text : el
      );
      setstate(updated);
      setEditIndex(null);
    } else {
      setstate([...state, text]);
    }

    setText('');
  }

  function Delete(id) {
    const ans = state.filter((_, i) => i !== id);
    setstate(ans);
  }

  function Edit(id) {
    setText(state[id]);
    setEditIndex(id);
  }

  // 🎨 Inline styles
  const container = {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    fontFamily: "Arial"
  };

  const formStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  };

  const inputStyle = {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  };

  const addBtn = {
    ...buttonStyle,
    background: "#4CAF50",
    color: "white"
  };

  const liStyle = {
    background: "#f1f1f1",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const editBtn = {
    ...buttonStyle,
    background: "#28a745",
    color: "white",
    marginLeft: "5px"
  };

  const deleteBtn = {
    ...buttonStyle,
    background: "#dc3545",
    color: "white",
    marginLeft: "5px"
  };

  return (
    <div style={container}>

      <form onSubmit={handlesubmit} style={formStyle}>
        <input
          type="text"
          placeholder="enter name"
          value={text}
          onChange={handlechange}
          style={inputStyle}
        />
        <input
          type="submit"
          value={editIndex !== null ? "Update" : "Add"}
          style={addBtn}
        />
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {
          state.map((el, i) => (
            <li key={i} style={liStyle}>
              <span>{el}</span>
              <div>
                <button onClick={() => Edit(i)} style={editBtn}>
                  Edit
                </button>
                <button onClick={() => Delete(i)} style={deleteBtn}>
                  Delete
                </button>
              </div>
            </li>
          ))
        }
      </ul>

    </div>
  );
}