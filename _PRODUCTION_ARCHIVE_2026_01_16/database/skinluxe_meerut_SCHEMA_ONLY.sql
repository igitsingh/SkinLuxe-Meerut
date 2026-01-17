--
-- PostgreSQL database dump
--

\restrict xFrZsP41fgcxm1Grr1Y2rjSPZcDq9zTSSAylkebuBt6M97e4xgjgK1YBcEz1vdA

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
-- Name: AppointmentStatus; Type: TYPE; Schema: public; Owner: isachinsingh
--

CREATE TYPE public."AppointmentStatus" AS ENUM (
    'PENDING',
    'CONFIRMED',
    'COMPLETED',
    'CANCELLED',
    'NO_SHOW'
);



--
-- Name: BlogStatus; Type: TYPE; Schema: public; Owner: isachinsingh
--

CREATE TYPE public."BlogStatus" AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
);



--
-- Name: InquiryStatus; Type: TYPE; Schema: public; Owner: isachinsingh
--

CREATE TYPE public."InquiryStatus" AS ENUM (
    'NEW',
    'IN_PROGRESS',
    'RESOLVED',
    'ARCHIVED'
);



--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: isachinsingh
--

CREATE TYPE public."UserRole" AS ENUM (
    'SUPER_ADMIN',
    'ADMIN',
    'EDITOR',
    'VIEWER',
    'CUSTOMER'
);



SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ActivityLog; Type: TABLE; Schema: public; Owner: isachinsingh
--

CREATE TABLE public."ActivityLog" (
    id text NOT NULL,
    "userId" text NOT NULL,
    action text NOT NULL,
    entity text NOT NULL,
    "entityId" text NOT NULL,
    description text NOT NULL,
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);



--
-- Name: Appointment; Type: TABLE; Schema: public; Owner: isachinsingh
--

CREATE TABLE public."Appointment" (
    id text NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    email text,
    "treatmentId" text,
    date timestamp(3) without time zone NOT NULL,
    "timeSlot" text NOT NULL,
    status public."AppointmentStatus" DEFAULT 'PENDING'::public."AppointmentStatus" NOT NULL,
    notes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);



--
-- Name: BlogPost; Type: TABLE; Schema: public; Owner: isachinsingh
--

CREATE TABLE public."BlogPost" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    excerpt text,
    content text NOT NULL,
    "featuredImage" text,
    status public."BlogStatus" DEFAULT 'DRAFT'::public."BlogStatus" NOT NULL,
    "authorId" text,
    tags text[],
    "seoTitle" text,
    "seoDescription" text,
    "publishedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);



--
-- Name: Doctor; Type: TABLE; Schema: public; Owner: isachinsingh
--

CREATE TABLE public."Doctor" (
    id text NOT NULL,
    name text NOT NULL,
    role text NOT NULL,
    image text,
    bio text NOT NULL,
    qualifications text,
    specialties text[],
    "isHead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);



--
-- Name: Inquiry; Type: TABLE; Schema: public; Owner: isachinsingh
--

CREATE TABLE public."Inquiry" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text,
    message text NOT NULL,
    status public."InquiryStatus" DEFAULT 'NEW'::public."InquiryStatus" NOT NULL,
    notes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);



--
-- Name: Media; Type: TABLE; Schema: public; Owner: isachinsingh
--

CREATE TABLE public."Media" (
    id text NOT NULL,
    filename text NOT NULL,
    url text NOT NULL,
    "mimeType" text NOT NULL,
    size integer NOT NULL,
    alt text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);



--
-- Name: Settings; Type: TABLE; Schema: public; Owner: isachinsingh
--

CREATE TABLE public."Settings" (
    id text NOT NULL,
    "siteName" text NOT NULL,
    "siteTagline" text,
    logo text,
    "contactEmail" text NOT NULL,
    "contactPhone" text NOT NULL,
    address text,
    "socialMedia" jsonb,
    "businessHours" jsonb,
    "maintenanceMode" boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);



--
-- Name: Testimonial; Type: TABLE; Schema: public; Owner: isachinsingh
--

CREATE TABLE public."Testimonial" (
    id text NOT NULL,
    name text NOT NULL,
    role text,
    content text NOT NULL,
    rating integer DEFAULT 5 NOT NULL,
    image text,
    "isApproved" boolean DEFAULT false NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);



--
-- Name: Treatment; Type: TABLE; Schema: public; Owner: isachinsingh
--

CREATE TABLE public."Treatment" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    "shortDescription" text,
    duration text,
    downtime text,
    "painLevel" text,
    price text,
    icon text,
    image text,
    category text,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);



--
-- Name: User; Type: TABLE; Schema: public; Owner: isachinsingh
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    role public."UserRole" DEFAULT 'CUSTOMER'::public."UserRole" NOT NULL,
    avatar text,
    "isActive" boolean DEFAULT true NOT NULL,
    "lastLogin" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    phone text
);



--
-- Name: ActivityLog ActivityLog_pkey; Type: CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_pkey" PRIMARY KEY (id);


--
-- Name: Appointment Appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY (id);


--
-- Name: BlogPost BlogPost_pkey; Type: CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."BlogPost"
    ADD CONSTRAINT "BlogPost_pkey" PRIMARY KEY (id);


--
-- Name: Doctor Doctor_pkey; Type: CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."Doctor"
    ADD CONSTRAINT "Doctor_pkey" PRIMARY KEY (id);


--
-- Name: Inquiry Inquiry_pkey; Type: CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."Inquiry"
    ADD CONSTRAINT "Inquiry_pkey" PRIMARY KEY (id);


--
-- Name: Media Media_pkey; Type: CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_pkey" PRIMARY KEY (id);


--
-- Name: Settings Settings_pkey; Type: CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."Settings"
    ADD CONSTRAINT "Settings_pkey" PRIMARY KEY (id);


--
-- Name: Testimonial Testimonial_pkey; Type: CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."Testimonial"
    ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY (id);


--
-- Name: Treatment Treatment_pkey; Type: CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."Treatment"
    ADD CONSTRAINT "Treatment_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: BlogPost_slug_key; Type: INDEX; Schema: public; Owner: isachinsingh
--

CREATE UNIQUE INDEX "BlogPost_slug_key" ON public."BlogPost" USING btree (slug);


--
-- Name: Treatment_slug_key; Type: INDEX; Schema: public; Owner: isachinsingh
--

CREATE UNIQUE INDEX "Treatment_slug_key" ON public."Treatment" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: isachinsingh
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: isachinsingh
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- Name: ActivityLog ActivityLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Appointment Appointment_treatmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: isachinsingh
--

ALTER TABLE ONLY public."Appointment"
    ADD CONSTRAINT "Appointment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES public."Treatment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict xFrZsP41fgcxm1Grr1Y2rjSPZcDq9zTSSAylkebuBt6M97e4xgjgK1YBcEz1vdA

