import { useState } from "react";
function MyComponents() {
  return (
    <div className={`border-r border-gray-300 block lg:hidden fixed bg-[#EDEDED]`}>
      <div className="flex items-center p-3 justify-between mr-6">
        <div>
          <img
            src="/person.png"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <img
            src="/moon.png"
            className="w-7 h-7 rounded-full object-cover mr-2"
          />
          <div>
            <svg
              className="mr-3"
              fill="#878787"
              width="24px"
              height="24px"
              viewBox="0 0 256.00 256.00"
              id="Flat"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#878787"
              stroke-width="0.00256"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#CCCCCC"
                stroke-width="2.048"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M65.77441,54.46033a8.00119,8.00119,0,0,1,0,11.31445,87.95677,87.95677,0,0,0-22.78955,39.4375,7.99995,7.99995,0,1,1-15.45849-4.127,103.97686,103.97686,0,0,1,26.93457-46.625A8.00178,8.00178,0,0,1,65.77441,54.46033Zm-22.77587,96.3164A7.99983,7.99983,0,1,0,27.544,154.91736,103.97631,103.97631,0,0,0,54.45508,201.556a7.99984,7.99984,0,0,0,11.30273-11.32422A87.96258,87.96258,0,0,1,42.99854,150.77673Zm107.7749,62.24219a87.94957,87.94957,0,0,1-45.54981-.01758,8.00007,8.00007,0,1,0-4.14062,15.45508,103.98087,103.98087,0,0,0,53.8457.01367,8.00008,8.00008,0,0,0-4.15527-15.45117Zm72.03418-67.89746a7.99909,7.99909,0,0,0-9.79248,5.666,87.951,87.951,0,0,1-22.78955,39.4375,8.00018,8.00018,0,0,0,11.31347,11.31445,103.97037,103.97037,0,0,0,26.93457-46.625A8.00058,8.00058,0,0,0,222.80762,145.12146ZM213.001,105.224a8.00006,8.00006,0,1,0,15.45507-4.14063A103.9608,103.9608,0,0,0,201.54492,54.4447a7.99984,7.99984,0,0,0-11.30273,11.32422A87.94691,87.94691,0,0,1,213.001,105.224ZM105.22656,42.98084a87.94957,87.94957,0,0,1,45.54981.01757A8.00006,8.00006,0,1,0,154.917,27.54334a104.009,104.009,0,0,0-53.8457-.01368,8.00008,8.00008,0,0,0,4.15527,15.45118Z"></path>{" "}
              </g>
            </svg>
          </div>
          <img src="/message.png" className="w-5 h-5 mr-3.5" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#999888"
          >
            <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
          </svg>
        </div>
      </div>
      <div className="bg-[#9DE1FE] h-23 flex items-center p-5 relative">
        <div className="flex gap-3">
          <div className="h-11 w-11 rounded-full bg-white flex justify-center items-center">
            <img src="/wifi.png" className="h-7 w-7" />
          </div>
          <div>
            <div className="font-normal flex justify-between">
              No Contacts
              <button className="cancel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#434343"
                  className="absolute top-2 right-4"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>
            <div className="text-[13px] mt-1 text-gray-700">
              You can import Contacts from Google
              <span className="underline"> Learn More.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-11.5 bg-white p-2">
        <div className="bg-[#EDEDED] p-1.5 rounded-lg flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-355"
            height="20px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#3CB371"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
          <input
            className="flex-1 border-none outline-none text-[13px] ml-7 text-[#3e3e3e]"
            placeholder="Search or start a new chat"
          />
        </div>
      </div>
      <div>
        <div className="p-3 flex items-center gap-3 bg-[#EDEDED]">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="/image.png"
          />
          <div>
            <p className="font-semibold">John Smith</p>
            <div className="flex gap-1.5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-355"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="#686767"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
              <p className="text-[13px] text-[#686767]">Testing</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200">
        <div className="p-3 flex items-center gap-3 bg-white">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="/child.png"
          />
          <div>
            <p className="font-semibold">Jane Doe</p>
            <div className="flex gap-1.5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-355"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="#686767"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
              <p className="text-[13px] text-[#686767]">Hello there!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200">
        <div className="p-3 flex items-center gap-3 bg-white">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="/sitting.png"
          />
          <div>
            <p className="font-semibold">Bob Johnson</p>
            <div className="flex gap-1.5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-355"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
                fill="#1E90FF"
              >
                <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
              </svg>
              <p className="text-[13px] text-[#686767]">How are you?</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200">
        <div className="p-3 flex items-center gap-3 bg-white">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="/mountain.png"
          />
          <div>
            <p className="font-semibold">Samantha Lee</p>
            <div className="flex gap-1.5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-355"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="#686767"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
              <p className="text-[13px] text-[#686767]">See you tomorrow!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200">
        <div className="p-3 flex items-center gap-3 bg-white">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="/forest.png"
          />
          <div>
            <p className="font-semibold">William Chen</p>
            <div className="flex gap-1.5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
                fill="#666666"
                className="rotate-355"
              >
                <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
              </svg>
              <p className="text-[13px] text-[#686767]">
                Thanks for your help!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200">
        <div className="p-3 flex items-center gap-3 bg-white">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="/flowers.png"
          />
          <div>
            <p className="font-semibold">Emily Kim</p>
            <div className="flex gap-1.5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-355"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
                fill="#1E90FF"
              >
                <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
              </svg>
              <p className="text-[13px] text-[#686767]">
                Are you free tonight?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponents;
