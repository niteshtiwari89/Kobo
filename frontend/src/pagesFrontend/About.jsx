import React, { useState } from 'react';
import { Camera, Server, Users, HelpCircle } from 'lucide-react';

const About = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });
  const [result, setResult] = useState("");

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

  // Modal component
  const ContactModal = () => {
    if (!isModalOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 mb-1">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="organization" className="block text-gray-700 mb-1">Organization</label>
              <input 
                type="text" 
                id="organization" 
                name="organization" 
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-600 transition">
              Submit
            </button>
            {result && <p className="mt-2 text-center text-sm">{result}</p>}
          </form>
        </div>
      </div>
    );
  };

  const sections = [
    {
      title: "Our Impact",
      description: "We provide Relearn free of charge to over 14,000 nonprofit organizations around the world.",
      iconImage: "Vector (24).png",
    },
    {
      title: "Financials",
      description: "Relearn is a nonprofit organization, sustained by partnerships, service revenue, grants, and donations.",
      iconImage: "Vector (25).png",
    },
    {
      title: "Organisations",
      description: "Relearn is used by researchers and practitioners. Learn more about our history and partnerships.",
      iconImage: "Vector (26).png",
    },
    {
      title: "Vision & Mission",
      description: "Relearn's mission is to host and maintain Relearn and to support open source data systems and technology.",
      iconImage: "Vector (27).png",
    }
  ];

  return (
    <div>
      {/* Add padding-top to avoid navbar overlap */}
      <div className="relative flex items-center justify-center bg-white p-4 overflow-hidden pt-16 md:pt-24">
        {/* Background Elements - Improved Responsiveness */}
        <img
          src="Vector (23).png"
          alt="Decorative element"
          className="hidden md:block absolute top-20 right-4 md:top-24 md:right-10 lg:top-32 lg:right-40 w-16 h-8 md:w-20 md:h-12 lg:w-24 lg:h-20 z-0 opacity-50"
        />
        <img
          src="rb_176744 4.png"
          alt="Bee"
          className="absolute bottom-10 left-4 md:bottom-42 md:left-20 lg:bottom-40 lg:left-60 w-12 h-6 md:w-16 md:h-8 lg:w-20 lg:h-10 opacity-70"
        />
        <img
          src="rb_176744 2.png"
          alt="Bee"
          className="absolute bottom-10 right-4 md:bottom-20 md:right-10 lg:bottom-20 lg:right-30 w-20 h-14 md:w-24 md:h-16 lg:w-30 lg:h-20 opacity-100"
        />

        {/* Content Section */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between relative py-16 md:py-24">
          {/* Left Text Section */}
          <div className="w-full md:w-1/2 z-10 md:pr-12 text-center md:text-left">
            {/* Hide "About Us -" text on mobile */}
            <p className="hidden md:block text-[1.7rem] text-gray-800 font-bold tracking-normal -mt-[0.5rem] mb-3">About Us -</p>
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-2 text-gray-800 leading-tight">
              Innovating healthcare
            </h1>
            <h2 className="text-xl md:text-3xl font-medium text-gray-500 mb-6">
              with AI-powered real-time analytics.
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-prose mx-auto md:mx-0">
              ReLearn is a state-of-the-art digital platform designed to revolutionize patient data collection, optimize medical workflows, and enhance healthcare accessibility for doctors worldwide. With an intuitive interface, AI-driven analytics, and secure cloud storage, ReLearn enables healthcare professionals to seamlessly gather, manage, and analyze patient information. By automating data entry and administrative tasks, the platform helps doctors focus more on patient care while ensuring accurate diagnoses and treatment planning.
            </p>
          </div>

          {/* Right Image Section */}
          <div className="relative z-10 w-full max-w-md mt-8 md:mt-0">
            <img
              src="about-us-hero-img.png"
              alt="Data visualization"
              className="w-full relative z-20"
            />
          </div>
        </div>
      </div>

      {/* Relearn Organization Section */}
      <div className="relative py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">The Relearn Organization</h2>
            <div className="flex justify-center items-center mt-1">
              <img
                src="Frame 1000001259.png"
                alt="Decorative line"
                className="w-40 sm:w-60 h-4 sm:h-7"
              />
            </div>
          </div>

          {/* Cards Section - Improved Responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-center items-stretch">
            {sections.map((section, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  border rounded-2xl p-4 sm:p-6 relative overflow-hidden 
                  transition-all duration-300 mt-4 sm:mt-10
                  w-full h-full min-h-[200px] sm:min-h-[240px] flex flex-col items-center
                  ${hoveredIndex === index
                    ? 'bg-yellow-500 border-yellow-500 scale-105 shadow-lg'
                    : 'bg-gray-100 border-gray-200'}`
                }
              >
                {/* Top Left Icon */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-5 select-none">
                  <img
                    src="Icon pack.png"
                    alt="Decorative icon"
                    className="w-5 h-4 sm:w-7 sm:h-6 mb-1"
                  />
                </div>

                {/* Top Right Icon */}
                <div className="absolute top-4 right-4 sm:top-7 sm:right-5 select-none">
                  <img
                    src="Icon pack (1).png"
                    alt="Decorative icon"
                    className="w-5 h-4 sm:w-7 sm:h-6 mb-1"
                  />
                </div>

                {/* Title and Icon */}
                <div className="flex flex-col items-center justify-center mb-3 relative z-10">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">{section.title}</h3>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2">
                    <img
                      src={section.iconImage}
                      alt={`${section.title} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 relative z-10 mb-3 text-center flex-grow text-sm sm:text-base">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Software Section - With improved responsiveness */}
      <div className="relative bg-[#FFFFE9] p-4 sm:p-6 overflow-hidden py-16">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Bee Image for Desktop */}
          <div className="absolute -top-10 left-0 w-40 h-32">
            <img
              src="rb_176744 6.png"
              alt="Bee"
              className="w-30 h-30 hidden md:block"
            />
          </div>

          {/* Section Title */}
          <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 relative">
            Our Software
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center mt-3">
              <div className="flex justify-start mb-4">
                <img
                  src="/Frame 1000001259.png"
                  alt="Decorative line"
                  className="w-48 sm:w-60 h-6 sm:h-8 mb-1"
                />
              </div>
            </div>
          </h1>
        </div>

        <div className="max-w-6xl mx-auto px-2 sm:px-3 lg:px-4 space-y-8 sm:space-y-16">
          {/* Relearn Platform Section */}
          <div className="relative bg-[#FFFFE9] overflow-hidden flex flex-col md:flex-row min-h-[300px] md:min-h-[450px]">
            {/* Text Container */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-center relative z-10">
              <div>
                <h2 className="text-2xl sm:text-4xl font-bold mb-3 text-gray-800">
                  The Relearn Platform
                </h2>
                <div className="w-70 sm:w-70 h-1 bg-yellow-400 mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  An intuitive, AI-powered digital health platform designed to help doctors, clinics, and medical researchers manage high-quality patient and medical data, even in the most challenging healthcare environments. By integrating secure cloud storage, real-time analytics, and offline capabilities, the platform eliminates data silos—ensuring seamless information flow across hospitals, research teams, and healthcare initiatives. Whether you're conducting clinical trials, monitoring disease outbreaks, or managing hospital records, our solution provides efficient, scalable, and compliant medical data management tools for improved patient care and global health impact.
                </p>
              </div>
            </div>

            {/* Image Container */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6">
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src="software-img1.png"
                  alt="Relearn Platform"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Relearn Features Section */}
          <div className="relative bg-[#FFFFE9] overflow-hidden flex flex-col md:flex-row-reverse min-h-[300px] md:min-h-[450px]">
            {/* Text Container */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-center relative z-10 text-center md:text-right">
              <div>
                <h2 className="text-2xl sm:text-4xl font-bold mb-3 text-gray-800">
                  The Relearn Features
                </h2>
                <div className="w-70 sm:w-70 h-1 bg-yellow-400 mb-4 mx-auto md:ml-auto"></div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  Our platform equips healthcare professionals with advanced tools for data collection, development, and project management. With offline data access, doctors and researchers can record and analyze patient information in any setting, ensuring no critical data is lost. The system's customizable templates allow for tailored medical surveys, clinical research, and disease tracking. Seamless integration with hospital systems and AI-powered insights improve workflow efficiency, while secure data storage ensures compliance with healthcare regulations, making it a trusted solution for medical professionals worldwide.
                </p>
              </div>
            </div>

            {/* Image Container */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6">
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src="software-img2.png"
                  alt="Relearn Features"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section - Improved for responsiveness */}
      <div className="relative bg-white py-12 sm:py-16">
        {/* Yellow background blobs */}
        <div className="absolute top-0 right-30 w-70 h-30">
          <img
            src="Vector 23.png"
            alt="Decorative vector"
            className="hidden md:block absolute bottom-10 right-10 sm:bottom-20 sm:right-30 w-40 h-32 sm:w-30 sm:h-20"
          />
        </div>
        <div className="absolute -bottom-25 left-10 w-50 h-50">
          <img
            src="Vector 24.png"
            alt="Decorative vector"
            className="hidden md:block absolute right-10 sm:bottom-20 sm:right-30 w-16 h-12 sm:w-30 sm:h-20"
          />
        </div>

        {/* Bee illustration */}
        <div className="absolute top-4 left-4 w-40 h-32">
          <img src="rb_176744 7.png" alt="Bee" className="w-30 h-30 hidden md:block" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center mb-12 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Services and partnerships</h2>
            <div className="flex justify-center mb-4">
              <img
                src="Frame 1000001259.png"
                alt="Decorative line"
                className="w-40 h-7 mb-1"
              />
            </div>
            <p className="text-black font-bold text-base md:text-lg text-center inline-block mx-auto max-w-lg">
              We collaborate with healthcare organizations worldwide to provide tailored solutions for their medical data collection needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mx-auto">
            {/* Feature Development */}
            <div className="bg-yellow-50 border border-gray-100 rounded-lg p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center min-h-[200px] sm:min-h-[250px]">
              <div className="w-full lg:w-auto lg:flex-grow text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-center lg:text-left">Feature development</h3>
                <div className="w-40 h-1 bg-yellow-200 mt-1 mb-1 mx-auto lg:mx-0 mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 text-center lg:text-left">Collaborate with our team to create specialized digital health tools tailored for doctors, clinics, and researchers. From custom medical forms to AI-powered patient analytics, we develop solutions to meet unique healthcare needs.</p>
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0 flex justify-center">
                <img
                  src="rb_349 1.png"
                  alt="Feature Development"
                  className="w-full lg:w-[145px] max-w-[200px] lg:h-[95px] object-contain"
                />
              </div>
            </div>

            {/* Organization Server Set Up */}
            <div className="bg-yellow-50 border border-gray-100 rounded-lg p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center min-h-[200px] sm:min-h-[250px]">
              <div className="w-full lg:w-auto lg:flex-grow text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-center lg:text-left">Secure Hospital Server Setup</h3>
                <div className="w-50 h-1 bg-yellow-200 mt-1 mb-1 mx-auto lg:mx-0 mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 text-center lg:text-left">We provide secure, scalable, and compliant medical data servers for hospitals, clinics, and NGOs. Our servers support real-time data syncing, offline access, and multi-location collaboration, making them ideal for medical research and patient tracking.</p>
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0 flex justify-center">
                <img
                  src="rb_3890 1.png"
                  alt="Organization Server"
                  className="w-full lg:w-[145px] max-w-[200px] lg:h-[95px] object-contain"
                />
              </div>
            </div>

            {/* Training and Consultations */}
            <div className="bg-yellow-50 border border-gray-100 rounded-lg p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center min-h-[200px] sm:min-h-[250px]">
              <div className="w-full lg:w-auto lg:flex-grow text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-center lg:text-left">Training and consultations</h3>
                <div className="w-50 h-1 bg-yellow-200 mt-1 mb-1 mx-auto lg:mx-0 mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 text-center lg:text-left">Our expert-led training equips healthcare professionals with the skills to optimize digital health solutions. We provide hands-on guidance in EHR implementation, telemedicine, AI diagnostics, and data analysis, helping streamline workflows, improve accuracy, and ensure regulatory compliance.</p>
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0 flex justify-center">
                <img
                  src="rb_9659 1.png"
                  alt="Training"
                  className="w-full lg:w-[145px] max-w-[200px] lg:h-[95px] object-contain"
                />
              </div>
            </div>

            {/* User Support and Upgrades */}
            <div className="bg-yellow-50 border border-gray-100 rounded-lg p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center min-h-[200px] sm:min-h-[250px]">
              <div className="w-full lg:w-auto lg:flex-grow text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-center lg:text-left">User support and upgrades</h3>
                <div className="w-50 h-1 bg-yellow-200 mt-1 mb-1 mx-auto lg:mx-0 mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 text-center lg:text-left">We provide ongoing system monitoring, updates, and support to ensure seamless healthcare operations. Our team delivers technical assistance, security patches, and performance upgrades, keeping systems secure, reliable, and optimized. As healthcare evolves, we continuously update features, AI capabilities, and compliance standards to help medical professionals stay ahead.</p>
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0 flex justify-center">
                <img
                  src="rb_2148899174 1.png"
                  alt="User Support"
                  className="w-full lg:w-[125px] max-w-[150px] lg:h-[70px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Behind Relearn Section - Improved responsiveness */}
      <div className="relative bg-[#FFFFE9] overflow-hidden py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 relative">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Behind Relearn</h2>
            <div className="flex justify-center mb-4">
              <img
                src="Frame 1000001259.png"
                alt="Decorative line"
                className="w-40 h-7 mb-1"
              />
            </div>
          </div>
          
          {/* Bee decorations */}
          <div className="absolute top-1/6 right-2 z-10">
            <div className="bee-container absolute top-0 right-0 w-40 h-30">
              <img
                src="rb_176744 4.png"
                alt="Bee"
                className="absolute bottom-10 right-10 sm:bottom-20 sm:right-30 w-16 h-12 sm:w-30 sm:h-20 hidden md:block"
              />
            </div>
          </div>
          <div className="absolute bottom-20 right-1/2 z-10">
            <div className="bee-container absolute bottom-3 right-30 w-100 h-80">
              <img
                src="rb_176744 7.png"
                alt="Bee"
                className="absolute bottom-10 right-10 sm:bottom-20 sm:right-30 w-16 h-12 sm:w-30 sm:h-20 hidden md:block"
              />
            </div>
          </div>
          <div className="absolute bottom-20 right-1/2 z-10">
            <div className="bee-container absolute bottom-18 right-70 w-100 h-80">
              <img
                src="rb_176744 6.png"
                alt="Bee"
                className="absolute bottom-10 right-10 sm:bottom-20 sm:right-30 w-16 h-12 sm:w-30 sm:h-20 hidden md:block"
              />
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column - Text */}
            <div className="flex mt-4 md:mt-10">
              <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed">
                We are a passionate team of healthcare innovators, developers, and data specialists dedicated to revolutionizing medical data collection. Our goal is to equip doctors, researchers, and healthcare organizations with cutting-edge digital tools that enhance patient monitoring, clinical trials, and public health initiatives. By integrating AI-powered analytics, offline data access, and secure cloud storage, we empower medical professionals to make data-driven decisions, improve healthcare accessibility, and drive innovative solutions for global health challenges, ensuring better patient outcomes worldwide.
              </p>
            </div>

            {/* Right Column - Boxes */}
            <div className="space-y-4 md:space-y-6 mt-4 md:mt-10">
              {/* Our Team & Board */}
              <div className="bg-[#FFFFE9] border border-black rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Leadership & Experts</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">Meet our team of medical technology experts, engineers, and healthcare professionals driving the future of digital health solutions. Our leaders bring experience from global healthcare, AI development, and medical research, ensuring the platform evolves with industry needs.</p>
              </div>

              {/* Relearn Ambassadors */}
              <div className="bg-[#FFFFE9] border border-black rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Global Health Ambassadors</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">A network of health professionals and researchers helping implement data-driven healthcare solutions worldwide. These experts work on the ground to support hospitals, NGOs, and healthcare initiatives, ensuring the best use of technology in patient care.</p>
              </div>


              {/* Community Council */}
              <div className="bg-[#FFFFE9] border border-black rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Healthcare Advisory Council
                </h3>
                <p className="text-gray-600 mb-4">A diverse group of doctors, public health specialists, and data scientists guiding the platform’s development, compliance, and innovation. The council provides insights into health policies, research methodologies, and emerging trends to ensure continuous platform improvement.</p>
                {/* <button className="text-blue-600 hover:underline">See more...</button> */}
              </div>

              {/* Jobs & Volunteer Opportunities */}
              <div className="bg-[#FFFFE9] border border-black rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Careers & Volunteering</h3>
                <p className="text-gray-600 mb-4">Join us in shaping the future of medical data technology! Explore opportunities in health tech development, data management, and digital health training. Whether you're a developer, researcher, or healthcare professional, your skills can contribute to transforming global healthcare through digital innovation.</p>
                {/* <button className="text-blue-600 hover:underline">See more...</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership and Donation Sections */}
      <div className="max-w-7xl justify-center mx-auto p-3">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Partner with us */}
          <div className="relative flex justify-center">
            {/* Main Container */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start shadow-md relative w-full md:w-[90%] sm:w-[80%] h-auto transition-transform transform hover:scale-105 hover:shadow-lg">
              <div className="w-full md:w-2/3 flex flex-col h-full">
                <div>
                  <p className="text-gray-600 text-sm">Interested ?</p>
                  <h3 className="text-2xl font-semibold mb-2">Partners with us</h3>
                  <div className="w-25 h-1 bg-yellow-400 mb-2"></div>
                  <div className="w-30 h-1 bg-yellow-400 mb-2"></div>
                  <div className="w-40 h-1 bg-yellow-400 mb-2"></div>
                  <p className="text-gray-700 mb-4">
                  Join us in transforming healthcare technology and data collection.It allows you to develop new medical tools, improve healthcare accessibility, and support research-driven solutions.
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
              <div className="w-full md:w-1/3 mt-6 md:mt-0 order-last md:order-none">
                <img
                  src="/contactbussiness.png"
                  alt="Partners"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Donate Today */}
          <div className="relative flex justify-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start shadow-md w-full md:w-[90%] h-auto transition-transform transform hover:scale-105 hover:shadow-lg">
              <div className="w-full md:w-2/3 flex flex-col h-full">
                <div>
                  <p className="text-gray-600 text-sm">Want to Help ?</p>
                  <h3 className="text-2xl font-semibold mb-2">Donate Today</h3>
                  <div className="w-25 h-1 bg-yellow-400 mb-2"></div>
                  <div className="w-30 h-1 bg-yellow-400 mb-2"></div>
                  <div className="w-40 h-1 bg-yellow-400 mb-2"></div>
                  <p className="text-gray-700 mb-4">
                  Support our mission to make high-quality medical data collection tools accessible to doctors, researchers, and healthcare organizations worldwide. Your contribution helps improve healthcare accessibility, patient care, and medical research.
                  </p>
                </div>
                {/* <div className="mt-auto">
            <button className="bg-yellow-300 text-black py-2 px-6 rounded-md hover:bg-yellow-400 transition">                   
              Donate                 
            </button>
          </div> */}
              </div>
              <div className="w-full md:w-1/3 mt-6 md:mt-0 order-last md:order-none">
                <img
                  src="/contactvolunteers.png"
                  alt="Donate"
                  className="w-full h-auto rounded-lg"
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

export default About;