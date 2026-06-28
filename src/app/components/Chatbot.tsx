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

  // Tic Tac Toe states
  const [gameMode, setGameMode] = useState<"none" | "tictactoe">("none");
  const [tttBoard, setTttBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isTttUserTurn, setIsTttUserTurn] = useState(true);
  const [tttStatus, setTttStatus] = useState<"playing" | "win-user" | "win-bot" | "draw">("playing");
  const [tttScore, setTttScore] = useState({ user: 0, bot: 0 });

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

  // Tic Tac Toe Win checking logic
  const checkTttWinner = (board: (string | null)[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6],             // diagonals
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

  // Smart Tic Tac Toe Bot choice
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

    // 3. Take center (best position)
    if (board[4] === null) return 4;

    // 4. Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((idx) => board[idx] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // 5. Take whatever is left
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  const handleTttClick = (idx: number) => {
    if (tttBoard[idx] !== null || !isTttUserTurn || tttStatus !== "playing") return;

    // 1. User turn (X)
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

    // 2. Bot turn (O)
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
    }, 600);
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
        text: `GG! The final Tic Tac Toe score was - You: ${tttScore.user} | Cat Bot: ${tttScore.bot}. What would you like to do next?`,
      },
    ]);
    setCurrentReplies([
      "Skills 🛠️",
      "Projects 📁",
      "Play a game! 🎮",
      "Get in touch 🔗",
      "Burger & milk tea? 🍔",
    ]);
  };

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

      // Handle Game Selection Flow
      if (replyKey === "Play a game! 🎮") {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: "Oh, you want to test your luck and skills? 👾 Which game would you like to play?",
          },
        ]);
        setCurrentReplies(["Rock Paper Scissors 🪨", "Tic Tac Toe ❌⭕", "Back to Start 🔄"]);
      }
      // ROCK PAPER SCISSORS FLOW
      else if (replyKey === "Rock Paper Scissors 🪨") {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: "Alright! Let's play Rock Paper Scissors! Choose your weapon below:",
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
            text: `GG! The final Rock Paper Scissors score was - You: ${score.user} | Me: ${score.bot}. What would you like to do next?`,
          },
        ]);
        setCurrentReplies([
          "Skills 🛠️",
          "Projects 📁",
          "Play a game! 🎮",
          "Get in touch 🔗",
          "Burger & milk tea? 🍔",
        ]);
      }
      // TIC TAC TOE TRIGGER FLOW
      else if (replyKey === "Tic Tac Toe ❌⭕") {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: "Initializing Tic Tac Toe board below... Beat me if you can! 😼",
          },
        ]);
        setGameMode("tictactoe");
        resetTttGame();
      }
      // STANDARD FAQ FLOW
      else {
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
                  <p className="text-[11px] text-zinc-400">Online & ready to play</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Area */}
            {gameMode === "tictactoe" ? (
              // Tic Tac Toe Game Interface
              <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-5 bg-[#050510]/50">
                <div className="text-center">
                  <h4 className="text-white text-base font-semibold">Tic Tac Toe</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {tttStatus === "playing" ? (
                      isTttUserTurn ? (
                        <span className="text-violet-300">Your Turn (❌)</span>
                      ) : (
                        <span className="text-cyan-300">Cat Bot is thinking... (⭕)</span>
                      )
                    ) : tttStatus === "win-user" ? (
                      <span className="text-green-400 font-medium">You Win! 🎉</span>
                    ) : tttStatus === "win-bot" ? (
                      <span className="text-red-400 font-medium">Cat Bot Wins! 😈</span>
                    ) : (
                      <span className="text-zinc-300">It's a draw! 🤝</span>
                    )}
                  </p>
                </div>

                {/* 3x3 Grid */}
                <div className="grid grid-cols-3 gap-2.5 w-52 h-52">
                  {tttBoard.map((val, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTttClick(idx)}
                      disabled={val !== null || !isTttUserTurn || tttStatus !== "playing"}
                      className={`w-16 h-16 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-2xl font-bold transition-all focus:outline-none ${
                        val === null && isTttUserTurn && tttStatus === "playing"
                          ? "hover:bg-white/15 hover:border-violet-500/50 cursor-pointer active:scale-95"
                          : "cursor-default"
                      } ${
                        val === "X"
                          ? "text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]"
                          : "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                      }`}
                    >
                      {val === "X" ? "❌" : val === "O" ? "⭕" : ""}
                    </button>
                  ))}
                </div>

                {/* Score */}
                <div className="text-xs text-zinc-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
                  🏆 Score — You: <span className="text-violet-400 font-semibold">{tttScore.user}</span> | Me: <span className="text-cyan-400 font-semibold">{tttScore.bot}</span>
                </div>

                {/* Control Actions */}
                <div className="flex gap-2">
                  {tttStatus !== "playing" && (
                    <button
                      onClick={resetTttGame}
                      className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 transition-all active:scale-95 cursor-pointer"
                    >
                      Play Again 🔄
                    </button>
                  )}
                  <button
                    onClick={exitTttGame}
                    className="px-4 py-2 rounded-full text-xs font-semibold border border-white/15 bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 cursor-pointer"
                  >
                    Exit Game 🚪
                  </button>
                </div>
              </div>
            ) : (
              // Standard Messages and Chats list
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-br-none shadow-md"
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
                            className="px-3 py-1.5 rounded-full text-xs font-medium border border-violet-500/20 bg-violet-500/5 text-violet-300 hover:bg-violet-500/15 hover:border-violet-500/40 transition-all active:scale-95 cursor-pointer"
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
      <div className="relative">
        {/* Animated pulse rings (only when closed) */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 opacity-30 animate-ping" />
            <span
              className="absolute inset-[-4px] rounded-full border-2 border-violet-500/40 animate-pulse"
            />
          </>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(139,92,246,0.5)] border-2 border-white/20 focus:outline-none hover:shadow-[0_4px_35px_rgba(139,92,246,0.8)] transition-shadow cursor-pointer overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="cat"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src="/favicon.png"
                  alt="Chat"
                  className="w-full h-full object-cover absolute inset-0 rounded-full"
                />
                <MessageSquare className="w-5 h-5 relative z-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Notification dot — outside button to avoid overflow-hidden clipping */}
        {!isOpen && (
          <span className="absolute top-0 right-0 z-10 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#050510] shadow-[0_0_6px_rgba(74,222,128,0.6)] pointer-events-none" />
        )}
      </div>
    </div>
  );
}
