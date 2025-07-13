import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const Pricing = () => {
    const [openSection, setOpenSection] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      message: "",
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Submitted", formData);
      alert("Your request has been sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        organization: "",
        message: "",
      });
      setIsModalOpen(false);
    };

  // Updated FAQ sections with content and new format
  const faqSections = [
    { 
      title: 'Signing up for a plan',
      content: (
        <>
          <p className="mb-3">🔹 <strong>How do I create an account?</strong>
          <br/>You can sign up by visiting our <strong>registration page</strong> and selecting a plan that fits your needs.</p>
          
          <p className="mb-3">🔹 <strong>Can nonprofits use the platform for free?</strong>
          <br/>Yes! Nonprofit organizations can access our <strong>Community Plan</strong> at no cost.</p>
          
          <p className="mb-3">🔹 <strong>What information do I need to provide during registration?</strong>
          <br/>You'll need to provide your name, email address, organization details, and select your preferred plan.</p>
          
          <p>🔹 <strong>Can I try the platform before committing to a paid plan?</strong>
          <br/>Yes, we offer a 14-day free trial for all our paid plans with full access to features.</p>
        </>
      )
    },
    { 
      title: 'Payments and billing',
      content: (
        <>
          <p className="mb-3">🔹 <strong>What payment methods do you accept?</strong>
          <br/>We accept <strong>credit cards, wire transfers, and invoicing for enterprise clients</strong>.</p>
          
          <p className="mb-3">🔹 <strong>Can I switch between plans?</strong>
          <br/>Yes, you can <strong>upgrade or downgrade your plan anytime</strong> based on your needs.</p>
          
          <p className="mb-3">🔹 <strong>Do you offer annual billing discounts?</strong>
          <br/>Yes, we offer a 15% discount when you choose annual billing instead of monthly.</p>
          
          <p className="mb-3">🔹 <strong>How does billing work for additional users?</strong>
          <br/>Additional users are billed according to your plan's per-user rate on a prorated basis.</p>
          
          <p>🔹 <strong>What happens if I exceed my plan's limits?</strong>
          <br/>We'll notify you when you approach your limits and provide options to upgrade or add additional resources.</p>
        </>
      )
    },
    { 
      title: 'Usage',
      content: (
        <>
          <p className="mb-3">🔹 <strong>Is my data accessible offline?</strong>
          <br/>Yes, our platform <strong>supports offline data collection and syncs automatically when online</strong>.</p>
          
          <p className="mb-3">🔹 <strong>How secure is my data?</strong>
          <br/>We use <strong>end-to-end encryption, multi-factor authentication, and strict compliance protocols</strong>.</p>
          
          <p className="mb-3">🔹 <strong>Is the platform HIPAA compliant?</strong>
          <br/>Yes, our Professional and Enterprise plans are fully HIPAA compliant and include BAAs for healthcare organizations.</p>
          
          <p className="mb-3">🔹 <strong>Can I collect data in areas with limited connectivity?</strong>
          <br/>Yes, our mobile app works offline and will automatically sync your data when connectivity is restored.</p>
          
          <p>🔹 <strong>Are there limits on the amount of data I can collect?</strong>
          <br/>Data limits vary by plan. Community plans have basic limits while Professional and Enterprise plans offer expanded or unlimited storage.</p>
        </>
      )
    },
    { 
      title: 'Managing your plan',
      content: (
        <>
          <p className="mb-3">🔹 <strong>Can I add more users to my account?</strong>
          <br/>Yes, depending on your plan, you can <strong>manage user roles and permissions</strong> easily.</p>
          
          <p className="mb-3">🔹 <strong>How do I export my collected data?</strong>
          <br/>Data can be exported in <strong>multiple formats</strong>, including <strong>CSV, Excel, and JSON</strong>, for analysis.</p>
          
          <p className="mb-3">🔹 <strong>Can I customize form templates for my organization?</strong>
          <br/>Yes, all plans include customizable templates. Enterprise plans offer additional branding options.</p>
          
          <p className="mb-3">🔹 <strong>How do I transfer ownership of my account?</strong>
          <br/>Account ownership can be transferred through the admin dashboard by inviting a new admin and transferring privileges.</p>
          
          <p>🔹 <strong>What happens to my data if I cancel my subscription?</strong>
          <br/>You'll have 30 days to export your data before it's removed from our systems. Nonprofit accounts can request data archiving.</p>
        </>
      )
    },
    { 
      title: 'Add-ons for additional usage',
      content: (
        <>
          <p className="mb-3">🔹 <strong>Can I integrate the platform with other tools?</strong>
          <br/>Yes, we offer <strong>API access and integrations with third-party systems</strong> for advanced workflows.</p>
          
          <p className="mb-3">🔹 <strong>Do you provide dedicated servers?</strong>
          <br/>Yes, we offer <strong>private, scalable server solutions</strong> for organizations needing <strong>enhanced security and control</strong>.</p>
          
          <p className="mb-3">🔹 <strong>What analytics capabilities are available as add-ons?</strong>
          <br/>We offer advanced analytics packages including real-time dashboards, predictive modeling, and AI-powered insights for healthcare data.</p>
          
          <p className="mb-3">🔹 <strong>Can I get custom development for specialized features?</strong>
          <br/>Yes, our Enterprise clients can request custom development for specialized features and workflows specific to their medical operations.</p>
          
          <p>🔹 <strong>Are there add-ons for regulatory compliance?</strong>
          <br/>We offer specialized compliance packages for different healthcare regulations including GDPR, HIPAA, and regional healthcare data requirements.</p>
        </>
      )
    },
    { 
      title: 'Technical support',
      content: (
        <>
          <p className="mb-3">🔹 <strong>What support options are available?</strong>
          <br/>We offer tiered support based on your plan: email support for all users, chat support for Professional plans, and 24/7 phone support for Enterprise clients.</p>
          
          <p className="mb-3">🔹 <strong>Do you provide implementation assistance?</strong>
          <br/>Yes, Professional and Enterprise plans include implementation support. Enterprise plans receive dedicated onboarding specialists.</p>
          
          <p className="mb-3">🔹 <strong>Is there a knowledge base or documentation available?</strong>
          <br/>Yes, we maintain comprehensive documentation, video tutorials, and regular webinars for all users.</p>
          
          <p>🔹 <strong>What is your average response time for support tickets?</strong>
          <br/>Community plan tickets are addressed within 48 hours, Professional within 24 hours, and Enterprise within 4 hours for critical issues.</p>
        </>
      )
    },
  ];

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };
  const [selectedPlan, setSelectedPlan] = useState('Non-Profit');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showMore, setShowMore] = useState(false);
  
  // Define both sets of plans
  const nonProfitPlans = [
    {
      id: "np-community",
      title: "INDIVIDUAL",
      price: "Free",
      description: "Unleash the power of automation for non-profits.",
      features: [
        "Multi-step Zaps",
        "5 Premium Apps",
        "3 Users team"
      ]
    },
    {
      id: "np-professional",
      title: "PROFESSIONAL",
      price: "$79",
      description: "Advanced tools for non-profit organizations.",
      features: [
        "Multi-step Zaps",
        "Unlimited Premium",
        "25 Users team",
        "Shared Workspace"
      ]
    },
    {
      id: "np-enterprise",
      title: "ENTERPRISE",
      price: "Get In Touch",
      description: "Enterprise solutions for larger non-profits.",
      features: [
        "Multi-step Zap",
        "Unlimited Premium",
        "Unlimited Users Team",
        "Advanced Admin",
        "Custom Data Retention"
      ],
      popular: true
    }
  ];

  // Business Plans
  const otherPlans = [
    {
      id: "biz-starter",
      title: "STARTER",
      price: "$29",
      description: "Essential tools for small businesses.",
      features: [
        "Multi-step Zaps",
        "3 Premium Apps",
        "1 User"
      ]
    },
    {
      id: "biz-pro",
      title: "PROFESSIONAL",
      price: "$99",
      description: "Advanced tools for growing businesses.",
      features: [
        "Multi-step Zaps",
        "Unlimited Premium",
        "10 Users team",
        "Shared Workspace"
      ],
      popular: true
    },
    {
      id: "biz-elite",
      title: "ELITE",
      price: "$249",
      description: "Complete solution for established businesses.",
      features: [
        "Multi-step Zap",
        "Unlimited Premium",
        "50 Users Team",
        "Advanced Admin",
        "Custom Data Retention",
        "Premium Support"
      ]
    }
  ];

  // Determine which plans to show based on selection
  const plansToShow = selectedPlan === 'Non-Profit' ? nonProfitPlans : otherPlans;

  return (
    <div>
      {/* Hero Section - Added pt-20 for navbar space */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-8 bg-white min-h-150 pt-20">
        {/* Text Content Section */}
        <div className="w-full md:w-1/2 md:pr-8 text-center md:text-left px-4 md:px-0 max-w-2xl mx-auto">
          {/* Hide "Pricing -" on mobile */}
          <p className="text-[1.7rem] text-gray-800 font-bold tracking-normal mb-3 hidden md:block">Pricing -</p>
          <h1 className="text-3xl md:text-4xl lg:text-4xl leading-tight font-bold text-gray-800 mb-3">
            Flexible & Scalable Pricing 
            <br />
            for Healthcare Solutions
          </h1>
          <div className="h-[3px] w-70 bg-yellow-400 mb-5 mx-auto md:mx-0"></div>
          
          {/* Initial content */}
          <div className={`${showMore ? 'hidden' : 'block'}`}>
            <p className="text-base text-gray-600 mb-6 leading-relaxed mx-auto">
              ReLearn provide powerful medical data collection tools to support healthcare professionals, researchers, and organizations of all sizes. Our Community Plan ensures nonprofits and public health initiatives get free access to essential features.
            </p>
            <button 
              onClick={() => setShowMore(true)} 
              className="flex items-center bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors text-base mx-auto md:mx-0"
            >
              Learn more
              <ChevronRight className="ml-2" size={18} />
            </button>
          </div>
          
          {/* Additional content that appears when "Learn more" is clicked */}
          <div className={`${showMore ? 'block' : 'hidden'} transition-all duration-300`}>
            <p className="text-base text-gray-600 mb-4 leading-relaxed">
              ReLearn provide powerful medical data collection tools to support healthcare professionals, researchers, and organizations of all sizes. Our Community Plan ensures nonprofits and public health initiatives get free access to essential features.
            </p>
            <p className="text-base text-gray-600 mb-4 leading-relaxed">
              For hospitals, research institutions, and enterprises, our Professional and Enterprise plans offer advanced capabilities such as enhanced security, API access, real-time analytics, and seamless system integrations. These plans cater to organizations with higher data demands, regulatory compliance needs, and custom workflows for improved healthcare management.
            </p>
            <p className="text-base text-gray-600 mb-4 leading-relaxed">
              We also offer customized solutions for organizations with unique medical data requirements, providing dedicated servers, AI-powered analytics, and tailored system configurations to meet specific operational needs
            </p>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Contact our team to find the best plan for your needs and start transforming healthcare data management today!
            </p>
          </div>
        </div>
                
        {/* Illustration Section */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="relative w-full max-w-[450px]">
            <img 
              src="image copy.png" 
              alt="Relearn Data Collection" 
              className="w-full h-auto object-contain" 
            />
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-[#FFFBF2] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-6xl">
          {/* Page Title with Underline */}
          <div className="text-center mb-8 mt-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Plans & Pricing</h1>
            <div className="flex justify-center mb-4">
              <img 
                src="/Frame 1000001259.png" 
                alt="Decorative line" 
                className="w-48 sm:w-60 h-6 sm:h-8 mb-1"
              />
            </div>
          </div>

          {/* Nonprofit Toggle - Restructured with buttons above text */}
          <div className="mb-8 flex flex-col items-center justify-center max-w-3xl mx-auto px-4">
            {/* Buttons on top */}
            <div className="flex items-center bg-white border rounded-full p-1 mb-4 w-auto justify-center">
              <button 
                onClick={() => setSelectedPlan('Non-Profit')}
                className={`px-3 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base w-24 sm:w-32 ${
                  selectedPlan === 'Non-Profit' 
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-gray-500 hover:bg-yellow-50'
                }`}
              >
                Non-Profit
              </button>
              <button 
                onClick={() => setSelectedPlan('Other')}
                className={`px-3 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base w-20 sm:w-28 ${
                  selectedPlan === 'Other' 
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-gray-500 hover:bg-yellow-50'
                }`}
              >
                Other
              </button>
            </div>
            
            {/* Text description below */}
            <p className="text-gray-600 text-center w-full px-4 text-sm sm:text-base">
              {selectedPlan === 'Non-Profit' 
                ? 'Nonprofit: This category includes nonprofits, government agencies, UN organizations, and educational institutions.' 
                : 'Other: This category includes businesses, corporations, healthcare providers, and other for-profit organizations.'}
            </p>
          </div>

          {/* Plans Container */}
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 px-4 sm:px-0">
            {plansToShow.map((plan) => (
              <div 
                key={plan.id}
                className={`flex-1 p-6 rounded-2xl shadow-lg text-center relative overflow-hidden transition-all duration-300 ${
                  hoveredCard === plan.id
                    ? "bg-yellow-400 scale-105 shadow-2xl"
                    : "bg-white"
                }`}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 m-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="flex flex-col h-full">
                  <div>
                    <div className="text-3xl font-bold mb-6">{plan.price}<span className="text-base">{plan.price !== "Get In Touch" ? "/month" : ""}</span></div>
                    <h2 className="text-2xl font-bold mb-4">{plan.title}</h2>
                    <p className="text-gray-600 mb-4 h-12">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-6 text-left px-6 min-h-32">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className={`${hoveredCard === plan.id ? "text-black" : "text-green-500"} mr-2`}>✔</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={() => alert(`${plan.title} Plan Selected`)}
                      className="w-full py-3 bg-white border border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-100 active:bg-gray-200 transition-all duration-300"
                    >
                      Choose plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dedicated Server Section */}
      <div className="bg-[#FFFBF2] flex flex-col items-center justify-center relative overflow-hidden p-3 py-8">
        <div className="flex flex-col lg:flex-row items-center bg-white rounded-lg justify-between p-6 md:p-12 shadow-sm border border-gray-300 w-full max-w-6xl min-h-80 mx-auto max-h-auto mt-6 mb-10">
          <div className="w-full lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
              Dedicated Medical Data Servers
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              For hospitals, research institutions, and healthcare organizations requiring secure, scalable, and customizable data management, we provide public and private servers tailored to your needs.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <button onClick={() => setIsModalOpen(true)} className="border border-[#F7910D] text-black px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-[#F7910D] hover:text-white transition">
                Get in Touch
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-12">
            <ul className="space-y-4 text-left px-4 lg:px-0">
              <li className="flex items-start">
                <span className="text-purple-500 font-bold mr-3 mt-1">✓</span>
                <span className="text-base md:text-lg text-gray-700">
                  A dedicated server branded for your organization, maintained by our expert healthcare IT team.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 font-bold mr-3 mt-1">✓</span>
                <span className="text-base md:text-lg text-gray-700">
                  Collect, store, and manage patient records, clinical research data, and public health surveys without limits.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 font-bold mr-3 mt-1">✓</span>
                <span className="text-base md:text-lg text-gray-700">
                  Manage users, permissions, and workflows with detailed oversight and security policies.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 font-bold mr-3 mt-1">✓</span>
                <span className="text-base md:text-lg text-gray-700">
                  Ensures strong security with encryption, role-based access, and audit logs to protect medical data.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative min-h-screen bg-white flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 pt-16 pb-16">
        {/* Background Elements - Hidden on Mobile */}
        <div className="hidden lg:block">
          {/* Left side decorative elements */}
          <div className="absolute top-20 left-0 z-0 w-54">
            <img 
              src="Vector 29.png" 
              alt="Yellow decorative shape" 
              className="w-full"
            />
          </div>
          
          {/* Sunflower decoration */}
          <div className="absolute bottom-0 left-0 z-0 w-130">
            <img 
              src="blooming-sunflower-frame_53876-94115-removebg-preview 1.png" 
              alt="Sunflowers" 
              className="w-full"
            />
          </div>

          {/* Bee illustrations */}
          <div className="absolute top-35 left-60 z-0 w-45">
            <img 
              src="rb_176744 6.png" 
              alt="Large bee" 
              className="w-full transform rotate-30"
            />
          </div>
          <div className="absolute top-80 left-20 z-0 w-20">
            <img 
              src="rb_176744 7.png" 
              alt="Small bee" 
              className="w-full transform rotate-15"
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          {/* Left Section: Heading */}
          <div className="w-full lg:w-1/2 pl-0 lg:pl-12 z-10 relative text-center lg:text-left mt-10 lg:mt-0">
            <h1 
              className="text-3xl lg:text-4xl font-bold text-center lg:text-left lg:ml-30 mb-5" 
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Frequently asked
              <br />
              <span className="text-black">Questions</span>
            </h1>
            <div className="mb-4 flex justify-center lg:justify-start lg:ml-29">
              <img 
                src="Frame 1000001259.png" 
                alt="Decorative line" 
                className="w-64 lg:w-80 h-6 lg:h-8"
              />
            </div>
          </div>

          {/* Right Section: FAQ Cards */}
          <div className="w-full lg:w-2/3 pr-0 lg:pr-20 z-10 relative mt-6 lg:mt-0">
            <div className="space-y-6">
              {faqSections.map((section, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg overflow-hidden my-4"
                >
                  <button 
                    onClick={() => toggleSection(index)}
                    className="w-full flex justify-between items-center p-4 lg:p-5 bg-white hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-base lg:text-lg font-semibold">{section.title}</span>
                    <ChevronDown 
                      className={`w-5 h-5 lg:w-6 lg:h-6 transform transition-transform ${
                        openSection === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {openSection === index && (
                    <div className="p-4 bg-white">
                      {typeof section.content === 'string' 
                        ? <p className="text-gray-600">{section.content}</p>
                        : section.content
                      }
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Get in Touch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xl bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-center">Get in Touch</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
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

export default Pricing;