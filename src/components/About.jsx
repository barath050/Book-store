import React from 'react';
import { Info, Book, Users, Award, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const About = ({ onNavigate }) => {
  const features = [
    {
      icon: Book,
      title: 'Curated Collection',
      description: 'Carefully selected books from classic literature to contemporary bestsellers.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by book lovers, for book lovers. Join our community of readers.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every book in our collection meets our high standards for quality and authenticity.',
    },
    {
      icon: Heart,
      title: 'Passion for Reading',
      description: 'We believe in the power of stories to inspire, educate, and transform lives.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          About BookHaven
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Your gateway to a world of stories and knowledge.
        </p>
      </div>

      <Card className="mb-8 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <Info className="w-5 h-5" />
            Our Story
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            BookHaven was founded with a simple mission: to make great books accessible to everyone.
            We believe that reading should be an enjoyable, effortless experience, and we've built
            our platform to reflect that philosophy.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you're looking for your next favorite novel, exploring classic literature,
            or discovering new authors, BookHaven is here to guide you on your reading journey.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <Card key={index} className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-center">Get Started Today</CardTitle>
          <CardDescription className="text-center">
            Join thousands of readers who have discovered their next great read with BookHaven.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={() => onNavigate('home')} className="bg-blue-600 hover:bg-blue-700">
            Browse Our Collection
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Button variant="outline" onClick={() => onNavigate('dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default About;