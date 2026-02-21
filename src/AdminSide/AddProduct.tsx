import { useRef, useState, useEffect } from 'react';
import { Upload, Save } from 'lucide-react';
import { useProductActions } from './UseHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCT_APIS } from '../libs/api/createproduct.api';
import { showToast } from '../Components/CustomToast';

const AddProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const { createProduct, updateProduct, loading: saving, error: actionError } = useProductActions();
    const [fetching, setFetching] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        weight: '',
        stock_quantity: '',
        category: 'Green Tea',
        is_active: true
    });

    useEffect(() => {
        if (isEdit) {
            const fetchProduct = async () => {
                try {
                    setFetching(true);
                    setFetchError(null);
                    console.log("Fetching product details for ID:", id);
                    const product = await PRODUCT_APIS.getProductById(Number(id));
                    console.log("Product fetched successfully:", product);

                    setFormData({
                        name: product.name || '',
                        description: product.description || '',
                        price: product.price?.toString() || '',
                        weight: product.weight || '',
                        stock_quantity: product.stock_quantity?.toString() || '',
                        category: (product as any).category || 'Green Tea',
                        is_active: product.is_active ?? true
                    });
                    setPreview(product.image_url || product.image || null);
                } catch (err: any) {
                    console.error("Failed to load product for editing:", err);
                    setFetchError(err.response?.data?.message || "Failed to load product details. Please check if ID is correct.");
                } finally {
                    setFetching(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEdit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('weight', formData.weight);
        data.append('stock_quantity', formData.stock_quantity);
        data.append('is_active', String(formData.is_active));

        const file = fileInputRef.current?.files?.[0];
        if (file) {
            data.append('image', file);
        }

        try {
            console.log(`Submitting form (${isEdit ? 'UPDATE' : 'CREATE'})...`);
            if (isEdit) {
                await updateProduct(Number(id), data);
                showToast("Product updated successfully", "success");
            } else {
                await createProduct(data);
                showToast("Product created successfully", "success");
            }
            navigate('/products');
        } catch (err) {
            console.error("Failed to save product:", err);
            showToast(`Failed to ${isEdit ? 'update' : 'create'} product`, "error");
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-[#d4af37] tracking-tight">
                    {isEdit ? 'Edit Product' : 'Add New Product'}
                </h1>
                <p className="text-gray-400 mt-1">
                    {isEdit ? 'Refine the details of your premium herbal collection.' : 'Introduce a new premium herbal tea blend to your collection.'}
                </p>
            </header>

            {(actionError || fetchError) && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                    {actionError || fetchError}
                </div>
            )}

            {fetching ? (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                    <div className="h-12 w-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-[#d4af37] font-serif italic">Loading product details...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-8 bg-[#0a0a0a] border border-[#d4af37]/20 rounded-2xl p-8 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image Upload Area */}
                        <div className="space-y-4">
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Product Image</label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <div
                                onClick={handleImageClick}
                                className="aspect-square bg-white/5 border-2 border-dashed border-[#d4af37]/20 rounded-2xl flex flex-col items-center justify-center group hover:border-[#d4af37]/40 transition-colors cursor-pointer overflow-hidden relative"
                            >
                                {preview ? (
                                    <>
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Upload className="h-8 w-8 text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="h-10 w-10 text-gray-500 group-hover:text-[#d4af37] transition-colors mb-4" />
                                        <span className="text-sm text-gray-400 group-hover:text-gray-200 text-center px-4">
                                            Click to upload or drag and drop<br />
                                            <span className="text-xs text-gray-600">SVG, PNG, JPG (MAX. 800x400px)</span>
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Imperial Golden Jasmine"
                                    className="w-full bg-white/5 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors appearance-none"
                                >
                                    <option>Green Tea</option>
                                    <option>Herbal Infusion</option>
                                    <option>Black Tea</option>
                                    <option>Wellness Blend</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Price (Rs.)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="2500"
                                        className="w-full bg-white/5 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Stock Quantity</label>
                                    <input
                                        type="number"
                                        name="stock_quantity"
                                        value={formData.stock_quantity}
                                        onChange={handleInputChange}
                                        placeholder="10"
                                        className="w-full bg-white/5 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Weight (g)</label>
                                <input
                                    type="text"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                    placeholder="200g"
                                    className="w-full bg-white/5 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 rounded border-[#d4af37]/20 bg-white/5 text-[#d4af37] focus:ring-[#d4af37]"
                                />
                                <label htmlFor="is_active" className="text-sm font-bold text-[#d5dbe6] cursor-pointer selection:bg-none">
                                    Product is Active & Visible
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Description</label>
                        <textarea
                            rows={4}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe the aroma, flavor profile, and health benefits..."
                            className="w-full bg-white/5 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4 border-t border-[#d4af37]/10">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 rounded-full text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-10 py-3 bg-gradient-to-r from-[#d4af37] to-[#b89530] text-black rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:scale-100 flex items-center space-x-2"
                        >
                            {saving ? (
                                <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            <span>{saving ? 'Saving...' : isEdit ? 'Update Product' : 'Save Product'}</span>
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddProduct;
