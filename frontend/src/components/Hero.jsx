import heroImg from "../assets/hero.png";

function Hero() {
  return (
    <section className="h-screen relative overflow-hidden">

      {/* FUNDO DESFOCADO */}
      <img
        src={heroImg}
        alt="background"
        className="absolute w-full h-full object-cover blur-xl scale-110"
      />

      {/* OVERLAY ESCURO */}
      <div className="absolute w-full h-full bg-black/40"></div>

      {/* IMAGEM PRINCIPAL */}
      <div className="relative h-full flex items-center justify-center">
        <img
          src={heroImg}
          alt="casal"
          className="h-[80%] object-contain"
        />
      </div>

      {/* TEXTO */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          Lucas & Jamilly 💍
        </h1>

        <p className="text-xl text-white mb-6">
          18 de Dezembro de 2026
        </p>

        <button className="bg-[#8A9A5B] hover:bg-[#6F7F4A] text-white px-6 py-3 rounded-full text-lg transition duration-300">
          Ver lista de presentes
        </button>
      </div>

    </section>
  );
}

export default Hero;