"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);
dayjs.locale("es");

const Calendar = () => {
  const now = dayjs();
  const [currentMonth, setCurrentMonth] = useState(dayjs().month(now.month()));
  const [arrayOfDays, setArrayOfDays] = useState([]);

  useEffect(() => {
    const days = [];
    const startDay = currentMonth.startOf("month").startOf("week");
    const endDayObj = currentMonth.clone().add(1, "month").startOf("month").subtract(1, "day").add(1, "week");

    for (let day = startDay; day.isSameOrBefore(endDayObj); day = day.add(1, "day")) {
      days.push({
        date: day.format("YYYY-MM-DD"),
        isCurrentMonth: day.month() === currentMonth.month(),
        isCurrentDay: day.isSame(now, "day"),
        isPast: day.isBefore(now, "day"),
      });
    }

    setArrayOfDays(days);
  }, [currentMonth, now]);

  const renderHeader = () => {
    return (
      <div className="header">
        <div className="prev-month" onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}>
          {"<"}
        </div>
        <div className="title">{currentMonth.format("MMMM YYYY")}</div>
        <div className="next-month" onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}>
          {">"}
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    return (
      <div className="days-of-week">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-of-week">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    return arrayOfDays.map((day, index) => (
      <div key={day.date} className={`cell ${day.isCurrentMonth ? "" : "disabled"} ${day.isCurrentDay ? "current-day" : ""} ${day.isPast ? "past" : ""}`}>
        <div className="date">{day.date.split("-")[2]}</div>
      </div>
    ));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      <div className="days">{renderCells()}</div>
    </div>
  );
};

export default Calendar;