import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="w-full h-auto bg-green-600 py-5 px-5 mb-5 rounded-b-2xl text-white overflow-auto">
      <div className="flex flex-row items-center justify-between">
        <div>
          <text className="text-xl  text-green-200 font-bold lg:text-3xl">
            <Link href="/">SHOPPA</Link>
          </text>
        </div>

        <div className="">
          <ul className="flex sm:2 lg:gap-5">
            <li className=" p-2 rounded-lg ">
              <Link href="/">Home</Link>
            </li>
            <li className=" p-2 rounded-lg ">
              <Link href="/">Login</Link>
            </li>
            <li className=" p-2 rounded-lg ">
              <Link href="/">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
