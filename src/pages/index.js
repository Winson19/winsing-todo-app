import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { useTodos } from "../hooks/useTodos";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import Filters from "../components/Filters";
import Calendar from "../components/Calendar";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import EditTodo from "../components/EditTodo";


const Home = () => {
  const [todos, setTodos] = useTodos();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredTodos = todos
    .filter((todo) =>
      todo.task.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus === "all" ||
        (filterStatus === "completed" && todo.completed) ||
        (filterStatus === "incomplete" && !todo.completed))
    )
    .sort((a, b) => {
      if (a.starred && !b.starred) return -1;
      if (!a.starred && b.starred) return 1;
      if (sortOrder === "asc") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortOrder === "desc") {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
      return 0; // For manual sorting, don't change the order
    });

  const addTodo = (newTodo) => setTodos([...todos, newTodo]);
  const updateTodo = (updatedTodo) =>
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  const toggleComplete = (id) =>
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const importTasks = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const importedTodos = results.data
          .filter((row) => row.task && row.dueDate && row.category)
          .map((row) => ({
            id: Date.now(),
            task: row.task,
            dueDate: row.dueDate,
            completed: row.completed === "true",
            category: row.category,
          }));
        setTodos([...todos, ...importedTodos]);
      },
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(todos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Todos");
    XLSX.writeFile(workbook, "todos_report.xlsx");
  };

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTodo(null);
  };

  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);

  return (
    <div className="todo-list-container">
      {/* Title */}
      <div className="todo-header">
        <h1 className="todo-title">To-Do List</h1>

        {/* Upload and Export Buttons */}
        <div className="todo-actions">
          <Button onClick={handleOpenUploadModal} variant="contained" style={{ marginRight: "10px" }}>
            Upload File
          </Button>
          <Button onClick={exportToExcel} variant="contained">
            Export as Excel
          </Button>
        </div>
      </div>

      {/* Add Task and Filters */}
      <div className="todo-controls">
        <AddTodo addTodo={addTodo} />
        <Filters
          search={search}
          setSearch={setSearch}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      {/* Todo List */}
      <TodoList
        todos={filteredTodos}
        setTodos={setTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        onEdit={handleEditClick}
      />

      {/* Calendar */}
      <Calendar todos={todos} />

      {/* Edit Todo Modal */}
      {isEditModalOpen && selectedTodo && (
        <EditTodo
          todo={selectedTodo}
          updateTodo={updateTodo}
          handleCloseModal={handleCloseEditModal}
        />
      )}

      {/* Upload File Modal */}
      <Modal open={isUploadModalOpen} onClose={handleCloseUploadModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" component="h2">
            Upload Files
          </Typography>
          <Typography sx={{ mt: 2 }}>Select File here</Typography>
          <Typography sx={{ mt: 1, mb: 2 }}>
            Files Supported: PDF, TEXT, DOC, DOCX
          </Typography>
          <input type="file" accept=".csv,.pdf,.txt,.doc,.docx" onChange={importTasks} />
          <Button
            onClick={handleCloseUploadModal}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
