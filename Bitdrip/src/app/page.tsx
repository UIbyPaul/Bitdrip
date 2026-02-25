import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-sm font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        Starknet Native · Non-Custodial · Automated
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-gray-800">
        Stack Bitcoin
        <br />
        <span style={{ color: "#3b6fd4" }}>on autopilot.</span>
      </h1>

      <p className="text-xl text-blue-500 max-w-2xl mb-10 leading-relaxed">
        Bitdrip is a programmable BTC vault on Starknet. Deposit funds, set your
        schedule, and let the smart contract do the rest — no middlemen, no
        compromises.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <Link
          href="/setup"
          className="px-8 py-3 rounded-xl text-white font-semibold transition-colors shadow-md"
          style={{ background: "linear-gradient(135deg, #4d8af0, #3b6fd4)" }}
        >
          Start Stacking
        </Link>
        <Link
          href="/dashboard"
          className="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold border border-blue-200 hover:bg-blue-50 transition-colors"
        >
          View Dashboard
        </Link>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full text-left">
        {[
          {
            icon: "⛓️",
            title: "Fully On-Chain",
            body: "Every drip is executed by a Cairo smart contract. No backend controls your funds.",
          },
          {
            icon: "⚡",
            title: "Low Fees",
            body: "Starknet's L2 scalability keeps gas costs minimal on every recurring purchase.",
          },
          {
            icon: "🔐",
            title: "Non-Custodial",
            body: "Your vault, your keys. Pause or withdraw anytime with full ownership.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="p-5 rounded-2xl bg-white border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-3">{f.icon}</div>
            <div className="font-semibold mb-1 text-gray-800">{f.title}</div>
            <div className="text-sm text-blue-500 leading-relaxed">{f.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
