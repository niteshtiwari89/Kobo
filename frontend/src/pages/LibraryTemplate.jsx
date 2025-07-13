import React, { useState } from 'react';

const TemplateDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    organization: '',
    primarySector: '',
    country: '',
    tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-95 flex items-center justify-center pt-16 z-50">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#2196F3] text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Template details</h2>
          <button className="text-white text-2xl font-bold hover:opacity-75">&times;</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter title of template here"
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter short description here"
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Organization</label>
            <input
              type="text"
              name="organization"
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.organization}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Primary Sector</label>
            <select
              name="primarySector"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.primarySector}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {/* Add your sector options here */}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Country</label>
            <select
              name="country"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {/* Add your country options here */}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="Type and confirm with ENTER"
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="px-4 py-2 text-[#2196F3] hover:bg-gray-100 rounded-md"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2196F3] text-white rounded-md hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateDetailsForm;