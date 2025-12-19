import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BookCard from './BookCard';
import { Search } from 'lucide-react';

const books = [
  { id: 1, title: 'The Midnight Library', author: 'Matt Haig', price: 24.99, category: 'Fiction', rating: 4.5, description: 'Between life and death there is a library, and within that library, the shelves go on forever.' },
  { id: 2, title: 'Atomic Habits', author: 'James Clear', price: 27.99, category: 'Self-Help', rating: 4.8, description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day.' },
  { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', price: 28.99, category: 'Sci-Fi', rating: 4.7, description: 'A lone astronaut must save the earth from disaster in this incredible new science-based thriller.' },
  { id: 4, title: 'Psychology of Money', author: 'Morgan Housel', price: 22.99, category: 'Business', rating: 4.6, description: 'Doing well with money isn’t necessarily about what you know. It’s about how you behave.' },
  { id: 5, title: 'Dune', author: 'Frank Herbert', price: 19.99, category: 'Sci-Fi', rating: 4.9, description: 'A stunning blend of adventure and mysticism, environmentalism and politics.' },
  { id: 6, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', price: 29.99, category: 'Psychology', rating: 4.5, description: 'The major New York Times bestseller that challenges the judgments we make.' },
];

const categories = ['All', 'Fiction', 'Self-Help', 'Sci-Fi', 'Business', 'Psychology'];

const HomePage = ({ user, onNavigate, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Simple Hero */}
      <section className="text-center py-12 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Curated Books for <br className="hidden md:block" />
          <span className="text-blue-600 dark:text-blue-400">Curious Minds</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A minimal bookstore designed for simplicity. Find your next great read without the clutter.
        </p>
        
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search titles or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
          />
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No books found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              addToCart={addToCart}
              user={user}
              onNavigate={onNavigate}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};


export default HomePage;
