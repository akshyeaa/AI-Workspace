import ElectricBorder from "@/components/ElectricBorder";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full">

  {/* ================= DASHBOARD SECTION ================= */}
  <section
    id="dashboard"
    className="min-h-screen flex flex-col justify-center items-center text-center px-6"
  >
    <h1 className="text-9xl font-bold font-[font9] mb-6">
      AI Workspace
    </h1>

    <p className="max-w-2xl text-xl opacity-60 font-[font1] tracking-widest font-bold">
      A unified platform for AI-powered research writing,
      chat assistants, summarization tools, and more —
      designed to boost productivity and creativity.
    </p>
  </section>


  {/* ================= TOOLS SECTION ================= */}
  <section
    id="tools"
    className="min-h-screen flex flex-col items-center gap-10 py-30"
  >

    <h2 className="text-5xl font-bold font-[font9]">
      Tools
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">

                {/* AI Research Writer */}
          <ElectricBorder
            color="#7df9ff"
            speed={1}
            chaos={0.12}
            thickness={2}
            style={{ borderRadius: 16 }}
          >
            <div className="
                          bg-black
                          text-white
                          p-6 rounded-xl w-72 h-40
                          flex flex-col justify-between
                          hover:scale-105 transition
                          text-xl font-semibold
                          font-[font9]
                        ">

              {/* Title */}
              <div className="flex items-center justify-center flex-1 text-[#fff8e7]">
                AI Research Writer
              </div>

              {/* Button */}
              <button
                className="
                text-lg px-4 py-0.5
                text-black
                rounded-md
                bg-gradient-to-br from-pink-500 to-orange-400
                hover:bg-gradient-to-bl
                transition
                self-center
                font-[font4]
                "
              >
                <Link href="/research">
                Try Now →
              </Link>
              </button>

            </div>

          </ElectricBorder>

          {/* Placeholder Tool Cards */}

          <ElectricBorder
            color="#7df9ff"
            speed={1}
            chaos={0.12}
            thickness={2}
            style={{ borderRadius: 16 }}
          >
            <div className="
                          bg-black
                          text-white
                          p-6 rounded-xl w-72 h-40
                          flex flex-col justify-between
                          hover:scale-105 transition
                          text-xl font-semibold
                          font-[font9]
                        ">

              {/* Title */}
              <div className="flex items-center justify-center flex-1 text-[#fff8e7]">
                Q&A Chat Bot
              </div>

              {/* Button */}
              
              <button
                className="
                            text-lg px-4 py-0.5
                            text-black
                            rounded-md
                            bg-gradient-to-br from-pink-500 to-orange-400
                            hover:bg-gradient-to-bl
                            transition
                            self-center
                            font-[font4]
                          "
              >
                <Link href="/chat">
                Try Now →
              </Link>
              </button>

            </div>

          </ElectricBorder>

          <ElectricBorder
            color="#7df9ff"
            speed={1}
            chaos={0.12}
            thickness={2}
            style={{ borderRadius: 16 }}
          >
            <div className="
                          bg-black
                          text-white
                          p-6 rounded-xl w-72 h-40
                          flex flex-col justify-between
                          hover:scale-105 transition
                          text-xl font-semibold
                          font-[font9]
                        ">

              {/* Title */}
              <div className="flex items-center justify-center flex-1 text-[#fff8e7]">
                Summarizer
              </div>

              {/* Button */}
              <button
                className="
                text-lg px-4 py-0.5
                text-black
                rounded-md
                bg-gradient-to-br from-pink-500 to-orange-400
                hover:bg-gradient-to-bl
                transition
                self-center
                font-[font4]
                "
              >
                <Link href="/summarizer">
                Try Now →
              </Link>
              </button>

            </div>

          </ElectricBorder>

          <ElectricBorder
            color="#7df9ff"
            speed={1}
            chaos={0.12}
            thickness={2}
            style={{ borderRadius: 16 }}
          >
            <div className="
                          bg-black
                          text-white
                          p-6 rounded-xl w-72 h-40
                          flex flex-col justify-between
                          hover:scale-105 transition
                          text-xl font-semibold
                          font-[font9]
                        ">

              {/* Title */}
              <div className="flex items-center justify-center flex-1 text-[#fff8e7]">
                SQL
              </div>

              {/* Button */}
              <button
                className="
                text-lg px-4 py-0.5
                text-black
                rounded-md
                bg-gradient-to-br from-pink-500 to-orange-400
                hover:bg-gradient-to-bl
                transition
                self-center
                font-[font4]
                "
              >
                <Link href="/sql">
                Try Now →
              </Link>
              </button>

            </div>

          </ElectricBorder>

    </div>

  </section>


  {/* ================= ABOUT SECTION ================= */}
  <section
    id="about"
    className="min-h-screen flex flex-col justify-center items-center text-center px-6"
  >
    <h2 className="text-5xl font-bold font-[font9] mb-6">
      About
    </h2>

    <p className="max-w-2xl opacity-60 font-[font1] tracking-widest text-lg font-bold">
      This AI workspace combines multiple intelligent tools
      into one dashboard. Built with Next.js, LangChain,
      and modern AI infrastructure to deliver real-world
      productivity solutions.
    </p>
  </section>

</main>


      <Footer />
    </>
  );
}
