import { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

// ==================================================
// PIX COPIA E COLA OFICIAL DO PICPAY
// O QR Code e o botão de cópia utilizam o mesmo código.
// ==================================================

const PIX_PAYLOAD =
  "00020126440014br.gov.bcb.pix0122lucas.mpa1@outlook.com5204000053039865802BR5925LUCAS MATEUS PINHEIRO ALV6009Sao Paulo62290525REC6ADD0CBC7C8079689283056304383F";

const pixConfigured = PIX_PAYLOAD.trim().length > 0;
const pixPayload = PIX_PAYLOAD;

// ==================================================
// PÁGINA EXCLUSIVA PARA PRESENTEAR
// ==================================================

function Presentear() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  // COPIAR O PIX COPIA E COLA

  const handleCopyPix = async () => {
    if (!pixConfigured) {
      alert("O Pix ainda não foi configurado.");
      return;
    }

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Área de transferência indisponível.");
      }

      await navigator.clipboard.writeText(pixPayload);
      setCopyMessage("Código Pix copiado!");
    } catch (error) {
      console.error("Erro ao copiar Pix:", error);

      // Alternativa se o navegador bloquear a cópia automática.
      window.prompt("Copie o código Pix abaixo:", pixPayload);
    }
  };

  // PAGAMENTO COM CARTÃO PELO MERCADO PAGO

  const handleCardPayment = async () => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      alert("Digite um valor válido para o presente.");
      return;
    }

    // Aceita no máximo duas casas decimais.
    const cents = Math.round(value * 100);
    const roundedValue = cents / 100;

    if (Math.abs(value - roundedValue) > 0.0000001) {
      alert("Digite um valor com, no máximo, duas casas decimais.");
      return;
    }

    try {
      setLoading(true);

      const API_URL =
        window.location.hostname === "localhost"
          ? "http://localhost:3000"
          : "https://convite-lj.duckdns.org";

      const response = await fetch(`${API_URL}/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Presente livre",
          amount: roundedValue,
          source: "presentear",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Não foi possível iniciar o pagamento.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Erro ao iniciar pagamento:", error);

      alert("Não foi possível iniciar o pagamento. Tente novamente.");

      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 flex flex-col items-center">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto"
      >
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-gray-100 p-6 sm:p-10 md:p-14 flex flex-col gap-9">
          {/* CABEÇALHO */}

          <header className="text-center flex flex-col items-center gap-4">
            <p className="font-serif italic text-sm tracking-[0.2em] uppercase text-[#1a3a5c]/60">
              Lucas Mateus & Antônia Jamilly
            </p>

            <h1 className="font-script text-4xl sm:text-5xl md:text-6xl xl:text-6xl 2xl:text-7xl text-center text-[#1a3a5c] leading-tight whitespace-normal break-words max-w-5xl mx-auto">
              Acima de tudo, revistam-se do amor, que é o elo da perfeita união
              (Cl 3:14).
            </h1>

            <p className="font-serif italic text-base md:text-lg text-[#1a3a5c]/70 leading-relaxed max-w-lg">
              Agradecemos por seu carinho por nós. Se desejar nos presentear,
              ficaremos felizes em receber seu presente para esta nova etapa da
              nossa história. 💙
            </p>
          </header>

          <div className="h-px bg-gray-100" />

          {/* PIX */}

          <section className="flex flex-col items-center text-center gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-3xl md:text-4xl text-[#1a3a5c]">
                Presentear via Pix
              </h2>

              <p className="font-serif italic text-[#1a3a5c]/70">
                Escolha o valor que desejar diretamente no aplicativo do seu
                banco.
              </p>
            </div>

            {pixConfigured ? (
              <>
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
                  <QRCodeSVG
                    value={pixPayload}
                    size={220}
                    level="M"
                    marginSize={2}
                    title="QR Code Pix para presentear os noivos"
                    bgColor="#FFFFFF"
                    fgColor="#1a3a5c"
                  />
                </div>

                <p className="text-xs text-gray-500 font-serif">
                  Abra o aplicativo do banco e escaneie o QR Code. Confira o
                  destinatário antes de confirmar.
                </p>

                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="w-full sm:w-auto bg-white border-2 border-[#1a3a5c] text-[#1a3a5c] px-8 py-4 rounded-full font-bold hover:bg-[#1a3a5c] hover:text-white transition-all duration-300"
                >
                  {copyMessage || "Copiar código Pix"}
                </button>

                <p className="text-xs text-gray-400 break-all max-w-md">
                  O código Pix Copia e Cola corresponde ao QR Code acima.
                </p>
              </>
            ) : (
              <div className="w-full rounded-2xl bg-[#FAF9F6] border border-gray-100 p-6">
                <p className="font-serif italic text-[#1a3a5c]/70">
                  O Pix estará disponível assim que os dados de recebimento
                  forem configurados.
                </p>
              </div>
            )}
          </section>

          <div className="h-px bg-gray-100" />

          {/* CARTÃO */}

          <section className="flex flex-col gap-5">
            <div className="text-center flex flex-col gap-2">
              <h2 className="font-display text-3xl md:text-4xl text-[#1a3a5c]">
                Prefere pagar com cartão?
              </h2>

              <p className="font-serif italic text-[#1a3a5c]/70">
                Você pode escolher qualquer valor para o seu presente.
              </p>
            </div>

            <label
              htmlFor="gift-amount"
              className="font-serif text-sm text-[#1a3a5c]/80"
            >
              Valor do presente
            </label>

            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-bold text-[#1a3a5c]/40">
                R$
              </span>

              <input
                id="gift-amount"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
                placeholder="0,00"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="w-full border-b-2 border-gray-200 pl-16 pr-5 py-5 text-3xl font-serif text-[#1a3a5c] outline-none focus:border-[#1a3a5c] transition-colors bg-transparent"
              />
            </div>

            <button
              type="button"
              onClick={handleCardPayment}
              disabled={loading}
              className="w-full bg-[#1a3a5c] text-white py-5 px-6 rounded-full font-bold text-base md:text-lg hover:bg-black transition-all duration-300 shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Preparando pagamento..." : "Presentear com cartão 💳"}
            </button>

            <p className="text-center text-xs font-serif text-gray-400">
              Pagamento processado com segurança pelo Mercado Pago.
            </p>
          </section>

          {/* RODAPÉ */}

          <footer className="text-center pt-2">
            <p className="font-script text-3xl text-[#1a3a5c]/70">
              Com carinho, Lucas & Jamilly
            </p>
          </footer>
        </div>
      </motion.section>
    </main>
  );
}

export default Presentear;
