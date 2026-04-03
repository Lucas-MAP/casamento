import { useState, useRef, useEffect } from "react";
import { guests } from "../data/guests";
import { FaCheckCircle, FaClock, FaUserTie } from "react-icons/fa";
import bgConfirm from "../assets/bg-confirm.jpeg";
import GodfatherArea from "./GodfatherArea";
import axios from "axios";

function ConfirmPresence() {
  const [name, setName] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [guestFound, setGuestFound] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const vipRef = useRef(null);

  const normalize = (str) =>
    str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    const guest = guests.find(
      (g) =>
        normalize(g.name) === normalize(name) ||
        normalize(g.name).includes(normalize(name)),
    );

    if (!guest) {
      setErrorMsg("Seu nome não está na lista de convidados 😢");
      return;
    }

    if (guestsCount > guest.maxGuests) {
      setErrorMsg(
        `Você pode levar até ${guest.maxGuests} pessoa(s), incluindo você!`,
      );
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/confirm", {
        name: guest.name,
        guestsCount,
        isGodfather: guest.isGodfather || false,
      });

      setGuestFound(guest);
      setConfirmed(true);

      // limpa campos
      setName("");
      setGuestsCount(1);

    } catch (error) {
      console.error(error);

      if (error.response?.data?.error) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg("Erro ao salvar confirmação 😢");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (confirmed && guestFound?.isGodfather) {
      vipRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [confirmed, guestFound]);

  return (
    <>
      <section
        id="presenca"
        className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-24"
      >
        <img
          src={bgConfirm}
          alt="background"
          className="absolute w-full h-full object-cover blur-lg scale-110"
        />

        <div className="absolute w-full h-full bg-white/70 backdrop-blur-sm"></div>

        <div className="relative z-10 w-full flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            Confirmar Presença
          </h2>

          <p className="text-gray-600 text-center max-w-xl mb-12">
            Sua presença é muito importante pra gente 💛
          </p>

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
                <option value={2}>eu e +1 pessoa</option>
                <option value={3}>eu e +2 pessoas</option>
                <option value={4}>eu e +3 pessoas</option>
                <option value={5}>eu e +4 pessoas</option>
              </select>

              {/* ERRO */}
              {errorMsg && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`text-white py-3 rounded-full transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#6FAED9] hover:bg-[#4F94C4] hover:scale-105"
                }`}
              >
                {loading ? "Enviando..." : "Confirmar presença"}
              </button>
            </form>
          ) : (
            <div className="bg-green-100 text-green-700 px-6 py-4 rounded-xl shadow-md">
              Presença confirmada! 💚
            </div>
          )}
        </div>
      </section>

      {confirmed && guestFound?.isGodfather && (
        <div ref={vipRef}>
          <GodfatherArea name={guestFound.name} />
        </div>
      )}
    </>
  );
}

export default ConfirmPresence;