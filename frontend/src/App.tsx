import { useEffect, useState } from 'react';
import './App.css';
function App(){
  const [messages, setMessages] = useState(["Welcome to the chat!"]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      setMessages(m=> [...m, event.data]);
    };
  }, []);


  return (
    <div className='h-screen bg-black'>
      <br/><br/><br/><br/>
      <div className='h-[95vh]'>
        {messages.map(message => <div key={message}>
          <span className='bg-white text-black rounded px-4 p-4 m-8'>
            {message}
          </span>
        </div>)}
      </div>
      <div className='w-full bg-white flex'>
        <input className="flex-1 p-4"></input>
        <button className='bg-blue-500 text-white px-4 py-2 rounded'>
          Send Message
        </button>
      </div>
      
    </div>
  );
}
export default App;