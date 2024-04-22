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
        // Calculate percentage
        const calculatedPercentage = (current / max) * 100;
        setPercentage(calculatedPercentage);
    }, [current, max]);

    // Calculate clip path based on percentage starting from bottom
    const clipPath = `polygon(0% 100%, 100% 100%, 100% ${100 - percentage}%, 0% ${100 - percentage}%)`;

    return (
        <div className=" font-semibold items-center text-center relative">
            <div className='text-3xl'>
            {goal}
            </div>
            <div className='relative h-48 flex mt-2 justify-center items-center'>
                <div className="absolute">
                    {/* Gris transparent image */}
                    <Image 
                        src="/gris_transparent.png" 
                        alt="Gris transparent" 
                        height={160}
                        width={160}
                    />
                </div>
                <div className="absolute" style={{ clipPath: clipPath }}>
                    {/* Gris overlay image with clip path */}
                    <Image 
                        src="/gris.png" 
                        alt="Gris" 
                        height={160}
                        width={160}
                    />
                </div>
            </div>
            <div className=" text-2xl relative">
                {current} / {max} kr
            </div>
        </div>
    );
};

export default Goalpig;
