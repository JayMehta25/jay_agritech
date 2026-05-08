import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import './ChatBot.css';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreetingPopup, setShowGreetingPopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        { 
          id: 1, 
          text: "Hi there! 👋 Welcome to Jay Agritech. How can I help you with our biological solutions today?", 
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setShowGreetingPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowGreetingPopup(false);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (text) => {
    const query = text.toLowerCase();
    if (query.includes('product') || query.includes('insecticide')) {
      return "We have over 60 innovative biological products across 4 main categories. You can explore them in our Products section!";
    }
    if (query.includes('price') || query.includes('cost')) {
      return "For pricing and bulk orders, please connect with our sales team via the Contact form or email us at info@jayagritech.com.";
    }
    if (query.includes('partner') || query.includes('dealer')) {
      return "That's great! We are actively looking for dealers and distributors. Check out our 'Become a Partner' section for details.";
    }
    return "Thank you for your message! I'm still learning, but one of our experts can help you better. Would you like to check our product catalog?";
  };

  return (
    <div className="chatbot-wrapper">
      {/* Greeting Popup */}
      {!isOpen && showGreetingPopup && (
        <div className="chatbot-greeting-popup" onClick={handleToggle}>
          <div className="chatbot-greeting-close" onClick={(e) => { e.stopPropagation(); setShowGreetingPopup(false); }}><X size={14} /></div>
          <p>Hi! How can I help you today? 👋</p>
        </div>
      )}

      {/* Floating Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && messages.length > 0 && !showGreetingPopup && <span className="chatbot-notification">1</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Bot size={20} />
              </div>
              <div>
                <h4>Jay Assistant</h4>
                <span className="chatbot-status">Online</span>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-message ${msg.sender}`}>
                <div className="chatbot-message-avatar">
                  {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="chatbot-message-bubble">
                  <p>{msg.text}</p>
                  <span className="chatbot-message-time">{msg.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-message bot">
                <div className="chatbot-message-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input">
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={!inputValue.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
