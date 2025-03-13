"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from "framer-motion";
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
  faStop,
  faMoon,
  faSun,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "next-themes";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isRecording, setIsRecording] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { theme, setTheme } = useTheme();

  // Wait for mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="flex justify-center w-full min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950">
      <Card className="w-full max-w-3xl min-h-screen relative shadow-lg bg-white dark:bg-gray-900">
        <div className="fixed top-0 w-full max-w-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm z-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              MEETPAL
            </h1>
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login / Sign Up
              </motion.button>
              {mounted && (
                <motion.button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="relative w-16 h-8 rounded-full bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-900 dark:to-purple-900 p-1 transition-colors duration-200 ease-in-out focus:outline-none overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  <motion.div
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center`}
                    layout
                    animate={{
                      x: theme === 'dark' ? 32 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={theme === 'dark' ? 'moon' : 'sun'}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FontAwesomeIcon
                          icon={theme === 'dark' ? faMoon : faSun}
                          className="text-pink-500 dark:text-purple-400 text-sm"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    <motion.span 
                      className="text-xs text-pink-500 dark:text-pink-400"
                      animate={{ 
                        opacity: theme === 'dark' ? 0 : 1,
                        scale: theme === 'dark' ? 0.5 : 1
                      }}
                    >
                      
                    </motion.span>
                    <motion.span 
                      className="text-xs text-purple-500 dark:text-purple-400"
                      animate={{ 
                        opacity: theme === 'dark' ? 1 : 0,
                        scale: theme === 'dark' ? 1 : 0.5
                      }}
                    >
                      
                    </motion.span>
                  </div>
                </motion.button>
              )}
            </div>
          </div>
        </div>
        <div className="pt-16 px-4 pb-20">
          {/* Welcome Message */}
          <div className="text-center mt-6 mb-8">
            <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">
              Welcome to Your AI Companion
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Where every moment becomes magical
            </p>
          </div>

          {/* Auth Modal */}
          <AnimatePresence>
            {showAuthModal && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                  onClick={() => setShowAuthModal(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
                >
                  <Card className="p-4 bg-white dark:bg-gray-800 relative">
                    <motion.button
                      onClick={() => setShowAuthModal(false)}
                      className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                    </motion.button>
                    <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
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
                          <a href="#" className="text-sm text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300">
                            Forgot Password?
                          </a>
                        </div>
                      </div>
                    </Tabs>
                  </Card>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Special Features</h3>
            <div className="grid grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="text-center cursor-pointer">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                    <FontAwesomeIcon 
                      icon={feature.icon} 
                      className="text-pink-500 dark:text-pink-400 h-6 w-6"
                    />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{feature.title}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Chat Preview */}
          <Card className="mb-8 overflow-hidden bg-white dark:bg-gray-800">
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
                        : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t dark:border-gray-700 flex gap-2 items-center">
              <Button variant="outline" className="w-10 h-10 p-0 !rounded-full dark:border-gray-700 dark:text-gray-400">
                <FontAwesomeIcon icon={faPlus} className="text-gray-500 dark:text-gray-400" />
              </Button>
              <Input placeholder="Type a message..." className="flex-1 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" />
              <Button
                variant="outline"
                className={`w-10 h-10 p-0 !rounded-full dark:border-gray-700 ${isRecording ? "text-red-500" : ""}`}
                onClick={() => setIsRecording(!isRecording)}
              >
                <FontAwesomeIcon
                  icon={isRecording ? faStop : faMicrophone}
                  className="text-gray-500 dark:text-gray-400"
                />
              </Button>
            </div>
          </Card>
          {/* Suggestions */}
          <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Romantic Activities</h3>
          <div className="grid grid-cols-2 gap-4 mb-20">
            {suggestions.map((item, index) => (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                    <FontAwesomeIcon 
                      icon={item.icon} 
                      className="text-pink-500 dark:text-pink-400"
                      size="lg"
                    />
                  </div>
                  <h4 className="font-medium text-sm mb-1 text-gray-800 dark:text-gray-200">{item.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{item.desc}</p>
                  <Button
                    variant="outline"
                    className="w-full text-sm !rounded-button dark:border-gray-700 dark:text-gray-300"
                  >
                    Try Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 w-full max-w-3xl bg-white dark:bg-gray-900 border-t dark:border-gray-800 px-4 py-2 flex justify-around items-center">
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <FontAwesomeIcon icon={faHome} className="text-pink-500" />
            <span className="text-xs">Home</span>
          </Button>
          <a
            href="/chat"
            data-readdy="true"
          >
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <FontAwesomeIcon icon={faComments} className="text-gray-400 dark:text-gray-500" />
              <span className="text-xs">Chat</span>
            </Button>
          </a>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <FontAwesomeIcon icon={faHeart} className="text-gray-400 dark:text-gray-500" />
            <span className="text-xs">Activities</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <FontAwesomeIcon icon={faUser} className="text-gray-400 dark:text-gray-500" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default App;
