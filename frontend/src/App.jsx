import Hero from "./components/Hero";
import Story from "./components/Story";
import Location from "./components/Location";
import ConfirmPresence from "./components/ConfirmPresence";
import ScrollToTop from "./components/ScrollToTop";
import GiftList from "./components/GiftList";
import Presentear from "./pages/Presentear";

function App() {
  const params = new URLSearchParams(window.location.search);

  if (params.get("pagina") === "presentear") {
    return <Presentear />;
  }

  return (
    <>
      <Hero />

      <Story />

      <Location />

      {/* PRESENTES */}
      <GiftList />

      {/* PRESENÇA */}
      <ConfirmPresence />
      <ScrollToTop />
    </>
  );
}

export default App;
