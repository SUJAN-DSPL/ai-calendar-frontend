import { Modal, ModalContent, ModalTrigger } from "@/components/spring-modal";
import { cn } from "@/lib/utils";
import { CalendarResponseType } from "@/service_hooks/use-calendar";
import { Clock, Users } from "lucide-react";
import { ComponentProps, FC } from "react";
import MeetingInfo from "./meeting-info";

interface MeetingCardProps extends ComponentProps<"div"> {
  calendar: CalendarResponseType;
}

const MeetingCard: FC<MeetingCardProps> = ({
  calendar,
  className,
  ...props
}) => {
  return (
    <Modal
      className={cn(
        "cursor-pointer bg-gray-100 border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow",
        className
      )}
      {...props}
    >
      <ModalTrigger>
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium  text-gray-900 truncate w-36">
              {calendar.summary}
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(calendar.start.dateTime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              at{" "}
              {new Date(calendar.start.dateTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              calendar.status === "confirmed"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {`pen`}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {/* {meeting.duration} */} 2h
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {calendar.attendees.length} participants
          </div>
        </div>
      </ModalTrigger>

      <ModalContent>
        <MeetingInfo calendar={calendar}/>
      </ModalContent>
    </Modal>
  );
};

export default MeetingCard;
