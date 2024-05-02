"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import PasswordResetForm from "@/app/components/auth/PasswordResetForm";

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

    const [formIndex, setFormIndex] = useState(0);

    const renderForm = () => {
        switch (formIndex) {
            case 0:
                return <LoginForm setFormIndex={setFormIndex} />;
            case 1:
                return <RegisterForm setFormIndex={setFormIndex} />;
            case 2:
                return <PasswordResetForm setFormIndex={setFormIndex} />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-top h-screen bg-white"
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
                        onClick={(e) => e.stopPropagation()}
                    />
                ))}
            </motion.div>

            <div className="z-10 pt-16 md:pt-48">
                <div className="mt-4">
                    <Image
                        src="/gris.svg"
                        width={150}
                        height={150}
                        alt="logo "
                        className="mx-auto"
                    />
                    <h1 className="text-3xl font-mono mb-6 text-black text-center">
                        Sparesti
                    </h1>
                </div>
                <div className="flex justify-around w-full max-w-4xl">
                    {renderForm()}
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
