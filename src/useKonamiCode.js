import { useState, useEffect } from "react";

export const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];

export default function useKonamiCode() {
  const [rightSequence, setRightSequence] = useState(false);
  const [sequence, setSequence] = useState([]);
  
  const onKeyDown = event => setSequence(prev => [...prev, event.key]);

  useEffect(() => {
    sequence.forEach((key, i) => {
      if(key !== konamiSequence[i]) {
        setSequence([]);
      }
    });

    if(sequence.toString() === konamiSequence.toString()) {
      setRightSequence(true);
    }
  }, [sequence]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    
    return () => window.addEventListener("keydown", onKeyDown);
  });

  return {sequence, rightSequence};
};
