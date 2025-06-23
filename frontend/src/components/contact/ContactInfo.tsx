
import { Card, CardContent } from '@/components/ui/card';

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
        <p className="text-lg text-gray-600 mb-8">
          Ready to start your fabrication project? Contact us today for expert consultation 
          and competitive pricing. Located in Vasant Vihar 2, Nava Naroda area of Ahmedabad, 
          easily accessible from major parts of the city.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📞</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">+91 9712929748</p>
                <p className="text-sm text-blue-600 font-medium">WhatsApp Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📧</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">mjfabworld62@gmail.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📍</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                <div className="text-gray-600 space-y-1">
                  <p>31, Maheshwari Park Society</p>
                  <p>Amarpark Rcc Rd, Vasant Vihar 2</p>
                  <p>Nava Naroda, Ahmedabad</p>
                  <p>Gujarat - 382330, India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">🕒</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                <p className="text-gray-600">Monday - Sunday: 9:00 AM - 7:00 PM</p>
                {/* <p className="text-gray-600">Sunday: Closed</p> */}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">🏢</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">GST Registration</h3>
                <p className="text-gray-600">GST No: 24AFZPP4386C1ZY</p>
                <p className="text-gray-600">Professional Fabrication Services</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactInfo;
