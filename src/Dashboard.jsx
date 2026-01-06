import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MyComponent = (props) => {
  const [name, setName] = useState("");
  const [peer, setPeer] = useState("");

  const [open, setOpen] = useState(false);

  const [data, setData] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data")) || [];
    if (localData) {
      setData(localData);
    }
  }, []);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("data")) || [];
    if (details) {
      const upload = [details,...local];
      localStorage.setItem("data", JSON.stringify(upload));
    }
  }, [details]);

  function submitForm() {
    if (name && peer) {
      setData((prev) => [{ user: name, id: peer },...prev]);
    }
    setDetails({ user: name, id: peer });
    setName("");
    setPeer("");
    setOpen(!open);
  }
  function change() {
    setOpen(!open);
  }
  return (
    <>
      <div
        className={`${
          props.state ? "block" : "hidden"
        } fixed lg:static lg:block w-auto min-h-screen max-h-auto lg:w-[30%] border-r bg-[#EDEDED]`}
      >
        <div className="flex items-center p-3 justify-between mr-6 ">
          <div>
            <img
              src="/person.png"
              className="w-10 h-10 rounded-full object-cover hidden lg:block"
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
          <button className="flex gap-3 ">
            <div
              className="h-11 w-11 rounded-full active:bg-[#E3DAC9] bg-white flex justify-center items-center"
              onClick={change}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#666666"
              >
                <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
              </svg>
            </div>
            <div>
              <div className="font-normal flex justify-between">
                Add Contact
              </div>
              <div className="text-[13px] mt-1 text-gray-700">
                You can add Contacts with Peer ID.
              </div>
            </div>
          </button>
        </div>
        {data &&
          data.map((user, i) => (
            <div key={i}>
              <div className="p-3 flex items-center gap-3 bg-[#EDEDED] hover:bg-[#e0e0e0]">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src="/image.png"
                />
                <div>
                  <p className="font-semibold">{user.user}</p>
                  <div className="flex gap-1.5 items-center">
                    <p className="text-[13px] text-[#686767]">
                      Peer Id : {user.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px] bg-[#EDEDED]">
          <DialogHeader>
            <DialogTitle className={`font-medium`}>Add Contact</DialogTitle>
            <DialogDescription>
              You can add contact with name and Peer ID.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                type="text"
                placeholder="eg : Himanshu Jaiswal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Peer ID</Label>
              <Input
                id="username-1"
                name="username"
                placeholder="eg : dfd3f5ac-33c7-4a97-96c1-5a81d4ca0f9f"
                value={peer}
                onChange={(e) => setPeer(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={change}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={submitForm}
              className="bg-[#393939] hover: bg-[#3a3a3a] active:bg-[#515151]"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyComponent;
