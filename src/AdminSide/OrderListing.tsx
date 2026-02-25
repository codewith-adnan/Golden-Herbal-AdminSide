
import { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrders, useOrderActions, useOrderStatus } from './UseHooks';
import StatusDropdown from './StatusDropdown';
import Pagination from '../Components/Pagination';
import DeleteConfirmModal from '../Components/DeleteConfirmModal';
import { showToast } from '../Components/CustomToast';

const OrderListing = () => {
    const [page, setPage] = useState(0);
    const limit = 10;
    const offset = page * limit;

    const { orders, total, loading, error, refresh } = useOrders(offset, limit);
    const { deleteOrder } = useOrderActions();
    const { updateOrderStatus, loading: updating } = useOrderStatus();

    // State for delete modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<{ id: number; name: string } | null>(null);

    const handleDeleteClick = (id: number, name: string) => {
        setOrderToDelete({ id, name });
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!orderToDelete) return;
        try {
            await deleteOrder(orderToDelete.id);
            showToast("Order deleted successfully", "success");
            refresh();
        } catch (err) {
            console.error("Delete failed:", err);
            showToast("Failed to delete order", "error");
        }
    };

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
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

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <div className="bg-[#0a0a0a] border border-[#d4af37]/20 rounded-2xl overflow-hidden shadow-2xl relative">
                    {loading && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]"></div>
                        </div>
                    )}

                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#111111] border-b border-[#d4af37]/20">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930]">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930]">Contact Info</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930]">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930]">Total</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930]">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#aa8930] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#d4af37]/10">
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-200 font-medium">{order.customer_name}</span>
                                                    <span className="text-[10px] font-mono text-[#d4af37]/70 uppercase">#ORD-{order.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-400 text-sm">{order.email}</span>
                                                    <span className="text-gray-500 text-xs">{order.phone_number}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-gray-200 font-medium">Rs. {order.total_amount.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <StatusDropdown
                                                    currentStatus={order.order_status}
                                                    onStatusChange={(newStatus) => {
                                                        updateOrderStatus(order.id, newStatus).then(() => {
                                                            refresh();
                                                            showToast(`Order ${newStatus.toLowerCase()} successfully`, "success");
                                                        });
                                                    }}
                                                    disabled={updating}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end items-center gap-1.5">
                                                    <Link
                                                        to={`/orders/${order.id}`}
                                                        className="p-1.5 text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 border border-transparent hover:border-[#d4af37]/40 rounded-lg transition-all active:scale-95"
                                                        title="View Details"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(order.id, order.customer_name)}
                                                        className="p-1.5 text-gray-400 hover:text-red-500 cursor-pointer hover:bg-red-500/10 border border-transparent hover:border-red-500/40 rounded-lg transition-all active:scale-95"
                                                        title="Delete Order"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    !loading && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
                                                No orders found matching your criteria.
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        total={total}
                        offset={offset}
                        limit={limit}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </div>

                {/* Premium Delete Confirmation Modal */}
                <DeleteConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    itemName={orderToDelete ? `Order #${orderToDelete.id} (${orderToDelete.name})` : undefined}
                />
            </div>
        </div>
    );
};

export default OrderListing;