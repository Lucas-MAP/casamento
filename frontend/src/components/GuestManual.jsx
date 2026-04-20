import { motion } from "framer-motion";
import {
  Clock,
  UserPlus,
  AlertCircle,
  Flower2,
  PartyPopper,
  Smartphone,
} from "lucide-react";

const manualItems = [
  {
    icon: <Clock className="w-10 h-10 text-[#6FAED9]" />,
    title: "Pontualidade",
    desc: "A cerimônia começará pontualmente. Não perca nenhum momento!",
  },
  {
    icon: <UserPlus className="w-10 h-10 text-[#6FAED9]" />,
    title: "Lista Restrita",
    desc: "Convidado não convida. Nosso espaço foi planejado para quem recebeu o convite.",
  },
  {
    icon: <AlertCircle className="w-10 h-10 text-[#6FAED9]" />,
    title: "Cores e Traje",
    desc: "Branco e Off-White são exclusivos da noiva. Traje: Esporte Fino.",
  },
  {
    icon: <Flower2 className="w-10 h-10 text-[#6FAED9]" />,
    title: "Lembranças",
    desc: "Não leve itens da decoração. Preparamos mimos especiais para você levar.",
  },
  {
    icon: <Smartphone className="w-10 h-10 text-[#6FAED9]" />,
    title: "Fotografia",
    desc: "Tire fotos à vontade, mas cuidado para não atrapalhar os fotógrafos.",
  },
  {
    icon: <PartyPopper className="w-10 h-10 text-[#6FAED9]" />,
    title: "Diversão",
    desc: "Estamos preparando tudo com muito amor. Aproveite, a festa é sua!",
  },
];

function GuestManual() {
  return (
    <section className="py-20 px-6 bg-white flex justify-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full bg-[#FAF9F6] rounded-[3rem] p-10 md:p-16 shadow-2xl border border-[#6FAED9]/10"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-[#1a3a5c] mb-4 text-center">
            Manual do Bom Convidado
          </h2>
          <p className="text-[#1a3a5c]/60 font-serif italic text-lg text-center">
            Muito obrigado pela confirmação, segue dicas essenciais para
            aproveitarmos juntos esse dia especial! 💙
          </p>
        </div>

        {/* Grade ajustada para 3 colunas no desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {manualItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 p-4 bg-white rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-[#1a3a5c] font-bold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-[#1a3a5c]/70 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-[#6FAED9]/20 text-center"></div>
      </motion.div>
    </section>
  );
}

export default GuestManual;
