import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";

const Contact = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });
  const [result, setResult] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formDataToSend = new FormData(event.target);

    formDataToSend.append("access_key", "a745838e-8fd6-47a1-9a95-58bd2fe8925d");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        alert("✅ Registration Successful! Thank you for signing up.");
        event.target.reset(); // Reset the form fields
        setFormData({ fullname: "", email: "", organization: "", phone: "" }); // Clear state data
      } else {
        console.error("Error:", data);
        setResult(data.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setResult("Network error. Please check your connection and try again.");
    }
  };
    
  return (
    // Added top padding to prevent navbar overlap
    <div className="container mx-auto px-4 py-8 space-y-8 pt-20">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-6">
        <div className="w-full md:w-1/2 space-y-4 mb-6 md:mb-0 md:mr-8 text-center md:text-left px-4">
          <h1 className="text-4xl font-bold text-black">
            Need Assistance?
          </h1>
          <h2 className="text-3xl text-gray-600">
            Support from Our Community & Experts
          </h2>
          <p className="text-gray-500">
            Our platform is built to support healthcare professionals, researchers, and organizations in managing medical data efficiently, even in the most challenging environments. Whether you need help with secure patient data collection, seamless system integration, or customized feature development, our expert support team and global community are here to assist. We offer comprehensive training, real-time troubleshooting, and collaborative forums to ensure you get the most out of our tools, enabling better healthcare delivery, research, and decision-making worldwide.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/image 16.png"
            alt="Support Team"
            className="max-w-full h-auto rounded-lg block"
          />
        </div>
      </section>

      {/* Support Options Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Help Center Card */}
          <div 
            className={`border rounded-lg p-6 shadow-md transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full
            ${hoveredIndex === 0 
              ? 'bg-yellow-500 border-yellow-500 scale-105 shadow-lg' 
              : 'bg-white border-gray-200'}`}
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex flex-col lg:flex-row items-center h-full">
              <div className="w-full lg:w-2/3 text-center lg:text-left mb-4 lg:mb-0 lg:pr-4 flex flex-col h-full">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-semibold mb-4">
                    Help Center
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your first stop for instant answers! Browse FAQs and guides to troubleshoot issues and make the most of our platform's healthcare data tools.
                  </p>
                </div>
                <div className="mt-auto pt-4">
                  <button className="w-full lg:w-auto px-6 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors">
                    Visit Help Center
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-1/3 flex justify-center lg:justify-end mt-4 lg:mt-0">
                <img
                  src="/onlinecontact.png"
                  alt="Help Center"
                  className="w-full max-w-[200px] h-auto transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Community Forum Card */}
          <div 
            className={`border rounded-lg p-6 shadow-md transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full
            ${hoveredIndex === 1 
              ? 'bg-yellow-500 border-yellow-500 scale-105 shadow-lg' 
              : 'bg-white border-gray-200'}`}
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex flex-col lg:flex-row items-center h-full">
              <div className="w-full lg:w-2/3 text-center lg:text-left mb-4 lg:mb-0 lg:pr-4 flex flex-col h-full">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-semibold mb-4">
                    Community
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Need more help? Join discussions with doctors, researchers, and tech experts who use our platform. Get insights, ask questions, and share best practices.
                  </p>
                </div>
                <div className="mt-auto pt-4">
                  <button className="w-full lg:w-auto px-6 py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-500 transition-colors">
                    Visit Community
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-1/3 flex justify-center lg:justify-end mt-4 lg:mt-0">
                <img
                  src="/contact2.png"
                  alt="Community Forum"
                  className="w-full max-w-[200px] h-auto transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Webinars Card */}
          <div 
            className={`border rounded-lg p-6 shadow-md transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full
            ${hoveredIndex === 2 
              ? 'bg-yellow-500 border-yellow-500 scale-105 shadow-lg' 
              : 'bg-white border-gray-200'}`}
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex flex-col lg:flex-row items-center h-full">
              <div className="w-full lg:w-2/3 text-center lg:text-left mb-4 lg:mb-0 lg:pr-4 flex flex-col h-full">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-semibold mb-4">
                    Webinars 
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn from experts through live and recorded webinars covering data collection, AI integration, and digital health management.
                  </p>
                </div>
                <div className="mt-auto pt-4">
                  <button className="w-full lg:w-auto px-6 py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-500 transition-colors">
                    Webinar
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-1/3 flex justify-center lg:justify-end mt-4 lg:mt-0">
                <img
                  src="/contact2.png"
                  alt="Webinars"
                  className="w-full max-w-[200px] h-auto transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partnership and Donation Sections */}       
      <div className="max-w-9xl mx-auto p-3">         
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">           
          {/* Partner with us */}           
          <div className="relative flex justify-center">                         
            {/* Main Container */}             
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start shadow-md relative w-full md:w-[90%] sm:w-[80%] h-auto transition-transform transform hover:scale-105 hover:shadow-lg">               
              <div className="w-full md:w-2/3 flex flex-col h-full text-center md:text-left">                 
                <div>
                  <p className="text-gray-600 text-sm">Interested ?</p>                 
                  <h3 className="text-2xl font-semibold mb-2">                   
                    Partners with us                 
                  </h3>                 
                  <div className="w-25 h-1 bg-yellow-400 mb-2 mx-auto md:mx-0"></div>                 
                  <div className="w-30 h-1 bg-yellow-400 mb-2 mx-auto md:mx-0"></div>                 
                  <div className="w-40 h-1 bg-yellow-400 mb-2 mx-auto md:mx-0"></div>                 
                  <p className="text-gray-700 mb-4">                   
                    Join us in transforming healthcare technology and data collection. It allows you to develop new medical tools, improve healthcare accessibility, and support research-driven solutions.
                  </p>
                </div>
                <div className="mt-auto flex justify-center md:justify-start">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-yellow-300 text-black py-2 px-6 rounded-md hover:bg-yellow-400 transition"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>                
              <div className="w-full md:w-1/3 mt-6 md:mt-0 order-first md:order-none flex justify-center">                 
                <img                   
                  src="/contactbussiness.png"                   
                  alt="Partners"                   
                  className="w-full max-w-[200px] h-auto rounded-lg"                 
                />               
              </div>             
            </div>           
          </div>            
          
          {/* Donate Today */}           
          <div className="relative flex justify-center">             
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start shadow-md w-full md:w-[90%] h-auto transition-transform transform hover:scale-105 hover:shadow-lg">               
              <div className="w-full md:w-2/3 flex flex-col h-full text-center md:text-left">                 
                <div>
                  <p className="text-gray-600 text-sm">Want to Help ?</p>                 
                  <h3 className="text-2xl font-semibold mb-2">Donate Today</h3>                 
                  <div className="w-25 h-1 bg-yellow-400 mb-2 mx-auto md:mx-0"></div>                 
                  <div className="w-30 h-1 bg-yellow-400 mb-2 mx-auto md:mx-0"></div>                 
                  <div className="w-40 h-1 bg-yellow-400 mb-2 mx-auto md:mx-0"></div>                 
                  <p className="text-gray-700 mb-4">                   
                    Support our mission to make high-quality medical data collection tools accessible to doctors, researchers, and healthcare organizations worldwide. Your contribution helps improve healthcare accessibility, patient care, and medical research.             
                  </p>
                </div>
                {/* <div className="mt-auto pt-4 flex justify-center md:justify-start">                 
                  <button className="bg-yellow-300 text-black py-2 px-6 rounded-md hover:bg-yellow-400 transition">                   
                    Donate                 
                  </button>
                </div>                */}
              </div>               
              <div className="w-full md:w-1/3 mt-6 md:mt-0 order-first md:order-none flex justify-center">                 
                <img                   
                  src="/contactvolunteers.png"                   
                  alt="Donate"                   
                  className="w-full max-w-[200px] h-auto rounded-lg"                 
                />               
              </div>             
            </div>           
          </div>         
        </section>       
      </div>
      
      {/* Get in Touch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xl bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-center">Get in Touch</h2>
            
            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />

              <input
                type="text"
                name="organization"
                placeholder="Organization (if any)"
                value={formData.organization}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <textarea
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows="4"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 transition font-semibold"
              >
                Send Message
              </button>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-black hover:text-black text-xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;