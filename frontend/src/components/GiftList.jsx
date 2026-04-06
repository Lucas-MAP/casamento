import { useState } from "react";
import { motion } from "framer-motion";
import coupleImg from "../assets/casal_praia.jpg";

// IMAGENS
import viagem from "../assets/presentes/viagem.png";
import culinaria from "../assets/presentes/culinaria.png";
import almofada from "../assets/presentes/almofada.png";
import cinema from "../assets/presentes/cinema.png";
import praia from "../assets/presentes/praia.png";
import casamento from "../assets/presentes/casamento.png";
import coberta from "../assets/presentes/coberta.jpeg";
import louça from "../assets/presentes/louça.png";

function GiftList() {
  const TOTAL_EXPECTED = 50;
  const [contributions] = useState(18);

  const [showModal, setShowModal] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const progress = Math.min(
    Math.round((contributions / TOTAL_EXPECTED) * 100),
    100,
  );

  const presentes = [
    {
      id: 1,
      nome: "Incentive o noivo a lavar a louça (ou pelo menos tentar 😅)",
      valor: 50,
      img: louça,
    },
    {
      id: 2,
      nome: "Curso de culinária para a noiva 👩‍🍳",
      valor: 100,
      img: culinaria,
    },
    { id: 3, nome: "🎬 Cinema + pipoca gigante", valor: 150, img: cinema },
    {
      id: 4,
      nome: "🛋️ Almofada (caso alguém durma nela 😅)",
      valor: 250,
      img: almofada,
    },
    {
      id: 5,
      nome: "☕ Coberta para a noiva (sempre certa 😌)",
      valor: 300,
      img: coberta,
    },
    { id: 6, nome: "🏝️ Ajuda na viagem dos sonhos", valor: 500, img: praia },
    { id: 7, nome: "✈️ Passeio na lua de mel", valor: 750, img: viagem },
    {
      id: 8,
      nome: "💍 Investimento no nosso casamento",
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

      if (!data.url) throw new Error("URL não retornada");

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
      className="bg-gradient-to-b from-[#F8FAFC] to-[#E0F2FE] px-6 py-28 flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        Lista de Presentes 🎁
      </h2>

      <p className="text-gray-600 text-center max-w-2xl mb-20 text-lg">
        Se desejar nos presentear, temos algumas sugestões para você. 💙
      </p>

      {/* CARD */}
      <div className="w-full max-w-7xl mb-20">
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden bg-gray-100">
              <img src={coupleImg} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-2xl md:text-3xl font-semibold">
                Nosso sonho juntos 💙
              </h3>

              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-[#7FB3D5] to-[#5DADE2]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full">
        {presentes.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelecionar(item)}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="h-28 w-full overflow-hidden">
              <img src={item.img} className="w-full h-full object-cover" />
            </div>

            <div className="p-4 text-center">
              <p className="text-sm font-medium">{item.nome}</p>
              <p className="font-bold mt-2 text-blue-600">
                R$ {item.valor}
              </p>
            </div>
          </div>
        ))}

        {/* BOTÃO AZUL */}
        <button
          onClick={() => setShowModal(true)}
          className="col-span-2 md:col-span-4 bg-gradient-to-r from-[#7FB3D5] to-[#5DADE2] text-white rounded-2xl p-6 text-lg font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
        >
          💸 Escolher outro valor (qualquer ajuda é bem vinda😅)
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md flex flex-col gap-4">
            <h3 className="text-xl font-bold text-center">
              Escolha o valor 💙
            </h3>

            <input
              type="number"
              placeholder="Digite o valor (ex: 50)"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="border p-3 rounded-lg text-center"
            />

            <button
              onClick={handleCustomPayment}
              className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
            >
              Pagar 💳
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="text-gray-500 text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default GiftList;