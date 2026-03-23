import Hero from "./components/Hero";
import Story from "./components/Story";
import Location from "./components/Location";
import ConfirmPresence from "./components/ConfirmPresence";

function App() {
  return (
    <>
      <Hero />

      <Story />

      <Location />

      {/* PRESENTES */}
      <section
        id="presentes"
        className="min-h-screen bg-gray-100 flex items-center justify-center"
      >
        <h2 className="text-3xl font-semibold">
          Lista de Presentes (em breve)
        </h2>
      </section>

      {/* PRESENÇA */}
      <ConfirmPresence />
    </>
  );
}

export default App;