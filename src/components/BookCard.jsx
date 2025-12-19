import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const BookCard = ({ book, addToCart, user, onNavigate, index }) => {
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: 'Sign in Required',
        description: 'Please sign in to add items to your cart.',
        variant: 'destructive',
      });
      onNavigate('auth');
      return;
    }
    
    addToCart(book);
    toast({
      description: `"${book.title}" added to cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
    >
      <div className="h-48 bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-6 relative">
        <div className="w-24 h-36 bg-white dark:bg-gray-700 shadow-lg rounded flex items-center justify-center text-center p-2">
           {/* Placeholder for cover art */}
           <span className="font-serif font-bold text-2xl text-gray-300 dark:text-gray-500">{book.title.charAt(0)}</span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white dark:bg-gray-900 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {book.rating}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-auto">
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">{book.category}</p>
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-tight mb-1">{book.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">by {book.author}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">{book.description}</p>
        </div>
        
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xl font-bold text-gray-900 dark:text-white">${book.price}</span>
          <Button onClick={handleAddToCart} size="sm" className="gap-2 rounded-full">
            <ShoppingBag className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};


export default BookCard;
