import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProjectsGallery = () => {
  const projects = [
    {
      title: "Commercial Brackets Installation",
      category: "Industrial",
      image: "Projectimg/brackets.png",
      description: "Heavy-duty brackets for warehouse facility",
    },
    {
      title: "Residential Door Frames",
      category: "Residential",
      image: "Projectimg/doorframes.png",
      description: "Custom door frames for luxury home",
    },
    {
      title: "Modern Staircase Design",
      category: "Residential",
      image: "Projectimg/staircase.png",
      description: "Contemporary staircase with safety railings",
    },
    {
      title: "Office Building Canopy",
      category: "Commercial",
      image: "Projectimg/conoy.png",
      description: "Weather protection for office entrance",
    },
    {
      title: "Window Frame Installation",
      category: "Residential",
      image: "Projectimg/windowsnew.png",
      description: "Energy-efficient window frames",
    },
    {
      title: "Custom Fabrication Project",
      category: "Industrial",
      image: "Projectimg/customshade.png",
      description: "Specialized equipment housing",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recent Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take a look at some of our recently completed fabrication projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/gallery">
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
