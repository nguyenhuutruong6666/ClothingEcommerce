import {useCouponStore} from "@/stores/couponStore";
import {useEffect, useMemo} from "react";
import {banner} from "@/data/banner";

export default function OfferBanner() {
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
                image: coupon.imageUrl,
                title: coupon.name,
                description: coupon.description || "",
                code: coupon.code,
                value: coupon.value,
            }));
    }, [coupons]);
  return (
    <section className="relative h-[160px] xxs:h-[200px] xs:h-[260px] sm:h-[320px] md:h-[420px] lg:h-[520px] xl:h-[600px] w-full max-w-7xl mx-auto overflow-hidden rounded-lg sm:rounded-xl my-4 sm:my-10 px-2 sm:px-4">
      <div className="absolute inset-2 sm:inset-4 rounded-lg sm:rounded-xl overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `${couponBanners.at(0)?.image ? `url(${couponBanners.at(0)?.image})` : `url(/images/Banners/OfferBanner.jpg)`}`,
          }}
        />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent opacity-30"></div>
      </div>
    </section>
  );
}
