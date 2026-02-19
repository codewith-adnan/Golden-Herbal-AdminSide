import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ORDER_LISTING_APIS, type Order } from "../libs/api/admin.orders.api";
import { ArrowLeft, User, Mail, Phone, MapPin, CreditCard, Calendar, Clock, ShoppingBag } from "lucide-react";

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const data = await ORDER_LISTING_APIS.orderDetail(Number(id));
                setOrder(data);
            } catch (err: any) {
                setError(err?.response?.data?.message || "Failed to fetch order details");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            case 'Shipped': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            case 'Delivered': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'Processing': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
            default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
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
        <div className="p-8 max-w-5xl mx-auto">
            {/* Header */}
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                            <Clock size={14} /> Placed on {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(order.order_status)} inline-block`}>
                    {order.order_status}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Order Items & Totals */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Order Summary Card */}
                    <div className="bg-[#111111] border border-[#d4af37]/10 rounded-[24px] overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-[#d4af37]/10 bg-[#161616]">
                            <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                                <ShoppingBag size={20} className="text-[#d4af37]" /> Order Summary
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* In a real app, you'd map over order items here. 
                                Since the current schema doesn't show items, we display the total. */}
                            <div className="flex justify-between items-center py-4 border-b border-white/5">
                                <span className="text-gray-400">Total Amount</span>
                                <span className="text-xl font-bold text-[#d4af37]">Rs. {order.total_amount.toLocaleString()}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Payment Method</span>
                                    <span className="text-white text-sm font-medium flex items-center gap-2">
                                        <CreditCard size={14} className="text-[#d4af37]" /> Cash on Delivery
                                    </span>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Order Date</span>
                                    <span className="text-white text-sm font-medium flex items-center gap-2">
                                        <Calendar size={14} className="text-[#d4af37]" /> {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Customer Info */}
                <div className="space-y-8">
                    <div className="bg-[#111111] border border-[#d4af37]/10 rounded-[24px] overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-[#d4af37]/10 bg-[#161616]">
                            <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                                <User size={20} className="text-[#d4af37]" /> Customer Details
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-[#d4af37]/10 rounded-lg">
                                        <User size={18} className="text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Full Name</span>
                                        <span className="text-gray-200 font-medium">{order.customer_name}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-[#d4af37]/10 rounded-lg">
                                        <Mail size={18} className="text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Email Address</span>
                                        <span className="text-gray-200 font-medium">{order.email}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-[#d4af37]/10 rounded-lg">
                                        <Phone size={18} className="text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Phone Number</span>
                                        <span className="text-gray-200 font-medium">{order.phone_number}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111111] border border-[#d4af37]/10 rounded-[24px] overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-[#d4af37]/10 bg-[#161616]">
                            <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                                <MapPin size={20} className="text-[#d4af37]" /> Shipping Address
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-[#d4af37]/10 rounded-lg">
                                    <MapPin size={18} className="text-[#d4af37]" />
                                </div>
                                <div>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Address</span>
                                    <span className="text-gray-200 font-medium leading-relaxed">{order.address}</span>
                                    <span className="text-gray-400 text-sm block mt-1">{order.city}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
