import React from 'react';
import { User, ShoppingCart, Settings, History, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const Dashboard = ({ user, onNavigate }) => {
  const menuItems = [
    {
      title: 'My Account',
      description: 'Manage your account information and preferences',
      icon: User,
      action: () => onNavigate('myaccount'),
    },
    {
      title: 'New Orders',
      description: 'Browse and purchase new books',
      icon: ShoppingCart,
      action: () => onNavigate('home'),
    },
    {
      title: 'Settings',
      description: 'Configure your account settings',
      icon: Settings,
      action: () => onNavigate('settings'),
    },
    {
      title: 'Order History',
      description: 'View your past orders and purchases',
      icon: History,
      action: () => onNavigate('orderhistory'),
    },
    {
      title: 'About',
      description: 'Learn more about BookHaven',
      icon: Info,
      action: () => onNavigate('about'),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and explore our collection of books.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-600"
            onClick={item.action}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
