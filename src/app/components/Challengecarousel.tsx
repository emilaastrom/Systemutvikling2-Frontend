import Challengecard from './Challengecard';
import ChallengecardAddButton from './ChallengecardAddButton';

const Challengecarousel = () => {
  // Define an array of challenge data
  const challenges = [
    { name: 'Drikk kun 4 kopper kaffe på sit kafeen denne uka eller noe sånt', current: 1, max: 4, days:2, startDate: new Date(2024, 1, 25), endDate: new Date(2024, 2, 3) },
    { name: 'Challenge 2', current: 2, max: 10, days:2, startDate: new Date(2024, 0, 5), endDate: new Date(2025, 5, 25)  },
    { name: 'Challenge 3', current: 7, max: 10, days:2, startDate: new Date(2024, 6, 15), endDate: new Date(2024, 6, 22)  },
    { name: 'Challenge 4', current: 4, max: 10, days:2, startDate: new Date(2024, 0, 25), endDate: new Date(2024, 2, 3)  },
    { name: 'Challenge 5', current: 5, max: 10, days:2, startDate: new Date(2024, 1, 25), endDate: new Date(2024, 2, 3)  },
    { name: 'Challenge 6', current: 6, max: 10, days:2, startDate: new Date(2024, 1, 25), endDate: new Date(2024, 2, 3)  },
    { name: 'Challenge 7', current: 7, max: 10, days:2, startDate: new Date(2024, 1, 25), endDate: new Date(2024, 2, 3)  },
    { name: 'Challenge 8', current: 8, max: 10, days:2, startDate: new Date(2024, 1, 25), endDate: new Date(2024, 2, 3)  },
    { name: 'Challenge 9', current: 9, max: 10, days:2, startDate: new Date(2024, 1, 25), endDate: new Date(2024, 2, 3)  },
    { name: 'Challenge 10', current: 10, max: 10, days:2, startDate: new Date(2024, 1, 25), endDate: new Date(2024, 2, 3)  },
  ];
  return (
    <div className="flex self-start w-screen overflow-x-scroll overflow-y-hidden">
      {/* Map over the challenges array to render Challengecard components */}
      {challenges.map((challenge, index) => (
        <div key={index} className="flex-none">
          {/* Use Challengecard component with challenge data */}
          <Challengecard 
            challenge={challenge.name}
            current={challenge.current}
            max={challenge.max}
            days={challenge.days}
            startDate={challenge.startDate}
            endDate={challenge.endDate}
          />
        </div>
      ))
      }
      <div className='h-100 m-4'>
      <ChallengecardAddButton />
      </div>
    </div>
  );
};

export default Challengecarousel;
