import React from "react";

const services = [
  // Service data commented out in original code
];

const Feature = () => {
  return (
    <div className="space-y-16 p-4 lg:p-12 bg-gray-100 pt-20 sm:pt-24">
      {/* Quality Data Collection Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-4 lg:p-12">
        {/* Text Content - Centered on mobile */}
        <div className="md:w-1/2 text-center md:text-left space-y-4 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-black leading-tight">
            Reliable Data Collection <br className="hidden sm:block" /> for Healthcare Professionals
          </h2>
          <p className="text-sm mt-6 sm:mt-10 sm:text-base md:text-lg lg:text-xl font-medium text-gray-600">
            ReLearn is designed by medical practitioners for practitioners. Its intuitive interface ensures seamless usage, making data collection effortless. Accessible on any device and even offline, it enables healthcare professionals to work efficiently in any setting. Most importantly, ReLearn offers core functionalities free of charge for nonprofit healthcare organizations.
          </p>
        </div>

        {/* Illustration - Fixed visibility on mobile */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center px-4">
          <img
            src="/featurehero.png"
            alt="Data Collection Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </section>

      {/* First section */}
      <section className="flex flex-col lg:flex-row items-center justify-between bg-gray-100 p-4 lg:p-12 rounded-lg">
        {/* Image Section */}
        <div className="w-full lg:w-5/12 flex justify-center mb-6 lg:mb-0">
          <img
            src="/rb_3460 1.png"
            alt="Illustration"
            className="w-10/12 max-w-xs lg:max-w-md"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-7/12 bg-yellow-200 p-6 lg:p-10 rounded-lg shadow-md">
          <h2 className="text-xl lg:text-2xl font-bold text-black mb-4 text-center lg:text-left">
            Advanced Medical Form Development
          </h2>
          <ul className="space-y-3">
            {[
              "Easily create digital health forms with an intuitive drag-and-drop builder.",
              "Choose from 25+ question types for medical assessments, patient history, and clinical surveys.",
              "Implement skip logic and validation to ensure accurate and high-quality healthcare data collection.",
              "Translate forms into multiple languages for global healthcare accessibility.",
              "Use XLSForm for advanced editing, making it easy to structure complex medical workflows.",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start border-white border-2 border-dotted rounded-lg p-2 mb-2"
              >
                <span className="text-black text-lg font-bold mr-2">✔</span>
                <p className="text-black">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Second section */}
      <section className="flex flex-col lg:flex-row-reverse items-center justify-between bg-gray-100 p-4 lg:p-12 rounded-lg">
        {/* Image Section (Now on the Right) */}
        <div className="w-full lg:w-5/12 flex justify-center mb-6 lg:mb-0">
          <img
            src="/rb_3460 1.png"
            alt="Illustration"
            className="w-10/12 max-w-xs lg:max-w-md"
          />
        </div>

        {/* Text Content (Now on the Left) */}
        <div className="w-full lg:w-7/12 bg-yellow-200 p-6 lg:p-10 rounded-lg shadow-md">
          <h2 className="text-xl lg:text-2xl font-bold text-black mb-4 text-center lg:text-left">
            Real-Time Data Collection & Sync
          </h2>
          <ul className="space-y-3">
            {[
              "Instant data capture for patient records, medical surveys, and clinical observations.",
              "Seamless auto-syncing between hospitals, mobile clinics, and research centers.",
              "Offline data collection with automatic upload when connected.",
              "Live dashboards for real-time analysis of patient trends.",
              "Data integrity features like audit logs and backup recovery.",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start border-white border-2 border-dotted rounded-lg p-2 mb-2"
              >
                <span className="text-black text-lg font-bold mr-2">✔</span>
                <p className="text-black">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Third section */}
      <section className="flex flex-col lg:flex-row items-center justify-between bg-gray-100 p-4 lg:p-12 rounded-lg">
        {/* Image Section */}
        <div className="w-full lg:w-5/12 flex justify-center mb-6 lg:mb-0">
          <img
            src="/rb_3460 1.png"
            alt="Illustration"
            className="w-10/12 max-w-xs lg:max-w-md"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-7/12 bg-yellow-200 p-6 lg:p-10 rounded-lg shadow-md">
          <h2 className="text-xl lg:text-2xl font-bold text-black mb-4 text-center lg:text-left">
            Customizable Healthcare Workflows
          </h2>
          <ul className="space-y-3">
            {[
              "Automate hospital workflows for smooth patient management.",
              "Custom data forms for clinical trials and research.",
              "Role-based access control for secure data handling.",
              "Dynamic approval processes for medical reviews",
              "Integration with existing hospital systems",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start border-white border-2 border-dotted rounded-lg p-2 mb-2"
              >
                <span className="text-black text-lg font-bold mr-2">✔</span>
                <p className="text-black">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fourth section */}
      <section className="flex flex-col lg:flex-row-reverse items-center justify-between bg-gray-100 p-4 lg:p-12 rounded-lg">
        {/* Image Section (Now on the Right) */}
        <div className="w-full lg:w-5/12 flex justify-center mb-6 lg:mb-0">
          <img
            src="/rb_3460 1.png"
            alt="Illustration"
            className="w-10/12 max-w-xs lg:max-w-md"
          />
        </div>

        {/* Text Content (Now on the Left) */}
        <div className="w-full lg:w-7/12 bg-yellow-200 p-6 lg:p-10 rounded-lg shadow-md">
          <h2 className="text-xl lg:text-2xl font-bold text-black mb-4 text-center lg:text-left">
            Multi-Language & Accessibility Support
          </h2>
          <ul className="space-y-3">
            {[
              "Translate forms into multiple languages for global reach.",
              "Voice input & text-to-speech for accessibility.",
              "Offline mode for remote healthcare workers.",
              "Mobile-friendly UI for on-the-go data collection.",
              "Custom font & color settings for better readability.",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start border-white border-2 border-dotted rounded-lg p-2 mb-2"
              >
                <span className="text-black text-lg font-bold mr-2">✔</span>
                <p className="text-black">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services and Partnerships Section */}
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
          <p className="text-black font-bold text-base md:text-lg text-center inline-block mx-auto px-4">
            We collaborate with healthcare organizations worldwide to provide tailored solutions for their medical data collection needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-7xl mx-auto">
          {/* Feature Development */}
          <div className="bg-yellow-50 border border-gray-100 rounded-lg p-6 flex flex-col lg:flex-row lg:items-center min-h-[250px]">
            <div className="w-full lg:w-auto lg:flex-grow text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-center lg:text-left">Feature development</h3>
              <div className="w-40 h-1 bg-yellow-200 mt-1 mb-4 mx-auto lg:mx-0"></div>
              <p className="text-base text-gray-600 mb-4 text-center lg:text-left px-2 lg:px-0">
                Collaborate with our team to create specialized digital health tools tailored for doctors, clinics, and researchers. From custom medical forms to AI-powered patient analytics, we develop solutions to meet unique healthcare needs.
              </p>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0 flex justify-center">
              <img 
                src="rb_349 1.png" 
                alt="Feature Development" 
                className="w-full max-w-[200px] lg:w-[145px] lg:h-[95px] object-contain"
              />
            </div>
          </div>
          
          {/* Organization Server Set Up */}
          <div className="bg-yellow-50 border border-gray-100 rounded-lg p-6 flex flex-col lg:flex-row lg:items-center min-h-[250px]">
            <div className="w-full lg:w-auto lg:flex-grow text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-center lg:text-left">Secure Hospital Server Setup</h3>
              <div className="w-50 h-1 bg-yellow-200 mt-1 mb-4 mx-auto lg:mx-0"></div>
              <p className="text-base text-gray-600 mb-4 text-center lg:text-left px-2 lg:px-0">
                We provide secure, scalable, and compliant medical data servers for hospitals, clinics, and NGOs. Our servers support real-time data syncing, offline access, and multi-location collaboration, making them ideal for medical research and patient tracking.
              </p>
            </div> 
            <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0 flex justify-center">
              <img 
                src="rb_3890 1.png" 
                alt="Organization Server" 
                className="w-full max-w-[200px] lg:w-[145px] lg:h-[95px] object-contain"
              />
            </div>
          </div>
          
          {/* Training and Consultations */}
          <div className="bg-yellow-50 border border-gray-100 rounded-lg p-6 flex flex-col lg:flex-row lg:items-center min-h-[250px]">
            <div className="w-full lg:w-auto lg:flex-grow text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-center lg:text-left">Training and consultations</h3>
              <div className="w-50 h-1 bg-yellow-200 mt-1 mb-4 mx-auto lg:mx-0"></div>
              <p className="text-base text-gray-600 mb-4 text-center lg:text-left px-2 lg:px-0">
                Our expert-led training equips healthcare professionals with the skills to optimize digital health solutions. We provide hands-on guidance in EHR implementation, telemedicine, AI diagnostics, and data analysis, helping streamline workflows, improve accuracy, and ensure regulatory compliance.
              </p>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0 flex justify-center">
              <img 
                src="rb_9659 1.png" 
                alt="Training" 
                className="w-full max-w-[200px] lg:w-[145px] lg:h-[95px] object-contain"
              />
            </div>
          </div>
          
          {/* User Support and Upgrades */}
          <div className="bg-yellow-50 border border-gray-100 rounded-lg p-6 flex flex-col lg:flex-row lg:items-center min-h-[250px]">
            <div className="w-full lg:w-auto lg:flex-grow text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2 text-center lg:text-left">User support and upgrades</h3>
              <div className="w-50 h-1 bg-yellow-200 mt-1 mb-4 mx-auto lg:mx-0"></div>
              <p className="text-base text-gray-600 mb-4 text-center lg:text-left px-2 lg:px-0">
                We provide ongoing system monitoring, updates, and support to ensure seamless healthcare operations. Our team delivers technical assistance, security patches, and performance upgrades, keeping systems secure, reliable, and optimized. As healthcare evolves, we continuously update features, AI capabilities, and compliance standards to help medical professionals stay ahead.
              </p>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0 flex justify-center">
              <img 
                src="rb_2148899174 1.png" 
                alt="User Support" 
                className="w-full max-w-[150px] lg:w-[125px] lg:h-[70px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;