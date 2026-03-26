import { useState, useRef, useEffect } from "react";
import { guests } from "../data/guests";
import { FaCheckCircle, FaClock, FaUserTie } from "react-icons/fa";
import bgConfirm from "../assets/bg-confirm.jpeg";
import GodfatherArea from "./GodfatherArea";

function ConfirmPresence() {
  const [name, setName] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [guestFound, setGuestFound] = useState(null);

  const vipRef = useRef(null);

  // 🔥 NORMALIZAÇÃO (resolve acento, espaço, etc)
  const normalize = (str) =>
    str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const guest = guests.find((g) =>
      normalize(name).includes(normalize(g.name))
    );

    if (!guest) {
      alert("Seu nome não está na lista de convidados 😢");
      return;
    }

    if (guestsCount > guest.maxGuests) {
      alert(`Você pode levar até ${guest.maxGuests} pessoa(s), incluindo você!`);
      return;
    }

    setGuestFound(guest);
    setConfirmed(true);
  };

  // 🔥 SCROLL AUTOMÁTICO (CORRETO)
  useEffect(() => {
    if (confirmed && guestFound?.isGodfather) {
      vipRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [confirmed, guestFound]);

  return (
    <>
      {/* 🔹 SEÇÃO PRINCIPAL */}
      <section
        id="presenca"
        className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-24"
      >
        {/* FUNDO */}
        <img
          src={bgConfirm}
          alt="background"
          className="absolute w-full h-full object-cover blur-lg scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute w-full h-full bg-white/70 backdrop-blur-sm"></div>

        {/* CONTEÚDO */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            Confirmar Presença
          </h2>

          <p className="text-gray-600 text-center max-w-xl mb-12">
            Sua presença é muito importante pra gente 💛
          </p>

          {/* INFO */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-xl w-full mb-12 shadow-md flex flex-col gap-4">
            <div className="flex items-center gap-3 text-gray-700">
              <FaClock className="text-[#8A9A5B]" />
              <span>
                <strong>Horário:</strong> A partir das 19:00h
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaUserTie className="text-[#8A9A5B]" />
              <span>
                <strong>Traje:</strong> Esporte fino / Social
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaCheckCircle className="text-[#8A9A5B]" />
              <span>Pedimos que confirme sua presença com antecedência</span>
            </div>
          </div>

          {/* FORM */}
          {!confirmed ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#6FAED9]"
              />

              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#6FAED9]"
              >
                <option value={1}>Só eu</option>
                <option value={2}>+1 pessoa</option>
                <option value={3}>+2 pessoas</option>
                <option value={4}>+3 pessoas</option>
                <option value={5}>+4 pessoas</option>
              </select>

              <button
                type="submit"
                className="bg-[#6FAED9] hover:bg-[#4F94C4] text-white py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                Confirmar presença
              </button>
            </form>
          ) : (
            <div className="bg-green-100 text-green-700 px-6 py-4 rounded-xl shadow-md">
              Presença confirmada! 💚
            </div>
          )}
        </div>
      </section>

      {/* 🔥 ÁREA VIP */}
      {confirmed && guestFound?.isGodfather && (
        <div ref={vipRef}>
          <GodfatherArea name={name} />
        </div>
      )}
    </>
  );
}

export default ConfirmPresence;