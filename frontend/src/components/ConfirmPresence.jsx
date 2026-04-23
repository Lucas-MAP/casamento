import { useState, useRef, useEffect } from "react";
import { guests } from "../data/guests";
import { FaCheckCircle, FaClock, FaUserTie } from "react-icons/fa";
import bgConfirm from "../assets/bg-confirm.jpeg";
import GodfatherArea from "./GodfatherArea";
import GuestManual from "./GuestManual"; // IMPORTANTE
import axios from "axios";
import { motion } from "framer-motion";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://convite-lj.duckdns.org";

const normalize = (str) =>
  str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const findGuest = (value) => {
  if (!value || value.length < 2) return null;
  const typed = normalize(value);
  return guests.find((g) => {
    const listName = normalize(g.name);
    return typed === listName || typed.includes(listName) || listName.includes(typed);
  });
};

function ConfirmPresence() {
  const [name, setName] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);
  const [extraNames, setExtraNames] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [vipGuests, setVipGuests] = useState([]); 
  const [showManual, setShowManual] = useState(false); // NOVO ESTADO
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [nameStatus, setNameStatus] = useState(null);
  const [extraNamesStatus, setExtraNamesStatus] = useState([]);

  const vipRef = useRef(null);

  useEffect(() => {
    if (!name.trim()) { setNameStatus(null); return; }
    setNameStatus(findGuest(name) ? "valid" : "invalid");
  }, [name]);

  useEffect(() => {
    setExtraNames(prev => {
      const newArr = Array(guestsCount - 1).fill("");
      return newArr.map((_, i) => prev[i] || "");
    });
  }, [guestsCount]);

  useEffect(() => {
    const statuses = extraNames.map((n) => {
      if (!n.trim()) return null;
      return findGuest(n) ? "valid" : "invalid";
    });
    setExtraNamesStatus(statuses);
  }, [extraNames]);

  const mainGuest = name.trim() ? findGuest(name) : null;
  const combinedGodfather = mainGuest?.isGodfather || extraNames.some(n => findGuest(n)?.isGodfather);
  const combinedGodmother = mainGuest?.isGodmother || extraNames.some(n => findGuest(n)?.isGodmother);

  const getButtonLabel = () => {
    if (!mainGuest) return "Confirmar presença";
    if (combinedGodfather && combinedGodmother) return "Confirmar como Padrinho e Madrinha 💙";
    if (combinedGodfather) return "Confirmar como Padrinho 💙";
    if (combinedGodmother) return "Confirmar como Madrinha 💙";
    return "Confirmar presença";
  };

  const getInputBorder = (status) => {
    if (status === "valid") return "border-green-400 ring-2 ring-green-300 bg-green-50/30";
    if (status === "invalid") return "border-red-300 ring-2 ring-red-200 bg-red-50/30";
    return "border-gray-200 focus:border-[#6FAED9] focus:ring-2 focus:ring-[#6FAED9]/20";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const guest = findGuest(name);
    if (!guest) {
      setErrorMsg("Seu nome não foi encontrado. Verifique se escreveu corretamente.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/confirm`, {
        name: guest.name, 
        guestsCount,
        isGodfather: guest.isGodfather || false,
        isGodmother: guest.isGodmother || false,
      });

      const vipList = [];
      if (guest.isGodfather || guest.isGodmother) vipList.push(guest);
      for (const extra of extraNames) {
        if (extra.trim()) {
          const extraGuest = findGuest(extra);
          await axios.post(`${API_URL}/api/confirm`, {
            name: extraGuest ? extraGuest.name : extra,
            guestsCount: 1,
            isGodfather: extraGuest?.isGodfather || false,
            isGodmother: extraGuest?.isGodmother || false,
          });
          if (extraGuest && (extraGuest.isGodfather || extraGuest.isGodmother)) vipList.push(extraGuest);
        }
      }

      setVipGuests(vipList);
      setShowManual((guestsCount - vipList.length) > 0); // MOSTRA MANUAL SE TIVER CONVIDADO NÃO VIP
      setConfirmed(true);
      setName("");
      setGuestsCount(1);
      setExtraNames([]);
    } catch (error) {
      setErrorMsg("Erro na conexão. Tente novamente.");
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (confirmed && (vipGuests.length > 0 || showManual)) {
      vipRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [confirmed, vipGuests, showManual]);

  return (
    <>
      <section id="presenca" className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-24">
        <img src={bgConfirm} alt="background" className="absolute w-full h-full object-cover blur-lg scale-110 opacity-40" />
        <div className="absolute w-full h-full bg-[#FAF9F6]/80 backdrop-blur-sm" />
        <div className="relative z-10 w-full flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-7xl font-display mb-6 text-[#1a3a5c]">Confirmar Presença</h2>
          <p className="text-[#1a3a5c]/70 max-w-xl mb-12 font-serif italic text-xl">Sua presença é muito importante pra nós! 💛</p>

          <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-8 max-w-xl w-full mb-12 shadow-xl border border-white/50 flex flex-col gap-5 text-left">
            <div className="flex items-center gap-4 text-[#1a3a5c]">
              <div className="bg-[#6FAED9]/20 p-3 rounded-full"><FaClock className="text-[#6FAED9]" /></div>
              <span><strong>Horário:</strong> A partir das 19:00h</span>
            </div>
            <div className="flex items-center gap-4 text-[#1a3a5c]">
              <div className="bg-[#6FAED9]/20 p-3 rounded-full"><FaUserTie className="text-[#6FAED9]" /></div>
              <span><strong>Traje:</strong> Esporte fino / Social</span>
            </div>
          </div>

          {!confirmed ? (
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-lg flex flex-col gap-6 text-left">
              {/* Nome Principal */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-5 py-4 rounded-2xl border outline-none font-serif text-lg ${getInputBorder(nameStatus)}`}
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  {nameStatus === "valid" && <span className="text-green-500 font-bold text-xl">✓</span>}
                  {nameStatus === "invalid" && <span className="text-red-400 font-bold text-xl">X</span>}
                </div>
                {nameStatus === "invalid" && (
                  <p className="text-red-400 text-[10px] absolute -bottom-5 left-2 italic font-bold">Nome não encontrado na lista oficial</p>
                )}
              </div>

              <div className="mt-2 text-left">
                <label className="text-[10px] uppercase tracking-widest text-[#1a3a5c]/50 mb-2 block ml-2 font-bold font-sans">Quantas pessoas?</label>
                <select value={guestsCount} onChange={(e) => setGuestsCount(Number(e.target.value))} className="w-full px-5 py-4 rounded-2xl border border-gray-100 outline-none focus:border-[#6FAED9] bg-gray-50/30 font-serif text-lg">
                  <option value={1}>Apenas eu</option>
                  {[2, 3, 4, 5].map(n => <option key={n} value={n}>{n} pessoa(s)</option>)}
                </select>
              </div>

              {/* Nomes Extras */}
              {extraNames.map((extra, index) => (
                <div key={index} className="relative animate-fadeIn">
                  <input
                    type="text"
                    placeholder={`Nome completo do convidado ${index + 2}`}
                    value={extra}
                    onChange={(e) => {
                      const updated = [...extraNames];
                      updated[index] = e.target.value;
                      setExtraNames(updated);
                    }}
                    className={`w-full px-5 py-4 rounded-2xl border outline-none font-serif text-lg ${getInputBorder(extraNamesStatus[index])}`}
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    {extraNamesStatus[index] === "valid" && <span className="text-green-500 font-bold text-xl">✓</span>}
                    {extraNamesStatus[index] === "invalid" && <span className="text-red-400 font-bold text-xl">X</span>}
                  </div>
                  {extraNamesStatus[index] === "invalid" && (
                    <p className="text-red-400 text-[10px] absolute -bottom-5 left-2 italic font-bold">Nome não encontrado na lista oficial</p>
                  )}
                </div>
              ))}

              <button type="submit" disabled={loading} className={`text-white py-5 rounded-full font-bold text-lg shadow-lg ${loading ? "bg-gray-300" : "bg-[#6FAED9] hover:bg-[#1a3a5c] shadow-[#6FAED9]/20"}`}>
                {loading ? "Processando..." : getButtonLabel()}
              </button>
            </form>
          ) : (
            <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6"><FaCheckCircle className="text-4xl text-green-500" /></div>
              <h3 className="text-3xl font-display text-[#1a3a5c] mb-2">Presença Confirmada!</h3>
              <p className="font-serif italic text-gray-500 text-lg">Nos vemos no grande dia! 🥂</p>
            </div>
          )}
        </div>
      </section>

      {confirmed && (
        <div ref={vipRef}>
          {vipGuests.length > 0 && vipGuests.map((g, i) => (
            <GodfatherArea key={i} name={g.name} isGodmother={g.isGodmother || false} />
          ))}
          {showManual && <GuestManual />}
        </div>
      )}
    </>
  );
}

export default ConfirmPresence;