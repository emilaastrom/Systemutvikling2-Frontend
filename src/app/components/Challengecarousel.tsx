import Challengecard from './Challengecard';

const Challengecarousel = () => {
  // Define an array of challenge data
  const challenges = [
    { name: 'Challenge 1', current: 1, max: 3 },
    { name: 'Challenge 2', current: 2, max: 10 },
    { name: 'Challenge 3', current: 7, max: 10 },
    { name: 'Challenge 4', current: 4, max: 10 },
    { name: 'Challenge 5', current: 5, max: 10 },
    { name: 'Challenge 6', current: 6, max: 10 },
    { name: 'Challenge 7', current: 7, max: 10 },
    { name: 'Challenge 8', current: 8, max: 10 },
    { name: 'Challenge 9', current: 9, max: 10 },
    { name: 'Challenge 10', current: 10, max: 10 },
  ];

  return (
    <div className="flex self-start w-screen overflow-x-scroll overflow-y-hidden sm:pr-48">
      {/* Map over the challenges array to render Challengecard components */}
      {challenges.map((challenge, index) => (
        <div key={index} className="flex-none">
          {/* Use Challengecard component with challenge data */}
          <Challengecard 
            challenge={challenge.name}
            current={challenge.current}
            max={challenge.max}
          />
        </div>
      ))}
    </div>
  );
};

export default Challengecarousel;
