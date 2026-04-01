import { useState } from "react";
import { motion } from "framer-motion";
import coupleImg from "../assets/casal_praia.jpg";

function GiftList() {
  const TOTAL_EXPECTED = 50;
  const [contributions, setContributions] = useState(18);

  const progress = Math.min(
    Math.round((contributions / TOTAL_EXPECTED) * 100),
    100,
  );

  const handleDonate = () => {
    setContributions((prev) => prev + 1);
    alert("Obrigado pelo presente 💙");
  };

  return (
    <section id="presentes" className="bg-gradient-to-b from-[#F8FAFC] to-[#E0F2FE] px-6 py-28 flex flex-col items-center">
      {/* TÍTULO */}
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        Lista de Presentes 🎁
      </h2>

      <p className="text-gray-600 text-center max-w-2xl mb-20 text-lg">
        Se desejar nos presentear, você pode contribuir com o nosso futuro
        juntos 💙
      </p>

      {/* CARD PRINCIPAL */}
      <div className="w-full max-w-7xl mb-20">
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* FOTO */}
            <div className="w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden flex items-center justify-center bg-gray-100">
              <img src={coupleImg} className="w-full h-full object-cover" />
            </div>

            {/* PROGRESSO */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl md:text-3xl font-semibold">
                Nosso sonho juntos 💙
              </h3>

              {/* BARRA */}
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-[#7FB3D5] to-[#5DADE2] shadow-[0_0_15px_rgba(111,174,217,0.5)]"
                />
              </div>

              <p className="text-gray-600 text-base">
                Já estamos mais próximos do nosso sonho 💙
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl w-full">
        {[100, 150, 200, 500].map((value) => (
          <button
            key={value}
            onClick={handleDonate}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border text-center"
          >
            <p className="text-xl font-semibold">R$ {value}</p>
            <p className="text-sm text-gray-500 mt-1">Contribuir</p>
          </button>
        ))}

        {/* OUTRO VALOR */}
        <button
          onClick={handleDonate}
          className="col-span-2 md:col-span-4 bg-gradient-to-r from-[#7FB3D5] to-[#5DADE2] text-white rounded-2xl p-6 text-lg font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
        >
          Escolher outro valor 💙
        </button>
      </div>
    </section>
  );
}

export default GiftList;
