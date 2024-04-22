"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import VolumeSlider from "../components/settings/VolumeSlider";
import DarkModeToggle from "../components/settings/DarkModeToggle";

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
      className={`h-10 text-black flex w-full justify-center rounded-lg items-center hover:bg-green-100 hover:cursor-pointer ${
        isActive ? "bg-green-200 hover:bg-green-200" : ""
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

const LogoutButton: React.FC = () => {
  return (
    <div className="bg-gray-100 md:col-span-1 md:order-2 col-span-3 h-10 row-span-1 rounded-lg shadow-lg">
      <button className="border-red-500 max-h-10 bg-red-50 bg-opacity-20 rounded-md hover:bg-red-100 text-red-500 h-10 w-full border-2">
        Logg av
      </button>
    </div>
  );
};

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("Konto");
  const username: string = "epost@mail.com";
  const realName: string = "Ola Nordmann";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const names = realName.split(" ");
    if (names.length > 0) {
      setFirstName(names[0]); // Set the first name
      setLastName(names.slice(1).join(" ")); // Join the rest as the last name
    }
  }, []);

  const renderContent = () => {
    switch (content) {
      case "Konto":
        return (
          <div>
            <div className="m-10 text-black">
              Brukskonto
              <br />
              <input
                type="text"
                placeholder="Kontonr"
                className="border-2 rounded-lg p-1 border-green-400"
              />
            </div>

            <div className="m-10">
              Sparekonto <br />
              <input
                type="text"
                placeholder="Kontonr"
                className="border-2 rounded-lg p-1 border-green-400"
              />
            </div>
          </div>
        );
      case "Badges":
        return (
          <div className="flex justify-start gap-4 m-5">
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
      case "Innstillinger":
        return (
          <div className="ml-8 m-8 h-auto">
            <div id="nameBox" className="mb-6 w-2/3 md:w-1/3">
              <div className="mb-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fornavn:
                </label>
                <input
                  type="text"
                  id="first-name"
                  placeholder={firstName}
                  className="mt-1 border-2 rounded-lg px-4 py-2 border-green-400 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  style={{ textAlign: "left" }}
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Etternavn:
                </label>
                <input
                  type="text"
                  id="last-name"
                  placeholder={lastName}
                  className="mt-1 border-2 rounded-lg px-4 py-2 border-green-400 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  style={{ textAlign: "left" }}
                />
              </div>
            </div>

            <div className="mb-6">
              <VolumeSlider />
            </div>

            <div id="darkModeToggle">
              <DarkModeToggle />
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 border-green-600">
                Lagre
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-black rounded-lg p-2 border-gray-400">
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
    <main className="bg-green-100 w-screen h-fit pb-32 md:pb-0 md:h-screen flex flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-3 text-black gap-8 h-auto pt-20 md:px-48 px-4 w-screen">
        {/* Profile section */}
        <div className="flex justify-start items-center bg-white bg-opacity-80 col-span-3 row-span-1 h-32 rounded-lg shadow-lg overflow-hidden">
          <Image
            src="/default.png"
            width={100}
            height={100}
            alt="Picture"
            className="md:ml-10 ml-5 rounded-full border-2 border-green-200"
          ></Image>
          <div id="userInfo" className="flex-grow md:ml-10 ml-5">
            <h2 className="text-xl font-bold whitespace-nowrap">{realName}</h2>
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
        <div className="md:col-span-1 col-span-3 row-span-1 grid grid-cols-1 gap-4">
          <div className="bg-white bg-opacity-80 md:col-span-1 col-span-3 w-full md:row-span-3 rounded-lg shadow-lg flex flex-col justify-center items-center">
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
              title="Innstillinger"
              onClick={() => setContent("Innstillinger")}
              isActive={content === "Innstillinger"}
            />
          </div>
          <LogoutButton />
        </div>

        {/* Main content */}
        <div className="bg-white bg-opacity-80 md:col-span-2 md:order-1 col-span-3 row-span-4 h-fit rounded-lg shadow-lg overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </main>
  );
};

export default Home;
