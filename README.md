# Todo-App in Next.js

## Command to Run <br>
cd winsing-todo-app <br>
npm run dev

### 1. Basic Functionality:<br>
-Users can list to-do items.<br>
-Users can add new to-do items.<br>
  -Steps: Enter the task, click the Add Task button, popped up modal with duedate & category              input<br>
-Users can delete to-do items.<br>
-Users can edit to-do items.<br>
-Users can mark to-do items as complete/incomplete.<br>
-Users should be able to set a due date for each task.<br>
-Users should be able to categorize tasks (e.g., Work, Personal, Urgent). Implement a dropdown   or radio buttons for selecting categories when adding a task.<br>
  -Red: Urgent<br>
  -Blue: Work<br>
  -Yellow: Personal<br>

### 2. Pagination:<br>
-Implement pagination to control the number of tasks displayed on a single listing page.<br>
-Provide a dropdown or slider for users to select the number of tasks per page (e.g., 5, 10,     15, or 20 tasks).<br>
-Display pagination controls (e.g., "Previous," "Next," page numbers) to allow users to          navigate through pages easily.<br>
-Indicate the current page and the total number of pages available based on the total number of  tasks.<br>

### 3. Searching, Filtering and Sorting:<br>
-Implement a search bar that allows users to filter tasks based on keywords in the task description<br>
-Implement functionality to filter tasks based on their completion status (e.g., show only completed tasks, only incomplete tasks).<br>
-Allow sorting of tasks by due date, with options for ascending or descending order.<br>
  - Additionally, Manual Order is added as third options for reordering the task through drag-      and-drop<br>
  - If the ascending or descending order is applied, the reordering will allowed only between       same date<br>

### 4. Persistent Storage:<br>
Research for storage management methods that allow use locally. Persist tasks across page reloads. When the application is reopened, previously added tasks should be displayed.

### 5. Import To-Do List:<br>
-Implement a feature to allow users to import the tasks in bulk thru CSV, or Excel.<br>
-A sample input file is attached, filename: *import_todo*
-The import data format must have the following columns:<br>
  -task_name (Task name)<br>
  -due_date (Task due date in YYYY-MM-DD format)<br>
  -category (Category can be "Urgent", "Work", or "Personal")<br>

### 6. Export as Report:<br>
-Implement an export feature which allows users to export or download to-do items in Excel format.

### 7. Calendar View :<br>
-Create a calendar component that displays tasks based on their due dates.<br>
-Each day in the calendar should show the tasks that are due on that date.<br>
-Assign different colors to tasks based on their category (e.g., Work, Personal, Urgent). Use a  consistent color scheme that makes it easy for users to identify categories at a glance.<br>
  -Red: Urgent<br>
  -Blue: Work<br>
  -Yellow: Personal<br>


### 8. Drag-and-Drop Reordering :<br>
-Allow users to reorder tasks by dragging and dropping them.<br>
-Done, but sometimes the drag will fail, need terminate and rerun the application
