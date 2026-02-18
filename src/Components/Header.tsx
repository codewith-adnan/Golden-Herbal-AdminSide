import { Link } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#d4af37]/20 shadow-2xl">
            {/* Top Ornate Line (Image ke elegant feel ke liye) */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo: Serif Style matching the image */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-gradient-to-br from-[#d4af37] to-[#aa8930] p-2 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-500 group-hover:rotate-[360deg]">
                            <Leaf className="h-6 w-6 text-black" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-serif font-bold tracking-widest text-[#d4af37] uppercase">
                                Gold Leaf
                            </span>
                            <span className="text-[10px] tracking-[0.3em] text-[#aa8930] uppercase font-medium">
                                Herbal Tea
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav: Elegant Gold Links */}
                    <div className="hidden md:flex items-center space-x-10">


                        {/* Admin Badge */}
                        <div className="px-6 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] rounded-full font-serif italic text-sm tracking-widest flex items-center space-x-2 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                            <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"></span>
                            <span>Admin Portal</span>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#d4af37] p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav: Dark Glassy Dropdown */}
            <div
                className={`md:hidden absolute w-full bg-[#0a0a0a]/98 backdrop-blur-2xl border-b border-[#d4af37]/20 transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100 py-8' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="flex flex-col space-y-6 px-6 items-center">
                    <div className="text-[#d4af37] font-serif italic tracking-widest">Admin Portal</div>
                </div>
            </div>
        </nav>
    );
};

export default Header;