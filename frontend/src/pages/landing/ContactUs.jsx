import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setStatus({
        submitted: true,
        success: false,
        message: 'Sending your inquiry...',
      });

      await axiosInstance.post('/contact', formData);

      setStatus({
        submitted: true,
        success: true,
        message: 'Thank you. Your message has been received.',
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        submitted: true,
        success: false,
        message:
          'There was a problem sending your message. Please try again or email support directly.',
      });
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-[#121214] min-h-[calc(100vh-64px)] py-16 sm:py-24 selection:bg-[#18181B] selection:text-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF3EC] text-[#244B36] text-xs font-medium border-[#D5E5D4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#346538]"></span>
            We Are Here To Listen
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121214]">
            Get in Touch with SarvUday
          </h1>
          <p className="text-sm sm:text-base text-[#6E6D7A] leading-relaxed">
            Have questions about clinical appointments, technical support, or partnership inquiries?
            Fill out the form below or reach our team.
          </p>
        </div>

        {/* Emergency Callout Card */}
        <div className="bg-[#FDEBEC] border-[#F6D0D2] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-rounded text-[#8F2B26] text-xl mt-0.5">
              emergency
            </span>
            <div>
              <span className="text-xs font-semibold text-[#8F2B26] uppercase tracking-wider block">
                Crisis Notice
              </span>
              <p className="text-xs sm:text-sm text-[#8F2B26]/90 mt-0.5">
                This contact form is for non-emergency inquiries only. If you are in acute distress,
                please call or text <strong>988</strong> immediately.
              </p>
            </div>
          </div>
          <Link
            to="/emergency"
            className="px-4 py-2 rounded-lg bg-[#8F2B26] text-white text-xs font-medium shrink-0 hover:bg-[#782420] transition-colors"
          >
            Emergency Resources
          </Link>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border-[#EAEAEA] rounded-2xl p-7 sm:p-9 shadow-sm">
            <h2 className="text-xl font-semibold text-[#121214] mb-6">Send an Inquiry</h2>

            {status.submitted && (
              <div
                className={`p-4 rounded-xl mb-6 text-xs sm:text-sm ${status.success ? 'bg-[#EDF3EC] text-[#244B36] border-[#D5E5D4]' : 'bg-[#FDEBEC] text-[#8F2B26] border-[#F6D0D2]'}`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#121214]" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Jane Doe"
                  className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3.5 text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#121214]" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="jane@example.com"
                  className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3.5 text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#121214]" htmlFor="subject">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3 text-sm text-[#121214] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05]"
                >
                  <option value="">Select a topic</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Counselling Services">Therapist &amp; Booking Support</option>
                  <option value="Technical Support">Technical &amp; Account Support</option>
                  <option value="Feedback">Feedback or Partnership</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#121214]" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="How can we assist your wellness journey?"
                  className="w-full p-3.5 bg-white border-[#EAEAEA] rounded-lg text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#18181B] text-white rounded-lg text-sm font-medium hover:bg-[#27272A] active:scale-[0.98] transition-all shadow-sm"
                disabled={status.submitted && status.success}
              >
                Submit Inquiry
              </button>
            </form>
          </div>

          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border-[#EAEAEA] rounded-2xl p-6 shadow-sm space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Direct Email
              </span>
              <p className="text-sm font-medium text-[#121214]">support@sarvuday.com</p>
              <p className="text-xs text-[#71717A]">
                General inquiries &amp; confidential feedback
              </p>
            </div>

            <div className="bg-white border-[#EAEAEA] rounded-2xl p-6 shadow-sm space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Helpline Phone
              </span>
              <p className="text-sm font-medium text-[#121214]">+91 9876543210 / +91 9965402768</p>
              <p className="text-xs text-[#71717A]">Monday – Friday, 9:00 AM – 6:00 PM IST</p>
            </div>

            <div className="bg-white border-[#EAEAEA] rounded-2xl p-6 shadow-sm space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Location
              </span>
              <p className="text-sm font-medium text-[#121214]">SarvUday Digital Care</p>
              <p className="text-xs text-[#71717A]">Guwahati, Assam, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
