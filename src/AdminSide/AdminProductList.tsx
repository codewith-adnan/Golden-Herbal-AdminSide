import { Plus, Edit2, Trash2, Package, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useProducts, useProductActions } from "./UseHooks";
import DeleteConfirmModal from "../Components/DeleteConfirmModal";
import { showToast } from "../Components/CustomToast";

const AdminProductList = () => {
    const [viewAll, setViewAll] = useState(false);
    const { products, loading, error, refresh } = useProducts();
    const { deleteProduct } = useProductActions();

    // State for delete modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<{ id: number, name: string } | null>(null);

    const handleDeleteClick = (id: number, name: string) => {
        setProductToDelete({ id, name });
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;

        try {
            await deleteProduct(productToDelete.id);
            showToast("Product deleted successfully", "success");
            refresh();
        } catch (err) {
            console.error("Delete failed:", err);
            showToast("Failed to delete product", "error");
        }
    };

    const displayedProducts = viewAll ? products : products.slice(0, 3);

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
                            Product <span className="text-[#d4af37]">Inventory</span>
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Manage your botanical collection and stock levels.</p>
                    </div>

                    <Link
                        to="/add-product"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#d4af37] text-black font-bold rounded-xl hover:bg-[#b89530] transition-all transform hover:scale-105 shadow-[0_10px_20px_rgba(212,175,55,0.2)] active:scale-95"
                    >
                        <Plus size={18} />
                        <span>Add New Product</span>
                    </Link>
                </div>

                {loading && !products.length ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-center">
                        {error}
                    </div>
                ) : (
                    <>
                        {/* Grid Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="group relative bg-[#111111] border border-[#d4af37]/10 rounded-[24px] p-4 hover:border-[#d4af37]/30 transition-all duration-300 shadow-xl overflow-hidden"
                                >
                                    {/* Image Area */}
                                    <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-[#0a0a0a]">
                                        <img
                                            src={product.image_url || product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                        {/* Stock Badge */}
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                                            <Package size={12} className="text-[#d4af37]" />
                                            <span className="text-[10px] font-bold text-white uppercase">{product.stock_quantity} In Stock</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-serif font-bold text-[#d5dbe6] truncate pr-2">
                                                {product.name}
                                            </h3>
                                            <div className="text-[#d4af37] font-bold">
                                                <span className="text-xs mr-1">Rs.</span>
                                                {product.price}
                                            </div>
                                        </div>

                                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-[10px] text-gray-400 font-medium uppercase tracking-widest pt-1">
                                            <div className="flex items-center gap-1">
                                                <Scale size={12} className="text-[#d4af37]/60" />
                                                {product.weight}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-4">
                                            <Link
                                                to={`/edit-product/${product.id}`}
                                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 text-xs font-bold hover:bg-[#d4af37]/10 hover:text-[#d4af37] hover:border-[#d4af37]/30 transition-all active:scale-95"
                                            >
                                                <Edit2 size={14} />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(product.id, product.name)}
                                                className="flex items-center justify-center cursor-pointer p-2.5 bg-red-500/5 border border-red-500/10 rounded-xl text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all active:scale-95"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* View All Toggle */}
                        {products.length > 3 && (
                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={() => setViewAll(!viewAll)}
                                    className="px-8 py-3 bg-[#111111] border border-[#d4af37]/20 text-[#d4af37] rounded-xl font-bold text-sm tracking-widest hover:bg-[#d4af37]/10 hover:border-[#d4af37]/50 transition-all transform hover:scale-105"
                                >
                                    {viewAll ? "SHOW LESS" : "VIEW ALL PRODUCTS"}
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Premium Delete Confirmation Modal */}
                <DeleteConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    itemName={productToDelete?.name}
                />
            </div>
        </div>
    );
};

export default AdminProductList;
