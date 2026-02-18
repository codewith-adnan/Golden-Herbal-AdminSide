import { Link, useLocation } from 'react-router-dom';
import { ClipboardList, LayoutGrid, LogOut, Leaf } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { icon: ClipboardList, label: 'Order List', path: '/orders' },
        { icon: LayoutGrid, label: 'Products', path: '/products' },
    ];

    return (
        <aside className="w-64 bg-[#0a0a0a] border-r border-[#d4af37]/20 flex flex-col h-full bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
            <div className="p-6">
                {/* Scaled down Header Logo */}
                <Link to="/" className="flex items-center space-x-3 group mb-10">
                    <div className="bg-gradient-to-br from-[#d4af37] to-[#aa8930] p-1.5 rounded-lg shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-transform duration-500 group-hover:rotate-[360deg]">
                        <Leaf className="h-4 w-4 text-black" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-lg font-serif font-bold tracking-wider text-[#d4af37] uppercase">
                            Gold Leaf
                        </span>
                        <span className="text-[8px] tracking-[0.2em] text-[#aa8930] uppercase font-medium">
                            Herbal Tea
                        </span>
                    </div>
                </Link>



                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive
                                    ? 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                                    : 'text-gray-400 hover:text-[#d4af37] hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={`h-5 w-5 ${isActive ? 'text-[#d4af37]' : 'group-hover:text-[#d4af37]'}`} />
                                <span className="font-medium tracking-wide">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-[#d4af37]/10">
                <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 group">
                    <LogOut className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    <span className="font-medium tracking-wide">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
