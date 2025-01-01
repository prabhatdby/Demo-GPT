import { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState(0);
  
  const [toggled, setToggled] = useState(false);

  function handleChatId(e) {
    try{
      setChatId(chatId + 1);
    } catch(error){
      return 'oops something went wrong in handleChatId function'
    }
  }
  async function handleClick(e) {
    try {
      e.preventDefault();
      const tempInput = { input, output: null, chatId: chatId };
      const messageData = message.length
      const response = await axios.post("/api/chat", { messages: [{ role: "user", content: input }] });
      const botMessage = { role: "assistant", content: response.data.reply };
      tempInput.output = botMessage;

      setMessage((prev) => [...prev, tempInput]);
    } catch (error) {
      setMessage((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong." },
      ]);
    }
    setInput('');
  }

  return (
    <div className="container">
      <section className = {`sidebar ${toggled ? 'open' : ''}`}>
        <div className="sidebar-header" onClick={handleChatId}>
          <button>New Chat</button>
        </div>
        <div className="sidebar-history">
          <p>Previous</p>
          <ul>
            {message.length
              ? message
                .filter((value, index, self) =>
                  index === self.findIndex((t) => t.chatId === value.chatId)) // Filter unique chatId
                .map((message, index) => (
                  <li key={index} onClick={() => setChatId(message.chatId)}>{message.input.slice(0, 20)}</li>
                ))
              : null}
          </ul>
        </div>
        <div className="sidebar-info">
          <div className="sidebar-info-upgrade">
            <p>Upgrade plan</p>
          </div>
          <div className="sidebar-info-user">
            <p>User</p>
          </div>
        </div>
      </section>

      <section className="main">
        <div className="empty-chat-container">
          <img src="chatgpt-logo.svg" width="45" height="45" alt="ChatGPT" />
          <h1>Chat GPT Clone</h1>
          <h3>How can I help you today?</h3>
        </div>
        <svg onClick={()=> setToggled(!toggled)} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="burger" height="28.8" width="28.8" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M24 0v24H0V0h24z" opacity=".87"></path><path d="m14 7-5 5 5 5V7z"></path></svg>
        <div className="main-header">
          <ul>
            {message.length > 0 && message.map((item, index) => (

              item.chatId == chatId && (<li key={index}>
                <div>
                  <p className="role-title">You</p>
                  <p>{item.input}</p>
                </div>
                {item.output?.content && (
                  <div>
                    <p className="role-title">ChatGPT</p>
                    <p>{item.output.content}</p>
                  </div>
                )}
              </li>)
            ))}
          </ul>
        </div>
        <div className="main-bottom">
          <form className="form-container" onSubmit={handleClick}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message."
            />
            <button type="submit">Send</button>
          </form>
          <p>ChatGPT can make mistakes. Consider checking important information.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
