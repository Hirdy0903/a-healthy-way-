import React, { useState, useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';

export default function ChatInterface({ flow, steps, currentStep, onNext, children, addJournalEntry }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const step = steps[currentStep];

  useEffect(() => {
    // Initial greeting if this is the first step
    if (currentStep === 0 && messages.length === 0) {
      addBotMessage(flow.label + ' Mode Activated. Let\'s take this one step at a time.', 500);
      setTimeout(() => triggerStepMessage(steps[0]), 1500);
    } else if (currentStep > 0) {
      triggerStepMessage(step);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addBotMessage = (text, minDelay = 800) => {
    setIsTyping(true);
    // Add realistic jitter to typing delay (between minDelay and minDelay + 700ms)
    const delay = minDelay + Math.floor(Math.random() * 700);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now(), sender: 'bot', text }]);
      setIsTyping(false);
    }, delay);
  };

  const triggerStepMessage = (currentStepConfig) => {
    addBotMessage(currentStepConfig.title, 600);
    if (currentStepConfig.subtitle) {
      setTimeout(() => addBotMessage(currentStepConfig.subtitle, 800), 1600);
    }
  };

  const handleNextWrapped = () => {
    // Add user message indicating completion of the step
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: 'Done.' }]);
    onNext();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 animate-page-enter">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 animate-fade-in-up ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-sm' 
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 justify-start animate-fade-in-up">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Render the actual interactive step component below the chat history */}
      <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
        {!isTyping && (
          <div className="max-w-lg mx-auto w-full">
            {React.cloneElement(children, { onNext: handleNextWrapped })}
          </div>
        )}
      </div>
    </div>
  );
}
