import { CalendarCheck, FileCheck2, Globe, ShieldCheck } from "lucide-react";

// Markets are given as regions only. No individual country is named, so
// nothing here has to be substantiated client by client.
const markets = [
  { name: "Europe", note: "Primary export market" },
  { name: "Gulf & Middle East", note: "Project work" },
  { name: "India", note: "Manufacturing base" },
];

const strengths = [
  {
    title: "Jindal Steel Material",
    description:
      "We fabricate using Jindal Steel material, so the raw input behind every assembly is traceable, branded stock.",
    icon: ShieldCheck,
  },
  {
    title: "Build to Your Drawings",
    description:
      "Send drawings and technical specifications. We manufacture to the tolerances your project calls for.",
    icon: FileCheck2,
  },
  {
    title: "Timely Delivery",
    description:
      "Reliable workmanship at competitive pricing, with project completion on the schedule we commit to.",
    icon: CalendarCheck,
  },
];

const GlobalReach = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-100 mb-5">
            <Globe className="h-4 w-4" aria-hidden="true" />
            International Supply
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Supplying Fabricated Components to European &amp; Gulf Markets
          </h2>
          <p className="text-lg text-blue-100 max-w-4xl mx-auto leading-relaxed">
            MJ Fabrication manufactures in India and exports fabricated metal
            components to international customers across Europe and the Gulf.
            We work from your drawings and technical specifications, so
            distance does not change how the part is made or the tolerance it
            is held to.
          </p>
        </div>

        {/* Column count tracks the number of markets, so the row stays full
            width instead of leaving an empty cell when one is added or
            removed. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {markets.map((market) => (
            <div
              key={market.name}
              className="rounded-xl bg-white/10 border border-white/15 px-5 py-5 text-center"
            >
              <div className="text-lg font-semibold">{market.name}</div>
              <div className="text-sm text-blue-200 mt-1">{market.note}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strengths.map((strength) => {
            const Icon = strength.icon;
            return (
              <div
                key={strength.title}
                className="flex gap-4 rounded-xl bg-white/5 border border-white/10 p-5"
              >
                <span className="w-11 h-11 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {strength.title}
                  </h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
