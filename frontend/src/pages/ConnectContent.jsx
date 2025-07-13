import { useState } from 'react';

const ConnectContent = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedProject, setSelectedProject] = useState('');
    const [importName, setImportName] = useState('');

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* Share data section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Share data with other project forms</h2>
                </div>

                <p className="mb-4 text-gray-600">
                    Enable data sharing to allow other forms to import and use dynamic data from this project.
                    <a href="#" className="text-blue-500 ml-1">Learn more about dynamic data attachments here</a>
                </p>

                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isEnabled}
                        onChange={() => setIsEnabled(!isEnabled)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-gray-700">Data sharing {isEnabled ? 'enabled' : 'disabled'}</span>
                </label>
            </div>

            {/* Import data section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <h2 className="text-lg font-semibold">Import other project data</h2>
                </div>

                <p className="mb-4 text-gray-600">
                    Connect with other project(s) to import dynamic data from them into this project.
                    <a href="#" className="text-blue-500 ml-1">Learn more about dynamic data attachments here</a>
                </p>

                <div className="space-y-4 md:space-y-0 md:flex md:gap-4 mb-6">
                    <select
                        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                    >
                        <option value="">Select a different project to import data from</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Give a unique name to the import"
                        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={importName}
                        onChange={(e) => setImportName(e.target.value)}
                    />

                    <button className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Import
                    </button>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Imported</h3>
                    <p className="text-gray-500 italic">No data imported</p>
                </div>
            </div>
        </div>
    );
};

export default ConnectContent;