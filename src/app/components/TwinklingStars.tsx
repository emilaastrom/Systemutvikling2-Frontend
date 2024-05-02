import { motion } from "framer-motion";

const TwinklingStars = () => {
  const numberOfStars = 500; // Number of stars
  const numberOfShootingStars = 0; // Number of shooting stars

  // Generate random coordinates for stars
  const generateRandomCoordinates = () => {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
  };

  // Generate shooting star animation settings
  const generateShootingStarAnimation = () => {
    const startY = Math.random() * window.innerHeight;
    return {
      initial: { x: -50, y: startY },
      animate: { x: window.innerWidth + 50, y: startY + 50 },
      transition: { duration: 1.2, ease: "linear", repeat: Infinity, repeatDelay: 1 }
    };
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
      {[...Array(numberOfStars)].map((_, index) => (
        <motion.div
          key={`star-${index}`}
          style={{
            position: "absolute",
            width: "2px",
            height: "2px",
            background: "#FFF",
            borderRadius: "50%",
            ...generateRandomCoordinates(),
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            transition: { duration: Math.random() * 1 + 0.5, repeat: Infinity }
          }}
        />
      ))}
      {[...Array(numberOfShootingStars)].map((_, index) => (
        <motion.div
          key={`shootingstar-${index}`}
          style={{
            position: "absolute",
            width: "6px",
            height: "1px",
            background: "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
            filter: "blur(2px)"
          }}
          {...generateShootingStarAnimation()}
        />
      ))}
    </div>
  );
};

export default TwinklingStars;
