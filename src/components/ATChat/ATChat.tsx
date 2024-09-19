import React, { useState, useEffect } from "react";

type Message = {
  userId: string;
  message: string;
  timestamp: Date;
};

const Chat: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [id, setId] = useState("");
  function getSessionId(): string {
    // Check if the ID already exists in session storage
    const storedId = sessionStorage.getItem("sessionId");
    if (storedId) {
      setId(storedId);
      return storedId; // Return the existing ID
    }

    // Helper function to generate a random 16-character ID
    const generateId = (): string => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < 16; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };

    // Generate a new ID
    const newId = generateId();
    // Store the new ID in session storage
    sessionStorage.setItem("sessionId", newId);
    setId(newId);
    return newId;
  }

  // Establish WebSocket connection on component mount
  useEffect(() => {
    let ws: WebSocket;
    const userId = getSessionId();
    function connect() {
      ws = new WebSocket(`ws://192.168.1.10:42069/ws?userId=${userId}`);

      ws.onopen = () => console.log("WebSocket connected");
      ws.onmessage = (event) => {
        console.log(event);

        const data: Message = JSON.parse(event.data);
        console.log(data);
        setMessages((messages) => [...messages, data]);
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setWs(ws);
    }

    // Delay the connection by 1 second
    const timeoutId = setTimeout(connect, 500);

    return () => {
      clearTimeout(timeoutId); // Clear the timeout on component unmount
      if (ws) {
        ws.close(); // Close the WebSocket connection if it is open
      }
    };
  }, []);

  // Send a message when the user submits the form
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input && ws) {
      const message = {
        message: input,
        timestamp: new Date().toISOString(), // ISO 8601 format
      };
      ws.send(JSON.stringify(message));
      setInput("");
    }
  };

  function formatTimestamp(timestamp: Date): string {
    // Create a new Date object from the timestamp

    if (!timestamp) {
      return ""; // Return a placeholder or handle it as per your requirements
    }

    const date = new Date(timestamp.toString());

    // Format the date and time
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 for 1-12
    const day = date.getDate();
    let hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    const amPm = hour >= 12 ? "PM" : "AM";

    // Convert hour to 12-hour format
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'

    // Format month and day to ensure they are always two digits
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");

    // Build the formatted timestamp string
    console.log(
      `${formattedMonth}/${formattedDay}/${year} ${hour}:${minute}:${second} ${amPm}`
    );

    return `${hour}:${minute} ${amPm}`;
  }

  return (
    <div className="text-gray-800 h-full flex flex-col justify-between">
      <h1 className="pl-6 text-xl font-semibold mb-4">Chat</h1>
      <div className="p-6 h-full">
        <div className="bg-gray-100 flex h-full flex-col items-stretch h-4/6 p-4 col border border-gray-200 rounded-lg overflow-y-auto">
          <ul className="space-y-4">
            {messages?.map((message, index) => (
              <li
                key={index}
                className={`flex ${message.userId === id ? "justify-end" : ""}`}
              >
                <div>
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 ${
                      message.userId === id
                        ? "bg-indigo-400 text-grey-900 rounded-lg rounded-tr-lg"
                        : "bg-indigo-100 text-gray-900 rounded-lg rounded-tr-lg"
                    }`}
                  >
                    <span>{message.message}</span>
                  </div>
                  <div
                    className={`flex ${
                      message.userId === id ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span className="text-right">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form className="flex items-center gap-4 p-4" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          className="flex-grow bg-white border border-gray-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
