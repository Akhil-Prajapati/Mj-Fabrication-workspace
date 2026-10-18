import { Card, CardContent } from "@/components/ui/card";

const AboutSummary = () => {
  const stats = [
    { number: "1000+", label: "Projects Completed" },
    { number: "15+", label: "Years in Fabrication" },
    { number: "500+", label: "Customers Served" },
    { number: "100%", label: "GST Registered" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About MJ Fabrication - Industrial Fabrication Manufacturer &amp;
            Exporter
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
            MJ Fabrication has delivered custom metal fabrication for over 15
            years, producing fabricated brackets, door and window frames,
            staircases, welded assemblies and industrial shade structures. We
            manufacture to customer drawings and technical specifications
            rather than to a fixed catalogue.
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are a GST-registered manufacturer working in Jindal Steel
            material, supplying fabricated components for projects across
            European and Gulf markets. From single prototype parts to
            repeat production runs, every order is made against the
            specification supplied.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;
