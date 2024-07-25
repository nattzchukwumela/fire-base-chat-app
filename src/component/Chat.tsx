import React, { FormEvent, useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
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
    const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));

    const unsubscribe = () => onSnapshot(queryMessages, (snapshot) => {
      let messages: any[] = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessage(messages);
    })

    return unsubscribe();
  }, [messagesRef, room])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (newMessage === "") return
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
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
        <div className='messages'>
          {message.map((message) => {
            return (
              <div key={message.id} className='message'>
                <span className='user'>{message.user}</span>
                {message.text}
              </div>
            );
          })}
        </div>
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