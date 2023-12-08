"use client";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import Login from "./components/login/login";
import { useWeb3AuthSigner } from "./components/contex/web3-auth-signer";
import Image from "next/image";
import doller from "./components/assets/icons/Dollar.png";
import CustomDropdown from "./components/deopdown/CustomDropdown";
import { HiLanguage } from "react-icons/hi2";

export default function Home() {
  const [openlogin, setOpenlogin] = useState(false);
  const { userinfo, accountAddress } = useWeb3AuthSigner();

  const options = ["ETH", "USD", "MATIC"];
  const options1 = ["ENG", "HINDI"];
  useEffect(() => {
    if (!openlogin) {
      setOpenlogin(true);
    }
    if (accountAddress) {
      setOpenlogin(false);
    }
  }, [accountAddress, openlogin]);
  return (
    <>
      <div className="container md:mt-10 mt-3">
        <div className="md:mx-3">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2 ml-2">
                <div className="md:text-3xl text-2xl font-bold ">Dashboard</div>
                <div className="text-sm">Last Backup: 28 OCT 2023</div>
              </div>
              <div className="cursor-pointer md:block hidden">
                <CiSearch size={25} />
              </div>
            </div>
            <div className="flex justify-between items-center gap-10 mx-20 ">
              <div className="text-lg md:flex items-center  cursor-pointer md:block hidden  ">
                <HiLanguage size={20} />
                <CustomDropdown options1={options1} options={undefined} />
              </div>
              <div className="text-lg md:flex items-center  cursor-pointer md:block hidden  ">
                <Image src={doller} className="rounded-full" alt={""} />
                <CustomDropdown options={options} options1={undefined} />
              </div>
              <div
                className=" cursor-pointer"
                //onClick={() => setOpenlogin(true)}
              >
                {userinfo?.profileImage ? (
                  <Image
                    src={userinfo?.profileImage}
                    alt="Popup Image"
                    className="rounded-full"
                    width={35}
                    height={35}
                  />
                ) : (
                  <CgProfile size={30} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openlogin && <Login setOpenlogin={setOpenlogin} />}
    </>
  );
}
