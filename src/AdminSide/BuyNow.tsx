import { ShoppingBag, Star, Sparkles, Plus, Minus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import card1 from '../assets/card1.PNG';

const BuyNow = () => {
    const location = useLocation();
    const { product } = location.state || {
        product: {
            id: 1,
            name: "Classic Gold Leaf Extract",
            price: 7500,
            weight: "250g",
            description: "Our most potent formula yet, hand-picked from the high-altitude botanical gardens. This ancient herbal blend is designed to restore holistic vitality and elevate your daily wellness ritual.",
            image: card1
        }
    };

    const [quantity, setQuantity] = useState(1);
    const totalPrice = product.price * quantity;

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            customer_name: '',
            phone: '',
            address: '',
            city: ''
        }
    });

    const onSubmit = (data: { customer_name: string; phone: string; address: string; city: string }) => {
        const orderData = {
            ...data,
            items: [
                {
                    product_id: product.id,
                    quantity: quantity
                }
            ]
        };
        console.log("Order Submitted:", orderData);
        alert("Order placed successfully! Check console for data.");
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-20 pb-20 font-sans selection:bg-[#d4af37]/30 selection:text-[#d4af37] overflow-hidden">

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* --- LEFT SIDE: COMPACT VISUALS (5 Cols) --- */}
                    <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
                        <div className="relative group rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl shadow-black/50">
                            {/* Image Container - Aspect Ratio adjusted for a more 'portrait' premium look, not square */}
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

                                {/* Minimal Badge */}
                                <div className="absolute top-4 left-4 backdrop-blur-md bg-black/40 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                                    <Sparkles size={12} className="text-[#d4af37]" />
                                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-[0.15em]">Premium</span>
                                </div>
                            </div>

                            {/* Product Info Overlay (Descriptive) */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className="text-xl font-serif text-[#e0e0e0] mb-1">{product.name}</h3>
                                <p className="text-xs text-[#888] line-clamp-2 leading-relaxed max-w-[90%]">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: PRO CHECKOUT FORM (7 Cols) --- */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-[0_0_50px_-10px_rgba(0,0,0,0.7)] relative overflow-hidden">

                            {/* Header Section */}
                            <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-6">
                                <div>
                                    <span className="text-[10px] text-[#666] font-bold uppercase tracking-[0.3em] block mb-2">Order Details</span>
                                    <h2 className="text-3xl font-serif text-white tracking-tight">Checkout</h2>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-baseline justify-end gap-1">
                                        <span className="text-[#d4af37] text-lg">Rs.</span>
                                        <span className="text-4xl font-serif font-medium text-white tracking-tight">{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-end gap-1 mt-1 opacity-60">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={10} className="fill-[#d4af37] text-[#d4af37]" />
                                        ))}
                                        <span className="text-[10px] text-[#888] ml-1">Excellent Choice</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form Area */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="group">
                                        <label className="block text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#d4af37] transition-colors">Name</label>
                                        <input
                                            {...register("customer_name", { required: true })}
                                            className="w-full bg-[#111] border border-white/5 focus:border-[#d4af37]/50 rounded-xl px-4 h-12 text-[#eee] text-sm placeholder:text-[#444] transition-all outline-none focus:bg-[#161616]"
                                            placeholder="Enter full name"
                                        />
                                        {errors.customer_name && <span className="text-[10px] text-red-500/80 ml-1 mt-1 block">Required</span>}
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#d4af37] transition-colors">Phone</label>
                                        <input
                                            {...register("phone", { required: true })}
                                            className="w-full bg-[#111] border border-white/5 focus:border-[#d4af37]/50 rounded-xl px-4 h-12 text-[#eee] text-sm placeholder:text-[#444] transition-all outline-none focus:bg-[#161616]"
                                            placeholder="03XXXXXXXXX"
                                        />
                                        {errors.phone && <span className="text-[10px] text-red-500/80 ml-1 mt-1 block">Required</span>}
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#d4af37] transition-colors">City</label>
                                    <input
                                        {...register("city", { required: true })}
                                        className="w-full bg-[#111] border border-white/5 focus:border-[#d4af37]/50 rounded-xl px-4 h-12 text-[#eee] text-sm placeholder:text-[#444] transition-all outline-none focus:bg-[#161616]"
                                        placeholder="e.g. Lahore, Karachi"
                                    />
                                    {errors.city && <span className="text-[10px] text-red-500/80 ml-1 mt-1 block">Required</span>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#d4af37] transition-colors">Address</label>
                                    <textarea
                                        {...register("address", { required: true })}
                                        rows={2}
                                        className="w-full bg-[#111] border border-white/5 focus:border-[#d4af37]/50 rounded-xl px-4 py-3 text-[#eee] text-sm placeholder:text-[#444] transition-all outline-none focus:bg-[#161616] resize-none"
                                        placeholder="Full delivery address"
                                    />
                                    {errors.address && <span className="text-[10px] text-red-500/80 ml-1 mt-1 block">Required</span>}
                                </div>

                                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row gap-6 items-end">
                                    {/* Quantity Controller */}
                                    <div className="w-full md:w-auto">
                                        <label className="block text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2">Quantity</label>
                                        <div className="flex items-center bg-[#111] rounded-xl border border-white/5 p-1 h-12 w-full md:w-32">
                                            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-full flex items-center justify-center text-[#666] hover:text-white transition-colors">
                                                <Minus size={14} />
                                            </button>
                                            <span className="flex-1 text-center text-[#d4af37] font-bold text-sm">{quantity}</span>
                                            <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-8 h-full flex items-center justify-center text-[#666] hover:text-white transition-colors">
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#d4af37] hover:bg-[#c5a028] text-black font-bold text-xs uppercase tracking-[0.2em] h-12 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)] active:scale-[0.98] w-full"
                                    >
                                        <span>Confirm Order</span>
                                        <ShoppingBag size={16} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyNow;