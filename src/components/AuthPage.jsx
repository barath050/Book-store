import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Label } from './ui/label';

const AuthPage = ({ onLogin, onSignup, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) onLogin(formData.email, formData.password);
    else onSignup(formData.email, formData.password, formData.name);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
      >
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label>Full Name</Label>
              <input type="text" required className="w-full mt-1 p-2 rounded-md border border-gray-200 dark:border-gray-800 bg-transparent"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
          )}
          <div>
            <Label>Email</Label>
            <input type="email" required className="w-full mt-1 p-2 rounded-md border border-gray-200 dark:border-gray-800 bg-transparent"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <Label>Password</Label>
            <input type="password" required className="w-full mt-1 p-2 rounded-md border border-gray-200 dark:border-gray-800 bg-transparent"
              value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <Button type="submit" className="w-full">{isLogin ? 'Sign In' : 'Sign Up'}</Button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-blue-600 hover:underline">
            {isLogin ? "No account? Sign up" : "Have an account? Sign in"}
          </button>
        </div>
        <div className="mt-4 text-center">
          <button onClick={() => onNavigate('home')} className="text-sm text-gray-500 hover:text-gray-900">
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};


export default AuthPage;
