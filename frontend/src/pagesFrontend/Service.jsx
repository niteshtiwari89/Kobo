import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Service = () => {
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
    <div>
      {/* Hero Section - Fixed padding-top to avoid navbar overlap */}
      <div className="relative flex items-start justify-center bg-white p-4 overflow-hidden pt-20 sm:pt-24">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative">
          {/* Left Text Section - Centered on mobile */}
          <div className="w-full md:w-1/2 z-10 md:pr-8 text-center md:text-left px-4">
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-8 text-black">
              Tailored Healthcare Solutions
            </h1>

            <p className="text-black mb-6 leading-relaxed max-w-prose mx-auto md:mx-0">
              We offer comprehensive digital health solutions designed to support hospitals, research institutions, and healthcare organizations worldwide. Our platform provides secure and scalable medical data collection tools, ensuring efficient patient monitoring, clinical research, and diagnostics. Our ongoing support and continuous feature development ensure that organizations stay ahead in digital healthcare transformation while maintaining security, compliance, and operational efficiency.
            </p>
          </div>

          {/* Right Image Section - Updated for better mobile responsiveness */}
          <div className="relative z-10 w-full md:max-w-md mt-8 md:mt-0 flex justify-center">
            <img
              src="/Illustration.png"
              alt="Data visualization"
              className="w-3/4 sm:w-4/5 md:w-full max-w-xs md:max-w-md relative z-20"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative bg-white mt-10 p-4 sm:p-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 relative">
            Our Services
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center mt-3">
              <div className="flex justify-start mb-4">
                <img
                  src="/Frame 1000001259.png"
                  alt="Decorative line"
                  className="w-36 sm:w-48 md:w-60 h-4 sm:h-6 md:h-8 mb-1"
                />
              </div>
            </div>
          </h1>
        </div>

        <div className="max-w-6xl mx-auto px-4 lg:px-6 space-y-8 md:space-y-12">
          {/* Comprehensive Medical Data Collection Section - Improved responsive images */}
          <div className="relative overflow-hidden flex flex-col md:flex-row p-4 md:p-10">
            {/* Text Container */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                  Comprehensive Medical Data Collection
                </h2>
                <div className="w-37 h-1 bg-yellow-400 mb-6 mx-auto md:mx-0"></div>
                <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                  A powerful data collection system that enables healthcare professionals to gather, store, and analyze patient information efficiently. With customizable digital forms and real-time analytics, doctors and researchers can streamline workflows and improve decision-making in clinical settings.
                </p>
              </div>
            </div>

            {/* Image Container - Updated for better responsiveness */}
            <div className="w-full md:w-1/2 mt-4 md:mt-0 flex justify-center">
              <div className="relative w-3/4 sm:w-3/5 md:w-full max-w-xs md:max-w-md">
                <img
                  src="/software-img1.png"
                  alt="Comprehensive Medical Data Collection"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Secure & Scalable Cloud Storage Section */}
          <div className="relative overflow-hidden flex flex-col md:flex-row-reverse p-4 md:p-10">
            {/* Text Container */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-right px-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                  Secure & Scalable Cloud Storage
                </h2>
                <div className="w-50 h-1 bg-yellow-400 mb-6 mx-auto md:ml-auto"></div>
                <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                  Our platform offers encrypted cloud-based storage, ensuring safe access to critical medical records. It supports offline data collection, automatically syncing when connectivity is restored—ideal for remote healthcare environments.
                </p>
              </div>
            </div>

            {/* Image Container - Updated for better responsiveness */}
            <div className="w-full md:w-1/2 mt-4 md:mt-0 flex justify-center">
              <div className="relative w-3/4 sm:w-3/5 md:w-full max-w-xs md:max-w-md">
                <img
                  src="/software-img2.png"
                  alt="Secure & Scalable Cloud Storage"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* AI-Driven Data Insights Section */}
          <div className="relative overflow-hidden flex flex-col md:flex-row p-4 md:p-10">
            {/* Text Container */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                  AI-Driven Data Insights
                </h2>
                <div className="w-50 h-1 bg-yellow-400 mb-6 mx-auto md:mx-0"></div>
                <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                  Leverage AI-powered analytics to track patient trends, monitor disease outbreaks, and enhance healthcare planning. Real-time insights enable early detection of health issues, improving patient outcomes.
                </p>
              </div>
            </div>

            {/* Image Container - Updated for better responsiveness */}
            <div className="w-full md:w-1/2 mt-4 md:mt-0 flex justify-center">
              <div className="relative w-3/4 sm:w-3/5 md:w-full max-w-xs md:max-w-md">
                <img
                  src="/software-img1.png"
                  alt="AI-Driven Data Insights"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Training & Expert Support Section */}
          <div className="relative overflow-hidden flex flex-col md:flex-row-reverse p-4 md:p-10">
            {/* Text Container */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-right px-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                  Training & Expert Support
                </h2>
                <div className="w-50 h-1 bg-yellow-400 mb-6 mx-auto md:ml-auto"></div>
                <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                  We provide specialized training programs for doctors, nurses, and medical researchers to maximize digital data tools. Our dedicated support team offers continuous assistance and system updates to keep your operations running smoothly.
                </p>
              </div>
            </div>

            {/* Image Container - Updated for better responsiveness */}
            <div className="w-full md:w-1/2 mt-4 md:mt-0 flex justify-center">
              <div className="relative w-3/4 sm:w-3/5 md:w-full max-w-xs md:max-w-md">
                <img
                  src="/software-img2.png"
                  alt="Training & Expert Support"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Partner and Donate Sections - Improved mobile layout with responsive images */}
          <div className="max-w-9xl mx-auto p-4 md:p-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Partner with us */}
              <div className="relative flex justify-center">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start shadow-md relative w-full md:w-[90%] h-full transition-transform transform hover:scale-105 hover:shadow-lg">
                  <div className="w-full md:w-2/3 text-center md:text-left flex flex-col h-full px-4">
                    <div>
                      <p className="text-gray-600 text-sm">Interested ?</p>
                      <h3 className="text-2xl font-semibold mb-2">
                        Partner with us
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
                  <div className="w-full md:w-1/3 mt-6 md:mt-0 flex justify-center">
                    <img
                      src="/contactbussiness.png"
                      alt="Partners"
                      className="w-4/5 sm:w-2/3 md:w-full max-w-xs h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Donate Today */}
              <div className="relative flex justify-center">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start shadow-md w-full md:w-[90%] h-full transition-transform transform hover:scale-105 hover:shadow-lg">
                  <div className="w-full md:w-2/3 text-center md:text-left flex flex-col h-full px-4">
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
                    {/* Donation button could be added here */}
                  </div>
                  <div className="w-full md:w-1/3 mt-6 md:mt-0 flex justify-center">
                    <img
                      src="/contactvolunteers.png"
                      alt="Donate"
                      className="w-4/5 sm:w-2/3 md:w-full max-w-xs h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Get in Touch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xl bg-black bg-opacity-50 z-50 p-4">
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
              className="absolute top-3 right-3 text-black hover:text-gray-700 text-xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;