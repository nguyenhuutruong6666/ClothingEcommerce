"use client";
import React, { useState, useMemo } from "react";
import ProductGrid from "../common/ProductGrid";
import { convertProductToItemProps } from "../common/ProductItem";
import { Product } from "@/stores/productStore";

interface FeaturedProductsProps {
    products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
    const [displayCount, setDisplayCount] = useState(8);
    const [isLoading, setIsLoading] = useState(false);

    // Convert products to ProductItemProps format and sort by highest star rating descending
    const allProducts = useMemo(() => {
        return products
            .filter(p => p.isPublished)
            .map(convertProductToItemProps)
            .sort((a, b) => {
                const ratingDiff = (b.rating || 0) - (a.rating || 0);
                if (ratingDiff !== 0) return ratingDiff;
                const reviewDiff = (b.reviewCount || 0) - (a.reviewCount || 0);
                if (reviewDiff !== 0) return reviewDiff;
                return b.id - a.id;
            });
    }, [products]);

    const displayedProducts = allProducts.slice(0, displayCount);

    const handleLoadMore = () => {
        setIsLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            setDisplayCount((prev) => Math.min(prev + 8, allProducts.length));
            setIsLoading(false);
        }, 500);
    };

    return (
        <section className="pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 lg:pb-8">
            <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24">
                <ProductGrid
                    products={displayedProducts}
                    title="Sản Phẩm Nổi Bật"
                    showLoadMore={displayCount < allProducts.length}
                    onLoadMore={handleLoadMore}
                    isLoading={isLoading}
                />
            </div>
        </section>
    );
}