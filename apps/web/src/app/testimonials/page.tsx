import React from 'react';
import Link from 'next/link';
import { Star, Quote, CheckCircle, Play } from 'lucide-react';

export const metadata = {
    title: 'Patient Stories & Reviews | SkinLuxe Meerut',
    description: 'Real stories from real patients. See why SkinLuxe is the most trusted aesthetic clinic in Meerut with 5-star ratings.',
};

export default function TestimonialsPage() {
    const reviews = [
        {
            name: "Priya Sharma",
            treatment: "Acne Treatment",
            content: "I battled hormonal acne for years. Dr. Alka didn't just give me creams; she explained the root cause. 3 months later, my skin is completely clear. It's truly life-changing.",
            rating: 5,
            date: "2 months ago"
        },
        {
            name: "Rahul Verma",
            treatment: "Laser Hair Reduction",
            content: "I was skeptical about laser being 'painless', but the Soprano Titanium is actually comfortable. The staff is extremely professional and the clinic feels like a 5-star hotel.",
            rating: 5,
            date: "1 month ago"
        },
        {
            name: "Anjali Gupta",
            treatment: "HydraFacial",
            content: "The best facial I've ever had. My skin was glowing for weeks. The 3-step process was explained beautifully by the therapist. Highly recommend for brides.",
            rating: 5,
            date: "3 weeks ago"
        },
        {
            name: "Meera K.",
            treatment: "Botox & Fillers",
            content: "I wanted a refresher, not a frozen look. Dr. Alka has an artist's eye. She did exactly what was needed—subtle, natural, and effective. I look 5 years younger.",
            rating: 5,
            date: "5 months ago"
        },
        {
            name: "Sandeep Singh",
            treatment: "Acne Scar Treatment",
            content: "The combination of MNRF and subcision worked wonders for my deep scars. It takes patience, but the results are worth it. Trust the process.",
            rating: 5,
            date: "4 months ago"
        },
        {
            name: "Kavita R.",
            treatment: "Carbon Laser Peel",
            content: "Got the Hollywood Peel before my anniversary. Instant brightness and my pores vanished. Makeup went on so smoothly afterwards!",
            rating: 5,
            date: "1 week ago"
        }
    ];

    return (
        <div className="bg-white">
            {/* -----------------------------------------------------------------------
          HERO SECTION
      ----------------------------------------------------------------------- */}
            <section className="relative min-h-[50vh] flex items-center justify-center bg-[#1C1C1C] text-white pt-32 pb-20">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                <div className="container relative z-10 text-center max-w-4xl">
                    <span className="inline-block py-2 px-4 border border-[#B4838D] text-[#B4838D] text-xs font-serif tracking-[0.2em] uppercase mb-6">
                        Social Proof
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 leading-tight">
                        <span className="text-white">Stories of</span> <span className="text-white/80 italic">Transformation</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        We don't just treat skin; we restore confidence. Join hundreds of happy patients who have
                        trusted SkinLuxe with their aesthetic journey.
                    </p>

                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-12 border-t border-white/10 pt-8">
                        <div className="text-center">
                            <div className="text-3xl font-serif text-white mb-1">4.9/5</div>
                            <div className="flex gap-1 text-[#B4838D] justify-center mb-1">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <div className="text-xs text-white/50 uppercase tracking-widest">Google Rating</div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-3xl font-serif text-white mb-1">2000+</div>
                            <p className="text-[#B4838D] text-sm mb-1">Happy Patients</p>
                            <div className="text-xs text-white/50 uppercase tracking-widest">Since 2021</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          FEATURED VIDEO STORIES (Placeholder UI)
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-[#1C1C1C] mb-4">Watch Their Journey</h2>
                        <p className="text-[#4A4A4A] font-light">Real patients, unscripted feedback.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Acne Free after 5 years", duration: "2:14" },
                            { title: "My Laser Experience", duration: "1:45" },
                            { title: "Anti-Aging Transformation", duration: "3:30" }
                        ].map((video, i) => (
                            <div key={i} className="group relative aspect-video bg-[#1C1C1C] cursor-pointer overflow-hidden border border-[#E6E2DD]">
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 text-white ml-1" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-white font-serif text-lg">{video.title}</h3>
                                    <p className="text-white/60 text-xs mt-1">{video.duration}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          REVIEWS GRID
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#F9F8F6]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-white p-8 border border-[#E6E2DD] flex flex-col h-full hover:shadow-lg transition-shadow duration-300 text-center md:text-left items-center md:items-start">
                                <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-6 w-full gap-4 md:gap-0">
                                    <Quote className="w-8 h-8 text-[#E6E2DD]" />
                                    <div className="flex gap-1 text-[#B4838D]">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-[#4A4A4A] font-light leading-relaxed mb-6 flex-grow italic">
                                    "{review.content}"
                                </p>

                                <div className="border-t border-[#F2F2F2] pt-6 mt-auto w-full">
                                    <h4 className="font-serif text-[#1C1C1C] text-lg">{review.name}</h4>
                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mt-1 justify-center md:justify-start">
                                        <span className="text-[#B4838D] text-xs font-semibold uppercase tracking-wider">{review.treatment}</span>
                                        <span className="text-[#E6E2DD] hidden md:inline">•</span>
                                        <span className="text-[#999999] text-xs flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" /> Verified Patient
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <a
                            href="https://google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#1C1C1C] hover:text-[#B4838D] transition-colors border-b border-[#1C1C1C] hover:border-[#B4838D] pb-1"
                        >
                            Read all 500+ reviews on Google <Quote className="w-4 h-4 transform rotate-180" />
                        </a>
                    </div>
                </div>
            </section>

            {/* -----------------------------------------------------------------------
          CTA SECTION
      ----------------------------------------------------------------------- */}
            <section className="py-24 bg-[#1C1C1C] text-white text-center">
                <div className="container max-w-3xl">
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Ready to Write Your Story?</h2>
                    <p className="text-white/60 text-lg font-light mb-10 leading-relaxed">
                        Join our community of confident, radiant individuals.
                        Book your consultation today and take the first step towards your transformation.
                    </p>
                    <Link href="/book-appointment" className="w-full sm:w-auto inline-block">
                        <button className="btn-luxury-filled bg-[#B4838D] border-[#B4838D] text-white hover:bg-white hover:text-[#1C1C1C] hover:border-white w-full sm:min-w-[200px] sm:w-auto h-[54px] flex items-center justify-center font-serif tracking-widest text-xs uppercase mx-auto">
                            Book Your Consultation
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
