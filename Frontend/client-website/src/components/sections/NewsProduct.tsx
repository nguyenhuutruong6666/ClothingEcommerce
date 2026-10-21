"use client";

import React, { useMemo } from "react";
import ProductCarousel from "../common/ProductCarousel";
import { convertProductToItemProps } from "../common/ProductItem";
import { Product } from "@/stores/productStore";

interface NewsProductProps {
    products: Product[];
}

export default function NewsProduct({ products }: NewsProductProps) {
    // Get top 8 newest products
    const newsProducts = useMemo(() => {
        return products
            .filter(p => p.isPublished) // Chỉ lấy sản phẩm đã publish
            .map(convertProductToItemProps)
            .sort((a, b) => {
                return b.id - a.id;
            })
            .slice(0, 8);
    }, [products]);

    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
            <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24">
                <ProductCarousel
                    products={newsProducts}
                    title="Sản phẩm mới nhất"
                    autoPlay={true}
                    showArrows={false}
                />
            </div>
        </section>
    );
}