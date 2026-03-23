const LOCATION = "A definir...";

function Location() {
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    LOCATION
  )}`;

  return (
    <section
      id="localizacao"
      className="min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-center px-6 py-24"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        Local do Evento
      </h2>

      <p className="text-gray-600 text-center max-w-xl mb-10">
        Em breve vamos divulgar o local 💛
      </p>

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl flex flex-col items-center gap-6">
        <p className="text-lg font-medium">{LOCATION}</p>

        <button
          onClick={() => window.open(mapsUrl, "_blank")}
          disabled={LOCATION === "A definir..."}
          className={`px-6 py-3 rounded-full text-lg transition ${
            LOCATION === "A definir..."
              ? "bg-gray-300 text-gray-500"
              : "bg-[#8A9A5B] hover:bg-[#6F7F4A] text-white"
          }`}
        >
          Ver no mapa
        </button>
      </div>
    </section>
  );
}

export default Location;