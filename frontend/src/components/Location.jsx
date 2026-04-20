import { motion } from "framer-motion";
import { FaDirections } from "react-icons/fa";
import foto1 from "../assets/local1.jpeg";
import foto2 from "../assets/local2.jpeg";
import foto3 from "../assets/local3.jpeg"; // Falls back to available images

const LOCATION_NAME = "Imperial Recepções e Eventos";
const LOCATION_ADDRESS = "Av. Pedro Álvares Cabral, 5220 - Belém - PA";
const MAPS_LINK = "https://maps.app.goo.gl/xt8BerTR4BNekv1u5";

function Location() {
  return (
    <section
      id="localizacao"
      className="min-h-screen bg-[#ffffff] px-6 py-28 flex flex-col items-center"
    >
      {/* TÍTULO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-7xl font-display text-[#1a3a5c] mb-6">Local do Evento</h2>
        <div className="w-20 h-1 bg-[#6FAED9] mx-auto rounded-full mb-6" />
        <p className="text-[#1a3a5c]/70 font-serif italic text-xl">
          Escolhemos um lugar especial para celebrar esse momento com você ✨
        </p>
      </motion.div>

      {/* GALERIA */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full mb-16">
        {[foto1, foto2, foto3].map((img, i) => (
          <motion.img
            key={i}
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            src={img}
            className="w-full h-[300px] object-cover rounded-[2rem] shadow-md transition duration-500 hover:shadow-2xl cursor-pointer hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
        ))}
      </div>

      {/* CARD MAPA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid md:grid-cols-2 max-w-5xl w-full border border-gray-50"
      >
        {/* MAPA */}
        <iframe
          src="https://www.google.com/maps?q=Imperial%20Recep%C3%A7%C3%B5es%20e%20Eventos&output=embed"
          className="w-full h-[350px] md:h-[500px] border-0 transition-all duration-700"
          loading="lazy"
        ></iframe>

        {/* INFO */}
        <div className="p-10 flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-display text-[#1a3a5c]">{LOCATION_NAME}</h3>
            <p className="text-[#1a3a5c]/60 font-serif italic text-lg">{LOCATION_ADDRESS}</p>
          </div>

          <button
            onClick={() => window.open(MAPS_LINK, "_blank")}
            className="mt-4 bg-[#6FAED9] hover:bg-[#1a3a5c] text-white px-8 py-4 rounded-full transition-all duration-500 hover:scale-105 shadow-lg flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm"
          >
            <FaDirections className="text-xl" />
            Como chegar
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export default Location;
