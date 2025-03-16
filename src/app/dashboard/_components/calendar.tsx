import { ComponentProps, FC, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useCalender, {
  CalendarResponseType,
} from "@/service_hooks/use-calendar";
import MeetingCard from "./meeting-card";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { VerticalScroll } from "@/components/vertical-scroll";

interface CalendarProps extends ComponentProps<"div"> {}

const Calendar: FC<CalendarProps> = ({ className, ...props }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { getMeetings } = useCalender();

  const getCalendarsQuery = useQuery({
    queryKey: ["google-calendar-meetings", selectedDate],
    queryFn: () => getMeetings(selectedDate.toISOString().split("T")[0]),
  }) as UseQueryResult<Array<CalendarResponseType>, Error>;

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Calendar</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium">
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(currentMonth).map((day, index) => (
          <button
            key={index}
            onClick={() => day && setSelectedDate(day)}
            className={`cursor-pointer aspect-square p-2 rounded-lg text-sm relative ${
              !day ? "invisible" : "hover:bg-gray-100"
            }
      ${
        selectedDate && day && selectedDate.getDate() === day.getDate()
          ? "bg-blue-100"
          : ""
      }`}
          >
            {day?.getDate()}
          </button>
        ))}
      </div>

      {/* Upcoming Meetings */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4">
          Upcoming Meetings for {formatDate(selectedDate)}
        </h3>
        <HorizontalScroll className="w-full">
          {getCalendarsQuery.data &&
            getCalendarsQuery.data.map((calendar, index) => (
              <MeetingCard calendar={calendar} key={index} />
            ))}
        </HorizontalScroll>
      </div>

      {/* Meeting List */}
      {selectedDate && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">
            Meetings for {formatDate(selectedDate)}
          </h3>
          <VerticalScroll className="space-y-4" height="45vh">
            {getCalendarsQuery.data ? (
              getCalendarsQuery.data.map((calendar, index) => (
                <MeetingCard calendar={calendar} key={index} />
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No meetings scheduled for this day
              </p>
            )}
          </VerticalScroll>
        </div>
      )}
    </div>
  );
};

export default Calendar;
