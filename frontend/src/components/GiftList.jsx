import { useState } from "react";
import { motion } from "framer-motion";
import coupleImg from "../assets/Fim_história.jpeg";

// IMPORTAÇÃO DAS IMAGENS ORIGINAIS
import viagem from "../assets/presentes/viagem.jpeg";
import culinaria from "../assets/presentes/culinaria.jpeg";
import almofada from "../assets/presentes/almofada.jpeg";
import cinema from "../assets/presentes/cinema.jpeg";
import praia from "../assets/presentes/praia.jpeg";
import casamento from "../assets/presentes/casamento.jpeg";
import coberta from "../assets/presentes/coberta.jpeg";
import louça from "../assets/presentes/louça.jpeg";

function GiftList() {
  const [showModal, setShowModal] = useState(false);
  const [customValue, setCustomValue] = useState("");

  // LISTA DE PRESENTES
  const presentes = [
    {
      id: 1,
      nome: "Incentive o noivo a lavar a louça (ou pelo menos tentar 😅)",
      valor: 100,
      img: louça,
    },
    {
      id: 2,
      nome: "Curso de culinária para a noiva 👩‍🍳",
      valor: 200,
      img: culinaria,
    },
    {
      id: 3,
      nome: "🎬 Cinema + pipoca gigante",
      valor: 150,
      img: cinema,
    },
    {
      id: 4,
      nome: "🛋️ Almofada (caso alguém durma nela 😅)",
      valor: 350,
      img: almofada,
    },
    {
      id: 5,
      nome: "☕ Coberta para a noiva (que está sempre coberta de razão 😌)",
      valor: 250,
      img: coberta,
    },
    {
      id: 6,
      nome: "🏝️ Ajuda na viagem dos sonhos",
      valor: 600,
      img: praia,
    },
    {
      id: 7,
      nome: "✈️ Passeio na lua de mel",
      valor: 750,
      img: viagem,
    },
    {
      id: 8,
      nome: "💍 Deixa Deus te usar.",
      valor: 1000,
      img: casamento,
    },
  ];

  const handleSelecionar = async (item) => {
    try {
      const API_URL =
        window.location.hostname === "localhost"
          ? "http://localhost:3000"
          : "https://convite-lj.duckdns.org";

      const response = await fetch(`${API_URL}/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.nome,
          amount: Number(item.valor),
        }),
      });

      const data = await response.json();

      if (!data.url) {
        throw new Error("URL não retornada");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Erro ao iniciar pagamento:", error);
    }
  };

  const handleCustomPayment = () => {
    if (!customValue || customValue <= 0) {
      alert("Digite um valor válido");
      return;
    }

    handleSelecionar({
      nome: "Presente livre 💝",
      valor: Number(customValue),
    });

    setShowModal(false);
    setCustomValue("");
  };

  return (
    <section
      id="presentes"
      className="bg-[#FAF9F6] px-6 py-28 flex flex-col items-center overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto">

        {/* CARD PRINCIPAL */}
        <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl relative border border-gray-50 flex flex-col gap-12">

          {/* TOPO */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-[350px] md:h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <img
                src={coupleImg}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="flex flex-col gap-6">
              <h2 className="text-5xl md:text-7xl font-display text-[#1a3a5c] leading-tight">
                Lista de presentes🎁
              </h2>

              <p className="text-[#1a3a5c]/70 text-lg md:text-xl font-serif italic">
                Se desejar nos presentear, temos algumas sugestões para você.
                <br />
                Sua presença é o nosso maior presente, mas qualquer gesto
                <br />
                é recebido com muito carinho. 💙
              </p>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

            {presentes.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                onClick={() => handleSelecionar(item)}
                className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >

                {/* IMAGEM */}
                <div className="h-32 md:h-44 w-full overflow-hidden relative">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* TEXO AJUSTADO */}
                <div className="p-5 text-center flex-grow flex flex-col justify-between">

                  <p className="text-sm md:text-[15px] font-serif italic text-[#1a3a5c]/80 leading-snug min-h-[84px] md:min-h-[72px] flex items-center justify-center px-1">
                    {item.nome}
                  </p>

                  <p className="font-display text-2xl text-[#1a3a5c] font-bold mt-2">
                    R$ {item.valor}
                  </p>

                </div>
              </motion.div>
            ))}

            {/* BOTÃO VALOR LIVRE */}
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => setShowModal(true)}
              className="col-span-2 md:col-span-4 mt-4 bg-[#1a3a5c] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer hover:bg-black transition-all duration-500 shadow-xl"
            >
              <div className="flex flex-col text-center md:text-left gap-1">

                <span className="text-white text-2xl md:text-3xl font-display leading-tight">
                  Escolher outro valor
                </span>

                <span className="text-white/60 text-sm font-serif italic">
                  Se preferir, sinta-se à vontade para nos presentear com o valor que desejar!💙
                </span>

              </div>

              <div className="bg-white text-[#1a3a5c] px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg">
                Presentear
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-6">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md flex flex-col gap-8 relative text-[#1a3a5c]"
          >

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-display mb-2">
                Valor Livre 💙
              </h3>

              <p className="text-gray-500 text-sm font-serif italic">
                Digite o valor que deseja nos presentear
              </p>
            </div>

            <div className="relative">

              <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-xl opacity-30">
                R$
              </span>

              <input
                type="number"
                placeholder="0,00"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                autoFocus
                className="w-full border-b-2 border-gray-100 pl-16 pr-6 py-6 text-4xl font-display outline-none focus:border-[#0c3969] transition-all bg-transparent"
              />

            </div>

            <button
              onClick={handleCustomPayment}
              className="w-full bg-[#1a3a5c] text-white py-5 rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl active:scale-95"
            >
              Confirmar 💳
            </button>

          </motion.div>
        </div>
      )}
    </section>
  );
}

export default GiftList;