"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import login1 from "../assets/icons/login.png";
import { IoMdClose } from "react-icons/io";
import blokclogo from "../assets/icons/blokclogo.png";
import {
  Web3AuthMPCCoreKit,
  WEB3AUTH_NETWORK,
  COREKIT_STATUS,
} from "@web3auth/mpc-core-kit";
import { useWeb3AuthSigner } from "../contex/web3-auth-signer";
import Web3 from "web3";
import {
  ECDSAProvider,
  getRPCProviderOwner,
  SessionKeyProvider,
  getPermissionFromABI,
} from "@zerodev/sdk";
import { LocalAccountSigner } from "@alchemy/aa-core";
import { generatePrivateKey } from "viem/accounts";
import { ClipLoader } from "react-spinners";
const selectedNetwork = WEB3AUTH_NETWORK.MAINNET;
const clientidweb3 = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENTID;
// console.log("clientidweb3--->", clientidweb3);

const coreKitInstance = new Web3AuthMPCCoreKit({
  web3AuthClientId: clientidweb3,
  web3AuthNetwork: selectedNetwork,
  uxMode: "popup",
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0x1",
    rpcTarget: "https://rpc.ankr.com/eth",
    displayName: "Ethereum Mainnet",
    blockExplorer: "https://etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
  },
});

const Login = ({ setOpenlogin }) => {
  const {
    setWeb3AuthSigner,
    setAccountAddress,
    setUserinfo,
    web3AuthSigner,
    setEcdsaProvider,
  } = useWeb3AuthSigner();
  const [providercorkit, setProvidercorkit] = useState("");
  const [coreKitStatus, setCoreKitStatus] = useState("");
  const [web3, setWeb3] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log("coreKitStatus-->", coreKitStatus);
  useEffect(() => {
    if (coreKitInstance) {
      const init = async () => {
        await coreKitInstance.init();

        if (coreKitInstance.provider) {
          setProvidercorkit(coreKitInstance.provider);
        }

        setCoreKitStatus(coreKitInstance.status);
      };
      init();
    }
  }, []);

  useEffect(() => {
    if (providercorkit) {
      const web3 = new Web3(providercorkit);
      setWeb3(web3);
    }
  }, [providercorkit]);

  const login = async () => {
    try {
      setIsLoading(true);
      if (!coreKitInstance) {
        throw new Error("initiated to login");
      }
      // console.log("1");
      const verifierConfig = {
        subVerifierDetails: {
          typeOfLogin: "google",
          verifier: "blok-capital",
          clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
        },
      };

      await coreKitInstance.loginWithOauth(verifierConfig);

      if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
        console.log(
          "required more shares, please enter your backup/ device factor key, or reset account unrecoverable once reset, please use it with caution]"
        );
        setResetaccount(true);
      }

      if (coreKitInstance.provider) {
        setProvidercorkit(coreKitInstance.provider);
        setWeb3AuthSigner(coreKitInstance.provider);
      }
      //setCoreKitInstance(coreKitInstance);
      //google - tkey - w3a
      //new-blokc-verifier //

      //setOpenModuleGoogle(true);

      const userdata = coreKitInstance.getUserInfo();
      setUserinfo(userdata);
      console.log("userdata", userdata);

      //localStorage.setItem("userRole", selectedOption);

      //setIsConnected(true);

      //router.push(Routes.wallet.root);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenlogin(false);
    }
  };

  useEffect(() => {
    if (web3AuthSigner) {
      const sessionKey = LocalAccountSigner.privateKeyToAccountSigner(
        generatePrivateKey()
      );
      const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      const contractAddresseth = "0x377Fdd37E53E5036aBeA0e8b2203AE6750812446";
      const ecdcfunction = async () => {
        if (web3AuthSigner) {
          const ecdsaProvider = await ECDSAProvider.init({
            projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID,
            owner: getRPCProviderOwner(web3AuthSigner),
          });
          const address = await ecdsaProvider.getAddress();
          console.log("address-->", address);

          setAccountAddress(address);
          setEcdsaProvider(ecdsaProvider);

          //const sessionKeyProvider = await SessionKeyProvider.init({
          //  // ZeroDev project ID
          //  projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID,
          //  // The master signer
          //  defaultProvider: ecdsaProvider,
          //  // the session key (private key)
          //  opts: {
          //    paymasterConfig: {
          //      onlySendSponsoredTransaction: true,
          //      policy: "VERIFYING_PAYMASTER",
          //    },
          //  },
          //  sessionKey,
          //  // session key parameters
          //  sessionKeyData: {
          //    // The UNIX timestamp at which the session key becomes valid
          //    validAfter: 0,
          //    // The UNIX timestamp at which the session key becomes invalid
          //    validUntil: 0,
          //    // The permissions
          //    // Each permission can be considered a "rule" for interacting with a particular
          //    // contract/function.  To create a key that can interact with multiple
          //    // contracts/functions, set up one permission for each.

          //    permissions: [
          //      getPermissionFromABI({
          //        // Target contract to interact with
          //        target: contractAddress,
          //        // Maximum value that can be transferred.  In this case we
          //        // set it to zero so that no value transfer is possible.
          //        valueLimit: BigInt(0),
          //        // Contract abi
          //        abi: contractABI,
          //        // Function name
          //        functionName: "transfer",
          //        // An array of conditions, each corresponding to an argument for
          //        // the function.
          //        args: [null, null],
          //      }),
          //    ],

          //    paymaster: zeroAddress,
          //  },
          //});

          //setSessionKeyProvider(sessionKeyProvider);
          //console.log("sessionKeyProvider------>", sessionKeyProvider);
        }

        // console.log("sessionKeyProvider", sessionKeyProvider);
      };
      ecdcfunction();
    }
  }, [setAccountAddress, setEcdsaProvider, web3AuthSigner]);

  const handleClose = () => {
    setOpenlogin(false);
  };
  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-content">
          {/* Left side with image */}
          <div className="popup-left bg-[#e9e9e9] rounded-2xl space-y-5 py-5">
            <div>
              <Image src={login1} alt="Popup Image" className="popup-image" />
            </div>
            <div className="flex justify-center items-center gap-3">
              <Image src={blokclogo} alt="blokclogo" className="h-12 w-12" />
              <p className="text-2xl font-medium text-center">BLOK Capital</p>
            </div>
          </div>

          <div className="popup-right flex flex-col justify-between space-y-3">
            <div className="space-y-5">
              <h2 className="text-2xl font-bold">Login</h2>
              <p className="text-xl font-medium">Welcome to BLOKC Dashboard</p>
            </div>
            <div className="flex flex-col space-y-5">
              <button
                className="shadow-lg shadow-indigo-500/40 flex justify-center items-center  bg-black text-white py-3 rounded-2xl"
                onClick={!isLoading ? login : null}
              >
                {!isLoading ? (
                  "Google Login"
                ) : (
                  <ClipLoader color="#f9f9f9" size={22} />
                )}
              </button>
              <button className="bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-3 rounded-2xl">
                Facebook Login
              </button>
            </div>
            <div className="text-center">
              <p>&copy; Terms and Conditions</p>
            </div>
          </div>
        </div>

        {/* Close button */}
        {/*<button className="close-button" onClick={handleClose}>
          <IoMdClose size={25} />
        </button>*/}
      </div>
    </div>
  );
};

export default Login;
