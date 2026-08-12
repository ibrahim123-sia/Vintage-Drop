import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      category: "Orders & Payment",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept Cash on Delivery (COD) and online payment via PayFast. Choose your preferred method at checkout.",
        },
        {
          question: "How long does shipping take?",
          answer:
            "We ship across Pakistan. Standard delivery takes 3-5 business days. All items are carefully packaged to ensure safe delivery.",
        },
        {
          question: "How do I track my order?",
          answer:
            "Log into your account and visit 'My Orders' to see the current status of every order you've placed.",
        },
      ],
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 7-day easy return policy. If your item arrives damaged, contact us immediately with photos for a full replacement.",
        },
        {
          question: "What if my item arrives damaged?",
          answer:
            "Contact us immediately with photos of the damaged item and your order number, and we'll arrange a free replacement or full refund.",
        },
      ],
    },
    {
      category: "Plants & Authenticity",
      questions: [
        {
          question: "Are your vintage items genuine?",
          answer:
            "All our vintage and antique pieces are genuine. We carefully source and verify each item's authenticity before adding it to our collection.",
        },
        {
          question: "How do I care for my plants?",
          answer:
            "Each plant comes with a care card. Generally, most of our indoor plants thrive in indirect light with weekly watering. Specific care instructions are listed on each product page.",
        },
        {
          question: "Do you offer custom plant and planter combinations?",
          answer:
            "Yes! We offer custom plant and planter combinations. Contact us on WhatsApp or Instagram to discuss your requirements.",
        },
      ],
    },
    {
      category: "Account & Support",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "Click the account icon in the top navigation and select 'Create Account'. You'll verify your email with a one-time code.",
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer:
            "Click 'Login', then 'Forgot Password'. Enter your email and we'll send a reset code valid for a few minutes.",
        },
      ],
    },
  ];

  const allQuestions = faqs.flatMap((category) =>
    category.questions.map((q) => ({ ...q, category: category.category }))
  );

  const filteredQuestions = searchTerm
    ? allQuestions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allQuestions;

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-vintage-cream">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-vintage-obsidian mb-4">Frequently Asked Questions</h1>
        <div className="vintage-divider mb-6">
          <span className="vintage-divider-mark"></span>
        </div>
        <p className="text-lg text-vintage-umber/80 max-w-2xl mx-auto mb-8">
          Find quick answers about orders, shipping, returns, and plant care.
        </p>

        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 border border-vintage-sand rounded-sm focus:ring-1 focus:ring-vintage-gold focus:border-vintage-gold transition-all bg-white"
          />
        </div>
      </div>

      {searchTerm ? (
        <div className="mb-12">
          <h2 className="font-display text-2xl text-vintage-obsidian mb-6">
            Search Results ({filteredQuestions.length})
          </h2>
          <div className="space-y-4">
            {filteredQuestions.map((item, index) => (
              <div key={index} className="bg-white rounded-sm border border-vintage-sand overflow-hidden">
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-vintage-cream transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <div>
                    <span className="text-xs font-medium text-vintage-gold bg-vintage-sand/50 px-2 py-1 rounded-sm mb-2 inline-block uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-vintage-obsidian text-lg">{item.question}</h3>
                  </div>
                </button>
                {activeIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-vintage-umber/80 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-vintage-umber mb-2">No results found</h3>
                <p className="text-vintage-umber/60">Try different keywords or browse the categories below.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-sm border border-vintage-sand overflow-hidden">
              <div className="bg-vintage-sand/40 px-6 py-4 border-b border-vintage-sand">
                <h2 className="font-display text-xl text-vintage-obsidian">{category.category}</h2>
              </div>
              <div className="divide-y divide-vintage-sand">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex;
                  return (
                    <div key={faqIndex} className="transition-colors hover:bg-vintage-cream">
                      <button
                        className="w-full px-6 py-5 text-left flex justify-between items-center"
                        onClick={() => toggleFAQ(globalIndex)}
                      >
                        <h3 className="font-semibold text-vintage-obsidian text-lg pr-4">{faq.question}</h3>
                        <span className="text-vintage-gold flex-shrink-0">
                          {activeIndex === globalIndex ? "−" : "+"}
                        </span>
                      </button>
                      {activeIndex === globalIndex && (
                        <div className="px-6 pb-5">
                          <p className="text-vintage-umber/80 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-vintage-obsidian rounded-sm p-10 text-center text-vintage-cream mt-16">
        <h2 className="font-display text-3xl mb-4">Still Need Help?</h2>
        <p className="text-vintage-cream/70 mb-8 max-w-2xl mx-auto">
          Can't find what you're looking for? Reach out to our support team directly.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-vintage-gold text-vintage-obsidian px-8 py-3 rounded-sm font-semibold uppercase text-sm tracking-widest hover:bg-vintage-cream transition-colors duration-200"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default FAQPage;
