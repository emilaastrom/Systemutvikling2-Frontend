"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import VolumeSlider from "../components/settings/VolumeSlider";
import DarkModeToggle from "../components/settings/DarkModeToggle";
import { useRouter } from "next/navigation";
import ThemeProvider from "../components/settings/ThemeProvider";
import InputBox from "../components/settings/InputBox";
import CustomizeExperience from "../components/settings/CustomizeExperience";
import AccountSelect from "@/app/components/settings/AccountSelect";

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
  const [selectedAccountId, setSelectedAccountId] = useState<number | undefined>(1);


  useEffect(() => {
    const names = realName.split(" ");
    if (names.length > 0) {
      setFirstName(names[0]); // Set the first name
      setLastName(names.slice(1).join(" ")); // Join the rest as the last name
    }
  }, []);

  const renderContent = () => {
    switch (content) {
      case "Bruker":
        return (
          <div id="nameBox" className="mb-6 m-10  md:w-fill w-4/5">
            <InputBox label={"Brukernavn"} placeholder={"mittKuleBrukernavn"} disabled={true} />
            <InputBox label={"Fornavn"} placeholder={firstName} />
            <InputBox label={"Etternavn"} placeholder={lastName} />
            <InputBox label={"Epost"} placeholder={username} disabled={true}/>
            <InputBox label={"Telefon"} placeholder="12345678" />
            <CustomizeExperience/>
            <button className="bg-primary-light hover:bg-primary-dark dark:bg-green-700 mt-8 text-white rounded-lg p-2 border-green-600 w-full">Lagre</button>
          </div>
        );
      case "Konto":
        return (
          <div className="mx-10 my-6 md:w-fill">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold mb-6 text-black">
                Velg bank konto for sparing
              </h1>
              <AccountSelect accounts={accounts} selectedId={selectedAccountId} setSelectedId={setSelectedAccountId}/>
            </div>
            <button
              className="bg-primary-light hover:bg-primary-dark dark:bg-green-700 mt-8 text-white rounded-lg p-2 w-full"
              onClick={() => console.log()}
            >
              Lagre
            </button>
          </div>
        );
      case "Badges":
        return (
          <div className="flex justify-start gap-4 m-5">
            {/* TODO: Add proper badges with descriptions*/}
            <Image
              src="/logo.png"
              height={100}
              width={100}
              alt="badge"
              className="rounded-full border-2"
            ></Image>
            <Image
              src="/logo.png"
              height={100}
              width={100}
              alt="badge"
              className="rounded-full border-2"
            ></Image>
            <Image
              src="/logo.png"
              height={100}
              width={100}
              alt="badge"
              className="rounded-full border-2"
            ></Image>
            <Image
              src="/logo.png"
              height={100}
              width={100}
              alt="badge"
              className="rounded-full border-2"
            ></Image>
          </div>
        );
      case "Preferanser":
        return (
          <div className="ml-8 m-8 h-fill dark:bg-slate-600">
            <div className="">
              <VolumeSlider />
            </div>

            <div id="darkModeToggle">
              <DarkModeToggle />
            </div>

            <div className="flex items-center space-x-4 pt-4">
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
                {realName}
              </h2>
              {username}
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
                title="Badges"
                onClick={() => setContent("Badges")}
                isActive={content === "Badges"}
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
            { renderContent() }
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default Home;
