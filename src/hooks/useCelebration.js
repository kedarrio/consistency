import confetti from 'canvas-confetti';

export const useCelebration = () => {
  const triggerConfetti = (duration = 3000) => {
    const end = Date.now() + duration;
    
    // Custom colors from tokens.json
    const colors = ['#DB8686', '#C9B5E6', '#8686A8', '#E69A9A', '#E6D5C9', '#B5C9B5', '#9AC4D4', '#E6D89A', '#9AB5D4'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return { triggerConfetti };
};
