function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-[#8A9A5B] mb-4">
          Lucas & Jamilly 💍
        </h1>

        <p className="text-xl text-gray-600 mb-6">
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