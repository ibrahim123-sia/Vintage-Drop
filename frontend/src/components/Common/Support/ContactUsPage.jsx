import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactUsPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Your message has been sent! We will get back to you shortly.");
    e.target.reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClass = "w-full px-4 py-3 border border-vintage-sand rounded-sm focus:ring-1 focus:ring-vintage-gold focus:border-vintage-gold transition-all bg-vintage-cream";
  const labelClass = "block text-sm font-medium text-vintage-umber mb-2";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-vintage-cream">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-vintage-obsidian mb-4">Contact Us</h1>
        <div className="vintage-divider mb-6">
          <span className="vintage-divider-mark"></span>
        </div>
        <p className="text-lg text-vintage-umber/80 max-w-2xl mx-auto">
          Have a question about a piece, an order, or an exchange? We're here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        <div className="bg-white p-8 rounded-sm border border-vintage-sand">
          <h2 className="font-display text-2xl text-vintage-obsidian mb-8">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input type="text" id="name" name="name" required className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input type="email" id="email" name="email" required className={inputClass} placeholder="your@email.com" />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>Phone Number</label>
              <input type="tel" id="phone" name="phone" className={inputClass} placeholder="+92 3XX XXXXXXX" />
            </div>

            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject <span className="text-red-500">*</span>
              </label>
              <select id="subject" name="subject" required className={inputClass}>
                <option value="">Select a subject</option>
                <option value="order">Order Inquiry</option>
                <option value="return">Returns & Exchanges</option>
                <option value="product">Product Question</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message <span className="text-red-500">*</span>
              </label>
              <textarea id="message" name="message" rows="5" required className={inputClass} placeholder="How can we help you?"></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-vintage-obsidian text-vintage-cream hover:bg-vintage-gold py-3 px-6 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-200"
            >
              {submitted ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-sm border border-vintage-sand">
            <h3 className="font-display text-2xl text-vintage-obsidian mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-vintage-umber">Our Location</h4>
                <p className="text-vintage-umber/70 mt-1">Karachi, Pakistan</p>
              </div>
              <div>
                <h4 className="font-semibold text-vintage-umber">Phone</h4>
                <p className="text-vintage-umber/70 mt-1">
                  <a href="tel:+923350009928" className="hover:text-vintage-gold transition-colors">
                    +92 335 0009928
                  </a>
                  <br />
                  Customer Support: Mon-Sat, 10AM-7PM
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-vintage-umber">Email</h4>
                <p className="text-vintage-umber/70 mt-1">
                  <a href="mailto:hello@thevintagedrop.pk" className="hover:text-vintage-gold transition-colors">
                    hello@thevintagedrop.pk
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-sm border border-vintage-sand">
            <h3 className="font-display text-2xl text-vintage-obsidian mb-6">Business Hours</h3>
            <ul className="space-y-4">
              {[
                { day: "Monday - Saturday", hours: "10:00 AM - 7:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((item, index) => (
                <li key={index} className="flex justify-between items-center pb-4 border-b border-vintage-sand last:border-0 last:pb-0">
                  <span className="font-medium text-vintage-umber">{item.day}</span>
                  <span className="text-vintage-umber/70">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
