import './App.css';
import {useState} from 'react'
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const handleChangePrompt = (e) => {
    setPrompt(e.target.value)
  }
  const handleSubmitPrompt = async (e) => {
    e.preventDefault();
    const aiSaid = await axios.post('/ask-an-ai', {
      prompt
    })
    setAiResponse(aiSaid?.data);
  }
  const { message: data = null } = aiResponse;
  let sentimentScore = null;
  if (data && typeof data === 'string') {
    const match = data.match(/\d+/);
    if (match) {
      sentimentScore = parseInt(match[0]);
    }
  }
  
  return (
    <>
      <div className="main-div">
        <p>Enter the text you wish to check the sentiment of.</p>
        <p style={{textAlign:"left"}}>Example quotes:</p>
        <ul>
          <li style={{textAlign:"left"}}>"That must be Lord Farquaad’s castle. Do you think he’s maybe compensating for something?"</li>
          <li style={{textAlign:"left"}}>"Ogres are like onions."</li>
        </ul>
        <form onSubmit={handleSubmitPrompt} className="ai-form">
          <textarea value={prompt} class="text-area" onChange={handleChangePrompt}></textarea>
          <button className='btn-submit' type="submit">Submit</button> 
        </form>
        <div className='ai-response-box'>{data}</div>
        {sentimentScore ? 
          <p>
            {sentimentScore === 5 ? "Neutral" : sentimentScore > 5 ? "Positive" : "Negative"}
          </p> : null} 
      </div>
    </>
  );
}

export default App;
