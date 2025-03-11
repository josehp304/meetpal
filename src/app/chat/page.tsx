"use client"

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! How are you feeling today?",
      isAi: true,
      time: "10:30 AM",
      status: "read",
    },
    {
      id: 2,
      text: "I'm feeling great! Thanks for asking.",
      isAi: false,
      time: "10:31 AM",
      status: "read",
    },
    {
      id: 3,
      text: "That's wonderful to hear! Would you like to share what made your day special?",
      isAi: true,
      time: "10:31 AM",
      status: "read",
    },
    {
      id: 4,
      text: "I just finished a great workout and had a productive morning!",
      isAi: false,
      time: "10:32 AM",
      status: "read",
    },
    {
      id: 5,
      text: "That's fantastic! Exercise is such a great way to start the day. What kind of workout did you do?",
      isAi: true,
      time: "10:33 AM",
      status: "read",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const emojis = [
    "😊",
    "❤️",
    "😂",
    "🎉",
    "👍",
    "🌟",
    "🤗",
    "💕",
    "✨",
    "🎵",
    "🌈",
    "🌸",
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        isAi: false,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      setIsTyping(true);

      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: "I understand how you feel! Would you like to tell me more about it?",
          isAi: true,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          status: "read",
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-[375px] min-h-[762px] bg-gradient-to-b from-pink-50 to-purple-50 relative">
      <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 px-4 py-3 border-b border-pink-100">
        <div className="flex items-center justify-between">
          <a
            href="/"
            data-readdy="true"
            className="text-pink-600"
          >
            <i className="fa-solid fa-arrow-left text-lg"></i>
          </a>
          <div className="flex flex-col items-center">
            <Avatar className="h-10 w-10 mb-1">
              <img
                // src="https://public.readdy.ai/ai/img_res/cd3ca0580beffe9ac96fe9e885c614bc.jpg"
                alt="Emma"
              />
            </Avatar>
            <span className="text-sm font-medium text-gray-800">Emma</span>
            <div className="flex items-center text-xs text-green-600">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
              Active now
            </div>
          </div>
          <button className="text-pink-600">
            <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
          </button>
        </div>
      </div>

      <div className="pt-24 pb-32 px-4">
        <ScrollArea className="h-[calc(100vh-240px)]" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isAi ? "justify-start" : "justify-end"} mb-4`}
            >
              {message.isAi && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <img
                    // src="https://public.readdy.ai/ai/img_res/f814f61b1b887b5bf24883be563d4aa3.jpg"
                    alt="Emma"
                  />
                </Avatar>
              )}
              <div className={`max-w-[70%]`}>
                <div
                  className={`px-4 py-2 rounded-2xl ${message.isAi ? "bg-white text-gray-800" : "bg-pink-600 text-white"}`}
                >
                  {message.text}
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{message.time}</span>
                  {!message.isAi && (
                    <span className="ml-2">
                      <i className="fa-solid fa-check-double"></i>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center mb-4">
              <Avatar className="h-8 w-8 mr-2">
                <img
                //   src="https://public.readdy.ai/ai/img_res/f33126d2f9dfaf35e5014589fd079fa7.jpg"
                  alt="Emma"
                />
              </Avatar>
              <div className="bg-white px-4 py-2 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      <div className="fixed bottom-16 w-full bg-white border-t border-pink-100 p-4">
        <div className="flex items-end gap-2">
          <button className="text-pink-600">
            <i className="fa-solid fa-image text-xl"></i>
          </button>
          <button className="text-pink-600">
            <i className="fa-solid fa-microphone text-xl"></i>
          </button>
          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <button className="text-pink-600">
                <i className="fa-regular fa-face-smile text-xl"></i>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="grid grid-cols-6 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    className="text-2xl hover:bg-pink-50 p-1 rounded cursor-pointer"
                    onClick={() => {
                      setInputMessage((prev) => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className={`bg-pink-600 hover:bg-pink-700 !rounded-button ${!inputMessage.trim() && "opacity-50 cursor-not-allowed"}`}
            disabled={!inputMessage.trim()}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 w-full bg-white border-t border-pink-100 px-4 py-2">
        <div className="grid grid-cols-4 gap-4">
          <a
            href="/"
            data-readdy="true"
            className="flex flex-col items-center"
          >
            <i className="fa-solid fa-house text-gray-400"></i>
            <span className="text-xs mt-1 text-gray-600">Home</span>
          </a>
          <button className="flex flex-col items-center">
            <i className="fa-solid fa-comment text-pink-600"></i>
            <span className="text-xs mt-1 text-pink-600">Chat</span>
          </button>
          <button className="flex flex-col items-center">
            <i className="fa-solid fa-heart text-gray-400"></i>
            <span className="text-xs mt-1 text-gray-600">Activities</span>
          </button>
          <button className="flex flex-col items-center">
            <i className="fa-solid fa-user text-gray-400"></i>
            <span className="text-xs mt-1 text-gray-600">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
