--
-- PostgreSQL database dump
--

\restrict rtaIbIjaYLcA7f8s7NLa6yXOFxV2ovrhjUHLk1oJlb73sV1alhhsnLi4YXA9VwD

-- Dumped from database version 14.20 (Homebrew)
-- Dumped by pg_dump version 14.20 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: isachinsingh
--

COPY public."User" (id, email, password, name, role, avatar, "isActive", "lastLogin", "createdAt", "updatedAt", phone) FROM stdin;
7861cb82-c446-4bc8-8061-0c77d6ead99e	admin@skinluxe.com	$2b$10$HYgBXon3UB4nHXjuhAjK6uZdFhenxhXBP5n/M8V2fnd4OlkKNnA5i	SkinLuxe Admin	ADMIN	\N	t	\N	2026-01-12 13:58:35.578	2026-01-12 13:58:35.578	\N
05602308-4123-4b14-8522-8cde0203e29c	isachinatju@gmail.com	$2b$10$SSmKB9iM46rTGIi/3SfzPOSCAYVfjM7ARUTiTvvDtV/FCnssbYRji	Sachin Singh	CUSTOMER	\N	t	\N	2026-01-13 10:40:19.87	2026-01-13 10:40:19.87	+917014681829
\.


--
-- Data for Name: ActivityLog; Type: TABLE DATA; Schema: public; Owner: isachinsingh
--

COPY public."ActivityLog" (id, "userId", action, entity, "entityId", description, metadata, "createdAt") FROM stdin;
\.


--
-- Data for Name: Treatment; Type: TABLE DATA; Schema: public; Owner: isachinsingh
--

COPY public."Treatment" (id, name, slug, description, "shortDescription", duration, downtime, "painLevel", price, icon, image, category, "isFeatured", "createdAt", "updatedAt") FROM stdin;
fb2437e0-8864-4a88-9a84-ff58fd55d83f	Botox & Fillers	botox-fillers	Wrinkle relaxation and volume restoration using US-FDA approved injectables.	\N	30 mins	\N	\N	Per Unit/Ml	\N	\N	Anti-Aging	f	2026-01-12 19:20:27.227	2026-01-12 19:20:27.227
28f079c4-be61-4e97-9073-ec5ca67ae934	HIFU Skin Tightening	hifu-treatment	Non-surgical facelift using ultrasound energy to lift and tighten sagging skin.	\N	60-90 mins	\N	\N	Starts at ₹15000	\N	\N	Anti-Aging	f	2026-01-12 19:20:27.228	2026-01-12 19:20:27.228
952e3205-1dfe-4fa8-b0aa-ba61ac6ac9b9	Vampire Facial (PRP)	prp-vampire-facial	Natural rejuvenation using your own growth factors to stimulate collagen and hair growth.	\N	60 mins	\N	\N	Starts at ₹4000	\N	\N	Anti-Aging	f	2026-01-12 19:20:27.231	2026-01-12 19:20:27.231
fd224862-7107-49b4-9c01-f6ccc00d1969	Skin Boosters	skin-boosters	Deep hydration micro-injections for long-lasting glow and texture improvement.	\N	45 mins	\N	\N	Starts at ₹12000	\N	\N	Anti-Aging	f	2026-01-12 19:20:27.234	2026-01-12 19:20:27.234
316cdcc2-3baf-4235-917f-e1a8edb7ed10	Carbon Laser Peel	carbon-laser-peel	Hollywood peel for instant brightening and pore reduction. Great before parties.	\N	45 mins	\N	\N	Starts at ₹3500	\N	\N	Glow	f	2026-01-12 19:20:27.234	2026-01-12 19:20:27.234
d4696f4b-6bde-4404-b980-e48d82ed6471	Q-Switch Laser Toning	q-switch-laser	Targets melanin to treat pigmentation, uneven tone, and tattoo removal.	\N	30 mins	\N	\N	Starts at ₹3000	\N	\N	Glow	f	2026-01-12 19:20:27.235	2026-01-12 19:20:27.235
a48e6007-d635-4ddd-86cc-5c040aef5d0b	Chemical Peels	chemical-peels	Exfoliation for acne, spots, and dullness using medical-grade acids (Glycolic, Salicylic).	\N	30 mins	\N	\N	Starts at ₹1500	\N	\N	Glow	f	2026-01-12 19:20:27.236	2026-01-12 19:20:27.236
631adac9-04c9-4aee-b4ce-9a034f550319	Medi-Facials	medi-facials	Customized clinical facials for deep hydration, brightening, and relaxation.	\N	60 mins	\N	\N	Starts at ₹2500	\N	\N	Glow	f	2026-01-12 19:20:27.237	2026-01-12 19:20:27.237
ed8cff96-3d4c-4aa5-8ffe-d8487e2a07df	HydraFacial MD®	hydrafacial	The original 3-step treatment: Cleanse, Extract, and Hydrate. Get glass-like skin with zero downtime. Perfect for events or monthly maintenance.	\N	45 mins	\N	\N	Starts at ₹3,999	Droplets	\N	Signature	t	2026-01-12 19:20:27.226	2026-01-12 19:42:09.264
4970f2ac-da6e-4018-b332-1947b900b757	Laser Hair Reduction	laser-hair-reduction	Experience freedom from shaving and waxing. Our triple-wavelength diode laser offers painless, permanent reduction safe for all Indian skin types.	\N	30-45 mins	\N	\N	Starting @ ₹2999	Zap	\N	Laser	t	2026-01-12 19:20:27.219	2026-01-12 22:23:21.592
0de44adc-f9d2-4aef-9dd6-364eb97b816a	HydraFacial MD	hydrafacial-md	Premium HydraFacial MD treatment at SkinLuxe Meerut. Safe and effective protocols designed for your needs.	Best HydraFacial MD in Meerut.	60 mins	None	None	Starting @ ₹3999	\N		Face	f	2026-01-12 22:23:21.597	2026-01-12 22:23:21.597
b0f8ed9b-6369-4d1b-94af-466132c826b9	Acne Treatment	acne-treatment	A medical protocol to control active acne and remodel deep scars using Chemical Peels, MNRF, and CO2 Laser technology.	\N	60 mins	\N	\N	Starting @ ₹1999	Shield	\N	Face	t	2026-01-12 19:20:27.227	2026-01-12 22:23:21.6
28da4ff9-f30f-43ae-afba-3e470fdb9bbe	Acne Scars & Spots	scars-acne-spots	Premium Acne Scars & Spots treatment at SkinLuxe Meerut. Safe and effective protocols designed for your needs.	Best Acne Scars & Spots in Meerut.	60 mins	None	None	Starting @ ₹5999	\N		Laser	f	2026-01-12 22:23:21.601	2026-01-12 22:23:21.601
592c60a2-19c0-4815-aab3-c456feab2489	Pigmentation & Melasma	pigmentation-melasma	Premium Pigmentation & Melasma treatment at SkinLuxe Meerut. Safe and effective protocols designed for your needs.	Best Pigmentation & Melasma in Meerut.	60 mins	None	None	Starting @ ₹3499	\N		Laser	f	2026-01-12 22:23:21.602	2026-01-12 22:23:21.602
9280ffb7-981e-4b83-986b-c0b571a1cd41	Skin Lightening & Glutathione	skin-lightening	Premium Skin Lightening & Glutathione treatment at SkinLuxe Meerut. Safe and effective protocols designed for your needs.	Best Skin Lightening & Glutathione in Meerut.	60 mins	None	None	Starting @ ₹2999	\N		Drips	f	2026-01-12 22:23:21.603	2026-01-12 22:23:21.603
ccfb05dd-a9d1-41be-a056-de5cb9d83769	Glutathione IV Drip	glutathione-iv-drip	Premium Glutathione IV Drip treatment at SkinLuxe Meerut. Safe and effective protocols designed for your needs.	Best Glutathione IV Drip in Meerut.	60 mins	None	None	Starting @ ₹3500	\N		Drips	f	2026-01-12 22:23:21.604	2026-01-12 22:23:21.604
db2e400f-de20-424f-b32c-d3ff8eb53ccc	Anti-Aging Therapies	anti-aging	Premium Anti-Aging Therapies treatment at SkinLuxe Meerut. Safe and effective protocols designed for your needs.	Best Anti-Aging Therapies in Meerut.	60 mins	None	None	Starting @ ₹15000	\N		Injectables	f	2026-01-12 22:23:21.605	2026-01-12 22:23:21.605
d4753ef7-5bf8-4809-8ac1-ade67539efb0	MicroNeedling	microneedling	Premium MicroNeedling treatment at SkinLuxe Meerut. Safe and effective protocols designed for your needs.	Best MicroNeedling in Meerut.	60 mins	None	None	Starting @ ₹3999	\N		Face	f	2026-01-12 22:23:21.605	2026-01-12 22:23:21.605
c9333d60-0bae-422e-bf40-98761f0752df	Hair Loss Treatment	hair-loss	Premium Hair Loss Treatment treatment at SkinLuxe Meerut. Safe and effective protocols designed for your needs.	Best Hair Loss Treatment in Meerut.	60 mins	None	None	Starting @ ₹3000	\N		Hair	f	2026-01-12 22:23:21.606	2026-01-12 22:23:21.606
d122e90b-7da5-4135-9f04-5f931dcce615	Party & Bridal Makeup	party-bride-makeup	Premium Party & Bridal Makeup treatment at SkinLuxe Meerut. Safe and effective protocols designed for your needs.	Best Party & Bridal Makeup in Meerut.	60 mins	None	None	Starting @ ₹3500	\N		Makeup	f	2026-01-12 22:23:21.607	2026-01-12 22:23:21.607
9b4bb247-b1fc-4220-96b2-a0033263fdad	Permanent Makeup (PMU)	pmu-permanent-makeup	Premium Permanent Makeup (PMU) treatment at SkinLuxe Meerut. Safe and effective protocols designed for your needs.	Best Permanent Makeup (PMU) in Meerut.	60 mins	None	None	Starting @ ₹8999	\N		Makeup	f	2026-01-12 22:23:21.607	2026-01-12 22:23:21.607
\.


--
-- Data for Name: Appointment; Type: TABLE DATA; Schema: public; Owner: isachinsingh
--

COPY public."Appointment" (id, name, phone, email, "treatmentId", date, "timeSlot", status, notes, "createdAt", "updatedAt") FROM stdin;
ccceecdd-ce7b-4bee-b171-0b0b54f96f2a	Sachin Singh	+917014681829	\N	\N	2026-01-13 00:00:00	01:00 PM	CONFIRMED	Service Requested: Laser Hair Reduction	2026-01-12 21:19:43.785	2026-01-12 21:22:20.102
f43dba3f-f606-4ec6-934c-cae0f861b7ca	Sachin Singh	+917014681829	\N	\N	2026-01-13 00:00:00	01:00 PM	COMPLETED	Service Requested: General Consultation	2026-01-12 21:02:57.399	2026-01-12 21:22:23.109
d7f454f0-7087-4570-a88e-ffad5d609aac	Final Appointment Test Fetch	1234567890	\N	\N	2026-01-15 00:00:00	Pending	CONFIRMED	\N	2026-01-13 09:56:37.751	2026-01-13 09:59:57.546
410d2f52-73cf-44c4-af59-dd2ab8984f5f	Restart Verification	9999999999	\N	\N	2026-01-14 10:00:00	10:00 AM	COMPLETED	Test	2026-01-12 21:02:21.065	2026-01-13 10:00:01.819
4d52867f-768a-4d9f-9c2f-238ed0505d2a	Test User	9999999999	\N	\N	2026-01-14 00:00:00	01:00 PM	CONFIRMED	Service Requested: Laser Hair Reduction	2026-01-13 08:18:25.512	2026-01-13 10:00:05.479
72ec5ad8-0d1c-41cd-b47e-b6e00dfe8097	Test User	9999999999	\N	\N	2026-01-14 00:00:00	01:00 PM	COMPLETED	Service Requested: Laser Hair Reduction	2026-01-13 08:21:57.346	2026-01-13 10:00:10.18
5e9b2194-39e4-4523-b77e-9b79a4b1c7dc	Security Test	9876543210	\N	\N	2026-01-14 00:00:00	11:00 AM	CONFIRMED	Service Requested: Laser Hair Reduction	2026-01-13 08:33:13.249	2026-01-13 10:00:12.946
40b91750-78a2-4474-8fd6-7c36205744dc	Production Test App	9876543210	\N	\N	2026-01-14 00:00:00	11:00 AM	CANCELLED	Service Requested: Laser Hair Reduction	2026-01-13 08:40:27.023	2026-01-13 10:00:16.658
6bf51dec-f062-44ef-a365-2cfa998b9fe6	Sachin Singh	+917014681829	isachinatju@gmail.com	9b4bb247-b1fc-4220-96b2-a0033263fdad	2026-01-15 08:00:00	00:00	CONFIRMED	Hi! A new surprise for you.	2026-01-13 10:48:08.638	2026-01-13 10:48:08.638
f1177d3b-1070-436f-9727-fbbf48d63615	Sachin Singh	+917014681829	isachinatju@gmail.com	d4753ef7-5bf8-4809-8ac1-ade67539efb0	2026-01-16 10:51:00	00:00	CONFIRMED		2026-01-13 10:48:43.922	2026-01-13 10:48:43.922
a3fd3cba-a9eb-406b-acaa-e20e9f07fa4b	Sachin Singh	+917014681829	\N	\N	2026-01-13 00:00:00	01:00 PM	PENDING	Service Requested: Acne / Scars	2026-01-12 21:05:15.339	2026-01-13 11:06:16.594
e356ad91-5c56-4fb7-9afe-64d7f09b801a	Akanksha	9999998578	\N	\N	2026-01-17 00:00:00	01:00 PM	COMPLETED	Service Requested: Laser Hair Reduction	2026-01-13 16:04:26.227	2026-01-13 16:04:38.42
\.


--
-- Data for Name: BlogPost; Type: TABLE DATA; Schema: public; Owner: isachinsingh
--

COPY public."BlogPost" (id, title, slug, excerpt, content, "featuredImage", status, "authorId", tags, "seoTitle", "seoDescription", "publishedAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Doctor; Type: TABLE DATA; Schema: public; Owner: isachinsingh
--

COPY public."Doctor" (id, name, role, image, bio, qualifications, specialties, "isHead", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Inquiry; Type: TABLE DATA; Schema: public; Owner: isachinsingh
--

COPY public."Inquiry" (id, name, email, phone, subject, message, status, notes, "createdAt", "updatedAt") FROM stdin;
51fd8a24-6914-44bb-98cd-8d72261a8075	Sachin Singh	isachinatju@gmail.com	+917014681829	Laser Hair Reduction	Hi, I have a surprise for you!	ARCHIVED	\N	2026-01-12 21:11:48.155	2026-01-12 21:25:37.261
eda4aba9-7b03-4341-ab22-81a144527dfd	Sachin Singh	isachinatju@gmail.com	+91-7014681829	HydraFacial	Hi, I have one more surprise for you!	ARCHIVED	\N	2026-01-12 21:26:21.157	2026-01-13 10:28:45.613
a576d782-39db-41bc-b660-e1281489bf4c	Production Test JS	test@production.com	9876543210	Laser Hair Reduction	Testing contact form after critical fixes via JS	RESOLVED	\N	2026-01-13 08:32:05.079	2026-01-13 10:28:50.105
cc1ca553-cb41-4a30-a379-fc4b0ffd4571	Production Test	test@production.com	9876543210	Laser Hair Reduction	Testing contact form after critical fixes	RESOLVED	\N	2026-01-13 08:31:28.694	2026-01-13 10:28:52.866
74838be9-1679-4869-92b4-46cd8f789a3e	Audit Bot	audit@test.com	9999999999	General Inquiry	This is a system audit test message. Please ignore.	NEW	\N	2026-01-13 11:00:24.759	2026-01-13 11:00:24.759
52cfc5f8-55fc-48c5-b8fe-5a0f40697d39	Audit Bot	audit@test.com	9999999999	Laser Hair Reduction	This is a system audit test message. Please ignore.	NEW	\N	2026-01-13 11:04:06.777	2026-01-13 11:04:06.777
bb551b73-50cb-407c-ac72-4e8cd11178c2	Curl Test	curl@test.com	1231231234	General Inquiry	Testing Main API direct connection	NEW	\N	2026-01-13 12:59:45.777	2026-01-13 12:59:45.777
\.


--
-- Data for Name: Media; Type: TABLE DATA; Schema: public; Owner: isachinsingh
--

COPY public."Media" (id, filename, url, "mimeType", size, alt, "createdAt") FROM stdin;
\.


--
-- Data for Name: Settings; Type: TABLE DATA; Schema: public; Owner: isachinsingh
--

COPY public."Settings" (id, "siteName", "siteTagline", logo, "contactEmail", "contactPhone", address, "socialMedia", "businessHours", "maintenanceMode", "updatedAt") FROM stdin;
b81b7c2d-46d8-49e4-b55e-3b7293928aab	SkinLuxe Aesthetics & Academy	LASER / SKIN / HAIR	\N	skinluxemeerut@gmail.com	9318452282 / 7451910272	FF, No. 38, New Market, Begum Bridge, near Titan Showroom, Sotiganj, Meerut	{"instagram": "https://instagram.com/skinluxe_clinic_meerut"}	{"sunday": "Closed", "weekdays": "10:00 AM - 08:00 PM"}	f	2026-01-12 21:00:51.792
\.


--
-- Data for Name: Testimonial; Type: TABLE DATA; Schema: public; Owner: isachinsingh
--

COPY public."Testimonial" (id, name, role, content, rating, image, "isApproved", "isFeatured", "order", "createdAt", "updatedAt") FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

\unrestrict rtaIbIjaYLcA7f8s7NLa6yXOFxV2ovrhjUHLk1oJlb73sV1alhhsnLi4YXA9VwD

