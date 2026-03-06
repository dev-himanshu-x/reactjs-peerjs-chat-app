import { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import "./App.css";
import MyComponent from "./Dashboard";

function App() {
  const [peerId, setPeerId] = useState("");
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const peerRef = useRef(null);
  const connRef = useRef(null);
  const newTime = new Date().toLocaleTimeString();
  const [data,setData]=useState(null)

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("data")) || []
    if(local.length>0){
    setData(local[0])
    }
    const peer = new Peer();
    peer.on("open", (id) => {
      setPeerId(id);
      // Auto-connect to latest peer ID after peer is ready
      if(local.length>0){
        const latestPeerId = local[0].id;
        if (latestPeerId && latestPeerId !== id) {
          setConnection("Connecting...");
          const conn = peer.connect(latestPeerId);
          connRef.current = conn;

          conn.on("open", function () {
            setConnection("Online");
            conn.on("data", function (data) {
              setTime(new Date().toLocaleTimeString());
              setMessages((prev) => [...prev, { msg: data, time: new Date().toLocaleTimeString() }]);
            });
          });

          conn.on("error", function (err) {
            setConnection("Offline");
            console.error("Connection error:", err);
          });

          conn.on("close", function () {
            setConnection("Offline");
          });
        }
      }
    });
    peer.on("connection", (conn) => {
      setConnection("Online");
      connRef.current = conn;
      conn.on("data", (data) => {
        setTime(new Date().toLocaleTimeString());
        setMessages((prev) => [...prev, { msg: data, time: new Date().toLocaleTimeString() }]);
      });
    });
    setConnection("Offline");
    peerRef.current = peer;

    // Apply saved theme on mount
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => peer.destroy();
  }, []);

  // Listen for new contact added event
  useEffect(() => {
    const handleContactAdded = (event) => {
      const { id: newPeerId, allData } = event.detail;
      if (allData && allData.length > 0) {
        setData(allData[0]);
      } else if (allData && allData.length === 0) {
        setData(null);
        setConnection("Offline");
      }
      if (newPeerId && peerRef.current && newPeerId !== peerId) {
        setConnection("Connecting...");
        const conn = peerRef.current.connect(newPeerId);
        connRef.current = conn;

        conn.on("open", function () {
          setConnection("Online");
          conn.on("data", function (data) {
            setTime(new Date().toLocaleTimeString());
            setMessages((prev) => [...prev, { msg: data, time: new Date().toLocaleTimeString() }]);
          });
        });

        conn.on("error", function (err) {
          setConnection("Offline");
          console.error("Connection error:", err);
        });

        conn.on("close", function () {
          setConnection("Offline");
        });
      }
    };

    window.addEventListener("contactAdded", handleContactAdded);
    return () => window.removeEventListener("contactAdded", handleContactAdded);
  }, [peerId]);
  function sendMessage(e) {
    e.preventDefault();
    if (!message.trim()) return;
    connRef.current.send(message);
    setTime(newTime);
    setMessages((prev) => [...prev, { msg: message, time: time, type: "" }]);
    setMessage("");
  }
  return (
    <div className="max-h-auto min-h-screen flex bg-[#EDEDED] dark:bg-[#1e1e1e] border-t">
      <MyComponent state={sidebarOpen} toggleTheme={toggleTheme} theme={theme} />
      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-[#EDEDED] dark:bg-[#2d2d2d] flex items-center px-2 border-b border-gray-200 dark:border-gray-700 justify-between ">
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
              src={data?.image || "/image.png"}
              className="w-10 h-10 rounded-full mr-3 object-cover hidden sm:block"
            />
            <div className="h-14 bg-[#EDEDED] dark:bg-[#2d2d2d] flex items-center gap-2 justify-between flex-1">
              <div className="flex-1">
                <div className="text-black dark:text-white font-semibold">{data?.user || "No Contact"}</div>
                <div
                  className={`text-xs mt-1 ${
                    connection === "Online"
                      ? "text-green-500"
                      : connection === "Offline"
                      ? "text-gray-500"
                      : connection === "Connecting..."
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {connection}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[#DCD9D0] dark:bg-[#1e1e1e] p-2">
          <div className="flex justify-center mt-2">
            <div className="bg-[#f8f3d1] dark:bg-[#3d3d3d] text-black dark:text-white py-1 px-3 text-sm flex gap-1 items-center rounded-sm">
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
                  msg.type === "" ? "bg-[#DBF8C6] text-black" : "bg-white dark:bg-[#3d3d3d] text-black dark:text-white"
                }`}
              >
                <div className="text-sm">{msg.msg}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300 mt-1.5">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="h-14 bg-[#EDEDED] dark:bg-[#2d2d2d] flex items-center px-4 gap-2 justify-between bottom-0 sticky">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message here..."
            className="px-4 py-2 outline-none rounded-md flex-1 bg-white dark:bg-[#3d3d3d] text-black dark:text-white text-base placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button type="submit">
            <img src="/send.png" className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
export default App;
