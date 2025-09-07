import React, { useEffect, useState } from "react";
import api from "../src/api/api";
import { Search, Filter, Sparkles, TrendingUp } from "lucide-react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import ProductCard from "../src/components/ProductCard";

export default function Products() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/products", {
        params: { q, category, min, max, limit: 12 },
      });
      setItems(res.data.items);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text mb-6">
            Discover Products
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Browse our curated collection of premium products designed to
            inspire and elevate your lifestyle
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-purple-400" size={20} />
              <span className="text-purple-400 font-medium">
                Premium Quality
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="text-cyan-400" size={20} />
              <span className="text-cyan-400 font-medium">Trending Now</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/60 backdrop-blur-lg rounded-3xl p-8 mb-14 border border-gray-700/40 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-gray-800/70 border border-gray-600/40 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>

            {/* Min Price */}
            <div className="relative">
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="Min Price"
                className="w-full bg-gray-800/70 border border-gray-600/40 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>

            {/* Max Price */}
            <div className="relative">
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="Max Price"
                className="w-full bg-gray-800/70 border border-gray-600/40 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-800/70 border border-gray-600/40 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 appearance-none"
              >
                <option value="">All Categories</option>
                <option value="Clothing">Clothing</option>
                <option value="Footwear">Footwear</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={fetch}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/40 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Filter size={20} />
                {isLoading ? "Filtering..." : "Filter"}
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-28">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin mx-auto mb-6" />
              <p className="text-gray-400 text-lg font-medium">
                Loading amazing products...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {items.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && items.length === 0 && (
          <div className="text-center py-24">
            <div className="text-7xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-200 mb-3">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
