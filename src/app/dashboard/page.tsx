"use client";

import React from "react";
import { Video } from "lucide-react";
import AiChatAgent from "@/app/dashboard/_components/ai-chat-agent";
import Calendar from "./_components/calendar";
import MeetingForm from "./_components/meeting-form";
import Tips from "./_components/tips";
import Features from "./_components/features";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Video className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Google Meet Scheduler
          </h1>
          <p className="text-gray-600">
            Schedule and manage your virtual meetings effortlessly
          </p>
        </div>

        {/* tools */}
        <div className="md:flex justify-between gap-6">
          <div className="md:flex justify-between w-5xl gap-6">
            <Calendar />
            <MeetingForm />
          </div>
          <div className="space-y-6 flex-1">
            <AiChatAgent />
            <Tips />
            <Features />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
