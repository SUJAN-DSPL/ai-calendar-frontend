import { CreateMeetingType } from "@/schemas/create-meeting-schema";
import axios from "axios";
axios.defaults.withCredentials = true;

export type CalendarResponseType = {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: {
    email: string;
  };
  organizer: {
    email: string;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  recurringEventId: string;
  originalStartTime: {
    dateTime: string;
    timeZone: string;
  };
  iCalUID: string;
  sequence: number;
  attendees: Array<{
    email: string;
    responseStatus: string;
  }>;
  hangoutLink: string;
  conferenceData: {
    entryPoints: Array<{
      entryPointType: string;
      uri: string;
      pin: string;
    }>;
    conferenceSolution: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId: string;
  };
  reminders: {
    useDefault: true;
  };
  eventType: string;
};

const useCalender = () => {
  const apiEndPoint = process.env.NEXT_PUBLIC_AUTH_API_URL;

  const createMeeting = async (data: CreateMeetingType) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/google-calendar/create_meeting",
        data, 
      );

      return response.data;
    } catch (error) {
      console.error("Error creating meeting:", error);
      throw error;
    }
  };

  const getMeetings = async (date: string) => {
    const response = await axios.get(
      `${apiEndPoint}/api/google-calendar/meetings`,
      { params: { date: date }, withCredentials: true }
    );

    if (response.data.error) throw new Error(response.data.error);

    return response.data;
  };

  const deleteMeeting = async (eventId: string) => {
    const response = await axios.post(
      `${apiEndPoint}/api/google-calendar/delete_meeting`,
      { event_id: eventId },
      { withCredentials: true }
    );

    if (response.data.error) throw new Error(response.data.error);

    return response.data;
  };

  return { createMeeting, getMeetings, deleteMeeting };
};

export default useCalender;
