import { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import "./App.css";
import MyComponent from "./Dashboard";

function App() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const peerRef = useRef(null);
  const connRef = useRef(null);
  const newTime = new Date().toLocaleTimeString();
  const [data,setData]=useState('')
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("data")) || []
    setData(local[0])
    const peer = new Peer();
    peer.on("open", (id) => {
      setPeerId(id);
    });
    peer.on("connection", (conn) => {
      setConnection("Online");
      connRef.current = conn;
      conn.on("data", (data) => {
        setTime(newTime);
        setMessages((prev) => [...prev, { msg: data, time: time }]);
      });
    });
    setConnection("Offline");
    peerRef.current = peer;
    return () => peer.destroy();
  }, []);
  function connectPeer() {
    if (!remotePeerIdValue) return setConnection("Offline");
    setConnection("Online");
    const conn = peerRef.current.connect(remotePeerIdValue);
    connRef.current = conn;
    conn.on("open", function () {
      conn.on("data", function (data) {
        setTime(newTime);
        setMessages((prev) => [...prev, { msg: data, time: time }]);
      });
    });
  }
  function sendMessage() {
    connRef.current.send(message);
    setTime(newTime);
    setMessages((prev) => [...prev, { msg: message, time: time, type: "" }]);
  }
  return (
    <div className="max-h-auto min-h-screen flex bg-[#EDEDED] border-t">
      <MyComponent state={sidebarOpen} />
      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-[#EDEDED] flex items-center px-2 border-b border-gray-200 justify-between ">
          <div className="flex items-center justify-start">
            <button
              className="pr-3 pb-3 lg:hidden flex z-10 "
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#434343"
              >
                <path d="M120-120v-80h720v80H120Zm0-320v-80h720v80H120Zm0-320v-80h720v80H120Z" />
              </svg>
            </button>
            <img
              src="/image.png"
              className="w-10 h-10 rounded-full mr-3 object-cover hidden sm:block"
            />
            <div className="h-14 bg-[#EDEDED] flex items-center gap-2 justify-between flex-1">
              <div>
                <div>{data.user}</div>
                
                <input
                  value={remotePeerIdValue}
                  onChange={(e) => setRemotePeerIdValue(e.target.value)}
                  placeholder="Friends Peer Id"
                  className="p-1 outline-none rounded-md bg-white text-base flex-1"
                />
                <div
                  className={`text-xs mt-1 ${
                    connection == "Online" ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {connection}
                </div>
              </div>
              <button onClick={connectPeer}>
                <img src="/send.png" className="h-5 w-5 mb-5" />
              </button>
            </div>
          </div>
          <div className="gap-2 mr-5 hidden sm:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#999888"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#999888"
            >
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </svg>
          </div>
        </div>
        <div className="flex-1 bg-[#DCD9D0] p-2">
          <div className="flex justify-center mt-2">
            <div className="bg-[#f8f3d1] py-1 px-3 text-sm flex gap-1 items-center rounded-sm">
              <img src="/lock.png" className="h-3.5 w-3.5" />
              Your Peer Id : {peerId}
            </div>
          </div>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mt-3 flex ${
                msg.type === "" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex w-fit gap-9 p-1.5 px-2.5 rounded-sm items-center ${
                  msg.type === "" ? "bg-[#DBF8C6]" : "bg-white"
                }`}
              >
                <div className="text-sm">{msg.msg}</div>
                <div className="text-xs text-gray-500 mt-1.5">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-14 bg-[#EDEDED] flex items-center px-4 gap-2 justify-between bottom-0 sticky">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-50 scale-x-[-1]"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="gray"
          >
            <path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z" />
          </svg>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message here..."
            className=" px-4 py-2 outline-none rounded-md flex-1 bg-white text-base"
          />
          <button onClick={sendMessage}>
            <img src="/send.png" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
