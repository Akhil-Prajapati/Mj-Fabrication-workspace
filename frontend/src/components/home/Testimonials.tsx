
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "ABC Construction Ltd",
      content: "MJ Fabrication delivered excellent quality brackets for our warehouse project. Their attention to detail and timely delivery exceeded our expectations.",
      rating: 5
    },
    {
      name: "Priya Sharma", 
      company: "XYZ Builders",
      content: "Outstanding workmanship on our residential door frames. The team was professional and the quality is top-notch. Highly recommended!",
      rating: 5
    },
    {
      name: "Amit Patel",
      company: "Modern Homes",
      content: "The custom staircase they fabricated for our project is simply beautiful. Great design, excellent execution, and competitive pricing.",
      rating: 5
    },
    {
      name: "Neha Singh",
      company: "City Mall",
      content: "Professional installation of canopies for our mall entrance. The weather protection solution works perfectly and looks great too.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4 text-lg">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
