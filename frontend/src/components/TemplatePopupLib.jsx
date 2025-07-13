import React, { useState } from "react";

const TemplatePopupLib = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [sector, setSector] = useState("");
  const [country, setCountry] = useState("");
  const [tags, setTags] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-10">
      <div className="bg-white rounded-lg shadow-lg w-[600px]">
        {/* Header */}
        <div className=" bg-blue-400 text-white px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Create Template: Details</h2>
          <button onClick={onClose} className="text-white text-xl">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter title of template here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter short description here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Organization
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter organization name"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Primary Sector
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="IT">IT</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Country
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Tags
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type and confirm with ENTER"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end  px-4 py-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-blue-500 bg-gray-200 rounded-md mr-2"
          >
            Back
          </button>
          <button
            className={`px-4 py-2 text-white rounded-md ${
              name && sector && country
                ? " bg-blue-400 hover:bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
            }`}
            disabled={!name || !sector || !country}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePopupLib;
