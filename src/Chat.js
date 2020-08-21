import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SearchIcon from "@material-ui/icons/Search";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [msg, setMsg] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [userData, setUserData] = useState(null);
  const [emoji, setEmoji] = useState(false);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("data")));
  }, []);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMsg(snapshot.docs.map((doc) => doc.data()))
        );
    }
    setEmoji(false);
    setInput("");
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Typed", input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: userData.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  const emojiTabOpen = (e) => {
    setEmoji(true);
  };
  const onEmojiClick = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar />
        <div className="chat-headerInfo">
          <h3>{roomName}</h3>
          <p>
            {new Date(msg[msg.length - 1]?.timestamp?.toDate()).toUTCString()}
          </p>
        </div>
        <div className="chat-headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {msg.map((mg) => (
          <p
            key={mg.timestamp}
            className={`chat-msg ${
              mg.name === userData?.displayName && "chat-reciever"
            }`}
          >
            <span className="chat-name">{mg.name}</span>
            {mg.message}
            <span className="chat-timeStamp">
              {new Date(mg.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat-footer">
        <InsertEmoticonIcon onClick={emojiTabOpen} />
        {emoji ? (
          <span className="chat-emoji">
            <Picker onSelect={onEmojiClick} />
          </span>
        ) : (
          ""
        )}

        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
