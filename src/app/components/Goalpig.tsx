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
        <div className="font-semibold items-center md:mt-5 mt-3 md:mb-5 mb-3 text-dark text-center relative">
            <div className='md:text-4xl text-3xl font-custom1'>
                {goal}
            </div>
            <div className='relative h-32 md:h-48 flex justify-center items-center'>
                <div className="absolute">
                    <Image 
                        src="/gris_transparent.png" 
                        alt="Gris transparent" 
                        height={160}
                        width={160}
                        className="h-32 w-32 md:h-40 md:w-40"
                    />
                </div>
                <div className="absolute" style={{ clipPath: clipPath }}>
                    <Image 
                        src="/gris.png" 
                        alt="Gris" 
                        height={160}
                        width={160}
                        className="h-32 w-32 md:h-40 md:w-40"
                    />
                </div>
            </div>
            <div className="text-3xl font-custom1 relative">
                {current} / {max} kr
            </div>
        </div>
    );
};

export default Goalpig;
