
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  budgetRange: string;
  contactMethod: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'quoted' | 'completed' | 'cancelled';
}

const InquiryManagement = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin');
      return;
    }

    // Load inquiries from localStorage
    const savedInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    setInquiries(savedInquiries);
  }, [navigate]);

  const updateInquiryStatus = (inquiryId: number, newStatus: Inquiry['status']) => {
    const updatedInquiries = inquiries.map(inquiry =>
      inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
    );
    setInquiries(updatedInquiries);
    localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
    
    toast({
      title: "Status Updated",
      description: "Inquiry status has been updated successfully.",
    });
  };

  const filteredInquiries = filterStatus === 'all' 
    ? inquiries 
    : inquiries.filter(inquiry => inquiry.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'quoted': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectTypeDisplay = (type: string) => {
    const types = {
      'shades': 'Fabrication Shades',
      'door-frames': 'Door Frames',
      'window-frames': 'Window Frames',
      'staircases': 'Staircase Fabrication',
      'custom': 'Custom Fabrication Work'
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Inquiry Management</h1>
          <div className="flex items-center space-x-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Inquiries</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredInquiries.length > 0 ? (
            filteredInquiries.map((inquiry) => (
              <Card key={inquiry.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{inquiry.name}</CardTitle>
                      <p className="text-gray-600">{getProjectTypeDisplay(inquiry.projectType)}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                      <p className="text-sm text-gray-600"><strong>Email:</strong> {inquiry.email}</p>
                      <p className="text-sm text-gray-600"><strong>Phone:</strong> {inquiry.phone}</p>
                      <p className="text-sm text-gray-600">
                        <strong>Preferred Contact:</strong> {inquiry.contactMethod}
                      </p>
                      {inquiry.budgetRange && (
                        <p className="text-sm text-gray-600">
                          <strong>Budget Range:</strong> {inquiry.budgetRange}
                        </p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Project Details</h4>
                      <p className="text-sm text-gray-600">{inquiry.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Submitted: {new Date(inquiry.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`tel:${inquiry.phone}`)}
                      >
                        Call
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`mailto:${inquiry.email}`)}
                      >
                        Email
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`https://wa.me/${inquiry.phone.replace(/\D/g, '')}`)}
                      >
                        WhatsApp
                      </Button>
                    </div>
                    
                    <Select 
                      value={inquiry.status} 
                      onValueChange={(value) => updateInquiryStatus(inquiry.id, value as Inquiry['status'])}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">
                  {filterStatus === 'all' 
                    ? 'No inquiries received yet.' 
                    : `No ${filterStatus} inquiries found.`
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default InquiryManagement;
