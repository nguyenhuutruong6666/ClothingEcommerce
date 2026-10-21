"use client";
import React, { useState } from "react";
import ProductGrid from "../common/ProductGrid";
import { convertProductToItemProps } from "../common/ProductItem";
import { Product } from "@/stores/productStore";

interface FeaturedProductsProps {
    products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
    const [displayCount, setDisplayCount] = useState(8);
    const [isLoading, setIsLoading] = useState(false);

    // Convert products to ProductItemProps format
    const allProducts = products.filter(p => p.isPublished).map(convertProductToItemProps);
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
        <section className="py-8 sm:py-12 lg:py-16">
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