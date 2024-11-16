import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Pagination, Select, MenuItem } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = ({ todos, setTodos, toggleComplete, deleteTodo, onEdit, sortOrder }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = (_, page) => setCurrentPage(page);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // If item is dropped outside the list

    const reorderedTodos = Array.from(todos); // Copy the todos array
    const [movedItem] = reorderedTodos.splice(result.source.index, 1); // Remove the dragged item
    reorderedTodos.splice(result.destination.index, 0, movedItem); // Insert it at the new position

    setTodos(reorderedTodos); // Update the state with the new order
  };

  // Sorting Logic
  const sortedTodos = [...todos]; // Create a shallow copy of todos

  if (sortOrder === "asc") {
    sortedTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (sortOrder === "desc") {
    sortedTodos.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }
  // If sortOrder is "manual", we use the current order of the `todos` array (reordered by drag-and-drop)

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTodos = sortedTodos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos" key="todos">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ margin: "20px 0" }}
            >
              {currentTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                  {(provided) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                      <TodoItem
                        todo={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        onEdit={onEdit}
                        provided={provided}
                      />
                      </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder} {/* Placeholder for correct layout */}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Pagination */}
      <Select value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
        {[5, 10, 15, 20].map((num) => (
          <MenuItem key={num} value={num}>{num} per page</MenuItem>
        ))}
      </Select>
      <Pagination
        count={Math.ceil(todos.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default TodoList;
