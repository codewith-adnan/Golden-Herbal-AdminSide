import { Upload, Save } from 'lucide-react';

const AddProduct = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-[#d4af37] tracking-tight">Add New Product</h1>
                <p className="text-gray-400 mt-1">Introduce a new premium herbal tea blend to your collection.</p>
            </header>

            <form className="space-y-8 bg-[#0a0a0a] border border-[#d4af37]/20 rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image Upload Area */}
                    <div className="space-y-4">
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Product Image</label>
                        <div className="aspect-square bg-white/5 border-2 border-dashed border-[#d4af37]/20 rounded-2xl flex flex-col items-center justify-center group hover:border-[#d4af37]/40 transition-colors cursor-pointer">
                            <Upload className="h-10 w-10 text-gray-500 group-hover:text-[#d4af37] transition-colors mb-4" />
                            <span className="text-sm text-gray-400 group-hover:text-gray-200 text-center px-4">
                                Click to upload or drag and drop<br />
                                <span className="text-xs text-gray-600">SVG, PNG, JPG (MAX. 800x400px)</span>
                            </span>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Product Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Imperial Golden Jasmine"
                                className="w-full bg-white/5 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Category</label>
                            <select className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors appearance-none">
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
                                    placeholder="2500"
                                    className="w-full bg-white/5 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Weight (g)</label>
                                <input
                                    type="text"
                                    placeholder="200g"
                                    className="w-full bg-white/5 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#aa8930]">Description</label>
                    <textarea
                        rows={4}
                        placeholder="Describe the aroma, flavor profile, and health benefits..."
                        className="w-full bg-white/5 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                    ></textarea>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-[#d4af37]/10">
                    <button type="button" className="px-6 py-3 rounded-full text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="px-10 py-3 bg-gradient-to-r from-[#d4af37] to-[#b89530] text-black rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Save Product</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
