-- ============================================
-- SKINLUXE DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PATIENTS TABLE
-- ============================================
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    medical_history TEXT,
    allergies TEXT,
    current_medications TEXT,
    profile_image_url VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TREATMENTS TABLE
-- ============================================
CREATE TABLE treatments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    benefits TEXT[],
    duration INTEGER NOT NULL, -- in minutes
    price DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2),
    image_url VARCHAR(500),
    gallery_images TEXT[],
    suitable_for TEXT[],
    contraindications TEXT[],
    preparation_instructions TEXT,
    aftercare_instructions TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- APPOINTMENTS TABLE
-- ============================================
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    treatment_id UUID REFERENCES treatments(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, completed, cancelled, no-show
    duration INTEGER NOT NULL, -- in minutes
    notes TEXT,
    patient_notes TEXT,
    admin_notes TEXT,
    cancellation_reason TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    confirmation_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_appointment UNIQUE (appointment_date, appointment_time)
);

-- ============================================
-- TREATMENT RECORDS TABLE
-- ============================================
CREATE TABLE treatment_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id),
    treatment_id UUID REFERENCES treatments(id),
    treatment_date DATE NOT NULL,
    performed_by VARCHAR(255),
    before_images TEXT[],
    after_images TEXT[],
    notes TEXT,
    patient_feedback TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    next_session_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- PRESCRIPTIONS TABLE
-- ============================================
CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    treatment_record_id UUID REFERENCES treatment_records(id),
    prescribed_by VARCHAR(255) NOT NULL,
    prescription_date DATE NOT NULL,
    medications JSONB, -- [{name, dosage, frequency, duration}]
    instructions TEXT,
    pdf_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- PAYMENTS TABLE
-- ============================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id),
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50), -- cash, card, upi, razorpay
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed, refunded
    transaction_id VARCHAR(255),
    razorpay_order_id VARCHAR(255),
    razorpay_payment_id VARCHAR(255),
    invoice_number VARCHAR(50) UNIQUE,
    invoice_url VARCHAR(500),
    payment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- email, sms, push
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, sent, failed
    sent_at TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ADMIN USERS TABLE
-- ============================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin', -- admin, doctor, receptionist
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SETTINGS TABLE
-- ============================================
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(50), -- string, number, boolean, json
    category VARCHAR(50), -- general, email, sms, payment
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_phone ON patients(phone);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_treatments_category ON treatments(category);
CREATE INDEX idx_treatments_slug ON treatments(slug);
CREATE INDEX idx_treatment_records_patient ON treatment_records(patient_id);
CREATE INDEX idx_payments_patient ON payments(patient_id);
CREATE INDEX idx_payments_status ON payments(payment_status);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_treatments_updated_at BEFORE UPDATE ON treatments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_treatment_records_updated_at BEFORE UPDATE ON treatment_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (OPTIONAL)
-- ============================================

-- Insert sample treatments
INSERT INTO treatments (name, slug, category, description, duration, price, is_active, is_featured) VALUES
('Laser Hair Reduction', 'laser-hair-reduction', 'Laser Treatments', 'Permanent hair reduction with FDA-approved laser technology', 30, 2999.00, TRUE, TRUE),
('HydraFacial', 'hydrafacial', 'Facial Treatments', 'Deep cleansing and hydration facial treatment', 45, 3999.00, TRUE, TRUE),
('Acne Treatment', 'acne-treatment', 'Skin Treatments', 'Advanced acne and pigmentation treatment', 60, 4999.00, TRUE, TRUE),
('Anti-Aging Treatment', 'anti-aging', 'Anti-Aging', 'Reduce wrinkles and fine lines', 60, 5999.00, TRUE, FALSE),
('Skin Brightening', 'skin-brightening', 'Skin Treatments', 'Glutathione and vitamin C therapy', 45, 4499.00, TRUE, FALSE),
('PRP Hair Therapy', 'prp-hair-therapy', 'Hair Treatments', 'Platelet-rich plasma for hair regrowth', 60, 6999.00, TRUE, FALSE);

-- Insert default admin user (password: admin123 - CHANGE THIS!)
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@skinluxe-meerut.com', '$2a$10$YourHashedPasswordHere', 'Dr. Alka Yadav', 'admin');

-- Insert default settings
INSERT INTO settings (key, value, type, category, description) VALUES
('site_name', 'SkinLuxe Aesthetics & Academy', 'string', 'general', 'Website name'),
('site_email', 'info@skinluxe-meerut.com', 'string', 'general', 'Contact email'),
('site_phone', '+91 74519 10272', 'string', 'general', 'Contact phone'),
('site_address', 'Begum Bridge Road, Near Kalyan Jewellers, Meerut, Uttar Pradesh', 'string', 'general', 'Clinic address'),
('booking_enabled', 'true', 'boolean', 'general', 'Enable online booking'),
('appointment_duration', '30', 'number', 'general', 'Default appointment duration in minutes'),
('working_hours_start', '10:00', 'string', 'general', 'Clinic opening time'),
('working_hours_end', '20:00', 'string', 'general', 'Clinic closing time'),
('email_notifications', 'true', 'boolean', 'email', 'Enable email notifications'),
('sms_notifications', 'true', 'boolean', 'sms', 'Enable SMS notifications');
