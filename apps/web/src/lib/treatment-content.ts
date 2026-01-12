export interface TreatmentContent {
    slug: string;
    seoTitle: string;
    seoDescription: string;
    heroTitle?: string;
    heroSubtitle?: string;
    painPoints?: {
        title: string;
        description: string;
        icon: "UserX" | "AlertCircle" | "Frown" | "XCircle" | "CheckCircle";
    }[];
    benefits?: {
        title: string;
        description: string;
    }[];
    processSteps?: {
        title: string;
        description: string;
    }[];
    pricingDetails?: {
        area: string;
        detail: string;
        price: string;
    }[];
    comparison?: {
        title: string;
        leftLabel: string;
        leftValue: string;
        leftPercent: number;
        rightLabel: string;
        rightValue: string;
        rightPercent: number;
        summary: string;
    };
    faqs?: {
        question: string;
        answer: string;
    }[];
}

export const treatmentContentMap: Record<string, TreatmentContent> = {
    // 1. LASER HAIR REDUCTION
    "laser-hair-reduction": {
        slug: "laser-hair-reduction",
        seoTitle: "Laser Hair Reduction in Meerut | Painless & Permanent | SkinLuxe",
        seoDescription: "Best Laser Hair Reduction in Meerut. FDA-approved Triple Wavelength technology for painless, permanent hair removal for Indian skin. Book free consultation.",
        heroTitle: "Experience Velvet Smooth Freedom.",
        heroSubtitle: "Forget shaving cuts and waxing pain. FDA-approved Triple Wavelength Laser targets hair at the root for permanent reduction—safely and painlessly.",
        painPoints: [
            { title: "No More Ingrowns", description: "Stop the painful cycle of bumps and strawberry legs forever.", icon: "CheckCircle" },
            { title: "Smoother Texture", description: "Laser improves overall skin quality, leaving it soft specifically.", icon: "CheckCircle" },
            { title: "Save Time", description: "Save 100+ hours of your life not shaving or waxing.", icon: "CheckCircle" }
        ],
        benefits: [
            { title: "100% Painless", description: "Advanced Sapphire Cooling tip keeps your skin cold (-5°C) while the heat targets the follicle." },
            { title: "Safe for Indian Skin", description: "Specific settings (808nm & 1064nm) bypass melanin to avoid burns or pigmentation." },
            { title: "Faster Sessions", description: "In-motion technology allows us to treat a Full Body in just 60-90 minutes." }
        ],
        pricingDetails: [
            { area: 'Face & Neck', detail: 'Includes upper lip, chin, sidelocks, and neck definition.', price: 'Starting @ ₹2,999' },
            { area: 'Underarms', detail: 'Quick 15-min session. Reduce sweat/odor and dark shadows.', price: 'Starting @ ₹1,499' },
            { area: 'Arms & Legs', detail: 'Full arms and full legs. Get ready for any outfit, anytime.', price: 'Starting @ ₹6,999' },
            { area: 'Full Body', detail: 'Complete head-to-toe freedom. Our bestseller.', price: 'Best Value Package' },
            { area: 'Bikini / Brazilian', detail: 'Safe, hygienic, and extremely private. Female technicians only.', price: 'Consult for Price' },
            { area: 'Men’s Beard Shaping', detail: 'Define your beard line and remove cheek hair.', price: 'Starting @ ₹1,999' }
        ],
        comparison: {
            title: "Lifetime Cost Comparison",
            leftLabel: "Waxing (Lifetime)",
            leftValue: "₹3,50,000+",
            leftPercent: 90,
            rightLabel: "Laser (6-8 Sessions)",
            rightValue: "₹40k - ₹60k",
            rightPercent: 25,
            summary: "Save over ₹3 Lakhs in your lifetime."
        },
        faqs: [
            { question: "Is it really painless?", answer: "Yes. Our diode laser has an integrated cooling tip that keeps the skin surface at -5°C. You might feel a slight prickling sensation in sensitive areas, but it is not painful like waxing." },
            { question: "How many sessions do I need?", answer: "Hair growth happens in cycles (Anagen, Catagen, Telogen). Laser only kills hair in the active growth phase. To catch all hairs in this phase, 6-8 sessions are required." },
            { question: "Is it safe for face?", answer: "Absolutely. It is the best treatment for facial hair and hormonal growth (PCOD)." },
            { question: "Can I do it in summer?", answer: "Yes, as long as you use sunscreen post-treatment." }
        ]
    },

    // 2. HYDRAFACIAL MD
    "hydrafacial-md": {
        slug: "hydrafacial-md",
        seoTitle: "HydraFacial in Meerut | Best Skin Clinic | SkinLuxe Aesthetics",
        seoDescription: "Get the original HydraFacial MD in Meerut. Deep cleanse, extract, and hydrate for instant glow. Perfect for weddings and events.",
        heroTitle: "HydraFacial MD® in Meerut",
        heroSubtitle: "3 Steps. 30 Minutes. The Best Skin of Your Life. Instant Glow with Zero Downtime.",
        painPoints: [
            { title: "Dull, Tired Skin?", description: "Pollution and stress make skin look lifeless.", icon: "Frown" },
            { title: "Blackheads?", description: "Painful manual extraction damages pores.", icon: "AlertCircle" },
            { title: "Dry & Flaky?", description: "Creams sit on top but don't hydrate deeply.", icon: "UserX" }
        ],
        benefits: [
            { title: "Instant Glow", description: "Visible radiance immediately after one session. Perfect 'Red Carpet' facial." },
            { title: "Deep Cleaning", description: "Vortex-Fusion technology pulls out dirt, oil, and impurities cleanly." },
            { title: "Zero Downtime", description: "Apply makeup immediately after. No redness, only glow." }
        ],
        pricingDetails: [
            { area: 'Signature HydraFacial', detail: '30 min. Cleanse, Extract, Hydrate (Basic Steps).', price: '₹3,999' },
            { area: 'Deluxe HydraFacial', detail: '45 min. Includes Booster Serum + LED Light Therapy.', price: '₹5,999' },
            { area: 'Platinum HydraFacial', detail: '60 min. The ultimate experience with Lymphatic Drainage.', price: '₹7,999' },
            { area: 'Lip/Eye Perk Add-on', detail: 'Plump lips or brighten eyes instantly.', price: '₹1,500' }
        ],
        comparison: {
            title: "Longevity Comparison",
            leftLabel: "Salon Facial",
            leftValue: "2-3 Days Glow",
            leftPercent: 20,
            rightLabel: "HydraFacial MD",
            rightValue: "20-30 Days Glow",
            rightPercent: 95,
            summary: "Medical-grade hydration lasts 10x longer."
        },
        faqs: [
            { question: "How is it different from a salon facial?", answer: "HydraFacial is a medical device treatment that cleans pores using vacuum technology, deeper than hands ever can." },
            { question: "Will I peel?", answer: "No. It is a hydration treatment. You will only glow." },
            { question: "How often should I get it?", answer: "We recommend once a month for maintaining healthy skin hygiene." },
            { question: "Is it good for men?", answer: "Absolutely. It prevents ingrown hairs and cleans dullness from shaving." }
        ]
    },

    // 3. ACNE TREATMENT (Mapping for 'scars-acne-spots' too)
    "acne-treatment": {
        slug: "acne-treatment",
        seoTitle: "Acne Treatment in Meerut | Pimple Cure Doctor | SkinLuxe",
        seoDescription: "Best acne treatment in Meerut by certified dermatologists. Cure active pimples, hormonal acne, and prevent scars. Book consultation.",
        heroTitle: "Clinical Acne & Pimple Defense",
        heroSubtitle: "Don't pop it. Treat it medically. Clear skin starts here with Doctor-Led protocols.",
        painPoints: [
            { title: "Painful Breakouts?", description: "Red, swollen pimples that hurt to touch.", icon: "AlertCircle" },
            { title: "Hiding Your Face?", description: "Loss of confidence due to constant flare-ups.", icon: "UserX" },
            { title: "Scars Forming?", description: "Untreated acne leads to permanent pits.", icon: "XCircle" }
        ],
        benefits: [
            { title: "Control Bacteria", description: "Kill P.acnes bacteria responsible for infection." },
            { title: "Reduce Oil", description: "Regulate sebum production to prevent future breakouts." },
            { title: "Clear Marks", description: "Fade post-acne red and brown spots simultaneously." }
        ],
        pricingDetails: [
            { area: 'Salicylic Peel', detail: 'Best for active, pus-filled acne. Dries pimples fast.', price: 'Starting @ ₹1,999' },
            { area: 'Black Peel', detail: 'Organic peel for cystic acne and oil control.', price: 'Starting @ ₹2,499' },
            { area: 'Carbon Laser', detail: 'Laser technology to shrink oil glands and pores.', price: 'Starting @ ₹3,499' },
            { area: 'Acne Scar Laser', detail: 'MNRF or CO2 Fractional for deep pit removal.', price: 'Consult for Price' }
        ],
        comparison: {
            title: "Treatment Depth",
            leftLabel: "Face Wash/Creams",
            leftValue: "Surface Only",
            leftPercent: 15,
            rightLabel: "Clinical Peels",
            rightValue: "Deep Pore Action",
            rightPercent: 90,
            summary: "Treat the root cause inside the pore, not just the surface."
        },
        faqs: [
            { question: "How long to see results?", answer: "Acne treatment takes patience. Visible difference is seen in 4-6 weeks as skin cycles." },
            { question: "Do you treat teenager acne?", answer: "Yes, we specialize in adolescent hormonal acne." },
            { question: "Can I wear makeup?", answer: "We recommend non-comedogenic makeup only. We will guide you." },
            { question: "Will it come back?", answer: "We treat the root cause to minimize recurrence, but maintenance lifestyle is key." }
        ]
    },
    "scars-acne-spots": {
        slug: "scars-acne-spots",
        seoTitle: "Acne Scars & Spot Removal in Meerut | SkinLuxe",
        seoDescription: "Effective removal of acne scars, dark spots, and pits in Meerut using MNRF, CO2 Laser, and Chemical Peels.",
        heroTitle: "Acne Scars & Dark Spots",
        heroSubtitle: "Erase the past. Advanced laser protocols to smooth pits and fade marks.",
        painPoints: [
            { title: "Pitted Skin?", description: "Boxcar or icepick scars from old acne.", icon: "Frown" },
            { title: "Dark Spots?", description: "Stubborn hyperpigmentation left after pimples heal.", icon: "AlertCircle" },
            { title: "Rough Texture?", description: "Uneven skin surface that makeup can't hide.", icon: "UserX" }
        ],
        benefits: [
            { title: "Collagen Remodeling", description: "Stimulate new skin growth to fill in pits." },
            { title: "Spot Fading", description: "Break down pigment for clearer skin." },
            { title: "Smoother Texture", description: "Resurface rough layers for baby-soft feel." }
        ],
        pricingDetails: [
            { area: 'MNRF (Microneedling RF)', detail: 'Best for deep pits and scars. Collagen induction.', price: 'Starting @ ₹6,999' },
            { area: 'CO2 Fractional Laser', detail: 'Laser resurfacing for severe texture issues.', price: 'Starting @ ₹5,999' },
            { area: 'TCA Cross Peel', detail: 'Targeted treatment for icepick scars.', price: '₹1,500 / Session' }
        ],
        comparison: {
            title: "Scar Filling",
            leftLabel: "Creams/Oils",
            leftValue: "0% Improvement",
            leftPercent: 5,
            rightLabel: "MNRF / CO2",
            rightValue: "60-80% Filling",
            rightPercent: 90,
            summary: "Physical scars need physical remodeling. Creams cannot fill pits."
        }
    },

    // 4. PIGMENTATION (Mapping for 'skin-lightening' too)
    "pigmentation-melasma": {
        slug: "pigmentation-melasma",
        seoTitle: "Pigmentation Treatment in Meerut | Dark Spot Removal | SkinLuxe",
        seoDescription: "Expert treatment for Melasma, sun spots, and pigmentation in Meerut. Safe Q-Switch Laser and Peels for Indian Skin.",
        heroTitle: "Pigmentation & Melasma Correction",
        heroSubtitle: "Erase dark spots. Reveal your true, even skin tone with safe Medical Lasers.",
        painPoints: [
            { title: "Uneven Skin Tone?", description: "Patches of dark skin on cheeks or forehead.", icon: "Frown" },
            { title: "Stubborn Melasma?", description: "Hormonal patches that refuse to fade with creams.", icon: "AlertCircle" },
            { title: "Sun Damage?", description: "Tanning and dullness from UV exposure.", icon: "UserX" }
        ],
        benefits: [
            { title: "Even Tone", description: "Restore a unified, bright complexion." },
            { title: "Safe Lightening", description: "Reduce melanin without bleaching agents." },
            { title: "Glow & Texture", description: "Improve overall skin quality while treating spots." }
        ],
        pricingDetails: [
            { area: 'Q-Switch Laser', detail: 'Gold standard for breaking pigment. No downtime.', price: 'Starting @ ₹3,499' },
            { area: 'Cosmelan Peel', detail: 'World’s #1 depigmentation peel for stubborn melasma.', price: 'Consult for Price' },
            { area: 'Party Glow Peel', detail: 'Instant brightening before events.', price: 'Starting @ ₹2,999' }
        ],
        comparison: {
            title: "Clearance Rate",
            leftLabel: "Whitening Creams",
            leftValue: "10-20% Fade",
            leftPercent: 20,
            rightLabel: "Medical Laser",
            rightValue: "80-90% Clearance",
            rightPercent: 85,
            summary: "Lasers break pigment physically. Creams only hide it."
        },
        faqs: [
            { question: "Is it permanent?", answer: "Pigment can return with sun exposure. Sunscreen is mandatory for maintenance." },
            { question: "Is laser safe?", answer: "Yes, Q-Switch laser specifically targets pigment, not skin. No burns." },
            { question: "How many sessions?", answer: "Typically 6 sessions for significant clearance." },
            { question: "Does it hurt?", answer: "It feels like a mild rubber band snap. Very tolerable." }
        ]
    },
    "skin-lightening": {
        slug: "skin-lightening",
        seoTitle: "Skin Lightening & Brightening Meerut | Glutathione & Peels",
        seoDescription: "Safe skin lightening treatments in Meerut. Glutathione IV, Q-Switch Laser, and Chemical Peels for full body brightening.",
        heroTitle: "Skin Brightening & Lightening",
        heroSubtitle: "Achieve up to 2-3 shades lighter skin tone safely with medical protocols.",
        painPoints: [
            { title: "General Dullness?", description: "Skin looks tired and lacks radiance.", icon: "Frown" },
            { title: "Full Body Tan?", description: "Sun damage on arms, back, and neck.", icon: "AlertCircle" },
            { title: "Wedding Ready?", description: "Need a full body glow for your big day.", icon: "CheckCircle" }
        ],
        benefits: [
            { title: "Full Body Glow", description: "Systemic brightening from within." },
            { title: "Detoxification", description: "Glutathione is a master antioxidant that cleanses the liver." },
            { title: "Safe De-Tanning", description: "Remove years of sun damage safely." }
        ],
        pricingDetails: [
            { area: 'Glutathione IV Drip', detail: 'High dose antioxidant infusion for systemic lightening.', price: 'Starting @ ₹4,999' },
            { area: 'Full Body Polishing', detail: 'Exfoliation + Brightening mask for body.', price: 'Starting @ ₹2,999' },
            { area: 'Laser Toning Face', detail: 'Instant brightness for face.', price: 'Starting @ ₹3,499' }
        ]
    },

    // 5. ANTI-AGING
    "anti-aging": {
        slug: "anti-aging",
        seoTitle: "Anti-Aging Treatment in Meerut | Botox & Fillers | SkinLuxe",
        seoDescription: "Look 10 years younger. Best Botox, Fillers, and HIFU treatment in Meerut. Non-surgical face lift by expert doctors.",
        heroTitle: "Anti-Aging & Wrinkle Treatment",
        heroSubtitle: "Aging is optional. Restore your youth naturally with US-FDA Approved injectables.",
        painPoints: [
            { title: "Wrinkles showing?", description: "Lines on forehead and around eyes making you look tired.", icon: "Frown" },
            { title: "Sagging Skin?", description: "Loss of jawline definition and cheek volume.", icon: "UserX" },
            { title: "Looking Angry?", description: "Frown lines creating a negative expression.", icon: "AlertCircle" }
        ],
        benefits: [
            { title: "Instant Youth", description: "Smooth out wrinkles in just one session." },
            { title: "Natural Look", description: "We enhance your features, not freeze them." },
            { title: "Lift & Tighten", description: "Restore the 'V-shape' of a youthful face." }
        ],
        pricingDetails: [
            { area: 'Botox / Anti-Wrinkle', detail: 'Per unit pricing. Forehead, Eyes, Frown.', price: '₹350 / Unit' },
            { area: 'Dermal Fillers', detail: 'For Cheeks, Lips, Chin, Jawline.', price: 'Consult for Price' },
            { area: 'HIFU Facelift', detail: 'Ultrasound non-surgical lifting.', price: 'Starting @ ₹15,000' },
            { area: 'Vampire Facial', detail: 'PRP for skin tightening.', price: 'Starting @ ₹4,999' }
        ],
        comparison: {
            title: "Time Reversed",
            leftLabel: "Anti-Aging Creams",
            leftValue: "0 Years",
            leftPercent: 5,
            rightLabel: "Injectables/HIFU",
            rightValue: "5-10 Years",
            rightPercent: 100,
            summary: "Creams hydrate. Procedures structurally reverse aging."
        },
        faqs: [
            { question: "Will I look frozen?", answer: "No. Our 'Baby Botox' technique softens lines while keeping natural expression." },
            { question: "How long does it last?", answer: "Typically 4-6 months, after which muscles gradually regain movement." },
            { question: "Is it safe?", answer: "Botox is one of the most researched drugs in the world. It is extremely safe." },
            { question: "Cost?", answer: "Pricing depends on units and vials used. Consultation is required." }
        ]
    },

    // 6. MICRONEEDLING
    "microneedling": {
        slug: "microneedling",
        seoTitle: "Microneedling Treatment Meerut | Collagen Induction Therapy",
        seoDescription: "Best Microneedling (Dermapen) treatment in Meerut. Stimulate natural collagen for scars, pores, and texture.",
        heroTitle: "Microneedling & Collagen Induction",
        heroSubtitle: "Reboot your skin's natural healing power. Smoother texture, smaller pores, zero scars.",
        painPoints: [
            { title: "Open Pores?", description: "Visible pores making skin look rough.", icon: "AlertCircle" },
            { title: "Acne Scars?", description: "Old pits that refuse to go away.", icon: "Frown" },
            { title: "Dull Texture?", description: "Lack of glow due to dead skin buildup.", icon: "UserX" }
        ],
        benefits: [
            { title: "Natural Collagen", description: "Uses your body's own healing response." },
            { title: "Safe & Effective", description: "Works on all skin types with minimal downtime." },
            { title: "Absorption Boost", description: "Increases product absorption by 3000%." }
        ],
        pricingDetails: [
            { area: 'Dermapen 4 Facelift', detail: 'Advanced automated microneedling.', price: 'Starting @ ₹3,999' },
            { area: 'Vampire Facial (PRP)', detail: 'Microneedling + Your own Plasma.', price: 'Starting @ ₹4,999' },
            { area: 'Growth Factor Needling', detail: 'Infusion of potent peptides.', price: 'Starting @ ₹4,500' }
        ]
    },

    // 7. GLUTATHIONE IV DRIP
    "glutathione-iv-drip": {
        slug: "glutathione-iv-drip",
        seoTitle: "Glutathione IV Drip Meerut | Skin Whitening Injection",
        seoDescription: "Original Glutathione IV Drips in Meerut. Safe detox and skin brightening therapy by doctors.",
        heroTitle: "Glutathione IV Wellness Drip",
        heroSubtitle: "The Master Antioxidant. Detoxify from within and reveal a lighter, brighter complexion.",
        painPoints: [
            { title: "Low Energy?", description: "Feeling fatigued and toxic buildup.", icon: "UserX" },
            { title: "Dull Complexion?", description: "Skin looks grey and lifeless.", icon: "Frown" },
            { title: "Weak Immunity?", description: "Frequent colds and slow healing.", icon: "AlertCircle" }
        ],
        benefits: [
            { title: "Systemic Lightening", description: "Brightens skin from head to toe." },
            { title: "Liver Detox", description: "Cleanses your body's main filter." },
            { title: "Immunity Boost", description: "High dose Vitamin C improves health." }
        ],
        pricingDetails: [
            { area: 'Glutathione Essential', detail: '1200mg Glutathione + Vitamin C.', price: '₹3,500' },
            { area: 'Glutathione Advanced', detail: '2400mg + Collagen + Multi-vitamins.', price: '₹5,500' },
            { area: 'Cinderella Drip', detail: 'Adding Alpha Lipoic Acid for anti-aging.', price: '₹7,500' }
        ]
    },

    // 8. HAIR LOSS (PRP/GFC)
    "hair-loss": {
        slug: "hair-loss",
        seoTitle: "Hair Loss Treatment Meerut | PRP & GFC Therapy | SkinLuxe",
        seoDescription: "Stop hair fall today. Best PRP, GFC, and Hair Transplant consultation in Meerut.",
        heroTitle: "Hair Loss & Regrowth Therapy",
        heroSubtitle: "Don't lose hope. Save your hair with medical-grade Growth Factor technology.",
        painPoints: [
            { title: "Thinning Hair?", description: "Scalp becoming visible.", icon: "Frown" },
            { title: "Excessive Fall?", description: "Clumps of hair in the shower.", icon: "AlertCircle" },
            { title: "Receding Line?", description: "Forehead getting bigger.", icon: "UserX" }
        ],
        benefits: [
            { title: "Stop Fall", description: "Strengthen roots immediately." },
            { title: "New Growth", description: "Stimulate dormant follicles to grow again." },
            { title: "Thicker Density", description: "Increase the diameter of existing hair." }
        ],
        pricingDetails: [
            { area: 'GFC (Growth Factor)', detail: 'Advanced blood therapy (Better than PRP).', price: '₹4,500 / Session' },
            { area: 'PRP Therapy', detail: 'Classic platelet rich plasma.', price: '₹3,000 / Session' },
            { area: 'Hair Meso', detail: 'Vitamin injections for roots.', price: '₹2,500 / Session' }
        ],
        comparison: {
            title: "Hair Density",
            leftLabel: "Hair Oils/Shampoo",
            leftValue: "Surface Coat",
            leftPercent: 10,
            rightLabel: "GFC Therapy",
            rightValue: "Root Stimulation",
            rightPercent: 90,
            summary: "Oils cannot penetrate the root. GFC injects growth factors directly."
        }
    },

    // 9. PARTY MAKEUP / BRIDE
    "party-bride-makeup": {
        slug: "party-bride-makeup",
        seoTitle: "Best Bridal Makeup Artist Meerut | Party Makeup | SkinLuxe",
        seoDescription: "Luxury Bridal and Party makeup in Meerut. HD, Airbrush, and Glass Skin looks by senior artists.",
        heroTitle: "Luxury Bridal & Party Makeup",
        heroSubtitle: "You, but stunning. High-definition makeup that looks like second skin.",
        painPoints: [
            { title: "Cakey Makeup?", description: "Fear of looking painted or fake.", icon: "Frown" },
            { title: "Melting Base?", description: "Makeup that doesn't last the event.", icon: "AlertCircle" },
            { title: "Wrong Shade?", description: "Foundation that doesn't match your neck.", icon: "UserX" }
        ],
        benefits: [
            { title: "HD & Airbrush", description: "Flawless finish for 4K photography." },
            { title: "Skin Prep Included", description: "We prep with luxury skincare first." },
            { title: "Long Lasting", description: "Waterproof and sweatproof for 12+ hours." }
        ],
        pricingDetails: [
            { area: 'Party Makeup (HD)', detail: 'Includes lashes and basic hair.', price: '₹3,500' },
            { area: 'Engagement Look', detail: 'Premium HD makeup with advanced hair.', price: '₹8,000' },
            { area: 'Bridal Airbrush', detail: 'Complete bridal package with jewelry styling.', price: '₹15,000' }
        ]
    },

    // 10. PMU (Permanent Makeup)
    "pmu-permanent-makeup": {
        slug: "pmu-permanent-makeup",
        seoTitle: "Permanent Makeup Meerut | Microblading & Lip Blush",
        seoDescription: "Wake up with makeup. Best Microblading eyebrows and Lip Blush in Meerut.",
        heroTitle: "Permanent Makeup (PMU)",
        heroSubtitle: "Wake up ready. Perfectly shaped brows and tinted lips, everyday.",
        painPoints: [
            { title: "Sparse Brows?", description: "Drawing eyebrows every morning.", icon: "Frown" },
            { title: "Pale Lips?", description: "Lips looking washed out without lipstick.", icon: "UserX" },
            { title: "Smudging?", description: "Eyeliner running during the day.", icon: "AlertCircle" }
        ],
        benefits: [
            { title: "Save Time", description: "Save 20 mins every morning." },
            { title: "Waterproof", description: "Swim, gym, and sleep without losing your look." },
            { title: "Natural Results", description: "Nano-blading mimics real hair strokes." }
        ],
        pricingDetails: [
            { area: 'Microblading Brows', detail: 'Natural hair strokes.', price: 'Starting @ ₹8,999' },
            { area: 'Lip Blush / Tint', detail: 'Natural pink/red tint for 2 years.', price: 'Starting @ ₹9,999' },
            { area: 'BB Glow', detail: 'Semi-permanent foundation look.', price: '₹3,500' }
        ]
    },
};
