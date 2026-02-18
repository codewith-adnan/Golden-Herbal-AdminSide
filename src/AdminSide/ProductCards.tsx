import { ShoppingBag, Scale, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import card1 from "../assets/card1.PNG";
import card2 from "../assets/card2.PNG";
import card3 from "../assets/card3.PNG";

const ProductCards = () => {
    // Mock Data based on your JSON schema
    const products = [
        {
            id: 1,
            name: "Classic Gold Leaf",
            description: "Premium hand-picked organic green tea leaves for ultimate wellness.",
            price: 2500,
            weight: "250g",
            stock_quantity: 15,
            image: card1,
        },
        {
            id: 2,
            name: "Herbal Zen Mist",
            description: "A calming mixture of ancient herbs designed to revitalize your spirit.",
            price: 3200,
            weight: "150g",
            stock_quantity: 8,
            image: card2,
        },
        {
            id: 3,
            name: "Botanical Bloom",
            description: "Rare floral infusions blended with pure golden herbal extracts.",
            price: 4500,
            weight: "200g",
            stock_quantity: 5,
            image: card3,
        }
    ];

    return (
        <section className="bg-[#030405] py-20 px-6 font-sans border-t border-[#d4af37]/5">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <span className="text-[10px] text-[#d4af37] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                        <Sparkles size={12} /> Premium Collection
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#d5dbe6] tracking-tight">
                        Our Botanical <span className="text-[#d4af37]">Masterpieces</span>
                    </h2>
                </motion.div>

                {/* 3 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="group relative bg-[#0d0f10] border border-[#1a1a1a] border-t-[2.5px] border-t-[#d4af37]/40 rounded-[32px] p-5 transition-all duration-500 hover:bg-white/[0.01] hover:border-[#d4af37]/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_-12px_rgba(212,175,55,0.08)] overflow-hidden"
                        >
                            {/* Product Image Area */}
                            <div className="relative h-64 w-full rounded-[24px] overflow-hidden mb-6">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030405]/80 via-transparent to-transparent"></div>

                                {/* Weight Badge */}
                                <div className="absolute bottom-4 left-4 bg-[#030405]/80 backdrop-blur-md border border-[#d4af37]/30 px-3 py-1.5 rounded-full flex items-center gap-2">
                                    <Scale size={12} className="text-[#d4af37]" />
                                    <span className="text-[10px] font-bold text-[#d5dbe6] uppercase tracking-widest">{product.weight}</span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="px-2 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-serif font-bold text-[#d5dbe6] group-hover:text-[#d4af37] transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-1 bg-green-500/5 px-2 py-1 rounded-lg">
                                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-[9px] text-green-500/80 font-bold uppercase">In Stock</span>
                                    </div>
                                </div>

                                <p className="text-[#5e686e] text-sm leading-relaxed line-clamp-2 font-medium">
                                    {product.description}
                                </p>

                                {/* Price Display */}
                                <div className="flex items-end gap-1 pt-2">
                                    <span className="text-[#d4af37] text-sm font-bold pb-1">Rs.</span>
                                    <span className="text-3xl font-serif font-black text-white tracking-tighter">
                                        {product.price}
                                    </span>
                                </div>

                                {/* Elite Shiny Buy Now Button */}
                                <Link
                                    to="/buy-now"
                                    state={{ product }}
                                    className="relative w-full overflow-hidden mt-6 py-4 bg-gradient-to-r from-[#d4af37] to-[#b89530] text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 hover:scale-[1.02] shadow-[0_15px_30px_-10px_rgba(212,175,55,0.4)] group/btn active:scale-95"
                                >
                                    <ShoppingBag size={16} />
                                    <span>Buy Now</span>

                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shinesweep_1.5s_ease-in-out_infinite] pointer-events-none"></div>
                                </Link>
                            </div>

                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCards;
