import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from './types'


function App() {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(() => 
    io('https://socket-backend-1-jzfe.onrender.com', {
      transports: ['websocket', 'polling'],
      withCredentials: true
    })
    , [])
  
    const [socketId, setSocketId] = useState<string | undefined>(undefined)
    
    
    const [message, setMessage] = useState<string>('')
    const [allMessages, setAllMessages] = useState<string[]>([])
    const [personId, setPersonId] = useState<string>('')
    const [roomId, setRoomId] = useState<string>('')



  useEffect(() => {
    socket.on('connect', ()=> { 
      console.log('connected ', socket.id)
      setSocketId(socket.id)
    })

    socket.on('welcome', (arg:string)=> {
      console.log('Message received on welcome channel : ', arg)
      setAllMessages(prevMessages=> [...prevMessages, arg])
    })

    socket.on('personalMessage', (msg: string) => {
      setAllMessages(prevMessages=> [...prevMessages, msg])
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  
  const handleMessageWithId = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
      socket?.emit('message', personId, roomId, message)
    setMessage('')
    setPersonId('')
  }
  
  const handleRoom = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    socket.emit('joinRoom', roomId)
    // setRoomId('')
  }

  return (
    <>
      <div>
      <div>
        <h2>Client {socketId}</h2>
      </div>
      <div>
        <input type="text" placeholder='Enter message' value={message} onChange={(e)=> setMessage(e.target.value)} />
        <button onClick={(e)=> handleMessageWithId(e)} > Send Message</button>
      </div>
      <div>
        <input type="text" placeholder='Enter personId'  value={personId} onChange={(e)=> setPersonId(e.target.value)} />
      </div>
      <div>
        <h1>Join room : </h1>
        <input type="text" placeholder='Enter room id' value={roomId} onChange={(e)=> setRoomId(e.target.value)} />
        
        <button onClick={(e)=> handleRoom(e)} > Join Room </button>
      </div>
      <div>
        Messages :
        <div>
          {
            allMessages.map((msg, i)=> (
              <div key={i}>
                {msg}
              </div>
            ))
          }
        </div>
      </div>
      </div>
    </>
  )
}

export default App

