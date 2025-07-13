import React, { useState, useEffect } from "react";

const Home = ({
    RelearnboxImage = "/Toolbox.png",
    groundTruthImage = "/Searching.png",
    innovationImage = "/innovation.png",
    sunflowerImage = "/home.png",
}) => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
      // Check if we need to scroll to testimonial section
      const shouldScroll = localStorage.getItem('scrollToTestimonial');
      if (shouldScroll) {
        const section = document.getElementById("testimonial");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
        localStorage.removeItem('scrollToTestimonial');
      }
    }, []);
 
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
      };
    
      const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      };

    // testimonials
    const testimonials = [
        {
            id: 1,
            text: "Managing my patients has never been easier! The automated appointment system and EHR access have saved me hours of administrative work.",
            name: "Lora Smith",
            color: "bg-gray-100",
            textColor: "text-gray-800",
            image: "/Ellipse 1.png",
        },
        {
            id: 2,
            text: "The AI-powered insights help me track my patients' progress in ways I couldn't before. This platform has truly revolutionized my practice.",
            name: "Lora Smith",
            color: "bg-yellow-400",
            textColor: "text-black",
            image: "/Ellipse 1.png",
        },
        {
            id: 3,
            text: "I love how easy it is to conduct remote consultations. The telemedicine feature is seamless and has helped me provide better care to my patients, even in rural areas.",
            name: "Lora Smith",
            color: "bg-gray-100",
            textColor: "text-gray-800",
            image: "/Ellipse 1.png",
        },
    ];

    return (
        <>
            {/* Added pt-20 to account for sticky navbar */}
            <div className="w-full bg-white min-h-screen flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden relative pt-20 md:pt-20">
                {/* Text Content - Centered on mobile */}
                <div className="w-full md:w-1/2 max-w-2xl text-center md:text-left space-y-6 z-10 mt-10 md:mt-0 md:pr-8 lg:pr-12">
                    <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-black leading-tight">
                    Transforming Healthcare with Smart Digital Solutions
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700">
                    Empowering Healthcare Professionals with Seamless Data Collection
                    </p>
                    <div className="flex justify-center md:justify-start">
                        <button 
                            onClick={() => window.location.href = "about"} 
                            className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-white font-bold text-lg sm:text-xl py-3 px-6 sm:py-4 sm:px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                        >
                            How it works
                        </button>
                    </div>

                    {/* Statistics Section - Centered items on mobile */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8 text-center">
                        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500">
                                241
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-gray-900">
                                Countries & Territories
                            </p>
                        </div>
                        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500">
                                20m+
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-gray-900">
                                Survey Collected Per Month
                            </p>
                        </div>
                        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500">
                                10+
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-gray-900">
                                Years of Experience
                            </p>
                        </div>
                        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500">
                                14,000+
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-gray-900">
                                Organizations
                            </p>
                        </div>
                    </div>
                </div>
            
                {/* Sunflowers Image Container */}
                <div className="hidden md:block md:absolute md:right-1 md:top-1/2 md:transform md:-translate-y-1/2 md:w-1/2 z-10">
                    <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-2xl ml-auto">
                        <img
                            src={sunflowerImage}
                            alt="Sunflowers"
                            className="w-full max-w-[100%] object-contain transform transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Mobile Image - Centered */}
                <div className="md:hidden w-full flex justify-center mt-6">
                    <div className="max-w-xs sm:max-w-sm">
                        <img
                            src={sunflowerImage}
                            alt="Sunflowers"
                            className="w-full max-w-[100%] object-contain transform transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>
            
            {/* Technology non-profit section */}
            <div className="container mx-auto px-4 sm:px-10 py-12">
                <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
                    Technology for Research & <br className="hidden md:block" /> Innovation for Mankind
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Maintain Relearn */}
                    <div
                        className={`${hoveredCard === "Relearnbox"
                                ? "bg-yellow-400 scale-105 shadow-2xl"
                                : "bg-amber-50"
                            } rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-yellow-400 cursor-pointer`}
                        onMouseEnter={() => setHoveredCard("Relearnbox")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <h2 className="text-xl font-bold mb-4">Maintain Relearn</h2>
                        <div className="flex justify-center mb-4">
                            <img
                                src={RelearnboxImage}
                                alt="Relearn"
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-gray-800 font-semibold">
                        We provide a widely used data collection tool for challenging environments, ensuring nonprofits can access and utilize it for free.
                        </p>
                    </div>

                    {/* Provide Ground Truth */}
                    <div
                        className={`${hoveredCard === "groundtruth"
                                ? "bg-yellow-400 scale-105 shadow-2xl"
                                : "bg-amber-50"
                            } rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-yellow-400 cursor-pointer`}
                        onMouseEnter={() => setHoveredCard("groundtruth")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <h2 className="text-xl font-bold mb-4">
                            Provide Individual Truth Data
                        </h2>
                        <div className="flex justify-center mb-4">
                            <img
                                src={groundTruthImage}
                                alt="Ground Truth"
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-gray-800 font-semibold">
                        We generate accurate, high-quality data to support organizations in humanitarian aid, healthcare, development, and environmental efforts worldwide.
                        </p>
                    </div>

                    {/* Drive Innovation */}
                    <div
                        className={`${hoveredCard === "innovation"
                                ? "bg-yellow-400 scale-105 shadow-2xl"
                                : "bg-amber-50"
                            } rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-yellow-400 cursor-pointer`}
                        onMouseEnter={() => setHoveredCard("innovation")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <h2 className="text-xl font-bold mb-4">Empower Data-Driven Decisions</h2>
                        <div className="flex justify-center mb-4">
                            <img
                                src={innovationImage}
                                alt="Drive Innovation"
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-gray-800 font-semibold">
                        We equip organizations with powerful tools to collect, analyze, and interpret data, enabling informed decision-making for impactful outcomes.
                        </p>
                    </div>
                </div>
            </div>

 
           {/* Services & Packages section */}
           <section className="py-16 px-4">
              <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-10">
                Service & Packages
              </h1>
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                
                {/* Community Plan */}
                <div className="bg-amber-50 p-6 rounded-2xl shadow-lg text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-300 cursor-pointer flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-col items-center">
                      <img src="/image 13.png" alt="Community Icon" className="w-12 h-12 mb-3" />
                      <h3 className="text-2xl font-bold text-black">INDIVIDUAL</h3>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      The plan for everyone, the perfect solution for most projects.
                    </p>
                    <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                      <li>&#10003; 10 minutes/month</li>
                      <li>&#10003; File Storage up to 10GB</li>
                      <li>&#10003; Survey submissions 5,000/month</li>
                    </ul>
                    <p className="text-2xl font-bold mt-4">Free</p>
                  </div>
                  <button className="mt-4 px-6 py-2 bg-white border border-gray-400 rounded-full hover:bg-gray-200">
                    Choose
                  </button>
                </div>

                {/* Professional Plan */}
                <div className="bg-amber-50 p-6 rounded-2xl shadow-lg text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-300 cursor-pointer flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-col items-center">
                      <img src="/image 13.png" alt="Professional Icon" className="w-12 h-12 mb-3" />
                      <h3 className="text-2xl font-bold text-black">PROFESSIONAL</h3>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      For individuals with higher data collection needs.
                    </p>
                    <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                      <li>&#10003; 120 minutes/month</li>
                      <li>&#10003; Machine translation of transcripts</li>
                      <li>&#10003; File Storage (Unlimited)</li>
                      <li>&#10003; Survey submissions 25,000/month</li>
                    </ul>
                    <p className="text-2xl font-bold mt-4">$159/month</p>
                  </div>
                  <button className="mt-4 px-6 py-2 bg-white border border-gray-400 rounded-full hover:bg-gray-200">
                    Choose
                  </button>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-amber-50 p-6 rounded-2xl shadow-lg text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-300 cursor-pointer flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-col items-center">
                      <img src="/image 13.png" alt="Enterprise Icon" className="w-12 h-12 mb-3" />
                      <h3 className="text-2xl font-bold text-black">ENTERPRISE</h3>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      For teams that need advanced solutions and support.
                    </p>
                    <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                      <li>&#10003; Unlimited minutes/month</li>
                      <li>&#10003; AI-driven analytics</li>
                      <li>&#10003; Premium support</li>
                      <li>&#10003; Custom integrations</li>
                    </ul>
                    <p className="text-2xl font-bold mt-4">Contact Us</p>
                  </div>
                  <button className="mt-4 px-6 py-2 bg-white border border-gray-400 rounded-full hover:bg-gray-200">
                    Choose
                  </button>
                </div>

              </div>
            </section>

            {/* Call to action section */}
            <div className="bg-yellow-400 rounded-2xl py-4 px-6 flex flex-col md:flex-row items-center justify-between w-[90%] max-w-4xl mx-auto shadow-lg mb-8">
              {/* Left Side - Image */}
              <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                <img
                  src="/girlsetting.png"
                  alt="Decision Help"
                  className="w-40 md:w-52 object-contain transform scale-110"
                />
              </div>
              
              {/* Right Side - Text & Button - Center aligned on mobile */}
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h2 className="text-2xl md:text-5xl font-bold text-gray-900 text-center md:text-left">
                  Hard time deciding
                  <br />
                  what's best for you?
                </h2>
                <div className="flex justify-center md:justify-start">
                  <button onClick={() => window.location.href = "feature"} className="mt-4 px-8 py-2 bg-white text-gray-900 font-semibold shadow-md hover:bg-gray-200 rounded-lg transition duration-300">
                    Learn more
                  </button>
                </div>
              </div>
            </div>

            {/* Testimonials section */}
            <section id="testimonial" className="flex flex-col items-center p-6 max-w-7xl mx-auto w-full mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Testimonials</h2>

              {/* Desktop View - Grid Layout */}
              {!isMobile ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className={`p-8 rounded-lg shadow-lg text-center relative ${
                        hoveredCard === testimonial.id 
                          ? "bg-yellow-400 scale-105 shadow-2xl" 
                          : "bg-white"
                      } transform transition-all duration-300 hover:scale-105 hover:bg-yellow-400 cursor-pointer`}
                      onMouseEnter={() => setHoveredCard(testimonial.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="flex flex-col items-center">
                        {/* Centered and smaller comma icon */}
                        <div className="absolute top-4 inset-x-0 flex justify-center">
                          <img
                            src="/Icon pack.png"
                            alt="Comma"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        
                        <p className="text-sm px-4 mb-4 mt-6">{testimonial.text}</p>
                        
                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden mb-4">
                          <img
                            src={testimonial.image}
                            alt="Customer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Mobile View - Sliding Carousel - Centered content
                <div className="relative w-full max-w-md h-[350px] px-4">
                  <div className="relative h-full overflow-hidden">
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={testimonial.id}
                        className={`absolute inset-0 transform transition-all duration-500 mt-6 ${
                          index === currentIndex
                            ? "opacity-100 translate-x-0"
                            : index < currentIndex
                            ? "-translate-x-full opacity-0"
                            : "translate-x-full opacity-0"
                            
                        }`}
                      >
                        <div className="p-8 rounded-lg shadow-lg text-center bg-white border border-gray-200 flex flex-col items-center">
                          {/* Centered and smaller comma icon */}
                          <div className="absolute top-4 inset-x-0 flex justify-center">
                            <img
                              src="/Icon pack.png"
                              alt="Comma"
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                          
                          <p className="text-sm px-4 mb-4 mt-6 text-center">{testimonial.text}</p>
                          
                          <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden mb-4">
                            <img
                              src={testimonial.image}
                              alt="Customer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <h3 className="font-semibold text-lg text-center">{testimonial.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Navigation Buttons */}
                  <button 
                    onClick={() => goToPrevSlide()}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10"
                  >
                    &#10094;
                  </button>
                  <button 
                    onClick={() => goToNextSlide()}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10"
                  >
                    &#10095;
                  </button>
                </div>
              )}
            </section>
        </>
    );
};

export default Home;