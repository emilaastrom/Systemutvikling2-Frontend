import React, { useState } from 'react';

const ChallengecardModalButton = ({
    text
}: {
    text: string;
}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className="flex justify-center items-center">
            <div 
                className={`w-20 h-20 rounded-lg shadow-md cursor-pointer flex justify-center items-center ${isClicked ? 'bg-green-200' : 'bg-grey-200 hover:bg-green-100'}`}
                onClick={handleClick}
            >
                {text}
            </div>
        </div>
    );
};

export default ChallengecardModalButton;
