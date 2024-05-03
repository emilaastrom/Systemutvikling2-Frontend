"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const StartPage = () => {
  const [circleProps, setCircleProps] = useState([]);

  const handleLogin = () => {
    router.push("/login");
  };
  const handleReg = () => {
    router.push("/login?form=register");
  };

  useEffect(() => {
    const circles = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: [1, 1.5, 1],
      opacity: [0, 0.5, 0],
      rotate: [0, 360, 0],
      width: 20,
      height: 20,
      duration: Math.random() * 2 + 4,
      delay: Math.random(),
    }));
    setCircleProps(circles);
  }, []);

  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ zIndex: 0 }}
      >
        {circleProps.map((props, index) => (
          <motion.div
            key={index}
            className="absolute bg-primary-light rounded-full"
            style={{
              left: props.left,
              top: props.top,
              width: props.width,
              height: props.height,
            }}
            animate={{
              scale: props.scale,
              opacity: props.opacity,
              rotate: props.rotate,
              transition: {
                duration: props.duration,
                repeat: Infinity,
                repeatDelay: props.delay,
              },
            }}
          />
        ))}
      </motion.div>
      <div className="z-10 w-full px-4">
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <div className=" w-full md:w-3/5 text-black  rounded-xl p-12">
            <Image
              src="/gris.svg"
              width={150}
              height={150}
              alt="Sparesti logo"
              className="mx-auto"
            />
            <h1 className="text-4xl font-mono mb-3 text-black text-center">
              Velkommen til Sparesti
            </h1>
            <p className="text-lg px-4 text-center mb-6">
              Sparesti hjelper deg med å oppnå dine sparemål på en enkel og
              artig måte.
            </p>
            <div className="md:space-x-4 text-center mx-auto   w-4/5 rounded-xl p-4">
              <button
                onClick={handleLogin}
                className="bg-primary-light text-white mb-3 md:mb-0  py-2 px-6 rounded-lg hover:bg-green-300 transition-colors duration-300"
              >
                Logg Inn
              </button>
              <button
                className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                onClick={handleReg}
              >
                Registrer Deg
              </button>
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl border-4 border-gray-4 00 w-full md:w-52 p-2 hidden md:inline relative overflow-hidden">
            <Image
              src="/sr.png"
              layout="fill"
              objectFit="cover"
              alt="Sparesti logo"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StartPage;
