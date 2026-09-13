"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Product, useProductStore } from "@/stores/productStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useColorStore } from "@/stores/colorStore";
import { useSizeStore } from "@/stores/sizeStore";
import ProductGrid from "@/components/common/ProductGrid";
import { convertProductToItemProps } from "@/components/common/ProductItem";
import { formatPrice, priceRanges } from "@/lib/utils";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { productKeys, useProductsQuery } from "@/services/productService";
interface Filters {
  priceRange: [number, number];
  colorIds: number[];
  sizeIds: number[];
  sortBy: "name" | "price" | "rating" | "newest";
  sortOrder: "asc" | "desc";
}

export default function SubCategoryPage() {
  const { subcategory } = useParams();
  const { data: products = [] } = useProductsQuery();
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Stores
  const { getPublishedProducts } = useProductStore();
  const { getCategoryBySlug } = useCategoryStore();
  const { colors } = useColorStore();
  const { sizes } = useSizeStore();
  // Filters state
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 5000000],
    colorIds: [],
    sizeIds: [],
    sortBy: "newest",
    sortOrder: "desc",
  });
  const subCategory = useMemo(() => {
    if (typeof subcategory === "string") {
      return getCategoryBySlug(subcategory);
    }
    return null;
  }, [subcategory, getCategoryBySlug]);

  const categoryTitle = subCategory?.name || "Danh mục";

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    // Start with published products
    let filtered = products;
    // Filter by subcategory
    if (subCategory) {
      filtered = filtered.filter(
        (product) => product.category.id === subCategory.id
      );
    }

    // Apply price range filter (using base_price or variant prices)
    filtered = filtered.filter((product) => {
      // Check if product base price is in range
      return (
        product.basePrice >= filters.priceRange[0] &&
        product.basePrice <= filters.priceRange[1]
      );
    });

    // Apply color filter (check variants)
    if (filters.colorIds.length > 0) {
      filtered = filtered.filter((product) =>
        product.variants?.some(
          (v) => v.color.id && filters.colorIds.includes(v.color.id)
        )
      );
    }

    // Apply size filter (check variants)
    if (filters.sizeIds.length > 0) {
      filtered = filtered.filter((product) =>
        product.variants?.some(
          (v) => v.size.id && filters.sizeIds.includes(v.size.id)
        )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.basePrice - b.basePrice;
          break;
        case "rating":
          // @ts-expect-error - rating is optional in Product type
          comparison = (a.rating || 0) - (b.rating || 0);
          break;
        case "newest":
          comparison = b.id - a.id; // Higher ID = newer
          break;
        default:
          break;
      }
      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [getPublishedProducts, subCategory, filters]);
  const displayedProducts = useMemo(() => {
    return filteredProducts
      .slice(0, displayCount)
      .map(convertProductToItemProps);
  }, [filteredProducts, displayCount]);
  // Get available colors and sizes from filtered products
  const availableColors = useMemo(() => {
    const colorIds = new Set<number>();
    filteredProducts.forEach((product) => {
      product.variants?.forEach((variant) => {
        if (variant.color.id) colorIds.add(variant.color.id);
      });
    });
    return colors.filter((c) => colorIds.has(c.id));
  }, [filteredProducts, colors]);

  const availableSizes = useMemo(() => {
    const sizeIds = new Set<number>();
    filteredProducts.forEach((product) => {
      product.variants?.forEach((variant) => {
        if (variant.size.id) sizeIds.add(variant.size.id);
      });
    });
    return sizes.filter((s) => sizeIds.has(s.id));
  }, [filteredProducts, sizes]);

  // Handle load more
  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 12, filteredProducts.length));
      setIsLoading(false);
    }, 1000);
  };
  const handleColorFilter = (colorId: number) => {
    setFilters((prev) => ({
      ...prev,
      colorIds: prev.colorIds.includes(colorId)
        ? prev.colorIds.filter((id) => id !== colorId)
        : [...prev.colorIds, colorId],
    }));
    setDisplayCount(12);
  };

  const handleSizeFilter = (sizeId: number) => {
    setFilters((prev) => ({
      ...prev,
      sizeIds: prev.sizeIds.includes(sizeId)
        ? prev.sizeIds.filter((id) => id !== sizeId)
        : [...prev.sizeIds, sizeId],
    }));
    setDisplayCount(12);
  };

  const handlePriceRangeFilter = (range: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
    setDisplayCount(12);
  };

  const handleSortChange = (
    sortBy: Filters["sortBy"],
    sortOrder: Filters["sortOrder"]
  ) => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 5000000],
      colorIds: [],
      sizeIds: [],
      sortBy: "newest",
      sortOrder: "desc",
    });
    setDisplayCount(12);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          {/* Breadcrumb using shadcn/ui */}
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/">Trang chủ</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{categoryTitle}</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Back button */}
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryTitle}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile Overlay Backdrop */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Sidebar Filters */}
          <div
            className={`w-full lg:w-64 flex-shrink-0 space-y-4 sm:space-y-6 ${
              showFilters
                ? "fixed inset-y-0 left-0 z-50 w-[300px] bg-white p-6 overflow-y-auto shadow-2xl transition-transform duration-300 transform translate-x-0 lg:static lg:w-64 lg:p-0 lg:shadow-none lg:bg-transparent lg:overflow-visible"
                : "hidden lg:block"
            }`}
          >
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-xs">
              <div className="flex items-center justify-between lg:hidden mb-4 pb-3 border-b">
                <h3 className="font-bold text-stone-900 uppercase text-sm">Bộ Lọc Sản Phẩm</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 text-stone-500 hover:text-stone-900"
                >
                  ✕
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-stone-900 text-sm uppercase tracking-wider mb-3">Khoảng giá</h3>
                <div className="space-y-1.5">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => handlePriceRangeFilter(range.value)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        filters.priceRange[0] === range.value[0] &&
                        filters.priceRange[1] === range.value[1]
                          ? "bg-black text-white"
                          : "bg-stone-50 text-stone-700 hover:bg-stone-100"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="font-semibold text-stone-900 text-sm uppercase tracking-wider mb-3">Màu sắc</h3>
                <div className="grid grid-cols-6 gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorFilter(color.id)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        filters.colorIds.includes(color.id)
                          ? "border-black scale-110 shadow-xs"
                          : "border-stone-200 hover:border-stone-400"
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h3 className="font-semibold text-stone-900 text-sm uppercase tracking-wider mb-3">Kích cỡ</h3>
                <div className="grid grid-cols-3 gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => handleSizeFilter(size.id)}
                      className={`py-2 px-3 border rounded-xl text-xs font-semibold transition-colors ${
                        filters.sizeIds.includes(size.id)
                          ? "border-black bg-black text-white"
                          : "border-stone-200 hover:border-stone-400 bg-white text-stone-700"
                      }`}
                    >
                      {size.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-stone-200/80 shadow-xs mb-4 sm:mb-6 flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden bg-stone-900 text-white px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span>Bộ lọc</span>
                </button>
                <span className="text-xs sm:text-sm text-stone-600 font-medium">
                  Hiển thị {Math.min(displayCount, filteredProducts.length)} /{" "}
                  {filteredProducts.length} sản phẩm
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split("-");
                    handleSortChange(
                      sortBy as Filters["sortBy"],
                      sortOrder as Filters["sortOrder"]
                    );
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest-desc">Mới nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="name-asc">Tên: A-Z</option>
                  <option value="name-desc">Tên: Z-A</option>
                  <option value="rating-desc">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid
              products={displayedProducts}
              showLoadMore={displayCount < filteredProducts.length}
              onLoadMore={handleLoadMore}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
