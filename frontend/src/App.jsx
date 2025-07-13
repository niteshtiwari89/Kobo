// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import ProjectDetails from "./pages/ProjectDetails";
// import LibraryTemplate from "./pages/LibraryTemplate";
// import CreateForm from "./pages/CreateForm";
// import TermsAndCondition from "./pages/TermsAndConditions";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import PreviewForm from "./pages/PreviewForm";
// // import PrivateRoute from './PrivateRoute'

// import LoginForm from "./pages/LoginForm";
// import SignupForm from "./pages/SignupForm";

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<SignupForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/home/*" element={<Home />} />
//         <Route path="/create-form" element={<CreateForm />} />
//         <Route path="/library-template" element={<LibraryTemplate />} />
//         <Route path="/project-details" element={<ProjectDetails />} />
//         <Route path="/terms-and-condition" element={<TermsAndCondition />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/preview-form/:templateId" element={<PreviewForm />} />
//         {/* <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
//         <Route path="/create-form" element={<PrivateRoute><CreateForm /></PrivateRoute>} />
//         <Route path="/library-template" element={<PrivateRoute><LibraryTemplate /></PrivateRoute>} />
//         <Route path="/project-details" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
//         <Route path="/terms-and-condition" element={<TermsAndCondition />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
//       </Routes>
//     </>
//   );
// };

// export default App;



import { useState, useEffect } from "react";
import { Routes, Route, useNavigate , useLocation  } from "react-router-dom";
import Navbar from "./componentsFront/Navbar";
import Footer from "./componentsFront/Footer";
import HomePrivate from "./pages/Home";
import Home from "./pagesFrontend/Home";
import About from "./pagesFrontend/About";
import Pricing from "./pagesFrontend/Pricing";
import Service from "./pagesFrontend/Service";
import Feature from "./pagesFrontend/Feature";
import Contact from "./pagesFrontend/Contact";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import ProjectDetails from "./pages/ProjectDetails";
import LibraryTemplate from "./pages/LibraryTemplate";
import CreateForm from "./pages/CreateForm";
import TermsAndCondition from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PrivateRoute from "./PrivateRoutes";
import { ToastContainer } from "react-toastify";
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import PreviewForm from "./pages/PreviewForm";
import LibraryForm from "./pages/LibraryForm";
import PreviewLibraryForm from "./pages/PreviewLibraryForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      setIsLoggedIn(true);
      
      // Only redirect to /home/deployed if user is on a public route (initial load)
      const publicRoutes = ['/', '/about', '/pricing', '/service', '/feature', '/contact', '/login', '/signup'];
      const currentPath = location.pathname;
      
      if (publicRoutes.includes(currentPath)) {
        navigate("/home/deployed");
      }
    } else {
      setIsLoggedIn(false);
      
      // If no token and user is on a private route, redirect to login
      const privateRoutes = ['/home', '/create-form', '/library-form', '/library-template', '/project-details'];
      const isPrivateRoute = privateRoutes.some(route => location.pathname.startsWith(route));
      
      if (isPrivateRoute) {
        navigate("/login");
      }
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {/* Conditionally render Navbar and Footer only when not logged in */}
      {!isLoggedIn && <Navbar />}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/service" element={<Service />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* Private Routes (Only accessible when logged in) */}
        <Route path="/home/*" element={<PrivateRoute element={<HomePrivate />} />} />
        <Route path="/create-form" element={<PrivateRoute element={<CreateForm />} />} />
        <Route path="/library-form" element={<PrivateRoute element={<LibraryForm />} />} />
        <Route path="/library-template" element={<PrivateRoute element={<LibraryTemplate />} />} />
        <Route path="/project-details/*" element={<PrivateRoute element={<ProjectDetails />} />} />
        <Route path="/terms-and-condition" element={<PrivateRoute element={<TermsAndCondition />} />} />
        <Route path="/privacy-policy" element={<PrivateRoute element={<PrivacyPolicy />} />} />
        <Route path="/preview-form/:templateId" element={<PrivateRoute element={<PreviewForm />} />} />
        <Route path="/preview-library-form/:formId" element={<PrivateRoute element={<PreviewLibraryForm />} />} />
      </Routes>

      {/* Conditionally render Footer only when not logged in */}
      {!isLoggedIn && <Footer />}
    </>
  );
};

export default App;
