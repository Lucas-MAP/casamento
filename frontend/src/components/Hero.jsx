import heroImg from "../assets/praia_1.jpeg";
import { FaGift, FaCheck, FaMapMarkerAlt, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";

function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center">
      {/* FUNDO */}
      <img
        src={heroImg}
        alt="background"
        className="absolute w-full h-full object-cover blur-md scale-110 opacity-40"
      />

      {/* OVERLAY */}
      <div className="absolute w-full h-full bg-[#1a3a5c]/10"></div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-14">
        {/* TEXTO */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[600px] text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-display leading-tight text-[#1a3a5c] mb-4">
            Lucas Mateus & Antonia Jamilly
          </h1>

          <p className="text-xl md:text-2xl font-serif italic text-[#1a3a5c]/80 mb-6 font-medium">
            18 de Dezembro de 2026
          </p>

          {/* BOTÕES */}
          <div className="flex flex-col gap-3 items-center md:items-start">

            {/* PRIMÁRIO */}
            <button
              onClick={() => scrollToSection("presentes")}
              className="flex items-center justify-center gap-2 w-[280px] bg-[#6FAED9] hover:bg-[#1a3a5c] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <FaGift />
              Lista de presentes
            </button>

            {/* SECUNDÁRIO */}
            <button
              onClick={() => scrollToSection("presenca")}
              className="flex items-center justify-center gap-2 w-[280px] bg-[#6FAED9] hover:bg-[#1a3a5c] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-md"
            >
              <FaCheck />
              Confirmar presença
            </button>

            {/* OUTLINE */}
            <div className="flex gap-3 mt-4 flex-wrap justify-center md:justify-start">

              <button
                onClick={() => scrollToSection("localizacao")}
                className="flex items-center gap-2 text-[#1a3a5c] border border-[#1a3a5c]/30 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:bg-[#1a3a5c]/10 hover:border-[#1a3a5c]"
              >
                <FaMapMarkerAlt />
                Localização
              </button>

              <button
                onClick={() => scrollToSection("historia")}
                className="flex items-center gap-2 text-[#1a3a5c] border border-[#1a3a5c]/30 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:bg-[#1a3a5c]/10 hover:border-[#1a3a5c]"
              >
                <FaBookOpen />
                Nossa história
              </button>

            </div>

          </div>
        </motion.div>

        {/* IMAGEM */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-[55%] flex justify-center"
        >
          <img
            src={heroImg}
            alt="casal"
            className="w-full max-w-[600px] md:max-w-none md:h-[85vh] object-cover rounded-[3rem] shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
