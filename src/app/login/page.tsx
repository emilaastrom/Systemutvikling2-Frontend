"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
type CircleProps = {
  left: string;
  top: string;
  scale: number[];
  opacity: number[];
  rotate: number[];
  width: number;
  height: number;
  duration: number;
  delay: number;
};
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

const Login = () => {
  const [circleProps, setCircleProps] = useState<CircleProps[]>([]);

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

  const [toggle, setToggle] = useState(true);

  const changeToggle = () => {
    setToggle(!toggle);
  };

  return (
    <motion.div
      className="flex flex-col  items-center justify-center h-screen bg-white"
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
            className="absolute bg-green-400 rounded-full"
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
            onClick={(e) => e.stopPropagation()}
          />
        ))}
      </motion.div>

      <div className="z-10">
        <div className="">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="logo "
            className="mx-auto"
          />
          <h1 className="text-3xl font-mono mb-12 text-black  text-center ">
            Sparesti
          </h1>
        </div>
        <div className="flex justify-around w-full max-w-4xl">
          <button
            onClick={() => changeToggle()}
            className="bg-green-300 p-2 m-4 rounded-lg"
          >
            <ArrowPathIcon className="h-6 w-6 text-black" />
          </button>
          {toggle ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
