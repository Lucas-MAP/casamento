import { motion } from "framer-motion";
import bgVip from "../assets/bg-vip.jpg";
import ternoImg from "../assets/terno.jpeg";
import vestidoImg from "../assets/vestido.jpeg";

function GodfatherArea({ name, isGodmother }) {
  const isMadrina = isGodmother === true;

  const padrinhoDress = {
    titulo: "Padrinhos",
    itens: [
      "Terno preto social",
      "Gravata azul claro",
      "Camisa interna branca",
    ],
    img: ternoImg,
    imgSide: "left", // imagem à esquerda
  };

  const madrinhaDress = {
    titulo: "Madrinha",
    itens: ["Vestido azul"],
    cores: ["#BDD7EE", "#4472C4", "#1F3864"],
    img: vestidoImg,
    imgSide: "right", // imagem à direita
  };

  const config = isMadrina ? madrinhaDress : padrinhoDress;

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-20"
      style={{
        backgroundImage: `url(${bgVip})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-5xl flex flex-col gap-10 items-center"
      >
        {/* SAUDAÇÃO */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a3a5c] mb-3">
            Uma missão especial te espera 💙
          </h2>
          <p className="text-gray-500 text-lg">
            Bem-vindo(a), <strong>{name}</strong> 💙
          </p>
        </div>

        {/* CARD TRAJE */}
        <div
          className={`w-full bg-[#dce9f5] rounded-3xl overflow-hidden shadow-xl flex flex-col ${
            config.imgSide === "right" ? "md:flex-row-reverse" : "md:flex-row"
          }`}
          style={{ minHeight: "380px" }}
        >
          {/* IMAGEM */}
          <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img
              src={config.img}
              alt={config.titulo}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* TEXTO */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-10 gap-5">
            <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a5c]">
              {config.titulo}:
            </h3>

            <ul className="flex flex-col gap-2">
              {config.itens.map((item, i) => (
                <li key={i} className="text-xl text-[#1a3a5c] flex items-center gap-2">
                  <span className="text-[#1a3a5c]">•</span> {item}
                </li>
              ))}
            </ul>

            {/* PALETA DE CORES — só para madrinha */}
            {isMadrina && config.cores && (
              <div className="flex gap-4 mt-2">
                {config.cores.map((cor, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full shadow-md"
                    style={{ backgroundColor: cor }}
                  />
                ))}
              </div>
            )}

            <p className="text-lg text-[#1a3a5c] font-medium mt-4 italic">
              Obrigado por fazer parte desse momento tão especial! 💙
            </p>
          </div>
        </div>

        {/* DICAS */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <div className="bg-white/95 rounded-2xl p-6 shadow-md border border-blue-100">
            <h4 className="font-semibold mb-3 text-xl text-[#1a3a5c]">📌 Dicas</h4>
            <p className="text-gray-600">⏰ Chegue 30 min antes</p>
            <p className="text-gray-600">📸 Tire muitas fotos</p>
          </div>

          <div className="bg-white/95 rounded-2xl p-6 shadow-md border border-blue-100">
            <h4 className="font-semibold mb-3 text-xl text-[#1a3a5c]">📅 Data</h4>
            <p className="text-gray-600">18 de Dezembro de 2026</p>
            <p className="text-gray-600">A partir das 19:00h</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default GodfatherArea;