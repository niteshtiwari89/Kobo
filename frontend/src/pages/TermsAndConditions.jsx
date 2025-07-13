import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                <p>
                    Welcome to Relearn, a data collection platform designed to make your work seamless and efficient. By accessing or using our services, you agree to be bound by these terms and conditions. Please read them carefully.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">2. Eligibility</h2>
                <p>
                    You must be at least 18 years old to use our services. By agreeing to these terms, you confirm that you meet the eligibility criteria.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. User Accounts</h2>
                <ul className="list-disc pl-6">
                    <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                    <li>Notify us immediately if you suspect unauthorized use of your account.</li>
                    <li>You agree to provide accurate and updated information.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Acceptable Use</h2>
                <ul className="list-disc pl-6">
                    <li>You must not use the platform for any illegal or unauthorized purpose.</li>
                    <li>You agree not to exploit, harm, or attempt to exploit or harm other users.</li>
                    <li>You are prohibited from attempting to gain unauthorized access to our systems.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">5. Intellectual Property</h2>
                <p>
                    All content, design, and intellectual property on the Relearn platform belong to us unless otherwise stated. You are granted a limited license to access and use the platform for personal or professional purposes.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">6. Limitation of Liability</h2>
                <p>
                    We are not responsible for any indirect, incidental, or consequential damages arising from your use of the platform. Use it at your own risk.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">7. Termination</h2>
                <p>
                    We reserve the right to suspend or terminate your access to our platform if you violate these terms.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">8. Governing Law</h2>
                <p>
                    These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved under the applicable laws of this region.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">9. Changes to Terms</h2>
                <p>
                    We reserve the right to update these terms at any time. Continued use of the platform indicates acceptance of the revised terms.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
                <p>
                    For questions about these terms, please contact us at [Email Address].
                </p>
            </section>
        </div>
    );
};

export default TermsAndConditions;
