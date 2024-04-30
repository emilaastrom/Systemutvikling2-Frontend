"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import VolumeSlider from "../components/settings/VolumeSlider";
import DarkModeToggle from "../components/settings/DarkModeToggle";
import { useRouter } from "next/navigation";
import ThemeProvider from "../components/settings/ThemeProvider";
import InputBox from "../components/settings/InputBox";
import CustomizeExperience from "../components/settings/CustomizeExperience";
import AccountSelect from "../components/settings/AccountSelect";
import GoalHistoryModule from "../components/settings/GoalHistoryModule";

const accounts = [
  {
    id: 1,
    number: "123456789",
    balance: 1000,
    type: "Sparekonto",
  },
  {
    id: 2,
    number: "987654321",
    balance: 5000,
    type: "Brukskonto",
  },
];

interface SidebarItemProps {
  title: string;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps & { isActive: boolean }> = ({
  title,
  onClick,
  isActive,
}) => {
  return (
    <div
      className={`h-10 text-black my-1 dark:text-white dark:bg-slate-500 dark:hover:bg-white dark:hover:text-black flex w-full justify-center rounded-lg items-center hover:bg-green-100 hover:cursor-pointer ${
        isActive
          ? "bg-green-200 hover:bg-green-200 dark:bg-slate-300 dark:text-black"
          : ""
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Log out the user
    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div className="bg-gray-100 md:col-span-1 mt-2 md:order-2 col-span-3 h-10 row-span-1 rounded-lg shadow-lg">
      <button
        className=" max-h-10  bg-white rounded-md text-black h-10 w-full border-2 hover:scale-105 hover:text-white hover:bg-red-600 hover:font-semibold transition ease-in-out"
        onClick={handleLogout}
      >
        Logg av
      </button>
    </div>
  );
};

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("Bruker");
  const username: string = "epost@mail.com";
  const realName: string = "Ola Nordmann";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedAccounts, setSelectedAccounts] = useState({});
  // Callback function to handle changes in selected difficulty
  const handleDifficultyChange = (difficulty) => {
    setDifficultyLevel(difficulty);
    // Call any other logic you need for handling difficulty change
  };

  // Callback function to handle changes in selected challenges
  const handleChallengesChange = (challenges) => {
    console.log("page/Selected challenges: ", challenges);
    setSelectedChallenges(challenges);
    // Call any other logic you need for handling challenges change
  };
  const router = useRouter();

  const updateUserButton = async () => {
    if (difficultyLevel !== initialDifficultyLevel) {
      console.warn("Updating difficulty level", difficultyLevel);
      try {
        await apiHandler("user", "put", "/updateUser", {
          defaultDifficulty: difficultyLevel,
        });
      } catch (error) {
        console.error(error);
      }
      FetchUser();
    } else {
      console.warn("No difficulty level has been updated");
      console.log("old difficulty level: ", initialDifficultyLevel);
      console.log("new difficulty level: ", difficultyLevel);
    }

    if (selectedChallenges !== initialChallenges) {
      console.log("Initial challenges: ", initialChallenges);
      console.warn("Updating challenges: ", selectedChallenges);
      let stringOfChallenges =
        "[" +
        Array.from(selectedChallenges)
          .map((challenge) => `"${challenge.toUpperCase()}"`)
          .join(" ") +
        "]";
      console.log("stringOfChallenges: ", stringOfChallenges);
      try {
        await apiHandler("user", "put", "/updateUser", {
          challenges: stringOfChallenges,
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (!firstName || !lastName || !email || !phone) {
      return;
    } else {
      // Check if any fields have been updated, if so adding them to the updates object
      let updates: Partial<UserData> = {};
      if (firstName !== initialFirstName) updates.firstName = firstName;
      if (lastName !== initialLastName) updates.lastName = lastName;
      if (email !== initialEmail) updates.email = email;
      if (phone !== initialPhone) updates.phone = phone;
      if (difficultyLevel !== initialDifficultyLevel)
        updates.difficultyLevel = difficultyLevel;

      // Calling the API to update only the user data lines that have been changed
      if (Object.keys(updates).length > 0) {
        console.log("Updating fields: ", updates);
        try {
          await apiHandler("user", "put", "/updateUser", updates);
          // location.reload();
        } catch (error) {
          console.error(error);
        }
        FetchUser();
      } else {
        console.log("No text fields have been updated");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "Fornavn":
        setFirstName(value);
        break;
      case "Etternavn":
        setLastName(value);
        break;
      case "Epost":
        setEmail(value);
        break;
      case "Telefon":
        setPhone(value);
        break;
      default:
        console.warn(`Unknown field updated: ${name}, with value: ${value}`);
        break;
    }
  };

  useEffect(() => {
    if (!firstName || !lastName || !email || !phone) {
      FetchUser();
    }
  });

  const renderContent = () => {
    switch (content) {
      case "Bruker":
        return (
          <div
            id="nameBox"
            className="mb-6 my-10 md:w-11/12 w-auto flex flex-col items-center overflow-y-auto overflow-x-hidden "
          >
            <div className="font-semibold text-2xl text-center m-5">
              Brukerinformasjon
            </div>
            <InputBox
              label={"Fornavn"}
              placeholder={firstName}
              onChange={handleChange}
              aria-label="Inndatafelt for fornavn"
            />
            <InputBox
              label={"Etternavn"}
              placeholder={lastName}
              onChange={handleChange}
              aria-label="Inndatafelt for etternavn"
            />
            <InputBox
              label={"Epost"}
              placeholder={email}
              onChange={handleChange}
              aria-label="Inndatafelt for epostadresse"
              disabled={true}
            />
            <InputBox
              label={"Telefon"}
              placeholder={phone}
              onChange={handleChange}
              aria-label="Inndatafelt for telefonnummer"
            />
            <span className="mt-16 px-2 w-full">
              <CustomizeExperience />
            </span>
            <button
              onClick={updateUserButton}
              className="bg-primary-light hover:bg-primary-dark dark:bg-green-700 mt-8 text-white rounded-lg p-2 border-green-600 md:w-1/3 w-2/3"
              Lagre
            </button>
          </div>
        );

      case "Konto":
        return (
          <div className="mx-10 my-6 md:w-fill">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold mb-6 text-black">
                Velg bank konto for sparing
              </h1>
              <AccountSelect
                accounts={accounts}
                selectedAccounts={selectedAccounts}
                setSelectedAccounts={setSelectedAccounts}
              />
            </div>
            <button
              className="bg-primary-light hover:bg-primary-dark dark:bg-green-700 mt-8 text-white rounded-lg p-2 w-full"
              onClick={() => console.log()}
            >
              Lagre
            </button>
          </div>
        );
      case "Maalhistorikk":
        return (
          <div className="flex flex-col justify-start gap-4 m-5 overflow-y-auto">
            <div className="font-semibold text-center text-2xl">
              Oversikt over tidligere mål
            </div>
            <div className="flex flex-col text-center items-center pb-12">
              <GoalHistoryModule
                goalDescription={"Nytt headset!"}
                startedAt={new Date("2023-01-01")}
                completedAt={new Date()}
              />
              <GoalHistoryModule
                goalDescription={"Tur til Italia!"}
                startedAt={new Date()}
                completedAt={new Date()}
              />
              <GoalHistoryModule
                goalDescription={
                  "Ny telefon! Den er kjempefin og ny og dette er ikke placeholder tekst for å teste grenser på lengde av tekst i denne boksen."
                }
                startedAt={new Date()}
                completedAt={new Date()}
              />
              <GoalHistoryModule
                goalDescription={"Ny bil!"}
                startedAt={new Date()}
                completedAt={new Date()}
              />
              <GoalHistoryModule
                goalDescription={"Nytt headset!"}
                startedAt={new Date()}
                completedAt={new Date()}
              />
            </div>
          </div>
        );
      case "Preferanser":
        return (
          <div className="ml-8 m-8 w-fill dark:bg-slate-600 mt-12">
            <div className="font-semibold text-center text-2xl mt-5 mx-5">
              Dine preferanser
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="pt-12">
                <VolumeSlider />
              </div>

              <div id="darkModeToggle" className="w-2/3 md:w-fill mt-8">
                <DarkModeToggle />
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 pt-8">
              <button className="bg-green-500 hover:bg-green-600 dark:bg-green-700 text-white rounded-lg p-2 border-green-600 w-1/3">
                Lagre
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:text-white text-black rounded-lg p-2 border-gray-400 w-1/3">
                Avbryt
              </button>
            </div>
          </div>
        );
      default:
        return <div>No content</div>;
    }
  };

  return (
    <ThemeProvider>
      <main className="dark:bg-slate-700 w-fill min-h-screen pb-16 flex flex-col">
        <div className="grid grid-cols-2 sm:grid-cols-3 text-black gap-8 pt-20 md:px-48 px-4 w-full">
          {/* Profile section */}
          <div className="flex justify-start items-center bg-white dark:bg-slate-200 bg-opacity-80 col-span-3 row-span-1 h-32 rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/default.png"
              width={100}
              height={100}
              alt="Picture"
              className="md:ml-10 ml-5 rounded-full border-2 border-green-200 dark:border-slate-700"
            ></Image>
            <div id="userInfo" className="flex-grow md:ml-10 ml-5">
              <h2 className="text-xl font-bold whitespace-nowrap">
                {initialFirstName} {initialLastName}
              </h2>
              <p className="text-sm">{initialEmail}</p>
              <p className="text-sm">{initialPhone}</p>
            </div>
            <Image
              src="/logo.png"
              width={200}
              height={200}
              alt="Picture"
              className="hidden md:inline"
            ></Image>
          </div>

          {/* Left sidebar */}
          <div className="md:col-span-1 col-span-3 row-span-1 grid grid-cols-1 gap- dark:shadow-xl">
            <div className="bg-white px-1 dark:bg-slate-500 bg-opacity-80 md:col-span-1 col-span-3 w-full md:row-span-3 rounded-lg shadow-lg flex flex-col justify-center items-center">
              <SidebarItem
                title="Bruker"
                onClick={() => setContent("Bruker")}
                isActive={content === "Bruker"}
              />
              <SidebarItem
                title="Konto"
                onClick={() => setContent("Konto")}
                isActive={content === "Konto"}
              />
              <SidebarItem
                title="Målhistorikk"
                onClick={() => setContent("Maalhistorikk")}
                isActive={content === "Maalhistorikk"}
              />
              <SidebarItem
                title="Preferanser"
                onClick={() => setContent("Preferanser")}
                isActive={content === "Preferanser"}
              />
            </div>
            <LogoutButton />
          </div>

          {/* Main content */}
          <div className="bg-white dark:bg-slate-600 bg-opacity-80 md:col-span-2 md:order-1 col-span-3 row-span-4 h-auto rounded-lg shadow-lg overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default Home;
