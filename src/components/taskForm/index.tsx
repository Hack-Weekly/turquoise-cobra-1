import React, { useState } from "react";

function TaskForm({ setTask }: any) {
  const [value, setValue] = useState("");
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!value) return;
    // setTask(value);
    console.log(value);
    // setValue("");
  };

  const handleInputChange = (e: React.ChangeEvent) => {};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter tasks here..."
          value={value}
          onChange={handleInputChange}
        />
        <button type="submit">Add task</button>
      </form>
    </div>
  );
}

export default TaskForm;
