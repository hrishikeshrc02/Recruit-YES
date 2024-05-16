// AIHelp.js

import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, List } from 'antd';

const AIHelp = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);

      try {
        const response = await axios.post('http://localhost:5000/api/chat', {
          prompt: input,
        });

        const botMessage = { sender: 'bot', text: response.data.response };
        setMessages([...messages, userMessage, botMessage]);
      } catch (error) {
        console.error('Error communicating with the server:', error);
      }

      setInput('');
    }
  };

  return (
    <div>
      <h1>AI Help</h1>
      <List
        bordered
        dataSource={messages}
        renderItem={(message) => (
          <List.Item>
            <strong>{message.sender}:</strong> {message.text}
          </List.Item>
        )}
        style={{ marginBottom: '20px' }}
      />
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onPressEnter={sendMessage}
        placeholder="Type your message..."
        style={{ marginBottom: '10px' }}
      />
      <Button type="primary" onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
};

export default AIHelp;
