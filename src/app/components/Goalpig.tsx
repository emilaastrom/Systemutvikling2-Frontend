import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface GoalpigProps {
    current: number;
    max: number;
    goal: string;
}

const Goalpig: React.FC<GoalpigProps> = ({ current, max, goal }) => {
    const [percentage, setPercentage] = useState<number>(0);

    useEffect(() => {
        const calculatedPercentage = (current / max) * 100;
        setPercentage(calculatedPercentage);
    }, [current, max]);

    const clipPath = `polygon(0% 100%, 100% 100%, 100% ${100 - percentage}%, 0% ${100 - percentage}%)`;
    return (
        <div className="font-semibold h-auto items-center md:mt-5 mt-3 md:mb-5 mb-3 text-white text-center relative">
            <div className='md:text-4xl text-2xl font-custom1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                {goal}
            </div>
            <div className='relative h-40 flex justify-center items-center'>
            <svg className="absolute" viewBox="0 0 100 100" width="160" height="160">
    {/* White Circle to fill the inside */}
    <circle cx="50" cy="50" r="40" fill="white" />
</svg>
            <svg className="absolute drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" viewBox="0 0 100 100" width="160" height="160">
    {/* Background Circle */}
    <circle cx="50" cy="50" r="40" fill="none" stroke="#ccc" strokeWidth="8" />
    {/* Progress Circle */}
    <circle
        data-testid="progress-circle"
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#14c973"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="251.2"
        strokeDashoffset={251.2 * (1 - percentage / 100)} // Adjust percentage here
        transform="rotate(-90, 50, 50)" // Rotate to start from the top
    />
</svg>


    <div className="absolute">
        <Image 
            src="/gris.svg" 
            alt="Gris transparent" 
            height={160}
            width={160}
            className="h-20 w-20"
        />
    </div>
</div>


            <div className="text-2xl font-custom1 relative drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {Math.floor(current)} / {max} kr
            </div>
        </div>
    );
};

export default Goalpig;
