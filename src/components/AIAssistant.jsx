// src/components/AIAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { askAI } from '../services/aiService';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: '🌾 Welcome to KrishiTrust AI Business Intelligence! I\'m your agricultural value and finance advisor. Ask me about handling risk, business reliability, finance readiness, or how to improve your agricultural business profile.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSendMessage = async (message) => {
    if (!message?.trim()) return;

    const userMessage = { type: 'user', text: message };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askAI(message);
      const botMessage = { 
        type: 'bot', 
        text: response || '🌾 I apologize, but I could not process your request. Please try again.' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage = { 
        type: 'bot', 
        text: '⚠️ I apologize, but I encountered an error. Please try again later.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      alert('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setIsVoiceEnabled(true);
      } catch (error) {
        console.error('Voice recognition error:', error);
        setIsListening(false);
      }
    }
  };

  // Updated example questions - Business Intelligence Focus
  const exampleQuestions = [
    'How can I improve my finance readiness?',
    'What is my handling score and how to improve it?',
    'How to build business reliability?',
    'What factors affect my finance readiness score?',
    'How to reduce handling risk for tomato shipments?',
    'What business documentation should I maintain?',
    'How can I improve my business profile?',
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col h-[450px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌾</span>
          <div>
            <h3 className="text-white font-semibold text-sm">KrishiTrust AI</h3>
            <span className="text-xs text-green-400">● Online</span>
          </div>
        </div>
        <button
          onClick={handleVoiceToggle}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1 ${
            isListening 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
              : isVoiceEnabled 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="text-lg">{isListening ? '🔴' : isVoiceEnabled ? '🎤' : '🎤'}</span>
          {isListening ? 'Listening...' : isVoiceEnabled ? 'Voice ON' : 'Voice OFF'}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-xl text-sm ${
                msg.type === 'user'
                  ? 'bg-green-600/30 text-white border border-green-500/30'
                  : 'bg-[#0d1117] text-gray-200 border border-white/10'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#0d1117] p-3 rounded-xl border border-white/10">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Questions - Business Intelligence Focus */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {exampleQuestions.slice(0, 3).map((q, index) => (
          <button
            key={index}
            onClick={() => handleSendMessage(q)}
            className="text-xs px-2.5 py-1 bg-white/5 hover:bg-green-500/20 text-gray-300 hover:text-green-300 rounded-lg transition-all duration-300"
          >
            {q.length > 28 ? q.substring(0, 28) + '...' : q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
          placeholder="Ask about handling, reliability, finance readiness..."
          className="flex-1 px-4 py-2 bg-[#0d1117] border border-white/10 rounded-xl text-white text-sm placeholder-gray-400 focus:outline-none focus:border-green-500/50 transition-all duration-300"
          disabled={isLoading}
        />
        <button
          onClick={() => handleSendMessage(input)}
          disabled={!input.trim() || isLoading}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300"
        >
          <span className="text-lg">➤</span>
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;