import React from "react";
import {
  Truck,
  CreditCard,
  Shield,
  Handbag,
} from "lucide-react";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "../ui/shadcn-io/marquee";

interface PolicyItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const policyData: PolicyItem[] = [
  {
    id: "quality",
    icon: <Handbag className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />,
    title: "Chính hãng",
    description: "100% Chính hãng",
  },
  {
    id: "delivery",
    icon: <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />,
    title: "Miễn phí vận chuyển",
    description: "Áp dụng đơn từ 500k",
  },
  {
    id: "payment",
    icon: <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />,
    title: "Thanh toán đa dạng",
    description: "COD, VNPAY, MOMO,...",
  },
  {
    id: "security",
    icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />,
    title: "Bảo hành",
    description: "Lên đến 180 ngày",
  },
];

function ListPolicy() {
  return (
    <section className="py-2.5 sm:py-3.5 lg:py-4 border-t border-stone-200/80 bg-stone-50/70">
      <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24">
        <div className="flex size-full items-center justify-center">
          <Marquee>
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />
            <MarqueeContent>
              {policyData.map((policy) => (
                <MarqueeItem
                  className="flex items-center text-start gap-2.5 sm:gap-3 py-1 px-4 sm:px-6"
                  key={policy.id}
                >
                  <div className="p-1.5 rounded-md bg-white border border-stone-200/70 shadow-2xs flex-shrink-0">
                    {policy.icon}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                      {policy.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-tight mt-0.5">
                      {policy.description}
                    </p>
                  </div>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
        </div>
      </div>
    </section>
  );
}

export default ListPolicy;
