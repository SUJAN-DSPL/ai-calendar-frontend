"use client";

import { ComponentProps, FC, useState } from "react";
import {
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  X,
  Video,
  Phone,
  ExternalLink,
  ChevronDown,
  MessageSquare,
  Mail,
  ChevronUp,
} from "lucide-react";
import { CalendarResponseType } from "@/service_hooks/use-calendar";

interface MeetingInfoProps extends ComponentProps<"div"> {
  calendar: CalendarResponseType;
}

const MeetingInfo: FC<MeetingInfoProps> = ({
  calendar,
  className,
  ...props
}) => {
  const [isGuestListExpanded, setIsGuestListExpanded] = useState(true);

  console.log(calendar);

  const colors = [
    "bg-purple-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-orange-500",
  ];

  return (
    <div className=" text-gray-900 rounded-lg w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#4285f4] rounded-sm"></div>
            <h1 className="text-xl font-medium">{calendar.summary}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Date and Time */}
      <div className="px-6 py-2">
        <p className="text-gray-700">Monday, 17 March • 4:00 – 5:30pm</p>
        <p className="text-gray-500 text-sm">Every 2 weeks on Monday</p>
      </div>

      {/* Google Meet Button */}
      <div className="px-6 py-3">
        <button className="flex items-center gap-2 bg-[#1a73e8] text-white px-6 py-2 rounded-full font-medium hover:bg-[#1557b0] transition-colors">
          <Video size={20} />
          Join with Google Meet
        </button>
        <div className="mt-2 text-sm text-[#1a73e8]">
          meet.google.com/kdm-npyy-imq
        </div>
      </div>

      {/* Phone Details */}
      <div className="px-6 py-2">
        <div className="flex items-center gap-2 text-[#1a73e8] mb-1">
          <Phone size={16} />
          <span>Join by phone</span>
        </div>
        <p className="text-gray-700 text-sm">
          (US) +1 815-905-1302 PIN: 717 166 527#
        </p>
        <button className="text-[#1a73e8] text-sm mt-1 hover:text-[#1557b0]">
          More phone numbers
        </button>
      </div>

      {/* Location */}
      <div className="px-6 py-2">
        <p className="text-gray-700">Hyderabad-1-ANIMIGO (10)</p>
      </div>

      {/* Guests */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-gray-700">21 guests</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <Copy size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <MessageSquare size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <Mail size={18} />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-transform"
              onClick={() => setIsGuestListExpanded(!isGuestListExpanded)}
            >
              {isGuestListExpanded ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
          </div>
        </div>
        <p className="text-gray-500 text-sm">5 yes (1 in a meeting room)</p>
        <p className="text-gray-500 text-sm">16 awaiting</p>

        {/* Guest List */}
        <div
          className={`mt-3 space-y-2 overflow-y-auto transition-all duration-300 ease-in-out ${
            isGuestListExpanded ? "max-h-44" : "max-h-0"
          }`}
        >
          {calendar.attendees.map((guest, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full ${
                  colors[Math.floor(Math.random() * 7)]
                }  flex items-center justify-center text-white`}
              >
                <span className="text-sm">{guest.email.split("")?.[0]}</span>
              </div>
              <div>
                <p className="text-gray-700 truncate w-72">{guest.email}</p>
                <p className="text-gray-500 text-sm">{guest.responseStatus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {/* <div className="p-4 border-t border-gray-200 mt-4">
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Going?</span>
          <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full flex items-center gap-1 hover:bg-gray-200">
            Yes
            <ChevronDown size={16} />
          </button>
          <button className="text-[#1a73e8] px-4 py-1 rounded-full hover:bg-gray-100">
            No
          </button>
          <button className="text-[#1a73e8] px-4 py-1 rounded-full hover:bg-gray-100">
            Maybe
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default MeetingInfo;
