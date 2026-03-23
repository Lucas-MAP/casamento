import { useState } from "react";
import { guests } from "../data/guests";

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
      className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        Confirmar Presença
      </h2>

      <p className="text-gray-600 text-center max-w-xl mb-10">
        Sua presença é muito importante pra gente 💛
      </p>

      {!confirmed ? (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
        >
          {/* NOME */}
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]"
          />

          {/* QUANTIDADE */}
          <select
            value={guestsCount}
            onChange={(e) => setGuestsCount(Number(e.target.value))}
            className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]"
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
            className="bg-[#8A9A5B] hover:bg-[#6F7F4A] text-white py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Confirmar presença
          </button>
        </form>
      ) : (
        <div className="bg-green-100 text-green-700 px-6 py-4 rounded-xl">
          Presença confirmada! 💚
        </div>
      )}
    </section>
  );
}

export default ConfirmPresence;