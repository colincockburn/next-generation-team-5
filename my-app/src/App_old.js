import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import aiInstructions from './instructions';

const { createAssistant, createThread, getChatResponse } = require('./openai-toolkit');
// App.js

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [assistant, setAssistant] = useState(null);
  const [thread, setThread] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null); // Add this line


  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };

  useEffect(() => {
    const init = async () => {
      let instructions = aiInstructions;
      const assistant = await createAssistant(instructions=instructions);
      const thread = await createThread();
      setAssistant(assistant);
      setThread(thread);
      setMessages(["Patient: Hello doctor."])
    };
    init();
  }, []);

  useEffect(scrollToBottom, [messages]); // Add this line

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    setIsThinking(true); // Set isThinking to true
    const submittedInput = input; // Store the value of input
    setInput(''); // Clear input
    setMessages([...messages, `\nYou: ${submittedInput}`]); // Update messages with user's input
    const response = await getChatResponse(assistant, thread, submittedInput); // Use submittedInput instead of input
    setMessages(prevMessages => [...prevMessages, `\nPatient: ${response}`]); // Update messages with AI's response
    setIsThinking(false); // Set isThinking back to false
  };

  return (
    <div className="App">
      <header className="App-header">
        <textarea 
          readOnly 
          value={messages.join('\n')} 
          style={{ 
            height: '60vh', 
            width: '30vw', 
            resize: 'none',
            overflowY: 'scroll', // Make the textarea scrollable
            fontSize: '0.5em' // Double the font size
          }} 
          ref={messagesEndRef} // Add this line
        />
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={input} 
            onChange={handleInputChange} 
            style={{ 
              width: '27.65vw', 
              whiteSpace: 'pre-wrap', 
              overflow: 'auto' 
            }} 
          />
          <button type="submit" disabled={isThinking}>Submit</button>
        </form>
        {isThinking && <p>AI is thinking...</p>}
      </header>
    </div>
  );
}

export default App;