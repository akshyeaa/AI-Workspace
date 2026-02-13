import Link from "next/link";
import ElectricBorder from "@/components/ElectricBorder";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6">

      <ElectricBorder
        color="#7df9ff"
        speed={1}
        chaos={0.12}
        thickness={2}
        style={{ borderRadius: 106 }}
      >

        <nav className="bg-black text-white px-12 py-4 flex justify-between items-center rounded-full w-[90vw] max-w-6xl">

          <h1 className="text-xl font-bold tracking-wide font-[Font1]">
            <Link href="/">
            AI Workspace
            </Link>
          </h1>

          {/* Scroll links */}
          <div className="flex gap-10 text-sm font-[font6]">

            <a href="/#dashboard" className="hover:text-cyan-400 transition">
              Dashboard
            </a>

            <a href="/#tools" className="hover:text-cyan-400 transition">
              Tools
            </a>

            <a href="/#about" className="hover:text-cyan-400 transition">
              About
            </a>

          </div>

        </nav>

      </ElectricBorder>

    </div>
  );
}

