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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MyComponent = (props) => {
  const [name, setName] = useState("");
  const [peer, setPeer] = useState("");
  const [image, setImage] = useState("");
  const [nameError, setNameError] = useState("");
  const [peerError, setPeerError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [data, setData] = useState([]);

  const isValidPeerId = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  const validateName = (nameValue) => {
    if (!nameValue.trim()) {
      setNameError("Name is required");
      return false;
    }
    if (nameValue.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePeerId = (peerValue) => {
    if (!peerValue.trim()) {
      setPeerError("Peer ID is required");
      return false;
    }
    if (!isValidPeerId(peerValue.trim())) {
      setPeerError("Invalid Peer ID format. Expected UUID format (e.g., xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)");
      return false;
    }
    setPeerError("");
    return true;
  };

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data")) || [];
    if (Array.isArray(localData)) {
      setData(localData);
    } else {
      setData([]);
    }
  }, []);

  function submitForm(e) {
    e.preventDefault();

    const isNameValid = validateName(name);
    const isPeerValid = validatePeerId(peer);

    if (isNameValid && isPeerValid) {
      let updatedData;
      if (editingIndex !== null) {
        updatedData = [...data];
        updatedData[editingIndex] = { user: name, id: peer, image: image };
        setData(updatedData);
        localStorage.setItem("data", JSON.stringify(updatedData));
        setEditingIndex(null);
      } else {
        updatedData = [{ user: name, id: peer, image: image }, ...data];
        setData(updatedData);
        localStorage.setItem("data", JSON.stringify(updatedData));
      }
      setName("");
      setPeer("");
      setImage("");
      setOpen(false);

      if (props.onContactsChange) {
        props.onContactsChange(updatedData);
      }
    }
  }

  function handleEdit(index) {
    setEditingIndex(index);
    setName(data[index].user);
    setPeer(data[index].id);
    setImage(data[index].image || "");
    setOpen(true);
  }

  function handleDelete(index) {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
    if (props.onContactsChange) {
      props.onContactsChange(updatedData);
    }
  }

  function clearForm() {
    setName("");
    setPeer("");
    setImage("");
    setNameError("");
    setPeerError("");
    setEditingIndex(null);
  }

  function change() {
    setOpen(!open);
  }

  function handleCancel() {
    clearForm();
    setOpen(false);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-20
        w-4/5 max-w-xs sm:w-80 md:w-96
        lg:static lg:block lg:w-[40%]
        min-h-screen max-h-auto
        border-r bg-[#EDEDED] dark:bg-[#2d2d2d] border-gray-200 dark:border-gray-700
        overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${
          props.state
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center p-3 justify-between">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              onClick={props.onToggleSidebar}
              title="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22px"
                viewBox="0 -960 960 960"
                width="22px"
                fill="#434343"
              >
                <path d="M280-200 240-240 440-440 240-640 280-680 480-480 680-680 720-640 520-440 720-240 680-200 480-400 280-200Z" />
              </svg>
            </button>
            <img
              src="/person.png"
              className="w-10 h-10 rounded-full object-cover hidden lg:block"
            />
          </div>
          <div>
            <button
              onClick={props.toggleTheme}
              className="rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              title={props.theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              <img
                src="/moon.png"
                className="w-6 h-6 object-cover"
              />
            </button>
          </div>
        </div>
        <div className="bg-[#9DE1FE] dark:bg-[#3d5a80] h-23 flex items-center p-5 relative">
          <button className="flex gap-3 ">
            <div
              className="h-11 w-11 rounded-full active:bg-[#E3DAC9] dark:active:bg-[#4a5a70] bg-white dark:bg-[#4a5a70] flex justify-center items-center"
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
              <div className="font-normal flex justify-between text-black dark:text-white">
                Add Contact
              </div>
              <div className="text-[13px] mt-1 text-gray-700 dark:text-gray-300">
                You can add Contacts with Peer ID.
              </div>
            </div>
          </button>
        </div>
        {Array.isArray(data) &&
          data.map((user, i) => (
            <div key={i}>
              <div className="p-3 flex items-center gap-3 bg-[#EDEDED] dark:bg-[#2d2d2d] hover:bg-[#e0e0e0] dark:hover:bg-[#3d3d3d] justify-between group">
                <div className="flex items-center gap-3 flex-1">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={user.image || "/image.png"}
                  />
                  <div>
                    <p className="font-semibold text-black dark:text-white">{user.user}</p>
                    <div className="flex gap-1.5 items-center">
                      <p className="text-[13px] text-gray-700 dark:text-gray-400">
                        Peer Id : {user.id}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(i)}
                    className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 -960 960 960"
                      width="18px"
                      fill="currentColor"
                    >
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q11 12 17 26.5t6 30.5q0 16-6 30.5T817-660L313-156q-11 11-25.5 17t-30.5 6h-97Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 -960 960 960"
                      width="18px"
                      fill="currentColor"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h120v-40h320v40h120v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#EDEDED] dark:bg-[#2d2d2d] border-gray-300 dark:border-gray-600" showCloseButton={false}>
          <DialogHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <DialogTitle className="font-medium text-black dark:text-white">
                  {editingIndex !== null ? "Edit Contact" : "Add Contact"}
                </DialogTitle>
                <DialogDescription className="text-gray-700 dark:text-gray-300">
                  {editingIndex !== null
                    ? "Update contact details including name, image, and Peer ID."
                    : "Enter contact details including name, image, and Peer ID."
                  }
                </DialogDescription>
              </div>
              <button
                type="button"
                onClick={() => {
                  clearForm();
                  setOpen(false);
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl leading-none p-1"
                title="Close"
              >
                ✕
              </button>
            </div>
          </DialogHeader>
          <form onSubmit={submitForm} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="eg : Himanshu Jaiswal"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) validateName(e.target.value);
                }}
                className="h-10 text-base"
              />
              {nameError && <span className="text-red-600 text-xs">{nameError}</span>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="h-10"
              />
              {image && (
                <div className="flex items-center gap-2">
                  <img src={image} alt="preview" className="w-12 h-12 rounded-full object-cover" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Image selected</span>
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="peer-id">Peer ID</Label>
              <Input
                id="peer-id"
                name="peer-id"
                type="text"
                placeholder="eg : dfd3f5ac-33c7-4a97-96c1-5a81d4ca0f9f"
                value={peer}
                onChange={(e) => {
                  setPeer(e.target.value);
                  if (peerError) validatePeerId(e.target.value);
                }}
                className="h-10 text-base"
              />
              {peerError && <span className="text-red-600 text-xs">{peerError}</span>}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-[#393939] hover:bg-[#3a3a3a] dark:bg-[#4a5a70] dark:hover:bg-[#5a6a80] active:bg-[#515151] dark:active:bg-[#3a4a60]"
              >
                {editingIndex !== null ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyComponent;
