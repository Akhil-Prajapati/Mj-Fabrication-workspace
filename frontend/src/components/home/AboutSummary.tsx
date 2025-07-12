import { Card, CardContent } from "@/components/ui/card";

const AboutSummary = () => {
  const stats = [
    { number: "1000+", label: "Projects Completed in Ahmedabad" },
    { number: "15+", label: "Years Serving Gujarat" },
    { number: "500+", label: "Happy Customers in Naroda-Nikol" },
    { number: "100%", label: "GST Registered & Certified" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About MJ Fabrication - Leading MS Fabrication Company in Naroda,
            Ahmedabad
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
            Established in Nava Naroda, Ahmedabad, MJ Fabrication has been
            Gujarat's trusted name for premium quality MS fabrication services
            for over 15 years. We specialize in custom fabricated brackets, door
            frames, window frames, staircases, and industrial shade structures
            with expert craftsmanship and cutting-edge technology.
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Serving Naroda, Nikol, Vastral, Odhav, and entire Ahmedabad with
            GST-registered, ISO-certified fabrication solutions. From
            residential projects to large industrial installations, we deliver
            excellence in every MS fabrication work across Gujarat.
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
