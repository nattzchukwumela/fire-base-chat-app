import React, { FormEvent, useEffect, useState } from 'react'
import { addDoc, getDoc, deleteDoc, collection, serverTimestamp, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config';
import '../styles/Chat.css';


type Props = {
	room: string;
}
function Chat({ room }: Props) {

  const [newMessage, setNewMessage] = useState<string>("")
  const [message, setMessage] = useState<any[]>([])
  const messagesRef = collection(db, "messages");

  useEffect(() => {
		const queryMessages = query(messagesRef, where("room", "==", room));
    
    onSnapshot(queryMessages, (snapshot) => { 
			let messages: any[] = [];
			snapshot.forEach((doc) => {
				messages.push({ ...doc.data(), id: doc.id });
			});
			setMessage(messages);
    })
		
  }, [messagesRef, room])

  async function handleSubmit(e: FormEvent){
    e.preventDefault()
    if(newMessage === "") return
    await addDoc(messagesRef, {
    text: newMessage,
    createdAt: serverTimestamp(),
    user: auth.currentUser?.displayName,
    room: room
  })

  setNewMessage("");
  }
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setNewMessage(e.target.value);
  }


  return (
  <div className='chat-app'>
  <div>
				{message.map((message) => {
					return (
						<div key={message.id}>
							<p>{message.text}</p>
							<p>{message.user}</p>
						</div>
					);
				})}
  </div>
  <form onSubmit={handleSubmit} className='new-message-form'>
  <input type="text"
  className="new-message-input" 
  onChange={handleChange}
  value={newMessage}
  placeholder='type your message here' />
  <button type='submit'
  className="send-button"
  >send</button>
  </form>
  </div>
  )
}

export default Chat