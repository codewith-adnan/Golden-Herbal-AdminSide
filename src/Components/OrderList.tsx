import { Eye, Trash2 } from 'lucide-react';

const OrderList = () => {
    // Sample data for UI demonstration
    const orders = [
        { id: '#ORD-7281', customer: 'Zeeshan Khan', date: '2024-02-18', total: 'Rs. 2,450', status: 'Pending' },
        { id: '#ORD-7282', customer: 'Ayesha Malik', date: '2024-02-17', total: 'Rs. 1,200', status: 'Shipped' },
        { id: '#ORD-7283', customer: 'Hamza Ahmed', date: '2024-02-17', total: 'Rs. 4,500', status: 'Delivered' },
        { id: '#ORD-7284', customer: 'Sara Ali', date: '2024-02-16', total: 'Rs. 3,100', status: 'Processing' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            case 'Shipped': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            case 'Delivered': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'Processing': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
            default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
        }
    };

    return (
        <div className="p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-[#d4af37] tracking-tight">Order Management</h1>
                    <p className="text-gray-400 mt-1">Review and manage your customer herbal tea orders.</p>
                </div>
                <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-white/5 border border-[#d4af37]/20 rounded-lg text-[#d4af37] text-sm hover:bg-white/10 transition-colors">
                        Export CSV
                    </button>
                </div>
            </header>

            <div className="bg-[#0a0a0a] border border-[#d4af37]/20 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#111111] border-b border-[#d4af37]/20">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930]">Order ID</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930]">Customer</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930]">Date</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930]">Total</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930]">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d4af37]/10">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4 font-mono text-[#d4af37]">{order.id}</td>
                                <td className="px-6 py-4 text-gray-200 font-medium">{order.customer}</td>
                                <td className="px-6 py-4 text-gray-400">{order.date}</td>
                                <td className="px-6 py-4 text-gray-200">{order.total}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-white/10 rounded-lg transition-colors">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
