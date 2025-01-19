import { WaitingRoom } from "./Components/WaitingRoom";
import { Chat } from "./Components/Chat";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState } from "react";

function App() {
  const [connection, setConnection] = useState(null);
  const [chatRoom, setChatRoom] = useState("");
  const [messages, setMessages] = useState([]);

  const joinChat = async (userName, chatRoom) => {
    var connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7018/chat")
      .configureLogging(LogLevel.Debug)
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveMessage", (userName, message) => {
      console.log(userName);
      console.log(message);
    });
    try {
      await connection.start();
      await connection.invoke("JoinChat", { userName, chatRoom });

      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App min-h-screen flex justify-center items-center bg-gray-100">
      {connection ? (
        <Chat messages={messages} chatRoom={chatRoom} />
      ) : (
        <WaitingRoom joinChat={joinChat} />
      )}
    </div>
  );
}

export default App;
