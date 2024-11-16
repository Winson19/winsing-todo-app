**Todo-App in Next.js**

*Command to Run*
cd winsing-todo-app
npm run dev

*1. Basic Functionality*:
-Users can list to-do items.
-Users can add new to-do items.
  -Steps: Enter the task, click the Add Task button, popped up modal with duedate & category              input
-Users can delete to-do items.
-Users can edit to-do items.
-Users can mark to-do items as complete/incomplete.
-Users should be able to set a due date for each task.
-Users should be able to categorize tasks (e.g., Work, Personal, Urgent). Implement a dropdown   or radio buttons for selecting categories when adding a task.
  -Red: Urgent
  -Blue: Work
  -Yellow: Personal

*2. Pagination*:
-Implement pagination to control the number of tasks displayed on a single listing page.
-Provide a dropdown or slider for users to select the number of tasks per page (e.g., 5, 10,     15, or 20 tasks).
-Display pagination controls (e.g., "Previous," "Next," page numbers) to allow users to          navigate through pages easily.
-Indicate the current page and the total number of pages available based on the total number of  tasks.

*3. Searching, Filtering and Sorting*:
-Implement a search bar that allows users to filter tasks based on keywords in the task description
-Implement functionality to filter tasks based on their completion status (e.g., show only completed tasks, only incomplete tasks).
-Allow sorting of tasks by due date, with options for ascending or descending order.
  - Additionally, Manual Order is added as third options for reordering the task through drag-      and-drop
  - If the ascending or descending order is applied, the reordering will allowed only between       same date

*4. Persistent Storage*:
Research for storage management methods that allow use locally. Persist tasks across page reloads. When the application is reopened, previously added tasks should be displayed.

*5. Import To-Do List*:
-Implement a feature to allow users to import the tasks in bulk thru CSV, or Excel.
-The import data format must have the following columns:
  -task_name (Task name)
  -due_date (Task due date in YYYY-MM-DD format)
  -category (Category can be "Urgent", "Work", or "Personal")

*6. Export as Report*:
-Implement an export feature which allows users to export or download to-do items in Excel format.

*7. Calendar View* :
-Create a calendar component that displays tasks based on their due dates.
-Each day in the calendar should show the tasks that are due on that date.
-Assign different colors to tasks based on their category (e.g., Work, Personal, Urgent). Use a  consistent color scheme that makes it easy for users to identify categories at a glance.
  -Red: Urgent
  -Blue: Work
  -Yellow: Personal


*8. Drag-and-Drop Reordering* :
-Allow users to reorder tasks by dragging and dropping them.
-Done, but sometimes the drag will fail, need terminate and rerun the application
