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
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 8);
    }, [products]);

    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
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