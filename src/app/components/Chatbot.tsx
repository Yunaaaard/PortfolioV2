import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Bot, Sparkles, Terminal } from "lucide-react";
import assistantAvatar from "../assets/images/yunard-pogi.jpg";

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
      text: "Hello! I am Leonard's portfolio assistant. What would you like to explore about his background, technical stack, or projects?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [score, setScore] = useState({ user: 0, bot: 0 });
  const [currentReplies, setCurrentReplies] = useState<string[]>([
    "Technical Skills 🛠️",
    "Featured Projects 📁",
    "Get in Touch 🔗",
    "Background & Bio 👤",
    "Interactive Game 🎮",
  ]);

  // Tic Tac Toe states
  const [gameMode, setGameMode] = useState<"none" | "tictactoe">("none");
  const [tttBoard, setTttBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isTttUserTurn, setIsTttUserTurn] = useState(true);
  const [tttStatus, setTttStatus] = useState<"playing" | "win-user" | "win-bot" | "draw">("playing");
  const [tttScore, setTttScore] = useState({ user: 0, bot: 0 });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickRepliesMap: Record<string, QuickReply> = {
    "Technical Skills 🛠️": {
      label: "Technical Skills 🛠️",
      response: "Leonard is a Software Developer specializing in modern frontend and full-stack architecture. His core toolkit includes React, TypeScript, Flutter, Dart, C#, .NET, Node.js, and SQL/NoSQL databases. He focuses on scalable systems and high-performance user interfaces.",
      nextReplies: ["Featured Projects 📁", "Background & Bio 👤", "Get in Touch 🔗", "Back to Menu 🔄"],
    },
    "Featured Projects 📁": {
      label: "Featured Projects 📁",
      response: "Key projects include EcoFarmAI (an AI-powered agricultural suitability tool with TensorFlow), Scholarly (scholarship management portal with Laravel), Cofinoy (E-Commerce coffee platform with .NET & React), SCart (smart retail budget cart with Flutter & Dart), and PACMAN ML (Java OOP game with machine learning heuristics).",
      nextReplies: ["Technical Skills 🛠️", "Get in Touch 🔗", "Interactive Game 🎮", "Back to Menu 🔄"],
    },
    "Background & Bio 👤": {
      label: "Background & Bio 👤",
      response: "Leonard holds a Bachelor of Science in Information Technology and is based in Cebu City, Philippines. He is passionate about software engineering, system design, and building resilient applications that solve real-world problems.",
      nextReplies: ["Technical Skills 🛠️", "Featured Projects 📁", "Get in Touch 🔗", "Back to Menu 🔄"],
    },
    "Get in Touch 🔗": {
      label: "Get in Touch 🔗",
      response: "You can reach Leonard directly via the Contact Form on this site, by email at tarimanleonard28@gmail.com, or through his GitHub and LinkedIn profiles.",
      nextReplies: ["Technical Skills 🛠️", "Featured Projects 📁", "Back to Menu 🔄"],
    },
    "Back to Menu 🔄": {
      label: "Back to Menu 🔄",
      response: "What would you like to explore next?",
      nextReplies: ["Technical Skills 🛠️", "Featured Projects 📁", "Get in Touch 🔗", "Background & Bio 👤", "Interactive Game 🎮"],
    },
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const checkTttWinner = (board: (string | null)[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== null)) {
      return "draw";
    }
    return null;
  };

  const getBotMove = (board: (string | null)[]) => {
    const emptyIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];

    // 1. Check if bot ("O") can win
    for (const idx of emptyIndices) {
      const testBoard = [...board];
      testBoard[idx] = "O";
      if (checkTttWinner(testBoard) === "O") return idx;
    }

    // 2. Check if user ("X") can win to block
    for (const idx of emptyIndices) {
      const testBoard = [...board];
      testBoard[idx] = "X";
      if (checkTttWinner(testBoard) === "X") return idx;
    }

    // 3. Take center
    if (board[4] === null) return 4;

    // 4. Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((idx) => board[idx] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // 5. Random empty
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  const handleTttClick = (idx: number) => {
    if (tttBoard[idx] !== null || !isTttUserTurn || tttStatus !== "playing") return;

    const newBoard = [...tttBoard];
    newBoard[idx] = "X";
    setTttBoard(newBoard);

    const winner = checkTttWinner(newBoard);
    if (winner === "X") {
      setTttStatus("win-user");
      setTttScore((prev) => ({ ...prev, user: prev.user + 1 }));
      return;
    } else if (winner === "draw") {
      setTttStatus("draw");
      return;
    }

    setIsTttUserTurn(false);
    setTimeout(() => {
      const botIdx = getBotMove(newBoard);
      if (botIdx !== undefined) {
        newBoard[botIdx] = "O";
        setTttBoard(newBoard);

        const botWinner = checkTttWinner(newBoard);
        if (botWinner === "O") {
          setTttStatus("win-bot");
          setTttScore((prev) => ({ ...prev, bot: prev.bot + 1 }));
        } else if (botWinner === "draw") {
          setTttStatus("draw");
        } else {
          setIsTttUserTurn(true);
        }
      }
    }, 500);
  };

  const resetTttGame = () => {
    setTttBoard(Array(9).fill(null));
    setIsTttUserTurn(true);
    setTttStatus("playing");
  };

  const exitTttGame = () => {
    setGameMode("none");
    const botMsgId = Math.random().toString(36).substring(7);
    setMessages((prev) => [
      ...prev,
      {
        id: botMsgId,
        sender: "bot",
        text: `Game finished! Score — You: ${tttScore.user} | Assistant: ${tttScore.bot}. What would you like to explore next?`,
      },
    ]);
    setCurrentReplies([
      "Technical Skills 🛠️",
      "Featured Projects 📁",
      "Get in Touch 🔗",
      "Background & Bio 👤",
      "Interactive Game 🎮",
    ]);
  };

  const handleReplyClick = (replyKey: string) => {
    const userMsgId = Math.random().toString(36).substring(7);
    setMessages((prev) => [...prev, { id: userMsgId, sender: "user", text: replyKey }]);
    setShowReplies(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsgId = Math.random().toString(36).substring(7);

      if (replyKey === "Interactive Game 🎮") {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: "Choose a quick minigame to play:",
          },
        ]);
        setCurrentReplies(["Rock Paper Scissors 🪨", "Tic Tac Toe ❌⭕", "Back to Menu 🔄"]);
      } else if (replyKey === "Rock Paper Scissors 🪨") {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: "Rock Paper Scissors: Select your move below:",
          },
        ]);
        setCurrentReplies(["Rock 🪨", "Paper 📄", "Scissors ✂️", "Exit Game 🚪"]);
      } else if (
        replyKey === "Rock 🪨" ||
        replyKey === "Paper 📄" ||
        replyKey === "Scissors ✂️"
      ) {
        const weapons = ["Rock 🪨", "Paper 📄", "Scissors ✂️"];
        const userChoice = replyKey.split(" ")[0];
        const botWeapon = weapons[Math.floor(Math.random() * weapons.length)];
        const botChoice = botWeapon.split(" ")[0];

        let result = "";
        let newScore = { ...score };

        if (userChoice === botChoice) {
          result = `It's a tie! Both chose ${botWeapon}.`;
        } else if (
          (userChoice === "Rock" && botChoice === "Scissors") ||
          (userChoice === "Paper" && botChoice === "Rock") ||
          (userChoice === "Scissors" && botChoice === "Paper")
        ) {
          newScore.user += 1;
          result = `You won the round! You chose ${replyKey} and I chose ${botWeapon}.`;
        } else {
          newScore.bot += 1;
          result = `I won this round! You chose ${replyKey} and I chose ${botWeapon}.`;
        }

        setScore(newScore);
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: `${result}\n\nScore — You: ${newScore.user} | Assistant: ${newScore.bot}`,
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
            text: "Score reset to 0 - 0. Choose your next move:",
          },
        ]);
        setCurrentReplies(["Rock 🪨", "Paper 📄", "Scissors ✂️", "Exit Game 🚪"]);
      } else if (replyKey === "Exit Game 🚪") {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: `Game ended. Final score: You: ${score.user} | Assistant: ${score.bot}. What would you like to explore next?`,
          },
        ]);
        setCurrentReplies([
          "Technical Skills 🛠️",
          "Featured Projects 📁",
          "Get in Touch 🔗",
          "Background & Bio 👤",
          "Interactive Game 🎮",
        ]);
      } else if (replyKey === "Tic Tac Toe ❌⭕") {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: "Tic Tac Toe initiated below. You play as ❌. Your turn:",
          },
        ]);
        setGameMode("tictactoe");
        resetTttGame();
      } else {
        const data = quickRepliesMap[replyKey];
        if (data) {
          setMessages((prev) => [...prev, { id: botMsgId, sender: "bot", text: data.response }]);
          if (data.nextReplies) {
            setCurrentReplies(data.nextReplies);
          }
        }
      }

      setShowReplies(true);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-[90vw] sm:w-[380px] h-[520px] rounded-2xl border border-white/10 bg-[#0c0e15]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/[0.08] bg-zinc-900/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-zinc-800 flex items-center justify-center">
                    <img src={assistantAvatar} alt="Leonard's Assistant" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0c0e15]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Portfolio Assistant</h3>
                  <p className="text-[11px] text-zinc-400 font-mono">Interactive Guide</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Area */}
            {gameMode === "tictactoe" ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4 bg-zinc-950/40">
                <div className="text-center">
                  <h4 className="text-white text-sm font-semibold">Tic Tac Toe</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {tttStatus === "playing" ? (
                      isTttUserTurn ? (
                        <span className="text-indigo-300">Your Turn (❌)</span>
                      ) : (
                        <span className="text-zinc-400">Assistant is computing... (⭕)</span>
                      )
                    ) : tttStatus === "win-user" ? (
                      <span className="text-emerald-400 font-medium">You Win! 🎉</span>
                    ) : tttStatus === "win-bot" ? (
                      <span className="text-rose-400 font-medium">Assistant Wins!</span>
                    ) : (
                      <span className="text-zinc-300">Game ended in a draw.</span>
                    )}
                  </p>
                </div>

                {/* 3x3 Grid */}
                <div className="grid grid-cols-3 gap-2 w-48 h-48">
                  {tttBoard.map((val, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTttClick(idx)}
                      disabled={val !== null || !isTttUserTurn || tttStatus !== "playing"}
                      className={`w-14 h-14 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-xl font-bold transition-all ${
                        val === null && isTttUserTurn && tttStatus === "playing"
                          ? "hover:bg-white/[0.08] hover:border-white/20 cursor-pointer active:scale-95"
                          : "cursor-default"
                      } ${val === "X" ? "text-indigo-400" : "text-zinc-300"}`}
                    >
                      {val === "X" ? "✕" : val === "O" ? "○" : ""}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-zinc-400 font-mono bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full">
                  Score — You: <span className="text-white font-semibold">{tttScore.user}</span> | Bot: <span className="text-white font-semibold">{tttScore.bot}</span>
                </div>

                <div className="flex gap-2">
                  {tttStatus !== "playing" && (
                    <button
                      onClick={resetTttGame}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                      Play Again
                    </button>
                  )}
                  <button
                    onClick={exitTttGame}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    Exit Game
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-white text-zinc-950 font-medium rounded-br-none"
                            : "bg-zinc-900 border border-white/[0.08] text-zinc-200 rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-900 border border-white/[0.08] rounded-xl rounded-bl-none px-3.5 py-2.5 flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Action Chips */}
                <div className="p-3 border-t border-white/[0.08] bg-zinc-950/60">
                  <AnimatePresence>
                    {showReplies && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-wrap gap-1.5"
                      >
                        {currentReplies.map((reply) => (
                          <button
                            key={reply}
                            onClick={() => handleReplyClick(reply)}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                          >
                            {reply}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 rounded-xl bg-zinc-900 border border-white/15 text-white flex items-center justify-center shadow-xl hover:bg-zinc-800 transition-colors cursor-pointer"
        aria-label="Toggle portfolio assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5 text-zinc-300" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
