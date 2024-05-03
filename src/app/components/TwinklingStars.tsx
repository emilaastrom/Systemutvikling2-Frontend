import { motion } from "framer-motion";

const TwinklingStars = () => {
    const numberOfStars = 250; // Number of twinkling stars
    const numberOfShootingStars = 2; // Number of shooting stars
    const numberOfClouds = 3; // Number of clouds

    // Generate random coordinates for stars
    const generateRandomCoordinates = () => {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 0.6,
        };
    };

    const generateShootingStarAnimation = () => {
        const startX = -50;
        const startY = Math.random() * window.innerHeight;

        const endX = window.innerWidth + 50;
        const midY =
            startY +
            (Math.random() * window.innerHeight - window.innerHeight / 5) * 0.1; // Mid-point Y to create a bow-like effect
        const endY = startY; // Ending at approximately the same vertical start position

        return {
            initial: { x: startX, y: startY },
            animate: {
                x: [startX, window.innerWidth / 2, endX], // Move through three points: start, mid-screen, and end
                y: [startY, midY, endY], // Start, highest/lowest point of the bow, and back to start level
            },
            transition: {
                duration: Math.random() * 1.5 + 1, // Duration between 1 to 2.5 seconds
                ease: "easeInOut", // Smoother easing might look better for a bow-like trajectory
                repeat: Infinity,
                repeatDelay: Math.random() * 2 + 10, // Delay before repeating
            },
        };
    };

    const generateCloudAnimation = () => {
      // Randomize the vertical start position across the entire height of the screen
      const startY = Math.random() * window.innerHeight*0.2;
    
      // Randomize the horizontal start position off the left side of the screen
      const startX = -200 - Math.random() * 100; // Starts offscreen to the left by at least 200px, with up to an additional 100px variation
    
      return {
        initial: { x: startX, y: startY },
        animate: { x: window.innerWidth + 200, y: startY + (Math.random() - 0.5) * 10 }, // Adds a slight random vertical drift during the movement
        transition: {
          duration: Math.random() * 10 + 40, // Duration between 40 to 50 seconds
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 0 // No delay between repetitions for a continuous flow of clouds
        }
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
                        transition: {
                            duration: Math.random() * 1 + 0.5,
                            repeat: Infinity,
                        },
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
                        background:
                            "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))",
                        filter: "blur(1px)",
                    }}
                    {...generateShootingStarAnimation()}
                />
            ))}
            {[...Array(numberOfClouds)].map((_, index) => (
                <motion.div
                    key={`cloud-${index}`}
                    style={{
                        position: "absolute",
                        width: "300px",
                        height: "100px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "50%",
                        filter: "blur(50px)",
                    }}
                    {...generateCloudAnimation()}
                />
            ))}
        </div>
    );
};

export default TwinklingStars;
