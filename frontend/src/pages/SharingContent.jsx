import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const SharingContent = () => {
    const [allowAnonymous, setAllowAnonymous] = useState(false);
    const [canViewForm, setCanViewForm] = useState(true);
    const [canViewSubmissions, setCanViewSubmissions] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Project Header */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h1 className="text-lg text-gray-700">Demo Project</h1>
            </div>

            {/* Access Section */}
            <div className="space-y-6">
                <h2 className="text-lg text-gray-700">Who has access</h2>

                {/* User List */}
                <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                            <span className="text-white font-medium">V</span>
                        </div>
                        <span className="text-gray-700">vijay012</span>
                    </div>
                    <span className="text-gray-500">is owner</span>
                </div>

                {/* Add User Button */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                    Add user
                </button>

                {/* Anonymous Access Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setAllowAnonymous(!allowAnonymous)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${allowAnonymous ? 'bg-teal-400' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${allowAnonymous ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                    <span className="text-gray-700">
                        Allow submissions to this form without a username and password
                    </span>
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* Public Sharing Section */}
            <div className="space-y-4">
                <h2 className="text-lg text-gray-700">Share publicly by link</h2>

                {/* Checkboxes */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={canViewForm}
                            onChange={() => setCanViewForm(!canViewForm)}
                            className="w-4 h-4 text-blue-500 rounded"
                        />
                        <span className="text-gray-700">Anyone can view this form</span>
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={canViewSubmissions}
                            onChange={() => setCanViewSubmissions(!canViewSubmissions)}
                            className="w-4 h-4 text-blue-500 rounded"
                        />
                        <span className="text-gray-700">Anyone can view submissions made to this form</span>
                    </label>
                </div>

                {/* Shareable Link */}
                <div className="space-y-2">
                    <label className="block text-gray-700">Shareable link</label>
                    <input
                        type="text"
                        value="https://example.com/form/12345"
                        readOnly
                        className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-gray-700"
                    />
                </div>
            </div>

            {/* Transfer Ownership Section */}
            <div className="border rounded-lg p-6 space-y-4">
                <h2 className="text-lg text-gray-700">Transfer project ownership</h2>
                <p className="text-gray-600">
                    Transfer ownership of this project to another user. All submissions, data storage, and transcription and translation usage for this project will be transferred to the new project owner.{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        Learn more →
                    </a>
                </p>
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-6 py-2 rounded-lg transition-colors">
                    Transfer
                </button>
            </div>
        </div>
    );
};

export default SharingContent;