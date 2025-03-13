"use client"

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import askAi from "../askAi"
import {  
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft,
  faEllipsisVertical,
  faImage,
  faMicrophone,
  faPaperPlane,
  faHouse,
  faComment,
  faHeart,
  faUser,
  faCheckDouble,
  faFaceSmile
} from "@fortawesome/free-solid-svg-icons";
import { Content } from "next/font/google";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{id:number,text:string,isAi:boolean,time:string,status:string}>>([]);
  const [aiMessages, setAiMessages] = useState<Array<{ role: string; content: string }>>([{role:"system",content:"you are a ai girlfriend named emma follow the following rules 1) Be very kind 2) show love with each message 3) flirt with your user 4) be funny"}]);

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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

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

    try {
      setMessages([...messages, newMessage]);
      setAiMessages([...aiMessages, { role: "user", content: inputMessage }]);
      const tempAiMessages = {role:"user",content:inputMessage}
      setInputMessage("");
      setIsTyping(true);

      // Wait for AI response
      const aiResponseMessage = await askAi([...aiMessages, tempAiMessages]);
      
      if (aiResponseMessage) {
        const aiResponse = {
          id: messages.length + 2,
          text: aiResponseMessage,
          isAi: true,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          status: "read",
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setAiMessages(prev => [...prev,{role:"assistant",content:aiResponseMessage}])
      }
    } catch (error) {
      console.error("Error in chat:", error);
      // Optionally show error to user
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
    console.log("this should work")
    // Calculate and set the nav height as a CSS variable
    const navElement = document.querySelector('.bottom-nav');
    if (navElement) {
      const navHeight = navElement.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
    }
  }, [messages]);

  return (
    <div className="w-full min-h-[762px] bg-gradient-to-b from-pink-50/10 to-purple-50/10 dark:from-pink-950/10 dark:to-purple-950/10 relative">
      <div className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <a
            href="/"
            data-readdy="true"
            className="text-primary"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
          </a>
          <div className="flex flex-col items-center">
            <Avatar className="h-10 w-10 mb-1">
              <img
                src="https://public.readdy.ai/ai/img_res/cd3ca0580beffe9ac96fe9e885c614bc.jpg"
                alt="Emma"
              />
            </Avatar>
            <span className="text-sm font-medium text-foreground">Emma</span>
            <div className="flex items-center text-xs text-green-600">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
              Active now
            </div>
          </div>
          <button className="text-primary">
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-lg" />
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
                    src="https://public.readdy.ai/ai/img_res/f814f61b1b887b5bf24883be563d4aa3.jpg"
                    alt="Emma"
                  />
                </Avatar>
              )}
              <div className={`max-w-[70%]`}>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.isAi 
                      ? "bg-card text-card-foreground" 
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <pre className="text-sm whitespace-pre-wrap break-words font-sans">{message.text}</pre>
                </div>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <span>{message.time}</span>
                  {!message.isAi && (
                    <span className="ml-2">
                      <FontAwesomeIcon icon={faCheckDouble} />
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
                  src="https://public.readdy.ai/ai/img_res/f33126d2f9dfaf35e5014589fd079fa7.jpg"
                  alt="Emma"
                />
              </Avatar>
              <div className="bg-card px-4 py-2 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      <div className="fixed bottom-[var(--nav-height)] w-full bg-background border-t border-border p-4">
        <div className="flex items-end gap-2">
          <button className="text-primary">
            <FontAwesomeIcon icon={faImage} className="text-xl" />
          </button>
          <button className="text-primary">
            <FontAwesomeIcon icon={faMicrophone} className="text-xl" />
          </button>
          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <button className="text-primary">
                <FontAwesomeIcon icon={faFaceSmile} className="text-xl" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="grid grid-cols-6 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    className="text-2xl hover:bg-accent p-1 rounded cursor-pointer"
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
            className={`bg-primary hover:bg-primary/90 text-primary-foreground !rounded-button ${
              !inputMessage.trim() && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!inputMessage.trim()}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 w-full bg-background border-t border-border px-4 py-2 bottom-nav">
        <div className="grid grid-cols-4 gap-4">
          <a href="/" data-readdy="true" className="flex flex-col items-center">
            <FontAwesomeIcon icon={faHouse} className="text-muted-foreground" />
            <span className="text-xs mt-1 text-muted-foreground">Home</span>
          </a>
          <button className="flex flex-col items-center">
            <FontAwesomeIcon icon={faComment} className="text-primary" />
            <span className="text-xs mt-1 text-primary">Chat</span>
          </button>
          <button className="flex flex-col items-center">
            <FontAwesomeIcon icon={faHeart} className="text-muted-foreground" />
            <span className="text-xs mt-1 text-muted-foreground">Activities</span>
          </button>
          <button className="flex flex-col items-center">
            <FontAwesomeIcon icon={faUser} className="text-muted-foreground" />
            <span className="text-xs mt-1 text-muted-foreground">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
