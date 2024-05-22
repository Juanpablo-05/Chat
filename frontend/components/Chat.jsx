import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";

function Chat( {socket, user, room} ) {

    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async ()=>{
        if(message !== ""){
            const info = {
                message,
                room,
                author:user,
                time: new Date(Date.now()).getHours() +
                ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message",info)
            setMessageList(list => [...list, info])
            
        }
        setMessage("");
    }

    useEffect(()=>{
        const messageHandle = data => setMessageList(list => [...list, data])
        
        socket.on("receive_message",messageHandle)
        setMessage("");

        return () => socket.off("receive_message",messageHandle)
    }, [socket])

return (
    <section className='chat'>
        <section className='chat_title'>
            <h2>Chat: {room}</h2>
        </section>
        <section className='chat_message'>
            {
                messageList.map( (item, i) =>(
                    <section key={i} className={user === item.author ? 'message-a' : 'message-r'}>
                        <span>{user === item.author ? null : item.author}</span>
                        <p>{item.message}</p>
                        <i>{item.time}</i>
                    </section>
                ))
            }
        </section>
        <section className='chat_footer'>
            <input type="text" placeholder='mensaje...' onChange={e=>{
                setMessage(e.target.value)
            }}/>
            <button onClick={sendMessage} className='chat_btn'>
                <IoSend />
            </button>
        </section>
    </section>
)
}

export default Chat