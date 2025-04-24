"use client";
// EnhancedCongratulationsPage.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EnhancedCongratulationsPage: React.FC = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti effect shortly after initial load
    const confettiTimer = setTimeout(() => {
      setShowConfetti(true);
    }, 300);

    // Set animation complete after delay to trigger text animation
    const textTimer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 1800);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(textTimer);
    };
  }, []);

  // Coin animation variants
  const coinVariants = (index: number) => ({
    hidden: { y: 0, x: 0, scale: 0, opacity: 0 },
    visible: {
      y: [-40, 20],
      x: index % 2 === 0 ? [-20, 20] : [20, -20],
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        times: [0, 0.6, 1],
        delay: 0.2 + index * 0.1,
        ease: "easeOut",
      },
    },
  });

  // Circle scale animation
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Tick animation variants - more dynamic with bouncy finish
  const tickVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        bounce: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Confetti colors based on app theme
  const confettiColors = ["#10b981", "#3b82f6", "#f59e0b", "#f43f5e"];

  // Generate confetti elements
  const renderConfetti = () => {
    if (!showConfetti) return null;

    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 10 + 5;
      const color =
        confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${Math.random() * 3 + 2}s`;
      const delay = `${Math.random() * 0.5}s`;

      return (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
            top: "-20px",
            left,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            rotate: Math.random() > 0.5 ? 360 : -360,
          }}
          transition={{
            duration: parseInt(animationDuration),
            delay: parseFloat(delay),
            ease: "linear",
          }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 overflow-hidden relative">
      {/* Confetti effect */}
      {renderConfetti()}

      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center relative z-20">
        {/* Green circle with tick animation */}
        <div className="mx-auto relative w-40 h-40 mb-8">
          <motion.div
            className="absolute inset-0 bg-emerald-500 rounded-full flex items-center justify-center"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.svg
              className="w-24 h-24 text-white"
              viewBox="0 0 24 24"
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d="M5 13l4 4L19 7"
                fill="transparent"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={tickVariants}
              />
            </motion.svg>
          </motion.div>

          {/* Floating coins effect */}
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                width: 24,
                height: 24,
                top: "50%",
                left: "50%",
                marginLeft: -12,
                marginTop: -12,
              }}
              variants={coinVariants(index)}
              initial="hidden"
              animate="visible"
            >
              <div className="w-full h-full bg-yellow-400 rounded-full flex items-center justify-center border-2 border-yellow-500">
                <span className="text-xs font-bold text-yellow-800">$</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success text with animated reveal */}
        <motion.div
          initial="hidden"
          animate={isAnimationComplete ? "visible" : "hidden"}
          variants={textVariants}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            All dues cleared!
          </h1>
          <p className="text-gray-600 mb-6">
            You&apos;re all squared up! Your friends will be thrilled.
          </p>

          {/* Fun metrics */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Total saved:</span>
              <motion.span
                className="font-medium text-emerald-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                ₹0 in awkward reminders
              </motion.span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Friendship status:</span>
              <motion.span
                className="font-medium text-emerald-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                Rock solid 🤝
              </motion.span>
            </div>
          </div>

          {/* Action buttons with subtle animations */}
          <div className="space-y-3">
            <motion.button
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "/home")}
            >
              Back to Dashboard
            </motion.button>
            <motion.button
              className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "/add-expense")}
            >
              Start New Split
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedCongratulationsPage;
