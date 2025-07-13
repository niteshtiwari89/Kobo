import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const BlogPage = () => {
  const heroImage = 'image (34).png';
  const profileImage = 'Rectangle 176.png';
  
  const mainBlogPosts = [
    {
      image: 'Rectangle 177.png',
      date: '08-11-2021',
      title: 'Transforming Medical Data Collection in Remote Areas.',
      
      name : ' Dr. Emily Carter',
      description:'Digital tools are revolutionizing healthcare access in underserved regions. Learn how offline data collection enables doctors to monitor patients, track diseases, and improve treatment outcomes.'
    },
    {
      image: 'Rectangle 177 (1).png',
      date: '08-11-2021',
      title: 'How AI & Data Analytics Are Changing Healthcare',

      name : ' Dr. John Matthews',
      description:'From predictive diagnostics to automated data entry, AI is transforming how hospitals and research institutions manage patient records efficiently and securely.'

    }
  ];

  const sideBlogPosts = [
    {
      image: 'Rectangle 177 (2).png',
      date: '08-11-2021',
      title: 'Partially new learning in purchase lodging.',
      category: 'Business',
      name : 'John Doe'
    },
    {
      image: 'Rectangle 177 (3).png',
      date: '08-11-2021',
      title: 'Enhancing Telemedicine with Seamless Digital Record-Keeping',
      category: 'Technology',
      name : 'John Doe'
    },
    {
      image: 'Rectangle 177 (4).png',
      date: '08-11-2021',
      title: 'Building Smarter Hospitals with Cloud-Based Data Solutions',
      category: 'Lifestyle',
      name : 'John Doe'
    },
    {
      image: 'Rectangle 177 (5).png',
      date: '08-11-2021',
      title: ' The Future of Digital Health: How Data is Reshaping Patient Care',
      category: 'Design',
      name: 'John Doe'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
 {/* Hero Section */}
<div className="relative w-full px-4 md:px-8 lg:px-16 mt-15">
  <div className="relative h-[500px] w-full">
    <img 
      src="image (34).png"
      alt="Hero Background" 
      className="absolute inset-0 w-full h-full object-cover rounded-lg"
    />
    <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
    <div className="relative z-10 container mx-auto px-4 h-full">
      <div className="flex h-full items-end pb-12 text-white">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-2 mb-4">
          <div className="flex justify-center items-center space-x-4 ">
              <img 
                src="image (35).png"
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover"
              />
             </div>
            <span className="text-name">Nikhil Bawane</span>
            <span className="text-sm">08-11-2021</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">
          Revolutionizing Medical Research with AI & Data Analytics
          </h1>
        </div>
      </div>
    </div>
  </div>
</div>
 
  {/* </div> */}

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Blog Posts */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-bold mb-8">Our Latest Blog Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {mainBlogPosts.map((post, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center space-x-2 text-gray-500 mb-2">
                    
                      <span className="text-sm">{post.date}</span>
                      <span className="text-name">{post.name}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                    <h3 className=" text-sm mb-2">{post.description}</h3>
                    <div className="flex items-center space-x-2 text-gray-500">
                   
                      <span>{post.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Blog Posts */}
          <div className="w-full lg:w-1/3">
            <div className="flex justify-center items-center mb-6">
              
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-black transition text-sm">
                See All Blog Posts
              </button>
            </div>
            <div className="space-y-4">
              {sideBlogPosts.map((post, index) => (
                <div key={index} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <div className="flex items-center space-x-2 text-gray-500 mb-1">
                      {/* <Clock size={12} /> */}
                    
                      <span className="text-xs">{post.date}</span>
                      <span className="text-name">{post.name}</span>
                    </div>
                    <h4 className="font-semibold text-sm">{post.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;