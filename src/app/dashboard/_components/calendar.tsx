import { ComponentProps, FC, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";

interface CalendarProps extends ComponentProps<"div"> {}

const Calendar: FC<CalendarProps> = ({ className, ...props }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isScheduled, setIsScheduled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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

  const getMeetingsForDate = (date: Date) => {
    return meetings.filter(
      (meeting) =>
        meeting.date.getDate() === date.getDate() &&
        meeting.date.getMonth() === date.getMonth() &&
        meeting.date.getFullYear() === date.getFullYear()
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScheduled(true);
    setShowNotification(true);
    setTimeout(() => {
      setIsScheduled(false);
      setShowNotification(false);
    }, 3000);
  };

  const meetings = [
    {
      id: 1,
      title: "Team Standup",
      date: new Date(2024, 2, 20, 10, 0),
      participants: ["john@example.com", "sarah@example.com"],
    },
    {
      id: 2,
      title: "Project Review",
      date: new Date(2024, 2, 20, 14, 30),
      participants: ["mike@example.com", "anna@example.com"],
    },
    {
      id: 3,
      title: "Client Meeting",
      date: new Date(2024, 2, 22, 11, 0),
      participants: ["client@example.com"],
    },
  ];
  
  const upcomingMeetings = [
    {
      id: 4,
      title: "Weekly Team Sync",
      date: new Date(2024, 2, 25, 9, 0),
      duration: "1h",
      participants: 5,
      type: "Recurring",
    },
    {
      id: 5,
      title: "Product Demo",
      date: new Date(2024, 2, 26, 14, 0),
      duration: "45m",
      participants: 8,
      type: "One-time",
    },
    {
      id: 6,
      title: "Sprint Planning",
      date: new Date(2024, 2, 27, 10, 30),
      duration: "2h",
      participants: 12,
      type: "Recurring",
    },
  ];

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
            className={`
      aspect-square p-2 rounded-lg text-sm relative
      ${!day ? "invisible" : "hover:bg-gray-100"}
      ${
        selectedDate && day && selectedDate.getDate() === day.getDate()
          ? "bg-blue-100"
          : ""
      }
      ${day && getMeetingsForDate(day).length > 0 ? "font-semibold" : ""}
    `}
          >
            {day?.getDate()}
            {day && getMeetingsForDate(day).length > 0 && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Meeting List */}
      {selectedDate && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">
            Meetings for {formatDate(selectedDate)}
          </h3>
          <div className="space-y-4">
            {getMeetingsForDate(selectedDate).length > 0 ? (
              getMeetingsForDate(selectedDate).map((meeting) => (
                <div key={meeting.id} className="bg-gray-50 p-4 rounded-xl">
                  <div className="font-medium text-gray-900">
                    {meeting.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {formatTime(meeting.date)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {meeting.participants.join(", ")}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No meetings scheduled for this day
              </p>
            )}
          </div>
        </div>
      )}

      {/* Upcoming Meetings */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Upcoming Meetings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {meeting.date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    at{" "}
                    {meeting.date.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    meeting.type === "Recurring"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {meeting.type}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {meeting.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {meeting.participants} participants
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
