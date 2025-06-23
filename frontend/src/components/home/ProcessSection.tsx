
import { Card, CardContent } from '@/components/ui/card';

const ProcessSection = () => {
  const processes = [
    {
      step: "01",
      title: "Consultation",
      description: "We discuss your requirements and provide expert advice on the best solutions",
      icon: "💬"
    },
    {
      step: "02", 
      title: "Design & Planning",
      description: "Our team creates detailed designs and plans according to your specifications",
      icon: "📐"
    },
    {
      step: "03",
      title: "Fabrication",
      description: "Using modern equipment and quality materials, we fabricate your products",
      icon: "🔧"
    },
    {
      step: "04",
      title: "Quality Check",
      description: "Rigorous quality testing ensures every product meets our high standards",
      icon: "✅"
    },
    {
      step: "05",
      title: "Installation",
      description: "Professional installation by our experienced team for perfect fitting",
      icon: "🏗️"
    },
    {
      step: "06",
      title: "Support",
      description: "Ongoing support and maintenance to ensure long-lasting performance",
      icon: "🛠️"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Process
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From concept to completion, we follow a systematic approach to deliver excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <Card key={index} className="relative bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{process.icon}</div>
                <div className="absolute top-4 right-4 text-2xl font-bold text-blue-200">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
