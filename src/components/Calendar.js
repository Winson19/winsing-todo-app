import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const TaskCalendar = ({ todos }) => {
  // Convert todos to calendar events
  const events = todos.map((todo) => ({
    title: todo.task,
    start: new Date(todo.dueDate),
    end: new Date(todo.dueDate),
    allDay: true,
    category: todo.category,
  }));

  // Define event styling based on category
  const eventStyleGetter = (event) => {
    let backgroundColor = "";
    switch (event.category) {
      case "Work":
        backgroundColor = "#1e90ff"; // Blue
        break;
      case "Personal":
        backgroundColor = "#f1c40f"; // Red
        break;
      case "Urgent":
        backgroundColor = "#ff0000"; // Red
        break;
      default:
        backgroundColor = "#20b2aa"; // Teal
        break;
    }

    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return { style };
  };

  return (
    <div style={{ height: "500px", margin: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        views={["month"]}
        defaultView="month"
        components={{
          event: ({ event }) => <span>{event.title}</span>,
        }}
      />
    </div>
  );
};

export default TaskCalendar;
