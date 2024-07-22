import React from 'react'

type Props = {
	room: string;
}

function Chat({ room }: Props) {
  return (
    <div>Chat {room}</div>
  )
}

export default Chat