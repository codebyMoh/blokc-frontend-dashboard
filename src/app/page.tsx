"use client";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import Login from "./components/login/login";
export default function Home() {
  const [openlogin, setOpenlogin] = useState(false);

  return (
    <>
      <div className="container md:mt-10 mt-3">
        <div className="md:mx-3">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex justify-between items-center">
              <div className="md:text-3xl text-2xl font-bold ml-2">
                Dashboard
              </div>
              <div className="cursor-pointer md:block hidden">
                <CiSearch size={25} />
              </div>
            </div>
            <div className="flex justify-end items-center gap-10  ">
              <div className="text-lg md:flex items-center gap-2 cursor-pointer md:block hidden  ">
                <GoDotFill className="text-green-600" />
                <p className="">Ethereum</p>
              </div>
              <div
                className=" cursor-pointer"
                onClick={() => setOpenlogin(true)}
              >
                <CgProfile size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {openlogin && <Login setOpenlogin={setOpenlogin} />}
    </>
  );
}
