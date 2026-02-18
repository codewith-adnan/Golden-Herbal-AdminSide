import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/background-hero.png';
import ProductCards from './ProductCards';

const Homepage = () => {
    const scrollToProducts = () => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="bg-[#030405] min-h-screen animate-in fade-in duration-1000 overflow-hidden text-[#d5dbe6]">
            <section className="relative w-full aspect-[4/3] md:aspect-[1.3/1] max-h-[100vh]  border-b border-[#d4af37]/10 flex items-center justify-center">
                <div
                    className="absolute inset-0 z-0 bg-center bg-no-repeat opacity-60 transition-all duration-1000"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: '100%',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#030405]/60 via-[#030405]/20 to-[#030405] z-0" />

                {/* Background Textures (Image ki tarah misty/sparkly feel dene ke liye) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none z-0" />
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center">

                        <motion.h1
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl lg:text-6xl font-serif font-bold text-[#d5dbe6] tracking-tight leading-[1.1] mb-6"
                        >
                            Elegance In Every <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3d06a] to-[#aa8930]">
                                Golden Sip
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="max-w-xl mx-auto text-base text-[#abacac] mb-8 leading-relaxed font-medium"
                        >
                            Experience the transformative power of premium organic herbal tea. Crafted with ancient wisdom and modern botanical precision.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex justify-center items-center"
                        >
                            {/* Primary Button (Gold Shiny Style) */}
                            <button
                                onClick={scrollToProducts}
                                className="group relative overflow-hidden px-8 py-3.5 bg-gradient-to-r from-[#d4af37] to-[#b89530] text-black rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
                            >
                                <ShoppingBag size={16} />
                                <span>Place Your Order</span>
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shinesweep_1.5s_ease-in-out_infinite] pointer-events-none"></div>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- PRODUCT COLLECTION SECTION --- */}
            <div id="products-section">
                <ProductCards />
            </div>



            {/* Global Animation Styles */}
            <style>{`
                @keyframes shinesweep {
                    0% { transform: translateX(-100%); }
                    20% { transform: translateX(100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[radial-gradient(50%_50%_at_50%_100%,_rgba(212,175,55,0.03)_0%,_transparent_100%)] pointer-events-none"></div>
        </div>
    );
};

export default Homepage;