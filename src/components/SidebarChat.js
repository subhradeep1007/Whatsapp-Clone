import { Avatar } from '@material-ui/core'
import React,{useEffect,useState} from 'react'
import './SidebarChat.css'
import db from '../firebase'
import {Link} from "react-router-dom";
import {GrChat} from "react-icons/gr"

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
        const roomName = prompt('Enter Room-Name');
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
               <div className="bg-blue-100 p-1 h-14 shadow-sm border-2 border-gray-100 rounded-full">
               <Avatar  src={`https://avatars.dicebear.com/api/human/b${seed}.svg`}/>
               </div>
               
               <div className="">
               <h1 className=" text-2xl text-blue-900 font-extrabold ml-4">{name}</h1>
               <p className="text-blue-300 text-base font-bold ml-4 inline-block">{messages[0]?.name.split(" ")[0]}:</p>
               <p className="text-gray-600 ml-4">{messages[0]?.message}</p>
         
               
               </div>
               
               </div> 
        
        </Link> 
    ):(
        <div onClick={createchat} className="sidebarchat text-xl  text-gray-900 shadow-sm font-semibold pl-12">
            <div className=" mr-4" >
            <GrChat size="1.8rem" color="blue"/>
            </div>
            <h2>Add New Chat</h2>
        </div>

    )
}

export default SidebarChat
