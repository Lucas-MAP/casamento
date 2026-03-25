import { useState } from "react";
import { guests } from "../data/guests";
import bgImg from "../assets/praia_1.jpeg";

function ConfirmPresence() {
  const [name, setName] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const guest = guests.find(
      (g) => g.name.toLowerCase() === name.toLowerCase()
    );

    if (!guest) {
      alert("Seu nome não está na lista de convidados 😢");
      return;
    }

    if (guestsCount > guest.maxGuests) {
      alert(`Você pode levar até ${guest.maxGuests} pessoa(s)`);
      return;
    }

    console.log({
      name,
      guests: guestsCount,
    });

    setConfirmed(true);
  };

  return (
    <section
      id="presenca"
      className="min-h-screen relative flex items-center justify-center px-6 py-24"
    >
      {/* FUNDO */}
      <img
        src={bgImg}
        alt="background"
        className="absolute w-full h-full object-cover blur-xl scale-110"
      />
      <div className="absolute w-full h-full bg-black/30"></div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full max-w-md text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Confirmar Presença
        </h2>

        <p className="text-white/80 mb-10">
          Sua presença é muito importante pra gente 💛
        </p>

        {!confirmed ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col gap-4 text-black"
          >
            {/* NOME */}
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]"
            />

            {/* QUANTIDADE */}
            <select
              value={guestsCount}
              onChange={(e) => setGuestsCount(Number(e.target.value))}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]"
            >
              <option value={1}>Só eu</option>
              <option value={2}>2 pessoas</option>
              <option value={3}>3 pessoas</option>
              <option value={4}>4 pessoas</option>
              <option value={5}>5 pessoas</option>
            </select>

            {/* BOTÃO */}
            <button
              type="submit"
              className="mt-2 bg-[#8A9A5B] hover:bg-[#6F7F4A] text-white py-3 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-md"
            >
              Confirmar presença
            </button>
          </form>
        ) : (
          <div className="bg-white/95 text-green-700 px-6 py-6 rounded-2xl shadow-2xl">
            <h3 className="text-xl font-semibold mb-2">
              Presença confirmada! 💚
            </h3>
            <p className="text-gray-600">
              Estamos felizes em ter você com a gente nesse dia especial.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ConfirmPresence;