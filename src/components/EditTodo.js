import React, { useState, useEffect } from "react";
import { Button, TextField, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText } from "@mui/material";

const EditTodo = ({ todo, updateTodo, handleCloseModal }) => {
  const [task, setTask] = useState(todo.task);
  const [category, setCategory] = useState(todo.category);
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize form fields with the existing todo data
    setTask(todo.task);
    setCategory(todo.category);
    setDueDate(todo.dueDate);
  }, [todo]);

  const handleSubmit = () => {
    if (!task || !category || !dueDate) {
      setError("Please fill in all fields: Task, Category, and Due Date.");
      return;
    }

    // Clear error if validation passes
    setError("");

    // Update the todo item
    updateTodo({
      ...todo,
      task,
      category,
      dueDate,
    });

    // Close the modal after submitting
    handleCloseModal();
  };

  return (
    <Dialog open={true} onClose={handleCloseModal}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          fullWidth
          error={!task && error} // Show error if task is empty
          helperText={!task && error ? "Task cannot be empty" : ""}
          style={{ marginTop: "20px" }}
        />
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }} // Keeps the label above the input
          error={!dueDate && error} // Show error if dueDate is empty
          helperText={!dueDate && error ? "Due Date cannot be empty" : ""}
          style={{ marginTop: "20px" }}
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          error={!category && error} 
          style={{ marginTop: "20px" }}
        >
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Urgent">Urgent</MenuItem>
        </Select>

        {error && <FormHelperText error>{error}</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" disabled={!task || !category || !dueDate}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodo;
