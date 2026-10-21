"use client";

import { banner } from "@/data/banner";
import AutoSwiper from "./AutoSwiper";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import {useCouponStore} from "@/stores/couponStore";
import {useEffect, useMemo} from "react";

export default function Heroslide() {
    const { coupons, fetchCoupons  } = useCouponStore();
    useEffect(() => {
        // Fetch coupons khi component mount
        fetchCoupons();
    }, [fetchCoupons]);

    // Lấy các coupon active có ảnh
    const couponBanners = useMemo(() => {
        return coupons
            .filter((coupon) => coupon.imageUrl && coupon.isActive) // Chỉ lấy coupon có ảnh
            .map((coupon) => ({
                id: coupon.id,
                image: coupon.imageUrl!,
                title: coupon.name,
                description: coupon.description || "",
                code: coupon.code,
                value: coupon.value,
            }));
    }, [coupons]);

    // Sử dụng coupon banners nếu có, không thì dùng banner mặc định
    const displayBanners = couponBanners.length > 0 ? couponBanners : banner;

    return (
    <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24 pt-4 sm:pt-6">
      <AutoSwiper className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xs">
        {displayBanners.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[180px] xxs:h-[220px] xs:h-[280px] sm:h-[360px] md:h-[480px] lg:h-[580px] xl:h-[680px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </AutoSwiper>
    </div>
  );
}
