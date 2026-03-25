import { motion } from "framer-motion";
import { FaDirections } from "react-icons/fa";
import foto1 from "../assets/local1.jpeg";
import foto2 from "../assets/local2.jpeg";
import foto3 from "../assets/local3.jpeg";

const LOCATION_NAME = "Imperial Recepções e Eventos";
const LOCATION_ADDRESS = "Av. Pedro Álvares Cabral, 5220 - Belém - PA";
const MAPS_LINK = "https://maps.app.goo.gl/xt8BerTR4BNekv1u5";

function Location() {
  return (
    <section
      id="localizacao"
      className="min-h-screen bg-[#f8f8f8] px-6 py-24 flex flex-col items-center"
    >
      {/* TÍTULO */}
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
        Local do Evento
      </h2>

      <p className="text-gray-600 text-center max-w-xl mb-10">
        Escolhemos um lugar especial para celebrar esse momento com você ✨
      </p>

      {/* GALERIA */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full mb-16">
        <img
          src={foto1}
          className="w-full h-[250px] object-cover rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        />
        <img
          src={foto2}
          className="w-full h-[250px] object-cover rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        />
        <img
          src={foto3}
          className="w-full h-[250px] object-cover rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        />
      </div>

      {/* CARD MAPA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 max-w-5xl w-full"
      >
        {/* MAPA */}
        <iframe
          src="https://www.google.com/maps?q=Imperial%20Recep%C3%A7%C3%B5es%20e%20Eventos&output=embed"
          className="w-full h-[350px] md:h-[450px] border-0"
          loading="lazy"
        ></iframe>

        {/* INFO */}
        <div className="p-8 flex flex-col justify-center gap-4">
          <h3 className="text-xl font-semibold">{LOCATION_NAME}</h3>

          <p className="text-gray-600">{LOCATION_ADDRESS}</p>

          <button
            onClick={() => window.open(MAPS_LINK, "_blank")}
            className="mt-4 bg-[#8A9A5B] hover:bg-[#6F7F4A] text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-md flex items-center justify-center gap-2"
          >
            <FaDirections />
            Como chegar
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export default Location;
