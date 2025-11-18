export default function Sidebar() {
  return (
    <aside className="w-60 bg-[#1279C3] text-white h-screen p-6">
      <h2 className="text-2xl font-bold mb-10 text-center tracking-wide">
        Luxora
      </h2>

      <nav className="flex flex-col gap-2">
        <a className="bg-white/20 px-4 py-3 rounded-lg font-medium hover:bg-white/30 transition">
          Dashboard
        </a>

        <a className="px-4 py-3 rounded-lg hover:bg-white/20 transition">
          Product
        </a>

        <a className="px-4 py-3 rounded-lg hover:bg-white/20 transition">
          Employee
        </a>

        <a className="px-4 py-3 rounded-lg hover:bg-white/20 transition">
          Customer
        </a>

        <a className="px-4 py-3 rounded-lg hover:bg-white/20 transition">
          Import
        </a>

        <a className="px-4 py-3 rounded-lg hover:bg-white/20 transition">
          Liquidation
        </a>
      </nav>
    </aside>
  );
}
