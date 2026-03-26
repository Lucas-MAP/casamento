import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300); // aparece depois de rolar um pouco
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-[#6FAED9] hover:bg-[#4F94C4] text-white p-5 md:p-6 rounded-full shadow-2xl ring-2 ring-white/30 transition-all duration-300 hover:scale-110"
    >
      <FaArrowUp size={24} />
    </button>
  );
}

export default ScrollToTop;
