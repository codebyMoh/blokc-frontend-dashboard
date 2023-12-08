"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoSwapHorizontal } from "react-icons/io5";
import mainlogo from "../assets/icons/Fulllogo.png";
import Support from "../assets/icons/Support.png";
import Support1 from "../assets/icons/Support1.png";
import Wallet from "../assets/icons/Wallet.png";
import Wallet1 from "../assets/icons/Wallet1.png";
import Earth from "../assets/icons/Earth.png";
import Earth1 from "../assets/icons/Earth1.png";
import SWAP from "../assets/icons/SWAP.png";
import SWAP1 from "../assets/icons/SWAP1.png";
import Infornation from "../assets/icons/Infornation.png";
import Infornation1 from "../assets/icons/Infornation1.png";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("dashboard");
  const [selectedItem, setSelectedItem] = useState("dashboard");

  const menuItems = [
    {
      label: "Dashboard",
      icon: { default: Wallet1, hover: Wallet },
      id: "dashboard",
    },
    {
      label: "Discover",
      icon: { default: Earth1, hover: Earth },
      id: "discover",
    },
    {
      label: "Swap & Bridge",
      icon: { default: SWAP, hover: SWAP1 },
      id: "swapBridge",
    },
  ];

  const handleHover = (itemId) => {
    setHoveredItem(itemId);
  };

  const handleMenuClick = (itemId) => {
    setSelectedItem(itemId);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setHoveredItem(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    setSelectedItem("dashboard");
  }, []);

  return (
    <>
      <div className="md:p-5 p-0">
        <div
          className={`h-screen w-72  flex flex-col justify-between text-lg bg-[#2100EC] md:rounded-[40px] transition-all duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:-translate-x-0 `}
        >
          <div className="">
            <div className="p-10 my-5">
              <Image src={mainlogo} width={200} height={200} alt="BLOKC logo" />
            </div>
            <div className="text-[#B1A6F8] flex flex-col justify-start gap-10 ">
              <ul className="menu text-center">
                {menuItems.map((item) => (
                  <li key={item.id} onClick={() => handleMenuClick(item.id)}>
                    <div
                      className={`ml-12 flex items-center gap-2 ${
                        hoveredItem === item.id && selectedItem === item.id
                          ? "hovered"
                          : null
                      }`}
                      onMouseEnter={() => handleHover(item.id)}
                      onMouseLeave={() => handleHover(null)}
                    >
                      <div>
                        {item.icon.default && (
                          <Image
                            src={
                              hoveredItem === item.id ||
                              selectedItem === item.id
                                ? item.icon.hover
                                : item.icon.default
                            }
                            alt={item.label}
                            height="10px"
                          />
                        )}
                      </div>
                      <div>
                        <p>{item.label}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8">
              <hr></hr>
            </div>
            {/*<div className="p-5">
              <div className="border-t border-[#FFFFFF] mb-5"></div>
            </div>*/}
            <div className="flex flex-col justify-start gap-10 text-[#B1A6F8]">
              <ul className="menu text-center">
                <li onClick={toggleMenu}>
                  <div
                    className="ml-12 flex items-center gap-3"
                    onMouseEnter={() => handleHover("aboutUs")}
                    onMouseLeave={() => handleHover(null)}
                  >
                    <div>
                      <Image
                        src={
                          hoveredItem === "aboutUs" ? Infornation : Infornation1
                        }
                        alt="Information"
                        height="10px"
                      />
                    </div>
                    <div>
                      <p>About us</p>
                    </div>
                  </div>
                </li>
                <li onClick={toggleMenu}>
                  <div
                    className="ml-12 flex items-center gap-3"
                    onMouseEnter={() => handleHover("support")}
                    onMouseLeave={() => handleHover(null)}
                  >
                    <div className="relative cursor-pointer">
                      <Image
                        src={hoveredItem === "support" ? Support1 : Support}
                        alt="Support"
                        height="10px"
                      />
                    </div>
                    <div>
                      <p>Support</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-5 text-center">
            <p className="text-white text-sm">&copy; Copyright 2023 BLOKC.</p>
          </div>
        </div>
      </div>
      <div
        className="mx-2 absolute top-0 md:hidden block mt-4"
        onClick={() => toggleMenu()}
      >
        {!isMenuOpen ? (
          <AiOutlineMenu size={20} />
        ) : (
          <IoMdClose size={20} className="text-white" />
        )}
      </div>
    </>
  );
};

export default Sidebar;
