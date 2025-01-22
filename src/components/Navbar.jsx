import React from 'react'
import { FiGithub } from "react-icons/fi";

const Navbar = () => {
  const handleGitHubClick = () => {
    window.open('https://github.com/ManashDevBhatta', '_blank');
  };
  return (
    <nav className='bg-violet-700 '>
        <div className="mycontainer py-5 text-white flex justify-center gap-8  md:justify-between items-center h-[58px] ">

        <div className="logo font-bold text-2xl">
            <span className="text-green-400">&lt;Pw</span>

            Manager
            <span className="text-green-400">/&gt;</span>
            </div>
        <button onClick={handleGitHubClick} className=' font-semibold cursor-pointer rounded-xl flex items-center gap-1  border border-white p-1 hover:scale-95 transition-all duration-300 ease-in-out'>
          GitHub
        < FiGithub />
        </button>
        </div>
    </nav>
  )
}

export default Navbar
