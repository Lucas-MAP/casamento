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
            <h3 className="text-2xl font-semibold mb-4">Onde tudo começou</h3>

            <p className="text-gray-600 text-lg leading-relaxed text-justify">
              Nossa história ganhou forma em meados de 2024, em Marabá, unida
              pelo carinho de amigos queridos. Mas, na verdade, ela começou
              muito antes, no silêncio das nossas orações.
              <br />
              <br />
              Do início do namoro até aqui, nunca houve dúvida sobre a nossa
              escolha, nem mesmo os quilômetros entre o Pará e o Tocantins foram
              capazes de nos afastar. O que teve início em solo paraense agora
              será eternizado diante de Deus, de nossa família e amigos.
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
            <h3 className="text-2xl font-semibold mb-4">Construindo juntos</h3>

            <p className="text-gray-600 text-lg leading-relaxed text-justify">
              Nossa vida é feita de movimento. Juntos, somamos quilômetros de
              estrada em viagens de moto (vulgo Spectro), colecionamos aventuras
              e muitas histórias na bagagem. Desde o começo da nossa história,
              nossa base foi construída no apoio mútuo e no cuidado diário
              compartilhando sonhos e sempre caminhando lado a lado para
              realizá-los.
              <br />
              <br />
              Nos ajudamos em cada detalhe, estando presentes nos dias
              cansativos de trabalho e nas noites longas de estudo, sendo um
              para o outro o incentivo para não desistirmos dos nossos sonhos.
              Mais do que uma história de amor, vivemos uma história de
              parceria.
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
            <h3 className="text-2xl font-semibold mb-4">Nosso novo capítulo</h3>

            <p className="text-gray-600 text-lg leading-relaxed text-justify">
              A resposta de nossas orações e o fruto da nossa parceria nos
              trouxeram até aqui. Agora, estamos prestes a iniciar a jornada
              mais importante das nossas vidas: a construção da nossa própria
              família.
              <br />
              <br />
              O "para sempre" que antes era um sonho, agora ganha data
              e lugar. Este novo capítulo não será escrito apenas por nós dois,
              mas diante de Deus e daqueles que amamos. Queremos que você
              testemunhe o início dessa nova estrada em que deixaremos para trás
              a distância entre o Pará e o Tocantins para em breve dividirmos o
              mesmo lar e o mesmo futuro.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Story;
