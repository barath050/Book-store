import React from 'react';
import { User, ShoppingCart, Settings, History, Info, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import MyAccount from './MyAccount';
import OrderHistory from './OrderHistory';
import SettingsComp from './Settings';
import About from './About';

const Dashboard = ({ user, onNavigate, subPage, setSubPage, onUpdateUser, isDarkMode, toggleTheme }) => {
  const menuItems = [
    {
      title: 'Overview',
      description: 'Dashboard overview',
      icon: Home,
      key: 'overview',
    },
    {
      title: 'My Account',
      description: 'Manage your account information and preferences',
      icon: User,
      key: 'myaccount',
    },
    {
      title: 'New Orders',
      description: 'Browse and purchase new books',
      icon: ShoppingCart,
      key: 'neworders',
    },
    {
      title: 'Settings',
      description: 'Configure your account settings',
      icon: Settings,
      key: 'settings',
    },
    {
      title: 'Order History',
      description: 'View your past orders and purchases',
      icon: History,
      key: 'orderhistory',
    },
    {
      title: 'About',
      description: 'Learn more about BookHaven',
      icon: Info,
      key: 'about',
    },
  ];

  const handleMenuClick = (key) => {
    if (key === 'neworders') {
      onNavigate('home');
    } else {
      setSubPage(key);
    }
  };

  const renderContent = () => {
    switch (subPage) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.slice(1).map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-600"
                onClick={() => handleMenuClick(item.key)}
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
        );
      case 'myaccount':
        return <MyAccount user={user} onUpdateUser={onUpdateUser} onNavigate={onNavigate} />;
      case 'settings':
        return <SettingsComp isDarkMode={isDarkMode} toggleTheme={toggleTheme} onNavigate={onNavigate} />;
      case 'orderhistory':
        return <OrderHistory onNavigate={onNavigate} />;
      case 'about':
        return <About onNavigate={onNavigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Dashboard</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                subPage === item.key
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </div>
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account and explore our collection of books.
          </p>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
