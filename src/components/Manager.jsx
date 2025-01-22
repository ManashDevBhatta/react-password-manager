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
    if (form.site.length > 3 && form.username.length > 4 && form.password.length > 6) {
      const updatedPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
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
      {/* Background */}
      <div className="relative min-h-screen w-full bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        {/* Main Content */}
        <div className="relative z-10 p-4 min-h-full">
          <div className="py-6">
            <h1 className="text-white text-4xl font-bold text-center">
              <span className="text-green-400">&lt;Pw</span>
              Manager
              <span className="text-green-400">/&gt;</span>
            </h1>
            <p className="text-green-400 text-lg text-center ">
              Manage Your Passwords
            </p>
          </div>

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
            <h2 className="text-white font-bold text-2xl px-10 py-7">Your Passwords</h2>
            {passwordArray.length === 0 && (
              <div className="text-gray-500 px-10 ">No passwords to show</div>
            )}

            {passwordArray.length !== 0 && (
              <div className="overflow-x-auto">
                <table className="text-white table-auto w-full rounded-md overflow-hidden table-layout-auto max-w-full">
                  <thead className="text-white bg-transparent">
                    <tr>
                      <th className="py-2 px-4">Site</th>
                      <th className="py-2 px-4">Username</th>
                      <th className="py-2 px-4">Password</th>
                      <th className="py-2 px-4 hidden md:table-cell">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gradient-to-r from-green-300 to-sky-600">
                    {passwordArray.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center py-2 border border-gray-500">
                            <div className="flex items-center justify-center">
                              <a href={item.site} target="_blank">
                                {item.site}
                              </a>
                              <div
                                className="size-7 cursor-pointer copyicon"
                                onClick={() => {
                                  copyText(item.site);
                                }}
                              >
                                <lord-icon
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    paddingTop: "3px",
                                    paddingLeft: "3px",
                                  }}
                                  src="https://cdn.lordicon.com/iykgtsbt.json"
                                  trigger="hover"
                                  colors="primary:#ffffff"
                                ></lord-icon>
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-2 border border-gray-500">
                            <div className="flex items-center justify-center">
                              {item.username}
                              <div
                                className="size-7 cursor-pointer copyicon"
                                onClick={() => {
                                  copyText(item.username);
                                }}
                              >
                                <lord-icon
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    paddingTop: "3px",
                                    paddingLeft: "3px",
                                  }}
                                  src="https://cdn.lordicon.com/iykgtsbt.json"
                                  trigger="hover"
                                  colors="primary:#ffffff"
                                ></lord-icon>
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-2 border border-gray-500">
                            <div className="flex items-center justify-center">
                              {item.password}
                              <div
                                className="size-7 cursor-pointer copyicon"
                                onClick={() => {
                                  copyText(item.password);
                                }}
                              >
                                <lord-icon
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    paddingTop: "3px",
                                    paddingLeft: "3px",
                                  }}
                                  src="https://cdn.lordicon.com/iykgtsbt.json"
                                  trigger="hover"
                                  colors="primary:#ffffff"
                                ></lord-icon>
                              </div>
                            </div>
                          </td>
                          <td className="flex items-center justify-center text-center py-2 border border-gray-500  md:table-cell">
                            <span
                              className="cursor-pointer mx-1"
                              onClick={() => {
                                editPassword(item.id);
                              }}
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
                              onClick={() => {
                                deletePassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                trigger="hover"
                                colors="primary:#ffffff,secondary:#ffffff"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
