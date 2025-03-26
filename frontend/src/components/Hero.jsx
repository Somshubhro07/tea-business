import { motion } from 'framer-motion';

const Steam = () => (
  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
    <svg
      className="w-16 h-16 text-amber-yellow opacity-50"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <motion.path
        d="M6 12S8 8 12 8s6 4 6 4-2 4-6 4-6-4-6-4Z"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: -20 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
      />
      <motion.path
        d="M4 14S6 10 10 10s6 4 6 4-2 4-6 4-6-4-6-4Z"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: -20 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeOut', delay: 0.5 }}
      />
    </svg>
  </div>
);

const Hero = () => (
  <motion.section
    id="home"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
    style={{
      backgroundImage: `url('/src/assets/hero-bg.webp')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Semi-transparent overlay for text readability */}
    <div className="absolute inset-0 bg-black bg-opacity-30" />

    {/* Background Tea Leaves */}
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="tea-leaves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path
            d="M20 20C25 15 30 20 35 25C40 30 35 35 30 30C25 25 20 30 20 20Z"
            fill="#A9BA9D"
          />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#tea-leaves)" />
      </svg>
    </div>

    {/* Steam Animation */}
    <Steam />

    {/* Content */}
    <motion.h1
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-6xl font-bold text-cream relative z-10 drop-shadow-lg"
    >
      Discover the Art of Tea
      <svg
        className="absolute -top-4 -right-4 w-12 h-12 text-tea-green"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </motion.h1>
    <motion.p
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-xl text-amber-yellow mt-4 z-10 drop-shadow-lg"
    >
      Tea so good, you’ll dump your coffee.
    </motion.p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-6 px-6 py-3 bg-matcha text-cream rounded-full z-10"
    >
      Steep Into the Good Stuff
    </motion.button>
  </motion.section>
);

export default Hero;