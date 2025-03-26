import { motion } from 'framer-motion';

const About = () => (
  <section id="about" className="py-16 textured-bg">
    <div className="container mx-auto flex flex-col md:flex-row items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="md:w-1/2"
      >
        <img
          src="/src/assets/team.png"
          alt="Two tea-obsessed mates sharing a moment over tea"
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="md:w-1/2 p-8"
      >
        <h2 className="text-4xl font-bold text-dark-brown">Two tea-obsessed mates...</h2>
        <p className="text-dark-brown mt-4">
          We said, “Why not make the world steep better?” So we did—sourcing the finest teas with love and a bit of cheek.
        </p>
      </motion.div>
    </div>
  </section>
);

export default About;