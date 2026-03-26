import { motion } from "framer-motion";
import foto1 from "../assets/foto1.jpeg";
import foto2 from "../assets/foto2.jpeg";
import foto3 from "../assets/praia_1.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 },
  },
};

function Story() {
  return (
    <section
      id="historia"
      className="min-h-screen bg-white py-24 px-6 flex flex-col items-center"
    >
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-bold mb-20 text-center"
      >
        Nossa História
      </motion.h2>

      <div className="max-w-6xl w-full flex flex-col gap-24">
        {/* BLOCO 1 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <img
            src={foto1}
            className="w-full md:w-1/2 h-[400px] object-cover rounded-2xl shadow-lg"
          />

          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">
              Onde tudo começou
            </h3>
            <p className="text-gray-600">
              Tudo começou de forma simples…
            </p>
          </div>
        </motion.div>

        {/* BLOCO 2 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row-reverse items-center gap-12"
        >
          <img
            src={foto2}
            className="w-full md:w-1/2 h-[400px] object-cover rounded-2xl shadow-lg"
          />

          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">
              Construindo juntos
            </h3>
            <p className="text-gray-600">
              Entre risadas e momentos…
            </p>
          </div>
        </motion.div>

        {/* BLOCO 3 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <img
            src={foto3}
            className="w-full md:w-1/2 h-[400px] object-cover rounded-2xl shadow-lg"
          />

          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">
              Nosso novo capítulo
            </h3>
            <p className="text-gray-600">
              E agora queremos celebrar…
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Story;