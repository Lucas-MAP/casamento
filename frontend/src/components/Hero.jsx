import heroImg from "../assets/praia_1.jpeg";
import { FaGift, FaCheck, FaMapMarkerAlt, FaBookOpen } from "react-icons/fa";

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
        className="absolute w-full h-full object-cover blur-xl scale-110"
      />

      {/* OVERLAY */}
      <div className="absolute w-full h-full bg-black/30"></div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* TEXTO */}
        <div className="max-w-[500px] text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-white mb-4">
            Lucas Mateus & Antonia Jamilly
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-6">
            18 de Dezembro de 2026
          </p>

          {/* BOTÕES */}
          <div className="flex flex-col gap-3 items-center md:items-start">

            {/* PRIMÁRIO */}
            <button
              onClick={() => scrollToSection("presentes")}
              className="flex items-center justify-center gap-2 w-[260px] bg-[#8A9A5B] hover:bg-[#6F7F4A] text-white px-6 py-3 rounded-full text-base transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <FaGift />
              Lista de presentes
            </button>

            {/* SECUNDÁRIO */}
            <button
              onClick={() => scrollToSection("presenca")}
              className="flex items-center justify-center gap-2 w-[260px] bg-[#8A9A5B]/80 hover:bg-[#6F7F4A] text-white px-6 py-3 rounded-full text-base transition-all duration-300 hover:scale-105 shadow-md"
            >
              <FaCheck />
              Confirmar presença
            </button>

            {/* OUTLINE */}
            <div className="flex gap-3 mt-2 flex-wrap justify-center md:justify-start">

              <button
                onClick={() => scrollToSection("localizacao")}
                className="flex items-center gap-2 text-white border border-white/40 px-4 py-2 rounded-full text-sm transition-all duration-300 hover:bg-white/10 hover:border-white"
              >
                <FaMapMarkerAlt />
                Localização
              </button>

              <button
                onClick={() => scrollToSection("historia")}
                className="flex items-center gap-2 text-white border border-white/40 px-4 py-2 rounded-full text-sm transition-all duration-300 hover:bg-white/10 hover:border-white"
              >
                <FaBookOpen />
                Nossa história
              </button>

            </div>

          </div>
        </div>

        {/* IMAGEM */}
        <div className="w-full md:w-[55%] flex justify-center">
          <img
            src={heroImg}
            alt="casal"
            className="w-full max-w-[600px] md:max-w-none md:h-[85vh] object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;