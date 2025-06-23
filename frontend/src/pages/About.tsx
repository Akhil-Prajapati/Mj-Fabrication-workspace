import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About MJ Fabrication
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Building excellence through quality fabrication since 2003
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                MJ Fabrication was founded with a vision to provide high-quality
                fabrication solutions that meet the evolving needs of modern
                construction and design. What started as a small workshop has
                grown into a trusted name in the fabrication industry.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our journey began over 20 years ago with a commitment to
                excellence, innovation, and customer satisfaction. Today, we
                pride ourselves on being a GST-registered company that delivers
                precision-crafted solutions for residential and commercial
                projects.
              </p>
              <p className="text-lg text-gray-600">
                We specialize in fabrication shades, door frames, window frames,
                staircases, and custom fabrication work, always maintaining the
                highest standards of quality and craftsmanship.
              </p>
            </div>
            <div>
              <img
                src="Workshopimg/workshop3.png"
                alt="MJ Fabrication Workshop"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Quality First
                </h3>
                <p className="text-gray-600">
                  We never compromise on quality. Every project undergoes
                  rigorous quality checks to ensure it meets our high standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  We embrace modern technology and innovative techniques to
                  deliver cutting-edge fabrication solutions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Customer Focus
                </h3>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. We work
                  closely with them to understand and exceed their expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Skilled professionals dedicated to delivering excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👷‍♂️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Master Craftsmen
              </h3>
              <p className="text-gray-600">
                Experienced artisans with decades of expertise
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Technical Experts
              </h3>
              <p className="text-gray-600">
                Skilled technicians using modern equipment
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Design Specialists
              </h3>
              <p className="text-gray-600">
                Creative designers for custom solutions
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quality Controllers
              </h3>
              <p className="text-gray-600">
                Dedicated QC team ensuring perfection
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
