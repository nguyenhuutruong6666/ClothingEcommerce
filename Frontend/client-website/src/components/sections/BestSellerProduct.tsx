"use client";

import React, { useMemo } from "react";
import ProductCarousel from "../common/ProductCarousel";
import { convertProductToItemProps } from "../common/ProductItem";
import { Product } from "@/stores/productStore";

interface BestSellerProductProps {
    products: Product[];
}

export default function BestSellerProduct({ products }: BestSellerProductProps) {
    const bestSellerProducts = useMemo(() => {
        return products
            .filter(p => p.isPublished)
            .map(convertProductToItemProps)
            .sort((a, b) => {
                const soldDiff = (b.soldCount || 0) - (a.soldCount || 0);
                if (soldDiff !== 0) return soldDiff;
                const ratingDiff = (b.rating || 0) - (a.rating || 0);
                if (ratingDiff !== 0) return ratingDiff;
                return b.id - a.id;
            })
            .slice(0, 8);
    }, [products]);

    return (
        <section className="pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 lg:pb-8 bg-white">
            <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24">
                <ProductCarousel
                    products={bestSellerProducts}
                    title="Sản phẩm bán chạy"
                    autoPlay={true}
                    showArrows={false}
                />
            </div>
        </section>
    );
}