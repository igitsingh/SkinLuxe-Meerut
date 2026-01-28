import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | SkinLuxe Aesthetics & Academy',
    description: 'Privacy Policy for SkinLuxe Aesthetics & Academy. Learn how we collect, use, and protect your personal information.',
    robots: 'index, follow',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[40vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container relative z-10 text-center max-w-4xl">
                    <h1 className="font-serif text-4xl md:text-6xl mb-4 text-white">Privacy Policy</h1>
                    <p className="text-white/70 text-sm md:text-base">
                        Last Updated: January 17, 2026
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 md:py-24">
                <div className="container max-w-7xl px-6 md:px-12 lg:px-16">
                    <div className="prose prose-lg max-w-none">
                        {/* Introduction */}
                        <div className="mb-12">
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                SkinLuxe Aesthetics & Academy ("we," "our," or "us") operates a medical aesthetics clinic and professional training academy located in Meerut, Uttar Pradesh, India. This Privacy Policy explains how we collect, use, store, and protect your personal information when you interact with our website, book appointments, or engage with our services.
                            </p>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                We are committed to protecting your privacy and handling your data responsibly. This policy is designed to help you understand our data practices and your rights.
                            </p>

                            {/* UPGRADE 1: Indian Legal Compliance */}
                            <div className="bg-[#F9F8F6] p-6 border-l-4 border-[#B4838D] mt-6">
                                <h3 className="font-serif text-lg text-[#1C1C1C] mb-3">Compliance with Indian Law</h3>
                                <p className="text-[#4A4A4A] leading-relaxed">
                                    This Privacy Policy is prepared in compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and other applicable laws of India. SkinLuxe Aesthetics & Academy acts as a <strong>Data Fiduciary</strong> under the DPDP Act with respect to all personal data and sensitive personal data collected through this website and our services.
                                </p>
                            </div>

                            {/* UPGRADE 3: Explicit Consent */}
                            <div className="bg-[#FFF9F5] p-6 border-l-4 border-[#1C1C1C] mt-6">
                                <h3 className="font-serif text-lg text-[#1C1C1C] mb-3">Your Explicit Consent</h3>
                                <p className="text-[#4A4A4A] leading-relaxed">
                                    <strong>By submitting a form, booking an appointment, or contacting us through this website, you explicitly consent to the collection, use, storage, and processing of your personal data and sensitive personal data as described in this Privacy Policy.</strong> This consent is voluntary, informed, and specific. You may withdraw your consent at any time by contacting our Grievance Officer (details provided below).
                                </p>
                            </div>
                        </div>

                        {/* 1. Information We Collect */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">1. Information We Collect</h2>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">1.1 Information You Provide Directly</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                When you interact with our website or services, you may provide us with:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 mb-6">
                                <li><strong>Contact Information:</strong> Name, email address, phone number</li>
                                <li><strong>Appointment Details:</strong> Preferred treatment, date and time preferences, special requests or notes</li>
                                <li><strong>Inquiry Information:</strong> Subject matter, message content, service interests</li>
                                <li><strong>Communication Records:</strong> Correspondence with our staff via email, phone, or messaging</li>
                            </ul>

                            {/* UPGRADE 2: Sensitive Personal Data Classification */}
                            <div className="bg-[#FFF9F5] p-6 border-l-4 border-[#B4838D] mb-6">
                                <h4 className="font-serif text-lg text-[#1C1C1C] mb-3">Classification of Sensitive Personal Data</h4>
                                <p className="text-[#4A4A4A] leading-relaxed mb-3">
                                    Under Indian law, including the Digital Personal Data Protection Act, 2023, the following categories of information collected by us are classified as <strong>Sensitive Personal Data</strong> and are subject to higher protection standards:
                                </p>
                                <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                                    <li><strong>Medical History:</strong> Any information regarding past or current medical conditions, treatments, or health status</li>
                                    <li><strong>Treatment Details:</strong> Information about aesthetic treatments, procedures, consultations, or medical advice provided</li>
                                    <li><strong>Consultation Records:</strong> Notes, observations, or recommendations made during in-person or remote consultations</li>
                                    <li><strong>Appointment Information:</strong> Details of scheduled or completed appointments that may reveal health-related intentions or conditions</li>
                                </ul>
                                <p className="text-[#4A4A4A] leading-relaxed mt-3">
                                    We handle all Sensitive Personal Data with enhanced security measures, strict access controls, and in accordance with applicable Indian medical and data protection regulations.
                                </p>
                            </div>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">1.2 Information Collected Automatically</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                When you visit our website, our hosting infrastructure may automatically collect:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 mb-6">
                                <li><strong>Technical Data:</strong> IP address, browser type, device information, operating system</li>
                                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, referring website</li>
                                <li><strong>Server Logs:</strong> Access timestamps, error logs, system performance metrics</li>
                            </ul>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">1.3 Cookies and Authentication</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                Our website uses minimal cookies:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                                <li><strong>Admin Authentication:</strong> Secure session tokens for authorized staff access to the admin panel</li>
                                <li><strong>Essential Cookies:</strong> Necessary for website functionality and security</li>
                                <li><strong>No Tracking Cookies:</strong> We do not use advertising cookies, third-party trackers, or behavioral analytics cookies for public visitors</li>
                            </ul>
                        </div>

                        {/* 2. How We Use Your Information */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">2. How We Use Your Information</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                We use the information we collect for the following purposes:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                                <li><strong>Service Delivery:</strong> Processing appointment bookings, managing schedules, confirming reservations</li>
                                <li><strong>Communication:</strong> Responding to inquiries, sending appointment reminders, providing treatment information</li>
                                <li><strong>Business Operations:</strong> Internal record-keeping, staff coordination, quality improvement</li>
                                <li><strong>Security:</strong> Preventing fraud, abuse, and unauthorized access to our systems</li>
                                <li><strong>Legal Compliance:</strong> Meeting regulatory requirements, responding to legal requests</li>
                                <li><strong>System Improvement:</strong> Identifying technical issues, improving website performance and user experience</li>
                            </ul>
                        </div>

                        {/* 3. Data Storage and Security */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">3. Data Storage and Security</h2>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">3.1 Where Your Data Is Stored</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                Your information is stored on secure infrastructure:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 mb-6">
                                <li><strong>Database:</strong> PostgreSQL database hosted on Render (cloud infrastructure)</li>
                                <li><strong>Backend API:</strong> Hosted on Render's secure servers</li>
                                <li><strong>Website Frontend:</strong> Hosted on Vercel's content delivery network</li>
                                <li><strong>Data Location:</strong> Servers may be located in various regions; data is transmitted securely via encrypted connections</li>
                            </ul>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">3.2 Security Measures</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                We implement reasonable security practices to protect your data:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 mb-6">
                                <li>Encrypted data transmission (HTTPS/SSL)</li>
                                <li>Password hashing for admin authentication</li>
                                <li>Access controls limiting staff access to necessary data only</li>
                                <li>Regular security monitoring and error tracking</li>
                                <li>Rate limiting to prevent automated abuse</li>
                            </ul>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">3.3 Data Retention</h3>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Appointment records and inquiries are typically retained for operational and record-keeping purposes.
                            </p>
                        </div>

                        {/* 4. Third-Party Services */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">4. Third-Party Services</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                We use the following third-party service providers to operate our website and services:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 mb-6">
                                <li><strong>Render:</strong> Cloud hosting for our backend API and database</li>
                                <li><strong>Vercel:</strong> Website hosting and content delivery</li>
                                <li><strong>Sentry:</strong> Error monitoring and performance tracking (technical logs only, no personal data tracking)</li>
                            </ul>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                These providers may have access to your data only to the extent necessary to perform their services on our behalf. They are obligated to maintain the confidentiality and security of your information.
                            </p>
                        </div>

                        {/* 5. Data Sharing and Disclosure */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">5. Data Sharing and Disclosure</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                            </p>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                We may share your information only in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                                <li><strong>Service Providers:</strong> With trusted third parties who assist in operating our website and services (as listed above)</li>
                                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                                <li><strong>Business Protection:</strong> To protect our rights, property, or safety, or that of our clients or the public</li>
                                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with notice to affected users)</li>
                            </ul>
                        </div>

                        {/* 6. Your Rights and Choices */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">6. Your Rights and Choices</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                You have the following rights regarding your personal information:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 mb-6">
                                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal and operational requirements)</li>
                                <li><strong>Objection:</strong> Object to certain processing of your data</li>
                                <li><strong>Withdrawal of Consent:</strong> Withdraw consent for data processing where consent was the legal basis</li>
                            </ul>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                To exercise these rights, please contact us using the information provided at the end of this policy. We will respond to your request within a reasonable timeframe.
                            </p>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                <strong>Note:</strong> Some data may need to be retained for legal, accounting, or operational purposes even after a deletion request.
                            </p>
                        </div>

                        {/* 7. Children's Privacy */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">7. Children's Privacy</h2>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will take steps to delete such information.
                            </p>
                        </div>

                        {/* 8. Changes to This Policy */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">8. Changes to This Privacy Policy</h2>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the "Last Updated" date at the top of this policy. We encourage you to review this policy periodically. Continued use of our services after changes constitutes acceptance of the updated policy.
                            </p>
                        </div>

                        {/* 9. Jurisdiction and Governing Law */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">9. Jurisdiction and Governing Law</h2>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                This Privacy Policy is governed by the laws of India. Our primary place of business is located in Meerut, Uttar Pradesh, India. Any disputes arising from this policy or our data practices shall be subject to the exclusive jurisdiction of the courts in Meerut, Uttar Pradesh.
                            </p>
                        </div>

                        {/* 10. Limitations and Disclaimers */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">10. Limitations and Disclaimers</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                While we implement reasonable security measures, no system is completely secure. We cannot guarantee absolute security of your data against unauthorized access, hardware or software failure, or other factors beyond our control.
                            </p>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                You acknowledge that you provide your personal information at your own risk and that we are not liable for any unauthorized access or loss of data resulting from circumstances beyond our reasonable control.
                            </p>
                        </div>

                        {/* UPGRADE 5: Medical Disclaimer */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">11. Medical Disclaimer</h2>
                            <div className="bg-[#FFF9F5] p-6 border-2 border-[#1C1C1C]">
                                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                    <strong>Important Notice:</strong> The content provided on this website, including treatment descriptions, service information, and educational materials, is for <strong>informational purposes only</strong> and does not constitute medical advice, diagnosis, or treatment recommendations.
                                </p>
                                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                    <strong>No Online Diagnosis or Treatment:</strong> No medical diagnosis, treatment plan, or clinical decision is made through this website or any online communication. All medical assessments, diagnoses, and treatment decisions are made exclusively during in-person consultations at our clinic in Meerut, Uttar Pradesh, after proper examination by qualified medical professionals.
                                </p>
                                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                    <strong>Professional Consultation Required:</strong> You should not rely on website content as a substitute for professional medical advice. Always seek the advice of qualified healthcare providers with any questions you may have regarding a medical condition or treatment.
                                </p>
                                <p className="text-[#4A4A4A] leading-relaxed">
                                    <strong>No Liability for Information:</strong> SkinLuxe Aesthetics & Academy is not liable for any decisions made based solely on information provided on this website. Final treatment decisions are made only after thorough in-person consultation and examination.
                                </p>
                            </div>
                        </div>

                        {/* UPGRADE 4: Grievance Officer */}
                        <div className="mb-12 bg-[#F9F8F6] p-8 border-2 border-[#B4838D]">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">Grievance Officer / Data Protection Contact</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                In accordance with the Digital Personal Data Protection Act, 2023, and other applicable Indian laws, we have designated a Grievance Officer to address your concerns regarding data protection, privacy, or any grievances related to the processing of your personal data.
                            </p>
                            <div className="bg-white p-6 border border-[#E6E2DD] space-y-3 text-[#4A4A4A]">
                                <p><strong className="text-[#1C1C1C]">Grievance Officer / Data Protection Contact</strong></p>
                                <p><strong>Organization:</strong> SkinLuxe Aesthetics & Academy</p>
                                <p><strong>Address:</strong> FF, No. 38, New Market, Begum Bridge, near Titan Showroom, Sotiganj, Meerut, Uttar Pradesh 250001, India</p>
                                <p><strong>Email:</strong> <a href="mailto:skinluxemeerut@gmail.com" className="text-[#B4838D] hover:underline font-semibold">skinluxemeerut@gmail.com</a></p>
                                <p><strong>Phone:</strong> <a href="tel:+917014681829" className="text-[#B4838D] hover:underline">+91 7014681829</a></p>
                                <p className="mt-4"><strong className="text-[#1C1C1C]">Response Timeline:</strong> We will acknowledge your grievance within 7 business days and endeavor to resolve it within 14 business days from the date of receipt.</p>
                            </div>
                            <p className="text-[#4A4A4A] leading-relaxed mt-4">
                                You may contact the Grievance Officer for any concerns related to data access, correction, deletion, consent withdrawal, or any other privacy-related matters.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-12 bg-[#F9F8F6] p-8 border border-[#E6E2DD]">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">General Contact Information</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                For general inquiries, appointment bookings, or other non-privacy-related matters, please contact us:
                            </p>
                            <div className="space-y-2 text-[#4A4A4A]">
                                <p><strong>SkinLuxe Aesthetics & Academy</strong></p>
                                <p>FF, No. 38, New Market, Begum Bridge</p>
                                <p>near Titan Showroom, Sotiganj</p>
                                <p>Meerut, Uttar Pradesh 250001</p>
                                <p>India</p>
                                <p className="mt-4">
                                    <strong>Email:</strong> <a href="mailto:skinluxemeerut@gmail.com" className="text-[#B4838D] hover:underline">skinluxemeerut@gmail.com</a>
                                </p>
                                <p>
                                    <strong>Phone:</strong> <a href="tel:+917014681829" className="text-[#B4838D] hover:underline">+91 7014681829</a>
                                </p>
                            </div>
                        </div>

                        {/* Acknowledgment */}
                        <div className="border-t border-[#E6E2DD] pt-8">
                            <p className="text-[#4A4A4A] text-sm leading-relaxed">
                                By using our website and services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
