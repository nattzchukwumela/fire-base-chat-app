import React, { FormEvent, useEffect, useState } from 'react'
import { addDoc, getDoc, deleteDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config';


type Props = {
	room: string;
}

// type message =  "" | " ";


function Chat({ room }: Props) {

  const [newMessage, setNewMessage] = useState<string>("")
  const messagesRef = collection(db, "messages");

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

  useEffect(() => {
    console.log(newMessage)
  }, [newMessage])
  return (
  <div className='chat-app'>
  <h1>{room}</h1>
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