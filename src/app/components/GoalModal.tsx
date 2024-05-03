import React, { useState } from 'react';
import InputBox from './settings/InputBox';
import { useApiHandler } from '@/utils/api';
import { error } from 'console';

const NewGoalModal = ({ closeModal }) => {

  const apiHandler = useApiHandler()

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "Tittel":
        setTitle(value);
        break;
      case "Hvor mye koster det?":
        setAmount(Number(value));
        break;
      default:
        break;
    }
  };

  const submit = () => {
    if(title!=null && amount > 0){
      setNewGoal()
    } else{
      document.getElementById("error").innerHTML="Skriv inn tittel og mål"
    }
  }

  const setNewGoal = async () => {
    const goal = await apiHandler("goal", "post", "/setGoal", {
      name: title,
      amount: amount
    });
    if (goal.data.successful){
      location.reload()
    } else{
      document.getElementById("error").innerHTML="Kunne ikke legge til sparemål"
    }
  }

  return (
    <div className="modal-container flex justify-center items-center" onClick={closeModal}>
      <div className="modal-content bg-white text-black p-6 rounded-lg shadow-md" onClick={handleContentClick}>
        <h2 className="text-2xl text-black font-bold mb-4 text-center">Lag et nytt sparemål</h2>
        <div className="text-center text-red-500" id="error"></div>
        <div className="mb-4 flex justify-center">
          <InputBox label='Tittel' onChange={handleChange} aria-label="Inndatafelt for mål" placeholder='f.eks. "Ny mobil"'/>
        </div>
        <div className="mb-4 flex justify-center">
          <InputBox label='Hvor mye koster det?' onChange={handleChange} aria-label="Inndatafelt for hvor mye målet er" placeholder='3000'/>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
            onClick={closeModal}
          >
            Avbryt
          </button>
          <button 
            className="bg-primary-dark hover:bg-primary-light text-white px-4 py-2 rounded-md"
            onClick={submit}
          >
            Lag sparemål
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGoalModal;
