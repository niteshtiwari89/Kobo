// import React from 'react';

const RestContent = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
        <svg className="w-16 h-16 mb-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M3.22 12A13.43 13.43 0 0 0 12 16.93" />
            <path d="M20.78 12A13.43 13.43 0 0 1 12 16.93" />
        </svg>

        <h2 className="text-xl font-semibold mb-2">This project doesn&apos;t have any REST Services yet!</h2>

        <p className="text-gray-600 mb-6">
            You can use REST Services to automatically post submissions to a third-party application.
            <a href="#" className="text-blue-500 ml-1">Learn more</a>
        </p>

        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Register a New Service
        </button>
    </div>
);

export default RestContent;