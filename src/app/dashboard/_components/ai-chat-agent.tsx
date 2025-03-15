import { MessageSquare, Send } from "lucide-react";
import { ComponentProps, FC, useState } from "react";

interface AiChatAgentProps extends ComponentProps<"div"> {}

const AiChatAgent: FC<AiChatAgentProps> = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sent: boolean }[]>([
    {
      text: "Hi! I'm your meeting assistant. How can I help you today?",
      sent: false,
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([...messages, { text: message, sent: true }]);
    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'll help you schedule this meeting. Please fill out the form above with your preferred details.",
          sent: false,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Chat Assistant</h2>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 h-[400px] overflow-y-auto mb-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-xl ${
                  msg.sent
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default AiChatAgent;
