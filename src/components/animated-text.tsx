import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  animateOnMount?: boolean;
}

export function AnimatedText({ text, className = '', animateOnMount = true }: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState(animateOnMount ? '' : text);
  const [isAnimating, setIsAnimating] = useState(animateOnMount);

  useEffect(() => {
    if (!animateOnMount) return;

    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const targetText = text;
    let iterations = 0;
    
    const interval = setInterval(() => {
      setDisplayText(targetText
        .split('')
        .map((char, index) => {
          if (index < iterations) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join(''));
      
      if (iterations >= targetText.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
      
      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, animateOnMount]);

  return (
    <span className={`${className} ${isAnimating ? 'animate-pulse' : ''}`}>
      {displayText}
    </span>
  );
}