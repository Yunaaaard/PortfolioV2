import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

interface QuickReply {
  label: string;
  response: string;
  nextReplies?: string[];
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hello! I am Leonard's cosmic assistant (guided by the legendary burger cat 🐾). What would you like to know about him?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [score, setScore] = useState({ user: 0, bot: 0 });
  const [currentReplies, setCurrentReplies] = useState<string[]>([
    "Skills 🛠️",
    "Projects 📁",
    "Play a game! 🎮",
    "Get in touch 🔗",
    "Burger & milk tea? 🍔",
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickRepliesMap: Record<string, QuickReply> = {
    "Skills 🛠️": {
      label: "Skills 🛠️",
      response: "Leonard is a Software Engineer specializing in modern frontend and full-stack systems. He loves working with React, TypeScript, Vite, Tailwind CSS, and Node.js. He also has solid foundations in OOP, Java, and Machine Learning!",
      nextReplies: ["Projects 📁", "Play a game! 🎮", "Get in touch 🔗", "Back to Start 🔄"],
    },
    "Projects 📁": {
      label: "Projects 📁",
      response: "He has built several awesome apps! Notable ones include: a PACMAN game integrated with Machine Learning (Java), EcoFarm, Cofinoy, and this very portfolio! Scroll down to the Projects section to view live GitHub links.",
      nextReplies: ["Skills 🛠️", "Play a game! 🎮", "Get in touch 🔗", "Back to Start 🔄"],
    },
    "Get in touch 🔗": {
      label: "Get in touch 🔗",
      response: "You can reach out to Leonard directly using the Contact Form on this page! Alternatively, email him at tarimanleonard28@gmail.com, or check out his Github/LinkedIn links in the footer.",
      nextReplies: ["Skills 🛠️", "Projects 📁", "Play a game! 🎮", "Back to Start 🔄"],
    },
    "Burger & milk tea? 🍔": {
      label: "Burger & milk tea? 🍔",
      response: "Ah, yes! 'Milkte, borjer at chaka frays' (Milk tea, burger, and chocolate fries) is Leonard's ultimate developer fuel. Legend has it that consuming these increases his programming speed by 400%!",
      nextReplies: ["Skills 🛠️", "Play a game! 🎮", "Get in touch 🔗", "Back to Start 🔄"],
    },
    "Back to Start 🔄": {
      label: "Back to Start 🔄",
      response: "Sure, let's start over! What else can I help you find?",
      nextReplies: ["Skills 🛠️", "Projects 📁", "Play a game! 🎮", "Get in touch 🔗", "Burger & milk tea? 🍔"],
    },
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleReplyClick = (replyKey: string) => {
    // Add user message
    const userMsgId = Math.random().toString(36).substring(7);
    setMessages((prev) => [...prev, { id: userMsgId, sender: "user", text: replyKey }]);
    setShowReplies(false);

    // Simulate typing delay
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsgId = Math.random().toString(36).substring(7);

      // Handle RPS mini-game choices
      if (replyKey === "Play a game! 🎮") {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: "Awesome! Let's play Rock Paper Scissors! 🪨 📄 ✂️ Choose your weapon:",
          },
        ]);
        setCurrentReplies(["Rock 🪨", "Paper 📄", "Scissors ✂️", "Exit Game 🚪"]);
      } else if (
        replyKey === "Rock 🪨" ||
        replyKey === "Paper 📄" ||
        replyKey === "Scissors ✂️"
      ) {
        const weapons = ["Rock 🪨", "Paper 📄", "Scissors ✂️"];
        const userChoice = replyKey.split(" ")[0]; // "Rock", "Paper", "Scissors"
        const botWeapon = weapons[Math.floor(Math.random() * weapons.length)];
        const botChoice = botWeapon.split(" ")[0];

        let result = "";
        let newScore = { ...score };

        if (userChoice === botChoice) {
          result = `It's a draw! 🤝 We both chose ${botWeapon}.`;
        } else if (
          (userChoice === "Rock" && botChoice === "Scissors") ||
          (userChoice === "Paper" && botChoice === "Rock") ||
          (userChoice === "Scissors" && botChoice === "Paper")
        ) {
          newScore.user += 1;
          result = `You win! 🎉 You chose ${replyKey} and I chose ${botWeapon}.`;
        } else {
          newScore.bot += 1;
          result = `I win! 😈 You chose ${replyKey} and I chose ${botWeapon}.`;
        }

        setScore(newScore);
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: `${result}\n\n🏆 Score - You: ${newScore.user} | Me: ${newScore.bot}`,
          },
        ]);
        setCurrentReplies([
          "Rock 🪨",
          "Paper 📄",
          "Scissors ✂️",
          "Reset Score 🔄",
          "Exit Game 🚪",
        ]);
      } else if (replyKey === "Reset Score 🔄") {
        setScore({ user: 0, bot: 0 });
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: "Score reset to 0 - 0! Let's go again. Choose your weapon:",
          },
        ]);
        setCurrentReplies(["Rock 🪨", "Paper 📄", "Scissors ✂️", "Exit Game 🚪"]);
      } else if (replyKey === "Exit Game 🚪") {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: `GG! The final score was - You: ${score.user} | Me: ${score.bot}. What would you like to know next?`,
          },
        ]);
        setCurrentReplies([
          "Skills 🛠️",
          "Projects 📁",
          "Play a game! 🎮",
          "Get in touch 🔗",
          "Burger & milk tea? 🍔",
        ]);
      } else {
        // Standard FAQ flow
        const data = quickRepliesMap[replyKey];
        if (data) {
          setMessages((prev) => [...prev, { id: botMsgId, sender: "bot", text: data.response }]);
          if (data.nextReplies) {
            setCurrentReplies(data.nextReplies);
          }
        }
      }

      setShowReplies(true);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[90vw] sm:w-[380px] h-[500px] rounded-2xl border border-white/10 bg-[#070715]/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-violet-950/40 via-fuchsia-950/40 to-cyan-950/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/favicon.png"
                    alt="Cat Assistant"
                    className="w-10 h-10 rounded-full object-cover border border-violet-500/40"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#070715]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-white text-sm">Yunaaaard's Bot</h3>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-zinc-400">Online & ready to meow</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-br-none"
                        : "bg-white/5 border border-white/10 text-zinc-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies footer */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <AnimatePresence>
                {showReplies && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex flex-wrap gap-2"
                  >
                    {currentReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => handleReplyClick(reply)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border border-violet-500/20 bg-violet-500/5 text-violet-300 hover:bg-violet-500/15 hover:border-violet-500/40 transition-all active:scale-95"
                      >
                        {reply}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] border border-white/15 focus:outline-none hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
