import React from 'react';
import InputBox from './settings/InputBox';
import { Challenge } from '@/util/types/Challenge';

const ChallengesFinishedPopup = ({ closePopup, finished, unfinished}) => {

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-container flex justify-center items-center" onClick={closePopup}>
      <div className="modal-content bg-white text-black p-6 rounded-lg shadow-md" onClick={handleContentClick}>
        <h2 className="text-2xl font-bold mb-4 text-center">Siden sist du logget inn:</h2>
        {finished && finished.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-4 text-center">Fullført:</h2>
            <ul className='text-center'>
              {finished.map((challenge) => (
                <li key={challenge.id}><span className="font-semibold">{challenge.name}: </span> {challenge.description}</li>
              ))}
            </ul><br></br>
          </>
        )}
        {unfinished && unfinished.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-4 text-center">Feilet:</h2>
            <ul className='text-center'>
              {unfinished.map((challenge) => (
                <li key={challenge.id}><span className="font-semibold">{challenge.name}: </span> {challenge.description}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ChallengesFinishedPopup;
