import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | SkinLuxe Aesthetics & Academy',
    description: 'Terms of Service for SkinLuxe Aesthetics & Academy. Read our terms governing the use of our website and services.',
    robots: 'index, follow',
};

export default function TermsOfServicePage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[40vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container relative z-10 text-center max-w-4xl">
                    <h1 className="font-serif text-4xl md:text-6xl mb-4 text-white">Terms of Service</h1>
                    <p className="text-white/70 text-sm md:text-base">
                        Last Updated: January 18, 2026
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
                                These Terms of Service ("Terms") govern your access to and use of the website, digital services, and online systems operated by SkinLuxe Aesthetics & Academy ("we," "our," or "us"), a medical aesthetics clinic and professional training academy located in Meerut, Uttar Pradesh, India.
                            </p>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                These Terms apply to all users, including patients, prospective patients, trainees, visitors, and authorized administrators. By accessing or using this website, you agree to be bound by these Terms. If you do not agree, you must immediately cease using this website and all associated services.
                            </p>
                        </div>

                        {/* 1. Acceptance of Terms */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">1. Acceptance of Terms</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                By accessing, browsing, or using this website, including but not limited to:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 mb-4">
                                <li>Viewing website content</li>
                                <li>Submitting appointment booking requests</li>
                                <li>Submitting contact or inquiry forms</li>
                                <li>Accessing admin panels (if authorized)</li>
                                <li>Engaging with any digital service or feature</li>
                            </ul>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                You acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy. If you do not agree to these Terms, you are not authorized to use this website and must discontinue use immediately.
                            </p>
                        </div>

                        {/* 2. Scope of Services */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">2. Scope of Services</h2>

                            <div className="bg-[#FFF9F5] p-6 border-2 border-[#1C1C1C] mb-6">
                                <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">Important Clarification</h3>
                                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                    <strong>This website provides informational content, appointment booking functionality, and communication tools only.</strong> It does not provide medical advice, diagnosis, or treatment.
                                </p>
                                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                    <strong>No Medical Decisions Online:</strong> All medical assessments, diagnoses, treatment plans, and clinical decisions are made exclusively during in-person consultations at our clinic in Meerut, Uttar Pradesh, after proper examination by qualified medical professionals.
                                </p>
                                <p className="text-[#4A4A4A] leading-relaxed">
                                    <strong>No Online Interaction Constitutes Medical Care:</strong> No communication through this website, including appointment requests, inquiry forms, or email correspondence, constitutes a doctor-patient relationship, medical consultation, diagnosis, or treatment recommendation.
                                </p>
                            </div>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">Website Services Include:</h3>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                                <li>Educational and informational content about aesthetic treatments and services</li>
                                <li>Appointment booking request system (subject to confirmation)</li>
                                <li>Contact and inquiry submission forms</li>
                                <li>General information about clinic location, hours, and services</li>
                                <li>Blog and educational resources</li>
                            </ul>
                        </div>

                        {/* 3. Eligibility & User Responsibility */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">3. Eligibility and User Responsibility</h2>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">3.1 Age Requirement</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                You must be at least 18 years of age to use this website independently. If you are under 18 years of age, you may only use this website with the consent and supervision of a parent or legal guardian. By using this website, you represent and warrant that you meet these age requirements.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">3.2 Accurate Information</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                You agree to provide accurate, current, and truthful information when using this website, including when submitting appointment requests, contact forms, or any other information. Providing false, misleading, or fraudulent information is strictly prohibited and may result in termination of access.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">3.3 Prohibited Conduct</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                You agree not to:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                                <li>Impersonate any person or entity</li>
                                <li>Submit false or fraudulent appointment requests</li>
                                <li>Use the website for any unlawful purpose</li>
                                <li>Interfere with or disrupt the website's functionality</li>
                                <li>Attempt to gain unauthorized access to any portion of the website or systems</li>
                            </ul>
                        </div>

                        {/* 4. Appointments, Bookings & Cancellations */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">4. Appointments, Bookings, and Cancellations</h2>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">4.1 Appointment Requests</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                Submitting an appointment request through this website does not guarantee confirmation or create a binding appointment. All appointment requests are subject to availability and confirmation by our clinic staff. You will receive confirmation via phone, email, or SMS once your appointment is confirmed.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">4.2 Clinic's Right to Reschedule or Cancel</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                We reserve the right to reschedule or cancel appointments due to unforeseen circumstances, medical emergencies, staff unavailability, or operational requirements. We will make reasonable efforts to notify you in advance and offer alternative appointment times.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">4.3 Patient Cancellations and No-Shows</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                If you need to cancel or reschedule an appointment, please contact us as early as possible. Repeated no-shows or late cancellations without notice may result in restrictions on future appointment bookings.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">4.4 Force Majeure</h3>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                We are not liable for delays, cancellations, or inability to provide services due to circumstances beyond our reasonable control, including but not limited to natural disasters, medical emergencies, government orders, power failures, or other force majeure events.
                            </p>
                        </div>

                        {/* 5. Payments */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">5. Payments and Pricing</h2>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">5.1 Pricing</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                All prices displayed on this website are indicative and subject to change without prior notice. Final pricing for treatments and services will be confirmed during in-person consultation based on individual assessment and treatment requirements.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">5.2 Payment Terms</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                Payments for treatments and services are typically made at the clinic. If online payment functionality is enabled in the future, such payments will be subject to confirmation and verification. Payment methods, terms, and conditions will be communicated at the time of service.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">5.3 Refunds</h3>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                Refund policies, if applicable, are determined on a case-by-case basis and are governed by clinic policy as communicated at the time of service. We do not guarantee refunds for services rendered unless required by applicable law or clinic policy.
                            </p>
                        </div>

                        {/* 6. Intellectual Property */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">6. Intellectual Property Rights</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                All content on this website, including but not limited to text, graphics, logos, images, videos, software, and design elements, is the exclusive property of SkinLuxe Aesthetics & Academy or its licensors and is protected by Indian and international intellectual property laws.
                            </p>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                You are granted a limited, non-exclusive, non-transferable license to access and use this website for personal, non-commercial purposes only. You may not:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 mb-4">
                                <li>Copy, reproduce, distribute, or publicly display any website content without written permission</li>
                                <li>Modify, adapt, or create derivative works from website content</li>
                                <li>Use website content for commercial purposes</li>
                                <li>Remove or alter any copyright, trademark, or proprietary notices</li>
                                <li>Use educational content as authorization to practice aesthetic treatments</li>
                            </ul>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                Unauthorized use of website content may violate copyright, trademark, and other applicable laws and may result in legal action.
                            </p>
                        </div>

                        {/* 7. Prohibited Use */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">7. Prohibited Use and Activities</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                You expressly agree not to engage in any of the following prohibited activities:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                                <li><strong>Hacking or Unauthorized Access:</strong> Attempting to gain unauthorized access to any portion of the website, servers, databases, or systems</li>
                                <li><strong>Data Scraping:</strong> Using automated tools, bots, or scripts to extract, copy, or harvest data from the website</li>
                                <li><strong>Admin Impersonation:</strong> Attempting to access admin panels or restricted areas without proper authorization</li>
                                <li><strong>Malicious Content:</strong> Uploading, transmitting, or introducing viruses, malware, or any harmful code</li>
                                <li><strong>System Abuse:</strong> Overloading, disrupting, or interfering with website functionality or infrastructure</li>
                                <li><strong>Form Spam:</strong> Submitting spam, fraudulent, or abusive content through contact forms or booking systems</li>
                                <li><strong>Reverse Engineering:</strong> Attempting to decompile, reverse engineer, or extract source code</li>
                                <li><strong>Commercial Exploitation:</strong> Using the website for unauthorized commercial purposes or competitive analysis</li>
                            </ul>
                            <p className="text-[#4A4A4A] leading-relaxed mt-4">
                                Violation of these prohibitions may result in immediate termination of access, legal action, and reporting to law enforcement authorities.
                            </p>
                        </div>

                        {/* 8. Limitation of Liability */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">8. Limitation of Liability</h2>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">8.1 "As Is" Provision</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                This website and all content, features, and services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not guarantee that the website will be uninterrupted, error-free, secure, or free from viruses or other harmful components.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">8.2 No Guarantee of Availability</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                We do not guarantee continuous, uninterrupted, or secure access to the website. The website may be temporarily unavailable due to maintenance, technical issues, or circumstances beyond our control.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">8.3 Limitation of Damages</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                To the maximum extent permitted under Indian law, SkinLuxe Aesthetics & Academy, its directors, employees, and affiliates shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from or related to your use of this website, including but not limited to loss of data, loss of profits, or business interruption.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">8.4 Scope of Liability</h3>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                Our total liability for any claims arising from or related to these Terms or your use of the website shall be limited to the extent permitted by applicable Indian law. Nothing in these Terms shall exclude or limit liability for death, personal injury, fraud, or any other liability that cannot be excluded or limited under Indian law.
                            </p>
                        </div>

                        {/* 9. Third-Party Services */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">9. Third-Party Services and Links</h2>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">9.1 Hosting and Infrastructure</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                This website is hosted using third-party service providers, including Vercel (frontend hosting), Render (backend hosting), and other infrastructure providers. We are not responsible for service interruptions, data loss, or security breaches caused by third-party provider failures.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">9.2 External Links</h3>
                            <p className="text-[#4A4A4A] leading-relaxed mb-6">
                                This website may contain links to third-party websites or resources. These links are provided for convenience only. We do not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party websites. You access third-party websites at your own risk.
                            </p>

                            <h3 className="font-serif text-xl text-[#1C1C1C] mb-4">9.3 No Liability for Third Parties</h3>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                We are not liable for any loss or damage arising from your use of third-party services, websites, or resources, including but not limited to payment processors, mapping services, or social media platforms.
                            </p>
                        </div>

                        {/* 10. Termination of Access */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">10. Termination of Access</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                We reserve the right to suspend, restrict, or terminate your access to this website at any time, with or without notice, for any reason, including but not limited to:
                            </p>
                            <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 mb-4">
                                <li>Violation of these Terms of Service</li>
                                <li>Engagement in prohibited activities or misuse</li>
                                <li>Provision of false or fraudulent information</li>
                                <li>Security concerns or suspected unauthorized access</li>
                                <li>Legal or regulatory requirements</li>
                            </ul>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                Termination of access does not relieve you of any obligations incurred prior to termination. Upon termination, you must immediately cease all use of the website.
                            </p>
                        </div>

                        {/* 11. Governing Law & Jurisdiction */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">11. Governing Law and Jurisdiction</h2>
                            <div className="bg-[#F9F8F6] p-6 border-l-4 border-[#B4838D]">
                                <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                    <strong>Governing Law:</strong> These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
                                </p>
                                <p className="text-[#4A4A4A] leading-relaxed">
                                    <strong>Exclusive Jurisdiction:</strong> Any disputes, claims, or legal proceedings arising from or related to these Terms or your use of this website shall be subject to the exclusive jurisdiction of the courts located in Meerut, Uttar Pradesh, India. You irrevocably consent to the jurisdiction and venue of such courts.
                                </p>
                            </div>
                        </div>

                        {/* 12. Changes to Terms */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">12. Changes to These Terms</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                We reserve the right to modify, update, or replace these Terms of Service at any time without prior notice. When we make changes, we will update the "Last Updated" date at the top of this page.
                            </p>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                Your continued use of this website after any changes to these Terms constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.
                            </p>
                            <p className="text-[#4A4A4A] leading-relaxed">
                                If you do not agree to the revised Terms, you must immediately discontinue use of the website.
                            </p>
                        </div>

                        {/* 13. Contact Information */}
                        <div className="mb-12 bg-[#F9F8F6] p-8 border border-[#E6E2DD]">
                            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1C] mb-6">13. Contact Information</h2>
                            <p className="text-[#4A4A4A] leading-relaxed mb-4">
                                If you have questions, concerns, or require clarification regarding these Terms of Service, please contact us:
                            </p>
                            <div className="space-y-2 text-[#4A4A4A]">
                                <p><strong>Legal Business Name:</strong> SkinLuxe Aesthetics & Academy</p>
                                <p><strong>Address:</strong> FF, No. 38, New Market, Begum Bridge, near Titan Showroom, Sotiganj, Meerut, Uttar Pradesh 250001, India</p>
                                <p className="mt-4">
                                    <strong>Email:</strong> <a href="mailto:skinluxemeerut@gmail.com" className="text-[#B4838D] hover:underline">skinluxemeerut@gmail.com</a>
                                </p>
                                <p>
                                    <strong>Phone:</strong> <a href="tel:+919318452282" className="text-[#B4838D] hover:underline">+91 9318452282</a> / <a href="tel:+917451910272" className="text-[#B4838D] hover:underline">+91 7451910272</a>
                                </p>
                            </div>
                        </div>

                        {/* Acknowledgment */}
                        <div className="border-t border-[#E6E2DD] pt-8">
                            <p className="text-[#4A4A4A] text-sm leading-relaxed">
                                By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
