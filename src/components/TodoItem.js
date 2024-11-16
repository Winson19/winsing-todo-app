import React from "react";
import { Box, Typography, Checkbox, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import styles from "../styles/TodoItem.module.css";

// Define category colors
const categoryColors = {
  Work: "#1e90ff",
  Personal: "#f1c40f",
  Urgent: "#ff0000",
};

const TodoItem = ({
  todo,
  toggleComplete,
  deleteTodo,
  onEdit,
  toggleStar,
  provided,
}) => {
  const { id, task, dueDate, completed, category, starred } = todo;
  const categoryColor = categoryColors[category] || "#0077B6"; // Default color if category not found

  return (
    <Box
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        maxWidth: "900px",
        border: "1px solid #cfd8dc",
        borderRadius: "20px",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      {/* Task Information Section */}
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        {/* Checkbox to mark as complete */}
        <Checkbox
          checked={completed}
          onChange={() => toggleComplete(id)}
          color="primary"
        />

        {/* Task Details */}
        <Box sx={{ paddingLeft: "10px", flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ textDecoration: completed ? "line-through" : "none" }}
          >
            {task}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Due: {dueDate}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Category: {category}
          </Typography>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: "10px", paddingRight: "30px" }}>
        {/* Star Button */}
        <IconButton onClick={() => toggleStar(id)} color="warning">
          {starred ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
        {/* Edit Button */}
        <IconButton onClick={() => onEdit(todo)} color="primary">
          <EditIcon />
        </IconButton>
        {/* Delete Button */}
        <IconButton onClick={() => deleteTodo(todo.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Category Color Indicator */}
      <Box
        sx={{
          width: "20px",
          height: "100%",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          backgroundColor: categoryColor,
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
    </Box>
  );
};

export default TodoItem;
