import Challengecard from "./Challengecard";
import ChallengecardAddButton from "./ChallengecardAddButton";

const Challengecarousel = () => {
  const challenges = [
    {
      name: "Drikk kun 4 kopper kaffe på sit kafeen denne uka eller noe sånt",
      current: 1,
      max: 4,
      startDate: new Date(2024, 5, 25),
      endDate: new Date(2024, 6, 3),
    },
    {
      name: "Challenge 2",
      current: 2,
      max: 10,
      startDate: new Date(2024, 4, 5),
      endDate: new Date(2024, 5, 1),
    },
    {
      name: "Challenge 3",
      current: 7,
      max: 10,
      startDate: new Date(2024, 4, 15),
      endDate: new Date(2024, 6, 22),
    },
    {
      name: "Challenge 4",
      current: 4,
      max: 10,
      startDate: new Date(2024, 3, 20),
      endDate: new Date(2024, 3, 27),
    },
    {
      name: "Challenge 5",
      current: 5,
      max: 10,
      startDate: new Date(2024, 4, 25),
      endDate: new Date(2024, 5, 3),
    },
    {
      name: "Challenge 6",
      current: 6,
      max: 10,
      startDate: new Date(2024, 4, 25),
      endDate: new Date(2024, 5, 3),
    },
    {
      name: "Challenge 7",
      current: 7,
      max: 10,
      startDate: new Date(2024, 4, 25),
      endDate: new Date(2025, 5, 3),
    },
    {
      name: "Challenge 8",
      current: 8,
      max: 10,
      startDate: new Date(2024, 4, 25),
      endDate: new Date(2024, 5, 3),
    },
    {
      name: "Challenge 9",
      current: 9,
      max: 10,
      startDate: new Date(2024, 4, 25),
      endDate: new Date(2024, 5, 3),
    },
    {
      name: "Challenge 10",
      current: 10,
      max: 10,
      startDate: new Date(2024, 4, 25),
      endDate: new Date(2024, 5, 3),
    },
  ];
  return (
    <div className="flex md:flex-col z-10 md:fixed md:right-1.5 md:top-5 md:h-screen py-6 self-start md:w-auto w-screen text-black overflow-x-scroll md:overflow-y-scroll">
      {challenges.map((challenge, index) => (
        <div key={index} className="flex-none md:relative md:block">
          <Challengecard
            challenge={challenge.name}
            current={challenge.current}
            max={challenge.max}
            startDate={challenge.startDate}
            endDate={challenge.endDate}
          />
        </div>
      ))}
      <div className="h-100 m-4">
        <ChallengecardAddButton />
      </div>
    </div>
  );
};

export default Challengecarousel;
