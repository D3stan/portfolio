import { useState } from "react";
import { FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";
import { SITE_CONFIG } from "../constants/config";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch(SITE_CONFIG.contact.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 grid-bg text-white">
      <div className="mx-auto w-[min(900px,94vw)]">
        {/* Heading in a box */}
        <div className="flex justify-center mb-12">
          <h2
            className="uppercase font-extrabold tracking-tight
                       border-2 border-border bg-card text-fg
                       px-6 py-2 shadow-[8px_8px_0_var(--shadow-strong)] text-2xl"
          >
            {SITE_CONFIG.contact.title}
          </h2>
        </div>

        {/* Card */}
        <div className="border-2 border-border bg-card text-fg shadow-[8px_8px_0_var(--shadow-weak)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: quick info / socials */}
            <div className="md:col-span-1 space-y-4">
              <p className="text-sm">
                {SITE_CONFIG.contact.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FiMail /> <span>{SITE_CONFIG.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin /> <span>{SITE_CONFIG.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href={SITE_CONFIG.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 border-border bg-card p-2 shadow-[4px_4px_0_var(--shadow-weak)]"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </a>
                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 border-border bg-card p-2 shadow-[4px_4px_0_var(--shadow-weak)]"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
              </div>
            </div>

            {/* Right: form (Formspree) */}
            <div className="md:col-span-2">
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 border-2 border-green-600 bg-green-50">
                  <p className="font-bold text-green-800">✓ Message sent successfully!</p>
                  <p className="text-sm text-green-700">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-4 p-4 border-2 border-red-600 bg-red-50">
                  <p className="font-bold text-red-800">✗ Something went wrong</p>
                  <p className="text-sm text-red-700">Please try again or email me directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold mb-1">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full border-2 ${errors.name ? 'border-red-600' : 'border-border'} px-3 py-2 bg-card focus:outline-none focus:border-accent`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-bold mb-1">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full border-2 ${errors.email ? 'border-red-600' : 'border-border'} px-3 py-2 bg-card focus:outline-none focus:border-accent`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold mb-1">
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    name="subject"
                    type="text"
                    value={formState.subject}
                    onChange={handleChange}
                    className={`w-full border-2 ${errors.subject ? 'border-red-600' : 'border-border'} px-3 py-2 bg-card focus:outline-none focus:border-accent`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold mb-1">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    required
                    name="message"
                    rows="6"
                    value={formState.message}
                    onChange={handleChange}
                    className={`w-full border-2 ${errors.message ? 'border-red-600' : 'border-border'} px-3 py-2 bg-card focus:outline-none focus:border-accent`}
                    placeholder="Tell me a bit more…"
                  />
                  {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                </div>

                <div className="md:col-span-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="border-2 border-border bg-accent px-6 py-3 font-extrabold uppercase shadow-[6px_6px_0_var(--shadow-weak)] hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <a
                    href={`mailto:${SITE_CONFIG.email}?subject=${SITE_CONFIG.contact.emailSubject}`}
                    className="text-xs underline"
                  >
                    {SITE_CONFIG.contact.directEmailPrompt}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
