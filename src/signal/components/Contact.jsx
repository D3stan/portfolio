import { useState } from "react";
import { FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";
import {
  CONTACT_FORMSPREE,
  CONTACT_TITLE,
  CONTACT_DESCRIPTION,
  CONTACT_DIRECT_EMAIL_PROMPT,
  CONTACT_EMAIL_SUBJECT,
  SITE_EMAIL,
  SITE_LOCATION,
  SOCIAL_GITHUB,
  SOCIAL_LINKEDIN,
} from "@/config";
import Win95Window from "./Win95Window";
import SectionCaption from "./SectionCaption";

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
      const response = await fetch(CONTACT_FORMSPREE, {
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

  const fieldProps = (name) => ({
    name,
    value: formState[name],
    onChange: handleChange,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    className: "field95",
  });

  const fieldError = (name) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="text-xs text-[#e0245e] mt-1 font-sans">
        {errors[name]}
      </p>
    ) : null;

  const label = "block text-[13px] font-sans mb-1";

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-24">
      <div className="mx-auto w-[min(900px,92vw)]">
        <SectionCaption channel={5}>{CONTACT_TITLE}</SectionCaption>

        <Win95Window title="New Message" icon="✉" menu status={[isSubmitting ? "Sending…" : "Ready", SITE_EMAIL]}>
          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: quick info / socials */}
            <div className="md:col-span-1 space-y-4">
              <p className="text-sm leading-relaxed">
                {CONTACT_DESCRIPTION}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 break-all">
                  <FiMail className="shrink-0 text-accent" /> <span>{SITE_EMAIL}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="shrink-0 text-accent" /> <span>{SITE_LOCATION}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a href={SOCIAL_GITHUB} target="_blank" rel="noreferrer" className="btn95 !p-2" aria-label="GitHub">
                  <FiGithub />
                </a>
                <a href={SOCIAL_LINKEDIN} target="_blank" rel="noreferrer" className="btn95 !p-2" aria-label="LinkedIn">
                  <FiLinkedin />
                </a>
              </div>
            </div>

            {/* Right: form (Formspree) */}
            <div className="md:col-span-2">
              {submitStatus && (
                <div className="win mb-4" role="status">
                  <div className="win-title">
                    <span>{submitStatus === 'success' ? 'Message sent' : 'Error'}</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 font-sans text-[13px] text-black">
                    <span className="text-2xl leading-none" aria-hidden="true">
                      {submitStatus === 'success' ? 'ℹ️' : '⛔'}
                    </span>
                    {submitStatus === 'success' ? (
                      <p><strong>Message sent successfully!</strong><br />Thank you for reaching out. I'll get back to you soon.</p>
                    ) : (
                      <p><strong>Something went wrong.</strong><br />Please try again or email me directly.</p>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label htmlFor="contact-name" className={label}>
                    <u>N</u>ame <span className="text-highlight">*</span>
                  </label>
                  <input required id="contact-name" type="text" placeholder="Your name" {...fieldProps('name')} />
                  {fieldError('name')}
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="contact-email" className={label}>
                    <u>E</u>mail <span className="text-highlight">*</span>
                  </label>
                  <input required id="contact-email" type="email" placeholder="you@example.com" {...fieldProps('email')} />
                  {fieldError('email')}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="contact-subject" className={label}>
                    <u>S</u>ubject <span className="text-highlight">*</span>
                  </label>
                  <input required id="contact-subject" type="text" placeholder="What's this about?" {...fieldProps('subject')} />
                  {fieldError('subject')}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="contact-message" className={label}>
                    <u>M</u>essage <span className="text-highlight">*</span>
                  </label>
                  <textarea required id="contact-message" rows="6" placeholder="Tell me a bit more…" {...fieldProps('message')} />
                  {fieldError('message')}
                </div>

                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
                  <button type="submit" disabled={isSubmitting} className="btn95 btn95-default min-w-[130px]">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <a
                    href={`mailto:${SITE_EMAIL}?subject=${CONTACT_EMAIL_SUBJECT}`}
                    className="text-xs underline decoration-accent underline-offset-4 hover:text-accent"
                  >
                    {CONTACT_DIRECT_EMAIL_PROMPT}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </Win95Window>
      </div>
    </section>
  );
}
