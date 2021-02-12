//from https://tailwindcomponents.com/component/sidebar-1
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Dropzone from "./Dropzone";
import axios from "axios";
import { ActionContext } from "../context/GlobalState";

const SidebarItem = (props) => {
  return (
    <Link href={props.href}>
      <a
        class={
          "text-lg font-semibold flex items-center space-x-3 justify-between p-1 rounded-md hover:bg-white focus:shadow-outline " +
          props.className
        }
      >
        {props.children}
      </a>
    </Link>
  );
};

const Sidebar = (props) => {
  const router = useRouter();
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { balance, dispatch } = useContext(ActionContext);
  const { data: user, mutate: mutateUser } = useSWR("/api/user", fetcher);

  const logout = async () => {
    const res = await fetch("/api/logout");
    if (res.ok) {
      mutateUser(null);
      router.push("/");
    }
  };

  const getBalance = async () => {
    try {
      const res = await axios.get(`/api/getbalance/${user.hederaAccountID}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "SET_BALANCE",
        payload: res.data.balance,
      });

      // if (res.ok) {
      //   console.log("REsponse", res);
      // } else {
      //   throw new Error(await res.text());
      // }
    } catch (error) {
      console.error(error);
      // setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    user && getBalance();
  }, [user]);

  // console.log(balance)

  return (
    <div className="flex flex-col p-4 text-sm h-screen justify-between">
      <div className="flex flex-col">
        <div className="flex flex-col w-full border-b-2 mb-3 pb-1 pl-12">
          <div className="flex-1">
            <Link href="/">
              <button className="tracking-wide font-bold text-3xl align-baseline focus:outline-none ">
                DRGZ
              </button>
            </Link>
          </div>
          <div className="flex-1 font-medium text-gray-700 align-baseline">
            Buying and selling is now zero effort
          </div>
        </div>
        <div className="flex flex-col pl-12">
          <SidebarItem href="/">All</SidebarItem>
          <SidebarItem href="/sneakers">Sneakers</SidebarItem>
          <SidebarItem href="/books">Books</SidebarItem>
          <SidebarItem href="/board-games">Board Games</SidebarItem>
          {/* <SidebarItem href="/">
            <a className="flex align-text-bottom">
              <span className="px-2 pt-1">Home</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="text-gray-500 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
          </SidebarItem> */}
        </div>
      </div>

      {["/", "/books", "/sneakers", "/board-games"].includes(
        router.pathname
      ) && (
        <div className="flex w-full justify-center">
          <Dropzone balance={balance} user={user}></Dropzone>
        </div>
      )}
      <div className="flex w-full justify-center align-middle">
        {user ? (
          <div class="w-full">
            <Link href="/account">
              {/* <div class="flex w-full items-center rounded-md space-x-4 p-1 mb-2 justify-between text-right hover:bg-gray-100 focus:shadow-outline">
                <img
                  class="h-12 rounded-full border-2 border-gray-600"
                  src="http://www.gravatar.com/avatar/?d=identicon"
                />
                <div>
                  <h4 class="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
                    {user ? user.name : "Roshan"}
                  </h4>
                  <span class="text-sm tracking-wide text-gray-600 text-right">
                    {user && user.drgz ? "Balance: " + user.drgz : "Balance: 0"}
                  </span>
                </div>
              </div> */}
              <div class="flex w-full justify-between hover:bg-gray-100 focus:shadow-outline p-1 mb-2 rounded-md items-center">
                <div class="flex-1 font-semibold text-lgtracking-wide">
                  {user ? user.name : "Roshan"}
                </div>
                <div class="flex-1 text-sm tracking-wide text-gray-600 text-right">
                  {balance} {" DRGZ"}
                </div>
              </div>
            </Link>
            <div className="flex flex-col mb-4 space-y-2">
              <Link href="/account">
                <button className="flex-1 bg-green-100 border-gray-500 rounded-md font-bold text-lg p-3 focus:shadow-outline transform duration-50 hover:scale-105 ">
                  <span className="text-green-900 ">Get DRGZ</span>
                </button>
              </Link>
              <button
                className="flex-1 rounded-md font-medium p-3 bg-gray hover:bg-white focus:shadow-outline transform duration-50 hover:scale-105"
                onClick={logout}
              >
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mb-4 space-y-2 w-full">
            <Link href="/signup">
              <button className="flex-1 rounded-md font-medium p-3 bg-green-100 hover:bg-green-200 focus:shadow-outline">
                <span className="text-green-900 ">Create Account</span>
              </button>
            </Link>
            <Link href="/signin">
              <button className="flex-1 rounded-md font-medium p-3 bg-gray hover:bg-white focus:shadow-outline">
                <span>Sign In</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
