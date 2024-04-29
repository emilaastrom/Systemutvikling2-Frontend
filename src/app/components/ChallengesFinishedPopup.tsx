import React from 'react';
import InputBox from './settings/InputBox';
import { Challenge } from '@/util/types/Challenge';

const ChallengesFinishedPopup = ({ closePopup, succeeded, failed}) => {

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-container flex justify-center items-center" onClick={closePopup}>
      <div className="modal-content bg-white p-6 rounded-lg shadow-md" onClick={handleContentClick}>
        <h2 className="text-2xl font-bold mb-4 text-center">Siden sist du logget inn:</h2>
        {succeeded && succeeded.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-4 text-center">Disse utfordingene ble fullført:</h2>
            <ul className='text-center'>
              {succeeded.map((challenge) => (
                <li key={challenge.id}>{challenge.name}</li>
              ))}
            </ul><br></br>
          </>
        )}
        {failed && failed.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-4 text-center">Disse utfordingene feilet:</h2>
            <ul className='text-center'>
              {failed.map((challenge) => (
                <li key={challenge.id}>{challenge.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ChallengesFinishedPopup;
