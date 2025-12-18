import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage = ({ cartItems, cartTotal, onNavigate, clearCart, user }) => {
  const { toast } = useToast();
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Simple form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    card: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.card) {
      toast({ title: "Incomplete Form", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    setOrderPlaced(true);
    toast({ title: "Success", description: "Your order has been placed." });
    setTimeout(() => { clearCart(); onNavigate('home'); }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6">
          <CheckCircle className="w-24 h-24 text-green-500" />
        </motion.div>
        <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 mb-8">Thank you for shopping with BookHaven.</p>
        <Button onClick={() => onNavigate('home')} variant="outline">Return Home</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => onNavigate('home')} className="mb-6 pl-0 hover:pl-2 transition-all gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Button>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <input type="text" className="w-full mt-1 p-2 rounded-md border border-gray-200 dark:border-gray-800 bg-transparent" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Jane Doe" />
            </div>
            <div>
              <Label>Email</Label>
              <input type="email" className="w-full mt-1 p-2 rounded-md border border-gray-200 dark:border-gray-800 bg-transparent" 
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="jane@example.com" />
            </div>
            <div>
              <Label>Shipping Address</Label>
              <textarea className="w-full mt-1 p-2 rounded-md border border-gray-200 dark:border-gray-800 bg-transparent" 
                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="123 Book St" rows={3} />
            </div>
            <div>
              <Label>Card Number (Mock)</Label>
              <input type="text" className="w-full mt-1 p-2 rounded-md border border-gray-200 dark:border-gray-800 bg-transparent" 
                value={formData.card} onChange={e => setFormData({...formData, card: e.target.value})} placeholder="0000 0000 0000 0000" />
            </div>
            <Button type="submit" className="w-full mt-4 h-12 text-lg">Pay ${cartTotal.toFixed(2)}</Button>
          </form>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl h-fit">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.title}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;