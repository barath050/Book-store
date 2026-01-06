import React from 'react';
import { History, Package, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const OrderHistory = ({ onNavigate }) => {
  // Mock order data - in a real app, this would come from an API
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 45.99,
      status: 'Delivered',
      items: [
        { title: 'The Great Gatsby', quantity: 1, price: 15.99 },
        { title: 'To Kill a Mockingbird', quantity: 1, price: 14.99 },
        { title: '1984', quantity: 1, price: 15.01 },
      ],
    },
    {
      id: 'ORD-002',
      date: '2024-01-08',
      total: 29.98,
      status: 'Delivered',
      items: [
        { title: 'Pride and Prejudice', quantity: 2, price: 14.99 },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'Processing':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
      case 'Shipped':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Order History
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View your past orders and track their status.
        </p>
      </div>

      {orders.length === 0 ? (
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <History className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
              You haven't placed any orders yet. Start browsing our collection!
            </p>
            <Button onClick={() => onNavigate('home')}>
              Browse Books
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-gray-500" />
                    <div>
                      <CardTitle className="text-lg">Order {order.id}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-semibold">
                      <DollarSign className="w-4 h-4" />
                      {order.total.toFixed(2)}
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Button variant="outline" onClick={() => onNavigate('dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default OrderHistory;