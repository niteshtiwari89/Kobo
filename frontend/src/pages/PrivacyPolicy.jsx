// import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
                    Privacy Policy
                </h1>

                <section className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use the Relearn platform.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li><strong>Personal Information:</strong> Name, email, phone number, etc., when you register or contact us.</li>
                            <li><strong>Usage Data:</strong> Information about how you interact with the platform, such as log data and cookies.</li>
                            <li><strong>Data You Submit:</strong> Any data you collect or upload using the platform.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We use your data to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Provide and improve our services.</li>
                            <li>Communicate with you about updates and issues.</li>
                            <li>Ensure security and compliance with legal obligations.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Sharing Your Information</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We do not sell or rent your data to third parties. We may share your information with trusted partners or when required by law.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We take appropriate measures to secure your data, but no system is completely secure. You agree to use the platform at your own risk.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
                        <p className="text-gray-600 leading-relaxed">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Access your data.</li>
                            <li>Request corrections to your data.</li>
                            <li>Request deletion of your data.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookies</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We use cookies to enhance your experience on the platform. You can manage your cookie preferences through your browser settings.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Third-Party Links</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our platform may contain links to third-party websites. We are not responsible for their privacy practices or content.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Changes to the Privacy Policy</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right to update this Privacy Policy at any time. Continued use of the platform indicates acceptance of the revised policy.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            For questions about this policy, please contact us at [Email Address].
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
