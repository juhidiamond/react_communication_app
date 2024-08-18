import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../Nav";
import "../../css/style.css";

const Chats = () => {
  const [chatData, setChatData] = useState(
    JSON.parse(localStorage.getItem("chatData")) || []
  );
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedUser")) || {}
  );
  const [error, setError] = useState("");

  useEffect(() => {
    fetchChatData();
  }, []);

  const fetchChatData = () => {
    const data = JSON.parse(localStorage.getItem("chatData")) || [];
    setChatData(data);
  };

  const handleSend = () => {
    if (message.trim() === "") {
      setError("Please enter a message");
      return;
    }

    const dateObj = new Date();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    const dateTime = `${day}-${month}-${year} ${dateObj.toLocaleTimeString()}`;

    const newMessage = {
      user: loggedInUser.name,
      id: loggedInUser.id,
      message: message,
      dateTime: dateTime,
    };

    const updatedChatData = [...chatData, newMessage];
    localStorage.setItem("chatData", JSON.stringify(updatedChatData));
    setChatData(updatedChatData);
    setMessage("");
    setError("");
  };

  const handleRefresh = () => {
    fetchChatData();
  };
  // React Fragments
  return (
    <>
      <div className="container mt-4">
        <h3 className="text-center">Group Chat</h3>
        <hr />
        <ul className="list-group mb-3 chat-list">
          {chatData.map((data, index) => (
            <li
              key={index}
              className={`message-list ${
                data.id === loggedInUser.id ? "text-right" : "text-left"
              }`}
            >
              <span>
                [{data.dateTime}] {data.user}:
              </span>{" "}
              <span>{data.message}</span>
            </li>
          ))}
        </ul>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <b>
                <span>{loggedInUser.name}</span>
              </b>{" "}
            </span>
          </div>
          <input
            type="text"
            className="form-control chat_box"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="message-buttons">
          <button
            className="btn btn-primary"
            id="send-btn"
            onClick={handleSend}
          >
            Send
          </button>
          <button
            className="btn btn-secondary"
            id="refresh-btn"
            onClick={handleRefresh}
          >
            Refresh
          </button>
          </div>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default Chats;
