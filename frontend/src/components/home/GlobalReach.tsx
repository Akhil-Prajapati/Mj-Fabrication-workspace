import { CalendarCheck, FileCheck2, Globe, ShieldCheck } from "lucide-react";

// Only markets the business has confirmed. Poland is named; Europe and the
// Gulf stay regional rather than listing countries we cannot substantiate.
const markets = [
  { name: "Poland", note: "Export projects" },
  { name: "Europe", note: "Project work" },
  { name: "Gulf & Middle East", note: "Project work" },
  { name: "India", note: "Ahmedabad, Gujarat" },
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
            Fabrication for Clients in India and Overseas
          </h2>
          <p className="text-lg text-blue-100 max-w-4xl mx-auto leading-relaxed">
            From our workshop in Naroda, Ahmedabad, MJ Fabrication supplies
            fabricated metal components to customers in India and abroad,
            including project work in Poland, elsewhere in Europe, and the
            Gulf. We work from your drawings and specifications, so distance
            does not change how the part is made.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {markets.map((market) => (
            <div
              key={market.name}
              className="rounded-xl bg-white/10 border border-white/15 px-5 py-4 text-center"
            >
              <div className="text-lg font-semibold">{market.name}</div>
              <div className="text-sm text-blue-200 mt-1">{market.note}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strengths.map((strength) => {
            const Icon = strength.icon;
            return (
              <div key={strength.title} className="flex gap-4">
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
