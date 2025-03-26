import { motion } from 'framer-motion';

const Contact = () => (
  <section id="contact" className="py-16 bg-tea-green bg-opacity-20">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-4xl font-bold text-center text-dark-brown"
    >
      Spill the Tea With Us
    </motion.h2>
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-8 space-y-4"
    >
      <input
        className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow"
        placeholder="Your name, tea lover"
      />
      <input
        className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow"
        placeholder="Email, so we can steep you updated"
      />
      <textarea
        className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow"
        placeholder="Tell us your tea secrets"
        rows="4"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 bg-matcha text-cream rounded-lg font-medium"
      >
        Send
      </motion.button>
    </motion.form>
  </section>
);

export default Contact;