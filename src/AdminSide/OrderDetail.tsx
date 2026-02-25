import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ORDER_LISTING_APIS, type Order } from "../libs/api/admin.orders.api";
import { ArrowLeft, User, Mail, Phone, MapPin, CreditCard, Calendar, Clock, ShoppingBag } from "lucide-react";
import { useOrderStatus } from "./UseHooks";
import StatusDropdown from "./StatusDropdown";
import { showToast } from "../Components/CustomToast";

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { updateOrderStatus, loading: updating } = useOrderStatus();

    const fetchDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ORDER_LISTING_APIS.orderDetail(Number(id));
            setOrder(data);
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || "Failed to fetch order details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchDetail();
    }, [id]);

    const handleStatusUpdate = async (newStatus: string) => {
        if (!order) return;
        try {
            await updateOrderStatus(order.id, newStatus);
            showToast(`Order ${newStatus.toLowerCase()} successfully`, "success");
            fetchDetail();
        } catch (error) {
            showToast("Failed to update order status", "error");
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="p-8">
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center">
                    <p>{error || "Order not found"}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 text-[#d4af37] hover:underline flex items-center justify-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={16} /> Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            {/* Header Area */}
            <div className="space-y-6">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 bg-white/5 border border-[#d4af37]/20 rounded-lg text-[#d4af37] hover:bg-white/10 transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
                                Order <span className="text-[#d4af37]">#ORD-{order.id}</span>
                            </h1>
                            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                                <Clock size={14} /> View full details and manage status
                            </p>
                        </div>
                    </div>
                    <StatusDropdown
                        currentStatus={order.order_status}
                        onStatusChange={handleStatusUpdate}
                        disabled={updating}
                    />
                </header>

                {/* Quick Info Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="px-6 py-4 bg-[#111111] border border-[#d4af37]/10 rounded-2xl flex items-center gap-4 group hover:border-[#d4af37]/30 transition-all">
                        <div className="p-2.5 bg-[#d4af37]/10 rounded-xl group-hover:bg-[#d4af37]/20 transition-colors">
                            <CreditCard size={18} className="text-[#d4af37]" />
                        </div>
                        <div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-0.5">Payment Method</span>
                            <span className="text-white text-sm font-bold">Cash on Delivery</span>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-[#111111] border border-[#d4af37]/10 rounded-2xl flex items-center gap-4 group hover:border-[#d4af37]/30 transition-all">
                        <div className="p-2.5 bg-[#d4af37]/10 rounded-xl group-hover:bg-[#d4af37]/20 transition-colors">
                            <Calendar size={18} className="text-[#d4af37]" />
                        </div>
                        <div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-0.5">Order Placement Date</span>
                            <span className="text-white text-sm font-bold">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'full' })}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Customer Details */}
                <div className="bg-[#111111] border border-[#d4af37]/10 rounded-[28px] overflow-hidden shadow-2xl group hover:border-[#d4af37]/20 transition-all">
                    <div className="p-6 border-b border-[#d4af37]/10 bg-[#161616]">
                        <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                            <User size={20} className="text-[#d4af37]" /> Customer Profile
                        </h3>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#d4af37]/10 rounded-xl shrink-0 group-hover:bg-[#d4af37]/20 transition-colors">
                                <User size={20} className="text-[#d4af37]" />
                            </div>
                            <div>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Full Name</span>
                                <span className="text-gray-200 font-bold text-lg tracking-tight">{order.customer_name}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#d4af37]/10 rounded-xl shrink-0 group-hover:bg-[#d4af37]/20 transition-colors">
                                <Mail size={20} className="text-[#d4af37]" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Email Connection</span>
                                <span className="text-gray-300 font-medium truncate block">{order.email}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#d4af37]/10 rounded-xl shrink-0 group-hover:bg-[#d4af37]/20 transition-colors">
                                <Phone size={20} className="text-[#d4af37]" />
                            </div>
                            <div>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Mobile Contact</span>
                                <span className="text-gray-300 font-bold tracking-widest">{order.phone_number}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shipping info */}
                <div className="bg-[#111111] border border-[#d4af37]/10 rounded-[28px] overflow-hidden shadow-2xl group hover:border-[#d4af37]/20 transition-all">
                    <div className="p-6 border-b border-[#d4af37]/10 bg-[#161616]">
                        <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                            <MapPin size={20} className="text-[#d4af37]" /> Shipping Destination
                        </h3>
                    </div>
                    <div className="p-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#d4af37]/10 rounded-xl shrink-0 group-hover:bg-[#d4af37]/20 transition-colors">
                                <MapPin size={20} className="text-[#d4af37]" />
                            </div>
                            <div className="flex-1">
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">Delivery Address</span>
                                <span className="text-gray-200 font-medium leading-relaxed text-lg block">{order.address}</span>
                                <div className="mt-6">
                                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs font-black uppercase tracking-[0.1em]">
                                        {order.city}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inventory Section */}
            <div className="bg-[#111111] border border-[#d4af37]/10 rounded-[32px] overflow-hidden shadow-2xl relative">
                <div className="p-8 border-b border-[#d4af37]/10 bg-gradient-to-r from-[#161616] to-[#111111] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-[#d4af37]/10 rounded-xl">
                            <ShoppingBag size={24} className="text-[#d4af37]" />
                        </div>
                        <div>
                            <h3 className="text-xl font-serif font-bold text-white">Order Inventory</h3>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                {order.order_items?.length || 0} ITEMS TOTAL
                            </span>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-black/40">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#aa8930] border-b border-white/5 text-left">Product Name</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#aa8930] border-b border-white/5 text-center">Weight</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#aa8930] border-b border-white/5 text-center">Qty</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#aa8930] border-b border-white/5 text-right">Unit Price</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#aa8930] border-b border-white/5 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {order.order_items && order.order_items.length > 0 ? (
                                <>
                                    {order.order_items.map((item, index) => (
                                        <tr key={index} className="hover:bg-white/[0.04] transition-all duration-300 group">
                                            <td className="px-8 py-6">
                                                <span className="text-white font-serif text-xl group-hover:text-[#d4af37] transition-all duration-300">
                                                    {item.product_name || "Herbal Tea Blend"}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-gray-400 font-medium">{item.weight || "N/A"}</span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-[#d4af37] font-black text-lg">
                                                    {item.quantity}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <span className="text-gray-400 font-mono text-sm tracking-tighter">Rs. {(item.price || 0).toLocaleString()}</span>
                                            </td>
                                            <td className="px-8 py-6 text-right font-black text-white text-xl tracking-tighter">
                                                Rs. {((item.price || 0) * item.quantity).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Grand Total Row directly in the table footer area */}
                                    <tr className="bg-[#d4af37]/5">
                                        <td colSpan={4} className="px-8 py-8 text-right text-[10px] uppercase tracking-[0.5em] text-[#aa8930] font-black">
                                            Grand Total Selection
                                        </td>
                                        <td className="px-8 py-8 text-right text-[#d4af37] text-3xl font-serif font-black tracking-tighter">
                                            Rs. {order.total_amount.toLocaleString()}
                                        </td>
                                    </tr>
                                </>
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-16 text-center text-gray-500 italic">No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
