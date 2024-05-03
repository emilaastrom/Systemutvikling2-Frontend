"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import VolumeSlider from "../../components/settings/VolumeSlider";
import DarkModeToggle from "../../components/settings/DarkModeToggle";
import { useRouter } from "next/navigation";
import ThemeProvider from "../../components/settings/ThemeProvider";
import InputBox from "../../components/settings/InputBox";
import CustomizeExperience from "../../components/settings/CustomizeExperience";
import AccountSelect from "../../components/settings/AccountSelect";
import { useApiHandler } from "../../../utils/api";
import GoalHistory from "./GoalHistory";
import { Account, SelectedAccounts } from "@/util/types/BankTypes";

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
        <button
            className={`h-10 text-black my-1 dark:bg-slate-500 dark:hover:bg-white dark:hover:text-black flex w-full justify-center rounded-lg items-center hover:bg-primary-light hover:cursor-pointer hover:text-white ${
                isActive
                    ? "bg-primary-light hover:bg-primary-light text-white dark:bg-white dark:text-black"
                    : " dark:text-white"
            }`}
            onClick={onClick}
        >
            {title}
        </button>
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
                className=" max-h-10  bg-white dark:bg-slate-500 dark:text-white rounded-md text-dark h-10 w-full border-2 hover:scale-105 hover:text-white hover:bg-red-600 dark:hover:bg-red-800 hover:font-semibold transition ease-in-out"
                onClick={handleLogout}
            >
                Logg av
            </button>
        </div>
    );
};

const Home: React.FC = () => {
    const [content, setContent] = useState<string>("Bruker");

    // Dynamic user data, initially fetched from the API
    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [difficultyLevel, setDifficultyLevel] = useState<string>("");
    const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccounts, setSelectedAccounts] = useState<SelectedAccounts>({
        From: null,
        To: null,
      });

    // Initial data to compare data before sending update request to API
    const [initialUsername, setInitialUsername] = useState("");
    const [initialFirstName, setInitialFirstName] = useState("");
    const [initialLastName, setInitialLastName] = useState("");
    const [initialEmail, setInitialEmail] = useState("");
    const [initialPhone, setInitialPhone] = useState("");
    const [initialDifficultyLevel, setInitialDifficultyLevel] = useState("");
    const [initialChallenges, setInitialChallenges] = useState<string[]>([]);
    
  const [isLoading, setIsLoading] = useState(true);

    interface UserData {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
        difficultyLevel?: string;
    }

    // Callback function to respond to changes in selected difficulty level
    const handleDifficultyChange = (difficulty) => {
        setDifficultyLevel(difficulty);
    };

    // Callback function to respond to changes in selected selectedChallenges
    const handleChallengesChange = (challenges) => {
        setSelectedChallenges(challenges);
    };

    const apiHandler = useApiHandler();

    const FetchUser = useCallback(async () => {
        try {
            const fetched = await apiHandler("user", "get", "/getUser");

            setUsername(fetched.data.username);
            setFirstName(fetched.data.firstName);
            setLastName(fetched.data.lastName);
            setEmail(fetched.data.email);
            setPhone(fetched.data.phone);
            setDifficultyLevel(fetched.data.difficultyLevel);

            setInitialUsername(fetched.data.username);
            setInitialFirstName(fetched.data.firstName);
            setInitialLastName(fetched.data.lastName);
            setInitialEmail(fetched.data.email);
            setInitialPhone(fetched.data.phone);
            setInitialDifficultyLevel(fetched.data.difficultyLevel);

            if (fetched.data.options) {
                setSelectedChallenges([...fetched.data.options]);
                setInitialChallenges([...fetched.data.options]);
            } else {
                console.warn(
                    "No challenges found in user data",
                    fetched.data.options
                );
            }
        } catch (error) {
            console.error("Error fetching data from API: ", error);
        }
    }, [apiHandler]);

    const router = useRouter();

    const areArraysEqual = (a, b) => {
        const freqCounterA = a.reduce((acc, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});
        const freqCounterB = b.reduce((acc, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});

        if (
            Object.keys(freqCounterA).length !==
            Object.keys(freqCounterB).length
        )
            return false;

        for (const key in freqCounterA) {
            if (freqCounterA[key] !== freqCounterB[key]) return false;
        }
        return true;
    };

    const updateUserButton = async () => {
        if (difficultyLevel !== initialDifficultyLevel) {
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
            console.log("Old difficulty level: ", initialDifficultyLevel);
            console.log("New difficulty level: ", difficultyLevel);
        }

        if (!areArraysEqual(selectedChallenges, initialChallenges)) {
            console.log("Updating challenges");
            const optionsJSON = JSON.stringify({
                options: selectedChallenges,
            });

            try {
                await apiHandler("user", "put", "/updateUser", optionsJSON);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.warn("No challenges have been updated");
            console.log("old challenges: ", initialChallenges);
            console.log("new challenges: ", selectedChallenges);
        }

        if (!firstName || !lastName || !email || !phone) {
            return;
        } else {
            // Check if any fields have been updated, if so adding them to the updates object
            let updates: Partial<UserData> = {};
            if (username !== initialUsername) {
                updates.username = username;
            }
            if (firstName !== initialFirstName) updates.firstName = firstName;
            if (lastName !== initialLastName) updates.lastName = lastName;
            if (email !== initialEmail) updates.email = email;
            if (phone !== initialPhone) updates.phone = phone;
            if (difficultyLevel !== initialDifficultyLevel)
                updates.difficultyLevel = difficultyLevel;

            // Calling the API to update only the user data lines that have been changed
            if (Object.keys(updates).length > 0) {
                try {
                    await apiHandler("user", "put", "/updateUser", updates);
                } catch (error) {
                    console.error(error);
                }
                FetchUser();
            } else {
                console.log(
                    "No text fields have been updated, did not send request to API."
                );
            }
        }
        location.reload();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case "Brukernavn":
                setUsername(value);
                break;
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
                console.warn(
                    `Unknown field updated: ${name}, with value: ${value}`
                );
                break;
        }
    };

    useEffect(() => {
        if (!email) {
            FetchUser();
        }
        const fetchAccounts = async () => {
            setIsLoading(true); // Start loading
            try {
              const response = await apiHandler("bank", "get", "/getAccounts");
              if (response.data) {
                console.log("response.data", response.data);
                setAccounts(
                  response.data.map((account) => ({
                    id: account.bban,
                    number: account.bban,
                    name: account.name,
                    ownerName: account.ownerName,
                    type: account.type,
                  }))
                );
              }
              console.log("Fetched accounts:", response.data);
            } catch (error) {
              console.error("Failed to fetch accounts:", error);
            } finally {
              setIsLoading(false);
            }
          };
      
          fetchAccounts();
    });
    const handleSubmission = async () => {
        console.log("Selected accounts:", selectedAccounts);
        if (!selectedAccounts.From || !selectedAccounts.To) {
          console.error("Feilmelding: Du må velge kontoer for både utgifter og sparing");
          return;
        }
    
        if (selectedAccounts.From.id === selectedAccounts.To.id) {
          console.error(
            "Feilmelding: Du må velge ulike kontoer for utgifter og sparing"
          );
          return;
        }
    
        try {
          console.log("Selected accounts:", selectedAccounts.From.number);
    
          const response = await apiHandler("bank", "post", "/addAccounts", {
            from: selectedAccounts.From.number,
            to: selectedAccounts.To.number,
          });
    
          if (response.status === 200) {
            console.log("Successfully set accounts");
          } else {
            console.error("Failed to set accounts:", response.data);
          }
        } catch (error) {
          console.error("Failed to set accounts:", error);
        }
      };

    const renderContent = () => {
        switch (content) {
            case "Bruker":
                return (
                    <div
                        id="nameBox"
                        className="mb-6 my-10 md:w-11/12 w-auto flex flex-col items-center overflow-y-auto overflow-x-hidden "
                    >
                        <div className="font-semibold text-2xl text-center m-5 dark:text-white">
                            Brukerinformasjon
                        </div>
                        <InputBox
                            label={"Brukernavn"}
                            placeholder={username}
                            onChange={handleChange}
                            aria-label="Inndatafelt for brukernavn"
                        />
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

                        <button
                            onClick={updateUserButton}
                            className="bg-primary-light font-bold text-xl hover:bg-primary-dark dark:bg-primary-dark mt-8 text-white rounded-lg p-2 border-primary-dark md:w-1/3 w-2/3"
                        >
                            Lagre
                        </button>
                    </div>
                );

            case "Konto":
                
                        if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center bg-white min-h-screen">
        <h1 className="text-2xl font-semibold mb-6 text-black">
          Laster inn kontoer...
        </h1>
        <div className="w-10 h-10 border-t-4 border-b-4 border-green-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white min-h-screen">
      <div className="w-2/3 text-center mt-12">
        <h1 className="text-3xl font-bold mb-3 text-black py-8">
          Dine kontoer:
        </h1>
        <p className="text-xl text-gray-700 mb-3 ">
          Velg en konto du vil overføre penger fra, <br /> og en hvor du ønsker
          å spare pengene.
        </p>
      </div>
      <AccountSelect
        accounts={accounts}
        selectedAccounts={selectedAccounts}
        setSelectedAccounts={setSelectedAccounts}
      />
      <div className="mb-24 text-center">
        <button
          className="mt-6 bg-primary-light text-white font-semibold px-4 py-2  mb-3 rounded-lg"
          onClick={handleSubmission}
        >
          Velg kontoer
        </button>
     
  

                        </div>
                        <button
                            className="bg-primary-light hover:bg-primary-dark dark:bg-primary-dark mt-8 text-white rounded-lg p-2 w-full"
                            onClick={() => console.log()}
                        >
                            Lagre
                        </button>
                    </div>
                );
            case "Maalhistorikk":
                return <GoalHistory />;
            case "Preferanser":
                if (!selectedChallenges) {
                    FetchUser();
                }
                return (
                    <div className="ml-8 m-8 w-fill dark:bg-slate-600 mt-12">
                        <div className="font-semibold text-center text-2xl mt-5 mx-5 dark:text-white">
                            Dine preferanser
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="pt-12">
                                <CustomizeExperience
                                    selectedDifficulty={`${difficultyLevel}`}
                                    setSelectedDifficulty={
                                        handleDifficultyChange
                                    }
                                    selectedChallenges={selectedChallenges}
                                    setSelectedChallenges={
                                        undefined
                                    }
                                />
                            </div>

                            <div className="text-lg text-black pt-8 dark:text-white">Mørk modus</div>
                            <div
                                id="darkModeToggle"
                                className="w-2/3 md:w-fill mt-4"
                            >
                                <DarkModeToggle />
                            </div>
                        </div>

                        {/* <div className="flex items-center justify-center space-x-4 pt-8">
                            <button className="bg-primary-light hover:bg-primary-dark dark:bg-green-700 dark:hover:bg-primary-light text-white font-semibold rounded-lg p-2 border-primary-dark w-1/3">
                                Lagre
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white text-dark rounded-lg p-2 border-gray-400 w-1/3">
                                Avbryt
                            </button>
                        </div> */}
                    </div>
                );
            default:
                return <div>Oi, her har det oppstått en feil!</div>;
        }
    };

    return (
        <ThemeProvider>
            <main className="dark:bg-slate-700 w-fill min-h-screen pb-16 flex flex-col">
                <div className="grid grid-cols-2 sm:grid-cols-3 text-dark gap-8 pt-20 md:px-48 px-4 w-full">
                    {/* Profile section */}
                    <div className="flex justify-start items-center bg-white dark:bg-slate-200 bg-opacity-80 col-span-3 row-span-1 h-32 rounded-lg shadow-lg overflow-hidden">
                        <Image
                            src="/default.png"
                            width={100}
                            height={100}
                            alt="Picture"
                            className="md:ml-10 ml-5 rounded-full border-2 border-primary-light dark:border-slate-700"
                        ></Image>
                        <div id="userInfo" className="flex-grow md:ml-10 ml-5">
                            <h2 className="text-xl font-bold whitespace-nowrap">
                                {initialFirstName} {initialLastName}
                            </h2>
                            <p className="text-sm">{initialEmail}</p>
                            <p className="text-sm">{initialPhone}</p>
                        </div>
                        <Image
                            src="/gris.svg"
                            width={100}
                            height={100}
                            alt="Picture"
                            className="hidden md:inline mr-10"
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
