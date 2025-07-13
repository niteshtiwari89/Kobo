// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// const Navbar = () => {
//   const [active, setActive] = useState("Home");
//   const [menuOpen, setMenuOpen] = useState(false);

//   const navItems = [
//     "Home",
//     "About", 
//     "Feature",
//     "Service", 
//     "Pricing", 
//     "Contact",
//   ];

//   return (
//     <nav className="bg-[#FFD51980] shadow-md py-4 px-6">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link 
//           to="/" 
//           className="flex items-center space-x-2"
//           onClick={() => setActive("Home")}
//         >
//           <img 
//             src="/logo1.png" 
//             alt="Logo" 
//             className="h-10 w-auto cursor-pointer" 
//           />
//         </Link>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center space-x-4">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-gray-900"
//           >
//             {menuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* Navigation Links for Desktop */}
//         <div className="hidden md:flex items-center justify-end space-x-8 w-full">
//           <div className="flex items-center space-x-6 mr-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item}
//                 to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
//                 onClick={() => setActive(item)}
//                 className={`text-gray-900 hover:text-black text-md font-medium transition-colors duration-300 ${
//                   active === item ? "font-bold" : ""
//                 }`}
//               >
//                 {item}
//               </Link>
//             ))}
//           </div>

//           {/* Login Button */}
//           <Link
//             to="/login"
//             className="bg-amber-50 hover:bg-amber-90 text-black font-medium py-2 px-4 rounded-md transition-colors duration-300 justify-end"
//           >
//             Login
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden flex flex-col py-2 px-6 space-y-4 justify-center items-center">
//           {navItems.map((item) => (
//             <Link
//               key={item}
//               to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
//               onClick={() => {
//                 setActive(item);
//                 setMenuOpen(false);
//               }}
//               className={`text-gray-900 hover:text-black text-lg font-medium transition-colors duration-300 ${
//                 active === item ? "font-bold" : ""
//               }`}
//             >
//               {item}
//             </Link>
//           ))}

//           {/* Mobile Login Button */}
//           <Link
//             to="/login"
//             className="bg-amber-50 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-md transition-colors duration-300 w-full text-center"
//             onClick={() => setMenuOpen(false)}
//           >
//             Login
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-12 py-4 bg-[#FED600]">
      {/* Logo */}
      <div className="flex items-center">
        <img className="h-14" src="/logo1.png" alt="" />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link>
        <Link to="/about" className="text-gray-800 hover:text-gray-600">About</Link>
        <Link to="/feature" className="text-gray-800 hover:text-gray-600">Feature</Link>
        <Link to="/service" className="text-gray-800 hover:text-gray-600">Service</Link>
        <Link to="/pricing" className="text-gray-800 hover:text-gray-600">Pricing</Link>
        <Link to="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link>
        <Link to="/login" className="bg-white px-5 py-2 rounded font-medium text-gray-800">Login</Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-8 h-8"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 ease-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
        </button>
      </div>

      {/* Mobile Menu - Now opens from left side */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black bg-opacity-25" onClick={toggleMenu}></div>
        <nav className={`absolute top-0 left-0 bottom-0 flex flex-col w-64 max-w-sm py-6 px-6 bg-yellow-100 border-r overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-xl">RELEARN</span>
            <button className="focus:outline-none" onClick={toggleMenu}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>Home</Link>
            <Link to="/about" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>About</Link>
            <Link to="/feature" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>Feature</Link>
            <Link to="/service" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>Service</Link>
            <Link to="/pricing" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>Pricing</Link>
            <Link to="/contact" className="text-gray-800 hover:text-gray-600" onClick={toggleMenu}>Contact</Link>
            <Link to="/login" className="bg-white px-5 py-2 rounded font-medium text-gray-800" onClick={toggleMenu}>Login</Link>
          </div>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;