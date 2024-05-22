import { useState } from "react";
import io from "socket.io-client";
import Chat from "../components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setshowChat] = useState(false);

  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      setshowChat(true)
    }
  };

  return (
    <main className="main">
      { !showChat ? (
      <section className="cont-info">
        <input
          type="text"
          placeholder="nombre de usuario"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="nombre de la sala"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />

        <button onClick={joinRoom}>Unirse</button>
      </section>
      )
        :
      <Chat
        user={user}
        room={room}
        socket={socket}
      />}
    </main>
  );
}

export default App;
