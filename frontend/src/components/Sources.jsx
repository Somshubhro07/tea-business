import { motion } from 'framer-motion';

const sources = [
  { name: 'Assam, India', image: 'assam.jpg' },
  { name: 'Kyoto, Japan', image: 'kyoto.jpg' },
  { name: 'Darjeeling, India', image: 'darjeeling.jpg' },
];

const Sources = () => (
  <section id="sources" className="py-16 textured-bg">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-4xl font-bold text-center text-dark-brown"
    >
      We hunted down the best leaves...
    </motion.h2>
    <div className="flex overflow-x-auto space-x-4 mt-8 container mx-auto">
      {sources.map((source, index) => (
        <motion.div
          key={index}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="min-w-[300px] bg-cream p-4 rounded-lg shadow-lg"
        >
          <img src={source.image} alt={source.name} className="w-full h-40 object-cover rounded-lg" />
          <p className="text-center text-dark-brown mt-2">{source.name}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Sources;