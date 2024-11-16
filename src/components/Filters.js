import React from "react";
import { TextField, Select, MenuItem, Button } from "@mui/material";

const Filters = ({ search, setSearch, filterStatus, setFilterStatus, sortOrder, setSortOrder }) => {
  return (
    <div>
      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="incomplete">Incomplete</MenuItem>
      </Select>
      <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <MenuItem value="asc">Due Date Ascending</MenuItem>
        <MenuItem value="desc">Due Date Descending</MenuItem>
        <MenuItem value="manual">Manual Order</MenuItem>
      </Select>
    </div>
  );
};

export default Filters;
