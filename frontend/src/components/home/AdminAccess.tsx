
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminAccess = () => {
  return (
    <section className="py-8 bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/admin">
              <Lock className="h-4 w-4 mr-2" />
              Admin Login
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdminAccess;
