import { useEffect } from "react";

export default function useKonamiCode() {
  let sequence = [];
  
  const onKeyDown = event => sequence.push(event.key);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    
    return () => window.addEventListener("keydown", onKeyDown);
  });

  return {sequence};
};
