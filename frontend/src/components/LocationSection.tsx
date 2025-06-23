
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const LocationSection = () => {
  const coordinates = "23.074306202160145,72.66806189480481";
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5!2d${coordinates}!3d${coordinates}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA0JzI3LjUiTiA3MsKwNDAnMDUuMCJF!5e0!3m2!1sen!2sin!4v1234567890123`;

  const handleDirections = () => {
    window.open(`https://www.google.com/maps/dir//${coordinates}/@${coordinates},15z`, '_blank');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visit Our Facility
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Located in the heart of Ahmedabad's industrial area, easily accessible from all major parts of the city
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-96">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MJ Fabrication Location"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">MJ FABRICATION</p>
                  <p>31, Maheshwari Park Society</p>
                  <p>Amarpark Rcc Rd, Vasant Vihar 2</p>
                  <p>Nava Naroda, Ahmedabad</p>
                  <p>Gujarat - 382330, India</p>
                </div>
                <button
                  onClick={handleDirections}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Directions
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>+91 9712929748</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>mjfabworld62@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Mon - Sun: 9:00 AM - 7:00 PM</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
