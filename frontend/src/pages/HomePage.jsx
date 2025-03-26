import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TeaCard from '../components/TeaCard';
import Sources from '../components/Sources';
import About from '../components/About';
import Contact from '../components/Contact';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Import slick-carousel styles
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const { teas } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  // Update loading state when teas are fetched
  useEffect(() => {
    if (teas.length > 0) {
      setLoading(false);
    }
  }, [teas]);

  // Slider settings for auto-sliding
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Slide every 3 seconds
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Sources />
      <section id="types" className="py-16 textured-bg">
        <h2 className="text-4xl font-bold text-center text-dark-brown drop-shadow-lg">
          Our Teas
        </h2>

        {/* Auto-Sliding Image Carousel */}
        <div className="max-w-3xl mx-auto mt-8 mb-12">
          {loading ? (
            <p className="text-center text-dark-brown">Loading teas...</p>
          ) : teas.length > 0 ? (
            <Slider {...sliderSettings}>
              {teas.map(tea => (
                <div key={tea._id}>
                  <Link to="/shop">
                    <img
                      src={tea.image}
                      alt={tea.name}
                      className="w-full h-80 object-cover rounded-lg shadow-lg"
                    />
                  </Link>
                  <p className="text-center text-dark-brown mt-4 text-lg font-semibold">
                    {tea.name}
                  </p>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-dark-brown">No teas available for the slider.</p>
          )}
        </div>

        {/* Existing Tea Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
          {teas.length === 0 ? (
            <p className="text-center text-dark-brown col-span-full">
              No teas available. Check back later!
            </p>
          ) : (
            teas.map((tea, index) => (
              <motion.div
                key={tea._id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <TeaCard tea={tea} />
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* We Hunted Down the Best Leaves... Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-dark-brown text-center mb-12 drop-shadow-lg">
            We Hunted Down the Best Leaves...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Assam */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-cream p-6 rounded-lg shadow-lg"
            >
              <img
                src="/src/assets/assam.png"
                alt="Assam Tea Plantation"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-dark-brown">Assam, India</h3>
              <p className="text-amber-yellow">
                Known for its bold, malty black teas, Assam’s lush plantations produce some of the world’s most robust flavors.
              </p>
              <Link
                to="/shop"
                className="mt-4 inline-block px-4 py-2 bg-matcha text-cream rounded-lg leaf-hover"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Kyoto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-cream p-6 rounded-lg shadow-lg"
            >
              <img
                src="/src/assets/kyoto.png"
                alt="Kyoto Tea Garden"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-dark-brown">Kyoto, Japan</h3>
              <p className="text-amber-yellow">
                Famous for premium matcha, Kyoto’s serene tea gardens offer the finest green teas with a rich cultural heritage.
              </p>
              <Link
                to="/shop"
                className="mt-4 inline-block px-4 py-2 bg-matcha text-cream rounded-lg leaf-hover"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Darjeeling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-cream p-6 rounded-lg shadow-lg"
            >
              <img
                src="/src/assets/darjeeling.png"
                alt="Darjeeling Tea Estate"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-dark-brown">Darjeeling, India</h3>
              <p className="text-amber-yellow">
                Often called the "Champagne of Teas," Darjeeling’s misty estates produce light, floral teas with a unique aroma.
              </p>
              <Link
                to="/shop"
                className="mt-4 inline-block px-4 py-2 bg-matcha text-cream rounded-lg leaf-hover"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <About />
      <Contact />
    </div>
  );
};

export default HomePage;