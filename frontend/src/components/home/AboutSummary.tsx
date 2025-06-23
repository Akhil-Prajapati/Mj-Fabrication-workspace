
import { Card, CardContent } from '@/components/ui/card';

const AboutSummary = () => {
  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "15+", label: "Years Experience" },
    { number: "100%", label: "Customer Satisfaction" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About MJ Fabrication
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Located in Nava Naroda, Ahmedabad, MJ Fabrication has been delivering premium quality 
            fabrication services with precision and reliability. We specialize in custom fabricated 
            brackets, door frames, window frames, staircases, and shades with expert craftsmanship 
            and modern technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <p className="text-lg text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;
