import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Review {
  name: string;
  reviews: number;
  photos?: number;
  isLocalGuide?: boolean;
  rating: number;
  comment: string;
  avatar?: string;
}

const CustomerReviews = () => {
  const reviews: Review[] = [
    {
      name: "Jainam Shah",
      reviews: 7,
      photos: 2,
      rating: 5,
      comment:
        "Excellent MS window frames and door installation. The quality of fabrication work exceeded our expectations. Highly recommended for metal work!",
    },
    {
      name: "Harikrishna Parmar",
      reviews: 3,
      rating: 5,
      comment:
        "Outstanding MS railing and gate work. Professional team with attention to detail. Worth every penny invested!",
    },
    {
      name: "Moksh Suthar",
      reviews: 12,
      photos: 34,
      // isLocalGuide: true,
      rating: 5,
      comment:
        "Best MS fabrication work in Nava Naroda area. Quality materials and timely delivery guaranteed.",
    },
    {
      name: "Parth Sain",
      reviews: 3,
      rating: 5,
      comment:
        "Professional MS grills and window shade work. Great service and competitive pricing.",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real feedback from our valued customers who trust MJ Fabrication for
            their metal fabrication needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">
                      {review.name}
                    </h4>
                    <div className="text-sm text-gray-600">
                      {review.isLocalGuide && (
                        <span className="text-blue-600">Local Guide • </span>
                      )}
                      {review.reviews} reviews
                      {review.photos && ` • ${review.photos} photos`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {renderStars(review.rating)}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  "{review.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-green-50 px-6 py-3 rounded-full">
            <div className="flex items-center">{renderStars(5)}</div>
            <span className="text-green-800 font-semibold">5.0 Rating</span>
            <span className="text-green-600">• Based on Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
