import React from 'react'

const GeneralContent = () => (
    <div className="p-6">
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">General</h1>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                    Save Changes
                </button>
            </div>

            <form className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-gray-700">
                        Project Name <span className="text-gray-500">(required)</span>
                    </label>
                    <input
                        type="text"
                        defaultValue="Demo Project"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={4}
                        defaultValue="demo description"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-gray-700">
                            Sector <span className="text-gray-500">(required)</span>
                        </label>
                        <div className="relative">
                            <div className="flex items-center border rounded-lg p-2 bg-white">
                                <span className="flex-1">Health Services / Public Health</span>
                                <button className="text-gray-400 hover:text-gray-600 p-1">×</button>
                                <button className="text-gray-400 hover:text-gray-600 p-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-700">
                            Country <span className="text-gray-500">(required)</span>
                        </label>
                        <div className="relative">
                            <div className="flex items-center border rounded-lg p-2 bg-white">
                                <span className="flex-1">India</span>
                                <button className="text-gray-400 hover:text-gray-600 p-1">×</button>
                                <button className="text-gray-400 hover:text-gray-600 p-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <div className="p-4 rounded-lg">
                        <button className="text-lg bg-blue-100 font-medium p-2 rounded text-blue-800">
                            Archive Project
                        </button>
                        <p className="mt-1">Archive project to stop accepting submissions.</p>
                    </div>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
                        Delete Project and Data
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default GeneralContent
