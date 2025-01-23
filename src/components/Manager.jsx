import React, { useState, useEffect } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 4 &&
      form.password.length > 6
    ) {
      const updatedPasswordArray = [
        ...passwordArray,
        { ...form, id: uuidv4() },
      ];
      setPasswordArray(updatedPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
      setForm({ site: "", username: "", password: "" });
    } else {
      toast("Check the length of the inputs you entered!");
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Are you sure?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };

  const editPassword = (id) => {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="absolute top-0 z-[-2] h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <div className="p-3 md:mycontainer md:min-h-[84.4vh] min-h-[86.4vh]  ">
        <h1 className="text-white text-4xl font-bold text-center">
          <span className="text-green-400">&lt;Pw</span>
          Manager
          <span className="text-green-400">/&gt;</span>
        </h1>
        <p className="text-green-400 text-lg text-center ">
          Manage Your Passwords
        </p>

        <div className="flex flex-col p-4 text-black gap-4 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter name/URL of the website"
            type="text"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              type="text"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                type={isVisible ? "text" : "password"}
                className="rounded-full border border-green-500 w-full p-4 py-1"
                name="password"
                id="password"
              />
              <span
                className="text-black absolute right-1 top-2 cursor-pointer"
                onClick={toggleVisibility}
              >
                {isVisible ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="text-white flex justify-center gap-1 items-center bg-green-500 hover:bg-green-600 rounded-full w-fit px-4 py-0.5 hover:border hover:border-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="text-white font-bold text-2xl px-2  py-4">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-gray-500 px-2 ">No passwords to show</div>
          )}

          {passwordArray.length !== 0 && (
            <div className="p-1">
              <table className="text-white table-fixed w-full border-collapse rounded-md">
                <thead className="bg-transparent">
                  <tr>
                    <th className="py-2 w-1/4">Site</th>
                    <th className="py-2 w-1/4">Username</th>
                    <th className="py-2 w-1/4">Password</th>
                    <th className="py-2 w-1/6">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gradient-to-r from-green-300 to-sky-600">
                  {passwordArray.map((item, index) => (
                    <tr key={index}>
                      {/* Site Cell */}
                      <td className="text-left pl-2 py-2 w-1/4 border border-gray-500">
                        <div className="flex items-center justify-between overflow-hidden">
                          <a
                            href={item.site}
                            target="_blank"
                            className="overflow-x-auto whitespace-nowrap no-scrollbar"
                            title={item.site}
                          >
                            {item.site}
                          </a>
                          <div
                            className="size-7 cursor-pointer copyicon"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              colors="primary:#ffffff"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      {/* Username Cell */}
                      <td className="text-left pl-2 py-2 w-1/4 border border-gray-500">
                        <div className="flex items-center justify-between overflow-hidden">
                          <span
                            className="overflow-x-auto whitespace-nowrap no-scrollbar"
                            title={item.username}
                          >
                            {item.username}
                          </span>
                          <div
                            className="size-7 cursor-pointer copyicon"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              colors="primary:#ffffff"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      {/* Password Cell */}
                      <td className="text-left pl-2 py-2 w-1/4 border border-gray-500">
                        <div className="flex items-center justify-between overflow-hidden">
                          <span
                            className="overflow-x-auto whitespace-nowrap no-scrollbar"
                            title={item.password}
                          >
                            {item.password}
                          </span>
                          <div
                            className="size-7 cursor-pointer copyicon"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              colors="primary:#ffffff"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      {/* Actions Cell */}
                      <td className="text-center py-2 w-1/4 border border-gray-500">
                        <div className="flex justify-center items-center">
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => editPassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/fikcyfpp.json"
                              trigger="hover"
                              colors="primary:#ffffff,secondary:#ffffff"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => deletePassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/hwjcdycb.json"
                              trigger="hover"
                              colors="primary:#ffffff,secondary:#ffffff"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
