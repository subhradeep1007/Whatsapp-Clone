import {React,useState,useEffect} from 'react'
import './sidebar.css'
import {Avatar,IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import db from '../firebase'
import {useStateValue} from "./StateProvider"

const Sidebar = () => {
    const [{user},dispatch]=useStateValue()
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map(doc=>(
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))
    }, [])
    return (
        <div className='sidebar'>
            <div className="sidebar_header">
            <Avatar src={user?.photoURL}/>
                <div className="sidebar_header_right">
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
               </div>
            </div>
            
            <div className="sidebar_chats ">
                <SidebarChat addchat/>
                {
                    rooms.map(room=><SidebarChat key={room.id} id={room.id} name={room.data.name}/>)
                }
            </div>
            
        </div>
    )
}

export default Sidebar
