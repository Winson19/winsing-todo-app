import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
} from "@mui/material";

const AddTodo = ({ addTodo }) => {
  const [initialTask, setInitialTask] = useState(""); // State for initial task input field
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // State to control modal visibility

  // Handle modal submission
  const handleSubmit = () => {
    if (!task || !category || !dueDate) {
      setError("Please fill in all fields: Task, Category, and Due Date.");
      return;
    }

    // Clear error if validation passes
    setError("");

    // Add the new todo item
    addTodo({
      task,
      category,
      dueDate,
      completed: false,
      starred: false, // Assuming you want to include starred property in the task
      id: Date.now(),
    });

    // Reset form fields and close modal
    setTask("");
    setDueDate("");
    setInitialTask(""); // Reset the initial input field
    setOpen(false); // Close modal after successful submit
  };

  // Open the modal and set the task value from the initial input field
  const handleOpen = () => {
    setTask(initialTask); // Set the modal task value from the initial input field
    setOpen(true); // Open the modal
  };

  // Close the modal without saving
  const handleClose = () => {
    setOpen(false); // Close the modal
    setTask(""); // Reset modal task field
    setDueDate("");
    setCategory("Work"); // Reset to default category
    setError("");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Input field beside the Add Task button */}
      <TextField
        className="add-task-input"
        label="Enter Task"
        value={initialTask}
        onChange={(e) => setInitialTask(e.target.value)}
        size="small"
        variant="outlined"
      />

      {/* Button to open the modal */}
      <Button
        className= "add-task-button"
        variant="contained"
        onClick={handleOpen}
        disabled={!initialTask.trim()} // Disable button if input is empty
      >
        Add Task
      </Button>

      {/* Modal (Dialog) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          {/* Task Input (Pre-filled from initial input field) */}
          <TextField
            label="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            fullWidth
            error={!task && error} // Show error if task is empty
            helperText={!task && error ? "Task cannot be empty" : ""}
            style={{ marginTop: "15px" }}
          />

          {/* Due Date Input */}
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }} // Keeps the label above the input
            error={!dueDate && error} // Show error if dueDate is empty
            helperText={!dueDate && error ? "Due Date cannot be empty" : ""}
            style={{ marginTop: "15px" }}
          />

          {/* Category Input */}
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            error={!category && error} // Show error if category is empty
            style={{ marginTop: "15px" }}
          >
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
          </Select>

          {/* Display error message if any required field is missing */}
          {error && <FormHelperText error>{error}</FormHelperText>}
        </DialogContent>

        {/* Modal Actions */}
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!task || !category || !dueDate}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTodo;
