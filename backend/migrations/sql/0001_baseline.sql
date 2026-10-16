-- Frozen schema before production hardening; no seed data.

CREATE TYPE genderenum AS ENUM ('male', 'female', 'other');

CREATE TYPE adminroleenum AS ENUM ('super_admin', 'moderator', 'auditor', 'support');

CREATE TYPE usertypeenum AS ENUM ('normal_user', 'counsellor', 'admin');

CREATE TYPE appointmentstatusenum AS ENUM ('pending', 'confirmed', 'cancelled', 'completed', 'rescheduled');

CREATE TYPE counselloravailabilitystatusenum AS ENUM ('available', 'unavailable', 'booked', 'on_leave');

CREATE TYPE commissiontypeenum AS ENUM ('low', 'medium', 'high');

CREATE TYPE counsellorpayoutstatusenum AS ENUM ('pending', 'initiated', 'completed', 'failed');

CREATE TYPE counsellorpayoutmethodenum AS ENUM ('bank_transfer', 'cheque', 'upi');

CREATE TYPE paymentstatusenum AS ENUM ('pending', 'completed', 'failed', 'refunded');

CREATE TYPE paymentmethodenum AS ENUM ('credit_card', 'debit_card', 'net_banking', 'upi');

CREATE TYPE messagetype AS ENUM ('text', 'image', 'file', 'system');

CREATE TYPE notificationtypeenum AS ENUM ('appointment', 'session', 'system', 'payment', 'approval', 'chat');

CREATE TABLE admins (
	user_id VARCHAR(20) NOT NULL, 
	email VARCHAR(255) NOT NULL, 
	phone_number VARCHAR(15), 
	hashed_password VARCHAR(255), 
	firebase_uid VARCHAR(255), 
	name VARCHAR(255) NOT NULL, 
	gender genderenum, 
	profile_pic VARCHAR(255), 
	role adminroleenum NOT NULL, 
	user_type usertypeenum NOT NULL, 
	is_email_verified BOOLEAN NOT NULL, 
	is_phone_verified BOOLEAN NOT NULL, 
	last_verification_sent_at TIMESTAMP WITHOUT TIME ZONE, 
	is_approved BOOLEAN NOT NULL, 
	last_login_at TIMESTAMP WITH TIME ZONE, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (user_id), 
	UNIQUE (email), 
	UNIQUE (phone_number), 
	UNIQUE (firebase_uid)
);

CREATE INDEX idx_admin_email ON admins (email);

CREATE UNIQUE INDEX ix_admins_user_id ON admins (user_id);

CREATE INDEX idx_admin_id ON admins (user_id);

CREATE TABLE normal_users (
	user_id VARCHAR(20) NOT NULL, 
	email VARCHAR(255) NOT NULL, 
	phone_number VARCHAR(15), 
	hashed_password VARCHAR(255), 
	firebase_uid VARCHAR(255), 
	name VARCHAR(255) NOT NULL, 
	gender genderenum, 
	user_type usertypeenum, 
	profile_pic VARCHAR(255), 
	is_email_verified BOOLEAN, 
	is_phone_verified BOOLEAN, 
	last_verification_sent_at TIMESTAMP WITHOUT TIME ZONE, 
	preferred_languages TEXT, 
	primary_concerns TEXT, 
	country VARCHAR(100), 
	state VARCHAR(100), 
	city VARCHAR(100), 
	address TEXT, 
	pincode VARCHAR(10), 
	timezone VARCHAR(50), 
	dob VARCHAR(20), 
	bio TEXT, 
	is_anonymous BOOLEAN, 
	emergency_contact_name VARCHAR(255), 
	emergency_contact_phone VARCHAR(15), 
	emergency_contact_relation VARCHAR(100), 
	accessibility_preferences TEXT, 
	age_range VARCHAR(50), 
	symptoms TEXT, 
	stress_factors TEXT, 
	mental_health_history TEXT, 
	therapy_goals TEXT, 
	last_login_at TIMESTAMP WITHOUT TIME ZONE, 
	terms_accepted BOOLEAN, 
	privacy_policy_accepted BOOLEAN, 
	total_sessions_attended INTEGER, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (user_id), 
	UNIQUE (email), 
	UNIQUE (phone_number), 
	UNIQUE (firebase_uid)
);

CREATE INDEX idx_normal_user_email ON normal_users (email);

CREATE INDEX idx_normal_user_id ON normal_users (user_id);

CREATE UNIQUE INDEX ix_normal_users_user_id ON normal_users (user_id);

CREATE TABLE direct_messages (
	message_id VARCHAR(50) NOT NULL, 
	room_id VARCHAR(100) NOT NULL, 
	sender_id VARCHAR(50) NOT NULL, 
	sender_type VARCHAR(50) NOT NULL, 
	content TEXT NOT NULL, 
	message_type messagetype NOT NULL, 
	is_read BOOLEAN NOT NULL, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (message_id)
);

CREATE INDEX ix_direct_messages_sender_id ON direct_messages (sender_id);

CREATE INDEX ix_direct_messages_room_id ON direct_messages (room_id);

CREATE INDEX ix_direct_messages_message_id ON direct_messages (message_id);

CREATE TABLE notifications (
	notification_id VARCHAR(50) NOT NULL, 
	user_id VARCHAR(20) NOT NULL, 
	user_type VARCHAR(20) NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	message TEXT NOT NULL, 
	type notificationtypeenum NOT NULL, 
	is_read BOOLEAN NOT NULL, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (notification_id)
);

CREATE INDEX ix_notifications_notification_id ON notifications (notification_id);

CREATE INDEX idx_notification_user ON notifications (user_id, is_read);

CREATE INDEX ix_notifications_user_id ON notifications (user_id);

CREATE TABLE counsellors (
	user_id VARCHAR(20) NOT NULL, 
	email VARCHAR(255) NOT NULL, 
	phone_number VARCHAR(15), 
	hashed_password VARCHAR(255), 
	firebase_uid VARCHAR(255), 
	name VARCHAR(255) NOT NULL, 
	gender genderenum, 
	user_type usertypeenum, 
	profile_pic VARCHAR(255), 
	bio TEXT, 
	education_qualifications TEXT, 
	certifications TEXT, 
	specializations TEXT, 
	license_number VARCHAR(255), 
	license_issuing_authority VARCHAR(255), 
	license_expiry_date TIMESTAMP WITHOUT TIME ZONE, 
	identity_proof_url VARCHAR(255), 
	license_proof_url VARCHAR(255), 
	session_fee DECIMAL(7, 2), 
	session_duration INTEGER, 
	experience_years INTEGER, 
	is_email_verified BOOLEAN, 
	is_phone_verified BOOLEAN, 
	is_approved BOOLEAN, 
	last_verification_sent_at TIMESTAMP WITHOUT TIME ZONE, 
	approved_by VARCHAR(20), 
	languages TEXT, 
	country VARCHAR(100), 
	state VARCHAR(100), 
	city VARCHAR(100), 
	address TEXT, 
	pincode VARCHAR(10), 
	timezone VARCHAR(50), 
	therapy_methods TEXT, 
	average_rating DECIMAL(3, 2), 
	total_reviews INTEGER, 
	is_featured BOOLEAN, 
	last_login_at TIMESTAMP WITHOUT TIME ZONE, 
	terms_accepted BOOLEAN, 
	privacy_policy_accepted BOOLEAN, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (user_id), 
	UNIQUE (email), 
	UNIQUE (phone_number), 
	UNIQUE (firebase_uid), 
	FOREIGN KEY(approved_by) REFERENCES admins (user_id)
);

CREATE INDEX idx_counsellor_id ON counsellors (user_id);

CREATE UNIQUE INDEX ix_counsellors_user_id ON counsellors (user_id);

CREATE INDEX idx_approved_counsellor ON counsellors (is_approved);

CREATE INDEX idx_counsellor_email ON counsellors (email);

CREATE TABLE chat_sessions (
	session_id VARCHAR(20) NOT NULL, 
	user_id VARCHAR(20) NOT NULL, 
	title VARCHAR(255), 
	message_count INTEGER, 
	emotions_detected TEXT, 
	is_crisis BOOLEAN, 
	is_deleted BOOLEAN, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (session_id), 
	FOREIGN KEY(user_id) REFERENCES normal_users (user_id)
);

CREATE UNIQUE INDEX ix_chat_sessions_session_id ON chat_sessions (session_id);

CREATE INDEX idx_chat_session_id ON chat_sessions (session_id, user_id);

CREATE TABLE user_payments (
	payment_id VARCHAR(20) NOT NULL, 
	user_id VARCHAR(20) NOT NULL, 
	amount DECIMAL(10, 2) NOT NULL, 
	status paymentstatusenum, 
	payment_method paymentmethodenum NOT NULL, 
	currency VARCHAR(10), 
	transaction_id VARCHAR(255) NOT NULL, 
	transaction_date TIMESTAMP WITH TIME ZONE NOT NULL, 
	payment_gateway VARCHAR(50) NOT NULL, 
	payment_response JSON, 
	payment_receipt_url VARCHAR(255) NOT NULL, 
	refunded BOOLEAN, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (payment_id), 
	UNIQUE (payment_id), 
	FOREIGN KEY(user_id) REFERENCES normal_users (user_id)
);

CREATE INDEX idx_user_payment_id ON user_payments (payment_id);

CREATE INDEX idx_user_payment_status ON user_payments (status);

CREATE INDEX idx_payment_transaction_id ON user_payments (transaction_id);

CREATE TABLE counselling_sessions (
	session_id VARCHAR(20) NOT NULL, 
	user_id VARCHAR(20) NOT NULL, 
	counsellor_id VARCHAR(20) NOT NULL, 
	video_url TEXT NOT NULL, 
	user_token TEXT NOT NULL, 
	counsellor_token TEXT NOT NULL, 
	room_created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	session_scheduled_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	session_expires_at TIMESTAMP WITHOUT TIME ZONE, 
	video_session_completed BOOLEAN, 
	session_room_deleted BOOLEAN, 
	rating FLOAT, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (session_id), 
	FOREIGN KEY(user_id) REFERENCES normal_users (user_id), 
	FOREIGN KEY(counsellor_id) REFERENCES counsellors (user_id)
);

CREATE INDEX session_id ON counselling_sessions (user_id, counsellor_id);

CREATE UNIQUE INDEX ix_counselling_sessions_session_id ON counselling_sessions (session_id);

CREATE TABLE counsellor_availability (
	availability_slot_id VARCHAR(20) NOT NULL, 
	counsellor_id VARCHAR(20) NOT NULL, 
	start_time TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	end_time TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	status counselloravailabilitystatusenum, 
	notes TEXT, 
	is_locked BOOLEAN, 
	locked_until TIMESTAMP WITHOUT TIME ZONE, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (availability_slot_id), 
	FOREIGN KEY(counsellor_id) REFERENCES counsellors (user_id)
);

CREATE UNIQUE INDEX idx_availability_slot ON counsellor_availability (counsellor_id, start_time);

CREATE TABLE user_refunds (
	refund_id VARCHAR(20) NOT NULL, 
	user_id VARCHAR(20), 
	payment_id VARCHAR(20), 
	refund_amount DECIMAL(10, 2), 
	refund_method paymentmethodenum NOT NULL, 
	currency VARCHAR(10), 
	transaction_id VARCHAR(255) NOT NULL, 
	refund_date TIMESTAMP WITH TIME ZONE, 
	payment_gateway VARCHAR(50) NOT NULL, 
	payment_response JSON, 
	refunded_invoice_url VARCHAR(255), 
	refund_reason TEXT, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (refund_id), 
	UNIQUE (refund_id), 
	FOREIGN KEY(user_id) REFERENCES normal_users (user_id), 
	FOREIGN KEY(payment_id) REFERENCES user_payments (payment_id)
);

CREATE INDEX idx_refund_id ON user_refunds (refund_id);

CREATE INDEX idx_refund_transaction_id ON user_refunds (transaction_id);

CREATE TABLE appointments (
	appointment_id VARCHAR(20) NOT NULL, 
	user_id VARCHAR(20) NOT NULL, 
	counsellor_id VARCHAR(20) NOT NULL, 
	availability_slot_id VARCHAR(20) NOT NULL, 
	session_id VARCHAR(20) NOT NULL, 
	status appointmentstatusenum, 
	reason TEXT, 
	is_emergency BOOLEAN, 
	payment_id VARCHAR(20) NOT NULL, 
	refund_id VARCHAR(20), 
	cancellation_reason TEXT, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (appointment_id), 
	FOREIGN KEY(user_id) REFERENCES normal_users (user_id), 
	FOREIGN KEY(counsellor_id) REFERENCES counsellors (user_id), 
	FOREIGN KEY(availability_slot_id) REFERENCES counsellor_availability (availability_slot_id), 
	FOREIGN KEY(session_id) REFERENCES counselling_sessions (session_id), 
	FOREIGN KEY(payment_id) REFERENCES user_payments (payment_id), 
	FOREIGN KEY(refund_id) REFERENCES user_refunds (refund_id)
);

CREATE INDEX appointment_id ON appointments (availability_slot_id, session_id);

CREATE TABLE prescriptions (
	prescription_id VARCHAR(20) NOT NULL, 
	user_id VARCHAR(20) NOT NULL, 
	session_id VARCHAR(50) NOT NULL, 
	generated_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	prescription_url VARCHAR(255), 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (prescription_id), 
	UNIQUE (prescription_id), 
	FOREIGN KEY(user_id) REFERENCES normal_users (user_id), 
	FOREIGN KEY(session_id) REFERENCES counselling_sessions (session_id)
);

CREATE INDEX idx_prescription_user ON prescriptions (user_id);

CREATE TABLE counsellor_payments (
	payment_id VARCHAR(20) NOT NULL, 
	counsellor_id VARCHAR(20) NOT NULL, 
	appointment_id VARCHAR(20) NOT NULL, 
	commission_type commissiontypeenum NOT NULL, 
	net_payout_amount DECIMAL(10, 2) NOT NULL, 
	status counsellorpayoutstatusenum, 
	payout_method counsellorpayoutmethodenum NOT NULL, 
	payout_date TIMESTAMP WITH TIME ZONE, 
	transaction_id VARCHAR(255) NOT NULL, 
	invoice_url VARCHAR(255), 
	currency VARCHAR(10), 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY (payment_id), 
	UNIQUE (payment_id), 
	FOREIGN KEY(counsellor_id) REFERENCES counsellors (user_id), 
	FOREIGN KEY(appointment_id) REFERENCES appointments (appointment_id)
);

CREATE INDEX idx_payout_date ON counsellor_payments (payout_date);

CREATE INDEX idx_counsellor_payment_status ON counsellor_payments (status);

CREATE INDEX idx_counsellor_payment_id ON counsellor_payments (payment_id);
