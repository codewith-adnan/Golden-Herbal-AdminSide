import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Twitter, Mail, MapPin, Sparkles } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#030405] border-t-[2.5px] border-[#1a1a1a] relative overflow-hidden">
            {/* Subtle Gold Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.03)_0%,_transparent_70%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

                    {/* 1. Brand Section */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="bg-gradient-to-br from-[#d4af37] to-[#aa8930] p-2 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-transform group-hover:scale-110">
                                <Leaf className="h-6 w-6 text-black" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-2xl font-serif font-bold tracking-widest text-[#d4af37] uppercase">
                                    Gold Leaf
                                </span>
                                <span className="text-[9px] tracking-[0.4em] text-[#5e686e] uppercase font-bold mt-1">
                                    Botanical Masterpiece
                                </span>
                            </div>
                        </Link>

                        <p className="text-[#abacac] text-sm leading-relaxed font-medium max-w-xs italic">
                            "Bringing nature's purest golden gifts to your doorstep through ancient wisdom and botanical precision."
                        </p>

                        {/* Social Icons (Glassy Style) */}
                        <div className="flex space-x-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="bg-white/5 p-3 rounded-full text-[#5e686e] hover:text-[#d4af37] hover:bg-[#d4af37]/10 border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500 shadow-xl"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 2. Policy Section (Updated: No Privacy Policy) */}
                    <div>
                        <h3 className="text-[#d5dbe6] font-bold text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                            <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div> Core Policies
                        </h3>
                        <ul className="space-y-4">
                            {['Terms of Service', 'Return Policy', 'Shipping Info'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-[#abacac] hover:text-[#d4af37] text-sm font-medium transition-all duration-300 flex items-center group">
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-[#d4af37] transition-all duration-300"></span>
                                        <span className="group-hover:pl-2">{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Contact Section */}
                    <div>
                        <h3 className="text-[#d5dbe6] font-bold text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                            <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div> Reach Out
                        </h3>
                        <ul className="space-y-5">
                            <li className="flex items-start space-x-4 group">
                                <div className="mt-1 bg-[#d4af37]/10 p-2 rounded-lg border border-[#d4af37]/20 group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <span className="text-[#abacac] text-sm font-medium leading-relaxed">
                                    123 Botanical Avenue,<br />Luxury Estate, GL 90210
                                </span>
                            </li>
                            <li className="flex items-center space-x-4 group">
                                <div className="bg-[#d4af37]/10 p-2 rounded-lg border border-[#d4af37]/20 group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <span className="text-[#abacac] text-sm font-medium">concierge@goldleaf.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* --- FOOTER BOTTOM --- */}
                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[#5e686e] text-[10px] uppercase tracking-[0.2em] font-bold">
                        © {new Date().getFullYear()} GOLD LEAFBOTANICALS. ALL RIGHTS RESERVED.
                    </p>

                    <div className="flex items-center gap-2 text-[9px] text-[#d4af37]/40 font-black uppercase tracking-widest italic">
                        <Sparkles size={10} /> Handcrafted with Ancient Wisdom
                    </div>
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"></div>
        </footer>
    );
};

export default Footer;