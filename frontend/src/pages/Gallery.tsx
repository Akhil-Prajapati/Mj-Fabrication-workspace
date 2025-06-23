
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Shades', 'Door Frames', 'Window Frames', 'Staircases', 'Custom Work'];

  const projects = [
    {
      id: 1,
      title: "Residential Shade Installation",
      category: "Shades",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      description: "Custom fabricated shade for residential terrace"
    },
    {
      id: 2,
      title: "Commercial Door Frame",
      category: "Door Frames",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      description: "Heavy-duty door frame for commercial building"
    },
    {
      id: 3,
      title: "Modern Window Frames",
      category: "Window Frames",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      description: "Sleek window frames for modern office complex"
    },
    {
      id: 4,
      title: "Spiral Staircase",
      category: "Staircases",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      description: "Custom spiral staircase with safety features"
    },
    {
      id: 5,
      title: "Industrial Shading",
      category: "Shades",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      description: "Large-scale industrial shading solution"
    },
    {
      id: 6,
      title: "Custom Fabrication",
      category: "Custom Work",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      description: "Unique custom fabrication project"
    },
    {
      id: 7,
      title: "Residential Door Frames",
      category: "Door Frames",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      description: "Elegant door frames for luxury home"
    },
    {
      id: 8,
      title: "Office Window Installation",
      category: "Window Frames",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      description: "Complete window frame installation for office building"
    },
    {
      id: 9,
      title: "Outdoor Staircase",
      category: "Staircases",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      description: "Weather-resistant outdoor staircase"
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Showcasing our finest fabrication work across various projects
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm">{project.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
