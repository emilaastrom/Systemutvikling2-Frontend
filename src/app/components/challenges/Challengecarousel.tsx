import Challengecard from "./Challengecard";
import ChallengecardAddButton from "./ChallengecardAddButton";
import { useApiHandler } from "@/utils/api";
import { useEffect, useState } from "react";
import { ActiveChallenge } from "@/util/types/Challenge";

type ChallengecardModalProps = {
  onClose: () => void;
  challengeText: string;
  challengeStartDate: Date;
  challengeEndDate: Date;
  id: string;
  subStatus: boolean[];
};

const Challengecarousel = () => {
  const [activeChallenges, setActiveChallenges] = useState<ActiveChallenge[]>([]);
  const [forceUpdateFlag, setForceUpdateFlag] = useState(false); // State to force update

    const apiHandler = useApiHandler();

    const fetchChallenges = async () => {
        try {
            const challenges = await apiHandler(
                "challenge",
                "get",
                "/getActiveChallenges"
            );
            setActiveChallenges(challenges.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

  useEffect(() => {
    fetchChallenges();
  }, [])

  const handleReloadChallenges = () => {
    setForceUpdateFlag(prevFlag => !prevFlag);
    fetchChallenges();
  };
  
  return (
    <div
      key={forceUpdateFlag ? 'reload' : 'no-reload'} // Key to trigger re-render
      className="flex z-10 self-start w-screen text-black overflow-x-auto overflow-y-auto customized-scrollbar"
    >
      {activeChallenges
        .filter(challenge => {
          const endDate = new Date(challenge.assignedChallenge.endDate);
          const today = new Date();
          return endDate > today;
        })
        .sort((a, b) => {
          const endDateA = new Date(a.assignedChallenge.endDate);
          const endDateB = new Date(b.assignedChallenge.endDate);
          return endDateA.getTime() - endDateB.getTime();
        })
        .map((challenge, index) => {
          var startDateParts = challenge.assignedChallenge.startDate.split('-');
          var startYear = parseInt(startDateParts[0], 10);
          var startMonth = parseInt(startDateParts[1], 10) - 1; 
          var startDay = parseInt(startDateParts[2], 10);
          var startDate = new Date(startYear, startMonth, startDay);

          var endDateParts = challenge.assignedChallenge.endDate.split('-');
          var endYear = parseInt(endDateParts[0], 10);
          var endMonth = parseInt(endDateParts[1], 10) - 1; 
          var endDay = parseInt(endDateParts[2], 10);
          var endDate = new Date(endYear, endMonth, endDay);

          var numberOfTrue = challenge.assignedChallenge.subStatus.filter(function(value) {
            return value === true;
          }).length;

          return (
            <div key={index} className="flex-none md:relative md:block">
              <Challengecard
                id={challenge.assignedChallenge.id}
                challenge={challenge.challenge.description}
                title={challenge.challenge.name}
                current={numberOfTrue}
                max={challenge.assignedChallenge.subStatus.length}
                startDate={startDate}
                endDate={endDate}
                subStatus={challenge.assignedChallenge.subStatus}
                difficulty={challenge.assignedChallenge.difficulty}
                onClose={handleReloadChallenges}
              />
            </div>
          );
        })}
      <div className="m-4">
        <ChallengecardAddButton reloadFunction={handleReloadChallenges} amount={activeChallenges.length}/>
      </div>
    </div>
  );
};

export default Challengecarousel;
