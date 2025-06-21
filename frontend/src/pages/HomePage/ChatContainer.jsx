import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { ChevronLeft, Send } from "lucide-react";

const ChatContainer = () => {
  return (
    <main className="flex flex-col h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 overflow-hidden">
      <Header />
      <ChatWindow />
      <NewMessageForm />
    </main>
  );
};

const Header = () => {
  const { selectedUser } = useChatStore();
  return (
    <header className="p-4 font-semibold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-100 shadow-md flex flex-row items-center gap-3 border-b border-gray-700">
      <span className="md:block cursor-pointer hover:bg-gray-700 rounded-full p-1 transition">
        <ChevronLeft size={28} />
      </span>
      <span className="text-lg tracking-wide">
        {selectedUser?.fullName || "Select a conversation"}
      </span>
    </header>
  );
};

const ChatWindow = () => {
  const { authUser } = useAuthStore();
  const { currentChatMessages } = useChatStore();
  const messageEndRef = useRef(null);
  const [selectedMsgId, setSelectedMsgId] = useState(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChatMessages]);

  return (
    <section className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-gradient-to-b from-gray-800/80 to-gray-900/80">
      {currentChatMessages.map((msg) => {
        const isMe = msg?.senderId === authUser?._id;
        return (
          <div
            key={msg._id}
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[70%] flex flex-col items-end">
              <div
                className={`px-5 py-3 shadow-md text-base break-words cursor-pointer ${
                  isMe
                    ? "bg-blue-600 text-white self-end rounded-2xl rounded-br-sm"
                    : "bg-gray-700 text-gray-100 self-start rounded-2xl rounded-bl-sm"
                }`}
                onClick={() => setSelectedMsgId(msg._id)}
              >
                {msg.text}
              </div>
              {selectedMsgId === msg._id && (
                <time
                  className={`text-xs text-gray-400 mt-1 ${
                    isMe ? "text-right" : "text-left"
                  }`}
                >
                  {msg.createdAt &&
                    new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </time>
              )}
            </div>
          </div>
        );
      })}
      <div ref={messageEndRef} />
    </section>
  );
};

const NewMessageForm = () => {
  const { sendMessage, isSendingMessage, selectedUser, selectedChatId } =
    useChatStore();
  const [currentMessage, setCurrentMessage] = useState({});
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.text || !selectedUser) return;
    await sendMessage({ text: currentMessage.text, chatId: selectedChatId });
    setCurrentMessage({});
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="p-4 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 flex gap-3 items-center border-t border-gray-700"
    >
      <input
        type="text"
        placeholder="Type a message..."
        value={currentMessage.text || ""}
        onChange={(e) =>
          setCurrentMessage({ ...currentMessage, text: e.target.value })
        }
        className="flex-1 rounded-full px-4 py-2 text-base outline-none bg-gray-700/80 text-gray-100 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 transition"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={isSendingMessage || !currentMessage.text}
        className={`flex items-center gap-2 px-5 py-2 rounded-full text-white text-base font-medium shadow transition ${
          isSendingMessage || !currentMessage.text
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSendingMessage ? (
          <span className="animate-pulse">Sending...</span>
        ) : (
          <>
            <span>Send</span>
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default ChatContainer;
