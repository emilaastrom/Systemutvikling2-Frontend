"use client";
import { useState } from "react";
import Image from "next/image";

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
          <div>
            <input
              type="text"
              placeholder="instilling"
              className="border-2 rounded-lg p-1 border-green-400 m-10"
            />
          </div>
        );
      default:
        return <div>No content</div>;
    }
  };

  return (
    <main className="bg-green-100 w-screen h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 text-black gap-4 h-auto py-20 md:px-40 px-4">
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
        <div className="bg-white bg-opacity-80 md:col-span-2 md:order-1 col-span-3 row-span-4 h-96 rounded-lg shadow-lg overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </main>
  );
};

export default Home;
