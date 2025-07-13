import { useState } from 'react';
import { Settings, Image, Users, Link2, Database } from 'lucide-react';
import MediaContent from './MediaContent';
import SharingContent from './SharingContent';
import ConnectContent from './ConnectContent';
import RestContent from './RestContent';
import GeneralContent from './GeneralContent';


const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('general');

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return <GeneralContent />;
            case 'media':
                return <MediaContent />;
            case 'sharing':
                return <SharingContent />;
            case 'connect':
                return <ConnectContent />;
            case 'rest':
                return <RestContent />;
            default:
                return <GeneralContent />;
        }
    };

    const navItems = [
        { id: 'general', icon: Settings, label: 'General' },
        { id: 'media', icon: Image, label: 'Media' },
        { id: 'sharing', icon: Users, label: 'Sharing' },
        { id: 'connect', icon: Link2, label: 'Connect Projects' },
        { id: 'rest', icon: Database, label: 'REST Services' },
    ];


    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <div className="w-64 border-r bg-gray-50">
                <nav className="p-4 space-y-2">
                    {navItems.map(({ id, icon: Icon, label }) => (
                        <div
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${activeTab === id
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className={activeTab === id ? 'font-medium' : ''}>
                                {label}
                            </span>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">{renderContent()}</div>
        </div>
    );
};

export default SettingsPage;