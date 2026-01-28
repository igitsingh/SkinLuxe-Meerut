import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, AlertCircle, CheckCircle, Shield, ArrowRight, HelpCircle, User, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Acne Treatment in Meerut | SkinLuxe Aesthetics',
    description: 'Expert acne treatment in Meerut explaining why acne keeps coming back, hormonal acne causes, and medical solutions for dark spots and scars.',
    keywords: ['Acne Treatment in Meerut', 'Best acne clinic in Meerut', 'Acne treatment near me', 'Acne scars treatment Meerut', 'Hormonal acne treatment'],
    alternates: {
        canonical: 'https://skinluxe-meerut.com/blogs/acne-treatment-meerut',
    },
};

export default function AcneTreatmentBlog() {
    return (
        <div className="bg-[#FFFFFF]">
            {/* -----------------------------------------------------------------------
          HERO SECTION: PREMIUM ARCHITECTURAL DESIGN
      ----------------------------------------------------------------------- */}
            <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20 overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B4838D] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFFFFF] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container relative z-10 max-w-5xl mx-auto text-center">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-8">
                        Skin Health & Education
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl mb-8 leading-[1.1] text-white">
                        Acne Treatment in Meerut:<br />
                        <span className="text-[#B4838D] italic text-3xl md:text-5xl lg:text-6xl font-light block mt-4">Why Acne Keeps Coming Back & What Actually Works</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        Understanding the root causes of persistent acne, hormonal triggers, and safe medical treatments for Indian skin.
                    </p>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          MAIN CONTENT LAYOUT
      ----------------------------------------------------------------------- */}
            <div className="container py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* LEFT CONTENT COLUMN (8 cols) */}
                    <article className="lg:col-span-8 space-y-16 text-[#4A4A4A] font-light text-lg leading-relaxed">

                        {/* INTRO */}
                        <div className="space-y-8">
                            <p className="text-2xl text-[#1C1C1C] leading-snug">
                                Acne is one of the most common skin problems we see at SkinLuxe — and also one of the most misunderstood.
                            </p>
                            <p>
                                Many patients from Meerut, Modinagar, Muzaffarnagar, Hapur, Ghaziabad, Noida, Bulandshahr, Sonipat, Faridabad, and nearby cities come to us after trying multiple creams, medicines, and salon treatments with little or temporary improvement.
                            </p>

                            <div className="bg-[#F9F8F6] p-8 md:p-10 border-l-4 border-[#1C1C1C] shadow-sm">
                                <p className="font-serif text-2xl text-[#1C1C1C] mb-6 border-b border-[#E6E2DD] pb-4">This page explains:</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <li className="flex gap-4 items-start"><ArrowRight className="w-5 h-5 text-[#B4838D] mt-1 shrink-0" /> <span className="text-[#1C1C1C]">Why acne doesn’t go away</span></li>
                                    <li className="flex gap-4 items-start"><ArrowRight className="w-5 h-5 text-[#B4838D] mt-1 shrink-0" /> <span className="text-[#1C1C1C]">Why it keeps coming back</span></li>
                                    <li className="flex gap-4 items-start"><ArrowRight className="w-5 h-5 text-[#B4838D] mt-1 shrink-0" /> <span className="text-[#1C1C1C]">Which treatments actually work for Indian skin</span></li>
                                    <li className="flex gap-4 items-start"><ArrowRight className="w-5 h-5 text-[#B4838D] mt-1 shrink-0" /> <span className="text-[#1C1C1C]">When you should see a doctor instead of trying another product</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* SECTION 1 */}
                        <section className="space-y-8 pt-10 border-t border-[#E6E2DD]">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C]">Why Acne Does Not Go Away Even After Medicines</h2>
                            <p>
                                One of the most common searches we see is: <strong>“Acne not going away even after medicines”</strong>.
                            </p>
                            <p>
                                This usually happens because acne is not a single-condition problem. In most cases, acne is caused by a combination of:
                            </p>

                            <div className="grid sm:grid-cols-2 gap-5 py-4">
                                <div className="flex gap-4 items-center bg-white p-5 border border-[#E6E2DD] hover:border-[#B4838D] transition-colors rounded-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                                    <div className="w-10 h-10 bg-[#F9F8F6] rounded-full flex items-center justify-center text-[#B4838D] shrink-0"><Zap className="w-5 h-5" /></div>
                                    <span className="text-[#1C1C1C] font-medium">Hormonal imbalance</span>
                                </div>
                                <div className="flex gap-4 items-center bg-white p-5 border border-[#E6E2DD] hover:border-[#B4838D] transition-colors rounded-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                                    <div className="w-10 h-10 bg-[#F9F8F6] rounded-full flex items-center justify-center text-[#B4838D] shrink-0"><Shield className="w-5 h-5" /></div>
                                    <span className="text-[#1C1C1C] font-medium">Excess oil production</span>
                                </div>
                                <div className="flex gap-4 items-center bg-white p-5 border border-[#E6E2DD] hover:border-[#B4838D] transition-colors rounded-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                                    <div className="w-10 h-10 bg-[#F9F8F6] rounded-full flex items-center justify-center text-[#B4838D] shrink-0"><AlertCircle className="w-5 h-5" /></div>
                                    <span className="text-[#1C1C1C] font-medium">Clogged pores</span>
                                </div>
                                <div className="flex gap-4 items-center bg-white p-5 border border-[#E6E2DD] hover:border-[#B4838D] transition-colors rounded-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                                    <div className="w-10 h-10 bg-[#F9F8F6] rounded-full flex items-center justify-center text-[#B4838D] shrink-0"><CheckCircle className="w-5 h-5" /></div>
                                    <span className="text-[#1C1C1C] font-medium">Bacterial growth</span>
                                </div>
                                <div className="flex gap-4 items-center bg-white p-5 border border-[#E6E2DD] hover:border-[#B4838D] transition-colors rounded-sm shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] sm:col-span-2">
                                    <div className="w-10 h-10 bg-[#F9F8F6] rounded-full flex items-center justify-center text-[#B4838D] shrink-0"><User className="w-5 h-5" /></div>
                                    <span className="text-[#1C1C1C] font-medium">Skin sensitivity or inflammation</span>
                                </div>
                            </div>

                            <p>
                                Over-the-counter creams and repeated antibiotic courses may reduce acne temporarily, but they rarely address the root cause. Once the treatment stops, acne often returns — sometimes worse.
                            </p>
                            <p>
                                At SkinLuxe, acne treatment always starts with understanding the cause, not just suppressing symptoms.
                            </p>
                            <div className="bg-[#1C1C1C] text-white p-6 md:p-8 flex gap-6 items-center rounded-sm">
                                <span className="text-4xl">👉</span>
                                <span className="font-serif text-lg md:text-xl">If your acne keeps returning, a medical consultation is necessary.</span>
                            </div>
                        </section>

                        {/* SECTION 2 */}
                        <section className="space-y-8 pt-10 border-t border-[#E6E2DD]">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C]">Adult & Hormonal Acne: Why It Appears After 25</h2>
                            <p>
                                Searches like <strong>“Hormonal acne treatment for adults”</strong> and <strong>“Acne after 30”</strong> are extremely common in Meerut and nearby cities.
                            </p>
                            <p>
                                Adult acne — especially in women — is often linked to:
                            </p>
                            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 pl-2">
                                {['Hormonal fluctuations', 'Stress', 'PCOS or thyroid imbalance', 'Irregular skincare routines', 'Inappropriate cosmetic products'].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-[#B4838D] rounded-full shrink-0"></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-[#F9F8F6] p-8 -mx-6 md:-mx-0 md:rounded-sm">
                                <p className="mb-4 font-medium text-[#1C1C1C]">This type of acne usually appears on:</p>
                                <ul className="flex flex-wrap gap-3">
                                    {['Jawline', 'Chin', 'Lower Cheeks', 'Neck'].map((item, i) => (
                                        <li key={i} className="px-5 py-2 bg-white border border-[#E6E2DD] text-[#1C1C1C] uppercase tracking-wider text-xs font-bold shadow-sm">{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <p>
                                Hormonal acne cannot be treated effectively with salon facials or random peels. It requires medical evaluation, controlled treatment plans, and skin-safe procedures designed for Indian skin.
                            </p>
                        </section>

                        {/* SECTION 3 */}
                        <section className="space-y-8 pt-10 border-t border-[#E6E2DD]">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C]">Acne Marks & Dark Spots After Pimples</h2>
                            <p>
                                Another major concern is <strong>“Acne marks on face”</strong> or <strong>“Dark spots after pimples”</strong>.
                            </p>
                            <p>
                                For Indian skin, acne marks often turn into post-inflammatory pigmentation, which can last for months or even years if treated incorrectly.
                            </p>

                            <div className="border border-red-100 bg-red-50/30 p-8 rounded-sm">
                                <p className="text-[#B4838D] font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Common Mistakes
                                </p>
                                <ul className="space-y-4">
                                    {['Using strong peels without supervision', 'Scrubbing inflamed skin', 'Applying harsh home remedies', 'Ignoring sun protection'].map((mistake, i) => (
                                        <li key={i} className="flex gap-4 items-center">
                                            <div className="w-6 h-6 rounded-full bg-red-100/50 text-[#B4838D] flex items-center justify-center font-bold text-xs shrink-0">✕</div>
                                            <span className="text-[#1C1C1C]">{mistake}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p>
                                At SkinLuxe, acne mark treatment focuses on skin-type assessment, gradual pigmentation correction, preventing further darkening, and improving overall skin texture safely.
                            </p>
                            <div className="mt-4">
                                <Link href="/treatments/scars-acne-spots" className="inline-flex items-center gap-2 text-[#B4838D] font-serif italic text-xl hover:text-[#1C1C1C] transition-colors border-b border-[#B4838D] pb-1">
                                    Explore our Scars & Acne Spots treatments <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </section>

                        {/* SECTION 4 */}
                        <section className="space-y-8 pt-10 border-t border-[#E6E2DD]">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C]">Acne Scars: Can They Be Removed Permanently?</h2>
                            <p>
                                A very high-intent query we see: <strong>“How to remove acne scars permanently?”</strong>
                            </p>
                            <p>
                                The honest answer is: <strong className="bg-[#1C1C1C] text-white px-2 py-1">Acne scars can be significantly improved, but treatment depends on scar type.</strong>
                            </p>
                            <p>
                                There are different types of acne scars:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                                <div className="p-8 bg-[#F9F8F6] border border-[#E6E2DD] hover:shadow-md transition-shadow">
                                    <span className="block font-serif text-2xl mb-2 text-[#1C1C1C]">Ice-pick</span>
                                    <span className="text-xs uppercase tracking-widest text-[#B4838D]">Scars</span>
                                </div>
                                <div className="p-8 bg-[#F9F8F6] border border-[#E6E2DD] hover:shadow-md transition-shadow">
                                    <span className="block font-serif text-2xl mb-2 text-[#1C1C1C]">Rolling</span>
                                    <span className="text-xs uppercase tracking-widest text-[#B4838D]">Scars</span>
                                </div>
                                <div className="p-8 bg-[#F9F8F6] border border-[#E6E2DD] hover:shadow-md transition-shadow">
                                    <span className="block font-serif text-2xl mb-2 text-[#1C1C1C]">Box</span>
                                    <span className="text-xs uppercase tracking-widest text-[#B4838D]">Scars</span>
                                </div>
                            </div>
                            <p>
                                Each scar type responds to different medical treatments. A single method does not work for all scars. That’s why proper diagnosis is essential before starting any scar treatment.
                            </p>
                        </section>

                        {/* SECTION 5 */}
                        <section className="space-y-8 pt-10 border-t border-[#E6E2DD]">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C]">Is Acne Laser or Chemical Peel Safe for Indian Skin?</h2>
                            <p>
                                Many patients hesitate due to fear: <strong>“Is laser safe for brown skin?”</strong> or <strong>“Will peel cause pigmentation?”</strong>
                            </p>
                            <p>
                                This fear is valid. When acne treatments are done without proper assessment, they can cause burns, increased pigmentation, skin sensitivity, and long-term damage.
                            </p>
                            <div className="bg-[#1C1C1C] text-white p-8 md:p-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B4838D] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
                                <p className="mb-6 font-serif text-2xl">At SkinLuxe:</p>
                                <ul className="grid sm:grid-cols-2 gap-6 relative z-10">
                                    <li className="flex gap-4 items-start">
                                        <CheckCircle className="w-6 h-6 text-[#B4838D] shrink-0" />
                                        <span>Every acne procedure is medically guided</span>
                                    </li>
                                    <li className="flex gap-4 items-start">
                                        <CheckCircle className="w-6 h-6 text-[#B4838D] shrink-0" />
                                        <span>Patch testing is done when required</span>
                                    </li>
                                    <li className="flex gap-4 items-start">
                                        <CheckCircle className="w-6 h-6 text-[#B4838D] shrink-0" />
                                        <span>Settings are customised for Indian skin tones</span>
                                    </li>
                                    <li className="flex gap-4 items-start">
                                        <CheckCircle className="w-6 h-6 text-[#B4838D] shrink-0" />
                                        <span>Safety is prioritised over speed</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* SECTION 6 */}
                        <section className="space-y-8 pt-10 border-t border-[#E6E2DD]">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C]">Why Acne Keeps Coming Back Again and Again</h2>
                            <p>
                                Recurring acne is often a sign that:
                            </p>
                            <ul className="pl-6 space-y-3 border-l-2 border-[#B4838D]">
                                {['Only surface treatment was done', 'Lifestyle factors were ignored', 'Skin barrier was damaged', 'Follow-up care was inadequate'].map((item, i) => (
                                    <li key={i} className="text-[#1C1C1C] font-medium block relative pl-4 before:content-[''] before:absolute before:left-[-29px] before:top-3 before:w-3 before:h-px before:bg-[#B4838D]">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p>
                                Acne treatment is not just about removing pimples — it’s about preventing recurrence. That’s why we focus on root-cause treatment, skin repair, maintenance plans, and long-term skin health.
                            </p>
                        </section>

                        {/* SECTION 7 */}
                        <section className="space-y-8 pt-10 border-t border-[#E6E2DD]">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C] mb-8">When Should You See a Doctor for Acne?</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-[#F9F8F6] p-8">
                                    <h4 className="font-serif text-xl mb-6 flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 text-[#B4838D]" /> Consult If:
                                    </h4>
                                    <ul className="space-y-4">
                                        {['Acne has lasted more than 6 months', 'Pimples are painful or cystic', 'Marks or scars are forming', 'Acne is affecting confidence'].map((item, i) => (
                                            <li key={i} className="flex gap-3 items-center text-sm">
                                                <div className="w-1.5 h-1.5 bg-[#1C1C1C] rotate-45 shrink-0"></div> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col justify-center border border-[#E6E2DD] p-8 text-center bg-white shadow-lg shadow-black/5">
                                    <p className="font-serif text-lg text-[#1C1C1C] mb-4">"Early medical intervention often prevents scarring and pigmentation, especially in Indian skin."</p>
                                    <div className="h-px w-12 bg-[#B4838D] mx-auto opacity-50"></div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 8 */}
                        <section className="space-y-8 pt-10 border-t border-[#E6E2DD]">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C]">Acne Treatment at SkinLuxe, Meerut</h2>
                            <p>
                                Patients choose SkinLuxe because treatments are doctor-guided, protocols are customised (not generic), safety for Indian skin is prioritised, and honest guidance is given — no unnecessary procedures.
                            </p>
                            <p>
                                We treat patients not only from Meerut, but also from Ghaziabad, Noida, Modinagar, Muzaffarnagar, Hapur, Bulandshahr, Sonipat, Faridabad, and nearby regions.
                            </p>
                        </section>

                    </article>

                    {/* RIGHT SIDEBAR (Sticky) - 4 cols */}
                    <aside className="lg:col-span-4 space-y-10">
                        {/* KEY TAKEAWAYS SIDEBAR CARD (Fixed: Non-sticky) */}
                        <div className="bg-white border border-[#E6E2DD] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                            <div className="mb-8 pb-4 border-b border-[#E6E2DD]">
                                <h3 className="font-serif text-2xl text-[#1C1C1C] mb-2">Key Takeaways</h3>
                                <p className="text-[10px] text-[#B4838D] uppercase tracking-[0.2em] font-bold">Quick Summary</p>
                            </div>
                            <ul className="space-y-8">
                                <li className="flex gap-4 items-start group">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1C1C1C] text-white flex items-center justify-center font-serif text-sm group-hover:bg-[#B4838D] transition-colors">1</span>
                                    <p className="text-sm text-[#4A4A4A] font-light leading-relaxed">
                                        <strong className="block text-[#1C1C1C] mb-1 font-normal">It's Internal.</strong>
                                        Acne returning usually indicates an internal hormonal trigger or barrier damage.
                                    </p>
                                </li>
                                <li className="flex gap-4 items-start group">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1C1C1C] text-white flex items-center justify-center font-serif text-sm group-hover:bg-[#B4838D] transition-colors">2</span>
                                    <p className="text-sm text-[#4A4A4A] font-light leading-relaxed">
                                        <strong className="block text-[#1C1C1C] mb-1 font-normal">Diagnosis First.</strong>
                                        Treating scars like marks (or vice versa) is the #1 reason for failure.
                                    </p>
                                </li>
                                <li className="flex gap-4 items-start group">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1C1C1C] text-white flex items-center justify-center font-serif text-sm group-hover:bg-[#B4838D] transition-colors">3</span>
                                    <p className="text-sm text-[#4A4A4A] font-light leading-relaxed">
                                        <strong className="block text-[#1C1C1C] mb-1 font-normal">Start Early.</strong>
                                        Early medical intervention is the only way to prevent permanent pitting.
                                    </p>
                                </li>
                            </ul>

                            <div className="mt-10 pt-6 border-t border-[#E6E2DD]">
                                <Link href="/book-appointment">
                                    <button className="w-full bg-[#1C1C1C] text-white py-4 hover:bg-[#B4838D] transition-all duration-300 uppercase tracking-widest text-xs font-bold shadow-lg shadow-black/20 hover:shadow-xl">
                                        Book Expert Consultation
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* RELATED SERVICE CARD */}
                        <div className="bg-[#1C1C1C] text-white p-10 text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                            <div className="relative z-10">
                                <h4 className="font-serif text-lg mb-4">Scar Solutions</h4>
                                <p className="text-white/70 font-light text-sm mb-8 leading-relaxed">
                                    Discover our advanced, FDA-approved protocols for treating deep acne scars and pits in Meerut.
                                </p>
                                <Link href="/treatments/scars-acne-spots" className="inline-block border border-white/30 text-white px-8 py-3 text-xs uppercase tracking-widest hover:border-white hover:bg-white hover:text-[#1C1C1C] transition-all">
                                    View Treatment
                                </Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

            {/* -----------------------------------------------------------------------
          FINAL CTA SECTION (Full Width)
      ----------------------------------------------------------------------- */}
            <section className="bg-white py-24 border-t border-[#E6E2DD]">
                <div className="container max-w-3xl mx-auto text-center px-6">
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1C1C1C] mb-8">Start Your Clear Skin Journey</h2>
                    <p className="text-[#4A4A4A] font-light text-lg mb-12 leading-relaxed">
                        If you’re struggling with recurring breakouts, the first step is a proper dermatological assessment. Your skin deserves a solution — not guesswork.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/book-appointment" className="group relative overflow-hidden bg-[#B4838D] text-white px-10 py-4 transition-all hover:bg-[#1C1C1C] uppercase tracking-widest text-xs font-bold inline-flex items-center justify-center gap-3">
                            <span>Book Consultation</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="https://wa.me/919318452282" target="_blank" rel="noopener noreferrer" className="btn-luxury-outline border border-[#E6E2DD] text-[#1C1C1C] px-10 py-4 hover:border-[#1C1C1C] transition-colors uppercase tracking-widest text-xs font-bold inline-flex items-center justify-center">
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
