import Image from "next/image";
import HomePage from "./components/home/home_page";
import NavBar from "./components/nav/nav_bar";
import React from "react";

export default function Home() {
  return (
    <main className="relative flex bg-custom-svg min-h-screen flex-col items-center px-5 lg:px-24">
      <div className="w-full rounded-b-lg">
        <NavBar />
      </div>
      <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex lg:justify-center">
        <React.StrictMode>
          <HomePage />
        </React.StrictMode>
      </div>
      <div className="absolute bottom-5 right-5">
        <Image
          src={"/images/pic1.png"}
          alt="bg image"
          height={500}
          width={500}
        />
      </div>
      <div className="absolute left-5 top-20">
        <Image
          src={"/images/pic2.png"}
          alt="bg image"
          height={500}
          width={500}
        />
      </div>
    </main>
  );
}
