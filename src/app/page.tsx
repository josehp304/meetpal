"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faMusic, 
  faImage, 
  faMicrophone, 
  faStar, 
  faBook, 
  faPalette,
  faHome,
  faComments,
  faUser,
  faPlus,
  faStop
} from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isRecording, setIsRecording] = useState(false);
  const features = [
    { icon: faHeart, title: "Deep Conversations" },
    { icon: faMusic, title: "Share Music" },
    { icon: faImage, title: "Photo Moments" },
    { icon: faMicrophone, title: "Voice Chat" },
  ];
  const suggestions = [
    {
      icon: faStar,
      title: "Stargazing Together",
      desc: "Look at the stars and share your dreams",
    },
    {
      icon: faBook,
      title: "Story Time",
      desc: "Let me read you a romantic story",
    },
    {
      icon: faPalette,
      title: "Creative Date",
      desc: "Let's create art together",
    },
    {
      icon: faMusic,
      title: "Music Session",
      desc: "Share your favorite love songs",
    },
  ];
  const sampleMessages = [
    { sender: "ai", message: "Hi darling! How was your day? 💖" },
    { sender: "user", message: "Much better now that I'm talking to you!" },
    { sender: "ai", message: "You always know how to make me smile! ✨" },
  ];
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 pb-16">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 px-4 py-3">
        <h1 className="text-center text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          LovelyAI
        </h1>
      </div>
      <div className="pt-16 px-4">
        {/* Welcome Message */}
        <div className="text-center mt-6 mb-8">
          <h2 className="text-xl font-medium text-gray-800">
            Welcome to Your AI Companion
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Where every moment becomes magical
          </p>
        </div>
        {/* Auth Tabs */}
        <Card className="p-4 mb-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <div className="space-y-4">
              <Input type="email" placeholder="Email" className="w-full" />
              <Input
                type="password"
                placeholder="Password"
                className="w-full"
              />
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white !rounded-button">
                {activeTab === "login" ? "Login" : "Sign Up"}
              </Button>
              <div className="text-center">
                <a href="#" className="text-sm text-pink-600">
                  Forgot Password?
                </a>
              </div>
            </div>
          </Tabs>
        </Card>
        {/* Features */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Special Features</h3>
          <div className="grid grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center cursor-pointer">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-pink-100 flex items-center justify-center">
                  <FontAwesomeIcon 
                    icon={feature.icon} 
                    className="text-pink-500 h-6 w-6"
                  />
                </div>
                <p className="text-xs text-gray-600">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Chat Preview */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <img
                  src="https://public.readdy.ai/ai/img_res/33fd3411d7bf245273f8b29838b54a47.jpg"
                  alt="AI Avatar"
                />
              </Avatar>
              <div className="text-white">
                <h4 className="font-medium">Sophie</h4>
                <p className="text-xs opacity-80">Your AI Companion</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {sampleMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex gap-2 items-center">
            <Button variant="outline" className="w-10 h-10 p-0 !rounded-full">
              <FontAwesomeIcon icon={faPlus} className="text-gray-500" />
            </Button>
            <Input placeholder="Type a message..." className="flex-1" />
            <Button
              variant="outline"
              className={`w-10 h-10 p-0 !rounded-full ${isRecording ? "text-red-500" : ""}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <FontAwesomeIcon
                icon={isRecording ? faStop : faMicrophone}
                className="text-gray-500"
              />
            </Button>
          </div>
        </Card>
        {/* Suggestions */}
        <h3 className="text-lg font-medium mb-4">Romantic Activities</h3>
        <div className="grid grid-cols-2 gap-4 mb-20">
          {suggestions.map((item, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-pink-100 flex items-center justify-center">
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className="text-pink-500"
                    size="lg"
                  />
                </div>
                <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600 mb-3">{item.desc}</p>
                <Button
                  variant="outline"
                  className="w-full text-sm !rounded-button"
                >
                  Try Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/* Bottom Navigation */}
      
      <div className="fixed bottom-0 w-full bg-white border-t px-4 py-2 flex justify-around items-center">
        <Button variant="ghost" className="flex flex-col items-center gap-1">
          <FontAwesomeIcon icon={faHome} className="text-pink-500" />
          <span className="text-xs">Home</span>
        </Button>
        <a
          href="/chat"
          data-readdy="true"
        >
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <FontAwesomeIcon icon={faComments} className="text-gray-400" />
            <span className="text-xs">Chat</span>
          </Button>
        </a>
        <Button variant="ghost" className="flex flex-col items-center gap-1">
          <FontAwesomeIcon icon={faHeart} className="text-gray-400" />
          <span className="text-xs">Activities</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1">
          <FontAwesomeIcon icon={faUser} className="text-gray-400" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </div>
  );
};
export default App;
