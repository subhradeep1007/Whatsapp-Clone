import { Avatar } from '@material-ui/core'
import React,{useEffect,useState} from 'react'
import './SidebarChat.css'
import db from '../firebase'
import {Link} from "react-router-dom";

const SidebarChat = ({id,name,addchat}) => {

    const [seed,setseed] = useState('')
    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000))
    }, [])
    const [messages, setmessages] = useState([])

    useEffect(() => {
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot=>
                setmessages(snapshot.docs.map(doc=>doc.data()))
            )
        }
    }, [id])

    const createchat=()=>{
        const roomName = prompt('Enter roomname');
        if(roomName){
            db.collection('rooms').add({
                name: roomName
               })
        }
        else{
            alert("RoomName cannot be empty")
        }
        
    }
    return !addchat? (
       <Link to={`/rooms/${id}`}  style={{ textDecoration: 'none' }}>
       
           <div className="sidebarchat">
               <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`}/>
               <div className="sidebarChat_info">
               <h1>#{name}</h1>
               <p>{messages[0]?.message}</p>
               </div>
               
               </div> 
        
        </Link> 
    ):(
        <div onClick={createchat} className="sidebarchat">
            <h2>Add New Chat</h2>
        </div>

    )
}

export default SidebarChat
