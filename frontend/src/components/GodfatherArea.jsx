import { motion } from "framer-motion";
import bgVip from "../assets/bg-vip.jpg";

function GodfatherArea({ name }) {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-32"
      style={{
        backgroundImage: `url(${bgVip})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

      {/* CONTEÚDO */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl flex flex-col gap-14"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2f3e46] mb-4">
            Uma missão especial te espera 💙
          </h2>

          <p className="text-gray-600 text-xl">
            Você não está aqui por acaso…
          </p>
        </div>

        <div className="bg-white/95 rounded-3xl p-12 shadow-xl text-center border">
          <h3 className="text-xl font-semibold mb-2">
            💙 Bem-vindo, {name}
          </h3>

          <p className="text-gray-600">
            Você faz parte de um momento único da nossa história
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/95 rounded-2xl p-6 shadow-md border">
            <h4 className="font-semibold mb-2 text-xl">📌 Dicas</h4>
            <p>⏰ Chegue 30min antes</p>
            <p>📸 Tire muitas fotos</p>
          </div>

          <div className="bg-white/95 rounded-2xl p-6 shadow-md border">
            <h4 className="font-semibold mb-2 text-xl">👔 Traje</h4>
            <p>Padrinhos: Terno preto + gravata azul</p>
            <p>Madrinhas: Tons de azul</p>
          </div>
        </div>

        <div className="bg-white/95 rounded-2xl p-6 text-center shadow-md border">
          <p className="text-xl font-medium">
            📅 23 de Março de 2026
          </p>
        </div>

        <button className="bg-[#6FAED9] hover:bg-[#4F94C4] text-white py-5 rounded-full text-xl transition-all duration-300 hover:scale-105 shadow-xl">
          Confirmar como padrinho 💙
        </button>
      </motion.div>
    </section>
  );
}

export default GodfatherArea;