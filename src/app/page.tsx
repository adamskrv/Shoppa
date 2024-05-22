import Image from "next/image";
import HomePage from "./components/home/home_page";
import NavBar from "./components/nav/nav_bar";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-5 lg:px-24">
      <div className="w-full rounded-b-lg">
        <NavBar />
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex lg:justify-center">
     
        <React.StrictMode>
          <HomePage />
        </React.StrictMode>
        
      </div>
    </main>
  );
}
