import React, { useEffect, useState } from "react";
import "./chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, AttachFile ,InsertEmoticon} from "@material-ui/icons";
import MicIcon from '@material-ui/icons/Mic'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import db from "../firebase"
import {useParams} from 'react-router-dom'
import {useStateValue} from "./StateProvider"
import firebase from 'firebase'
import logo1 from './Logo1.jpg'

const Chat = () => {
    const [seed, setseed] = useState("");
    const [input, setinput] = useState("");
    const {roomId}=useParams()
    const [roomname, setroomname] = useState('')
    const [messages, setmessages] = useState([])
    const [{user},dispatch]=useStateValue()
    const sendmessage = e=>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name: user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        
        })
        
        setinput('')
    }
    
    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setroomname(snapshot.data().name)
            ))

            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot(
                snapshot=>setmessages(snapshot.docs.map(doc=>doc.data()))
            )
        }
       
    }, [roomId])

    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000));
    }, []);
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`} />
                <div className="chat_header_info">
                    <h3>#{roomname}</h3>
                    
                </div>
                <div className="chat_header_right">
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
           
              
               {console.log(user.displayName)}
               {messages.map(message=>(
                   <p className={`chat__message ${message.name===user.displayName && `chat__reciever`}`}>
                   <span className="chat_name">{message.name}</span>
                   {message.message}
               <span className="chat_time">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
               </p>
               ))}

            </div>
            <div className="chat_footer">
             <InsertEmoticon/>
             <form >
                 <input value={input} onChange={e=>setinput(e.target.value)} type="text" placeholder='Type a message'/>
                 <button onClick={sendmessage} type='submit'>Send</button>
             </form>
             <MicIcon/>
            </div>
        </div>
    );
};

export default Chat;
