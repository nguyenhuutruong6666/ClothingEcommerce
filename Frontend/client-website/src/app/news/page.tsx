import { newsArticles } from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight, Calendar, ShieldCheck } from "lucide-react";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb Header Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24 py-3.5 sm:py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/" className="hover:text-black transition-colors">
                  Trang chủ
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-gray-900 font-medium">
                  Chính sách & Tin tức
                </span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content - Đồng nhất 100% padding toàn web */}
      <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24 py-8 sm:py-10 lg:py-12 flex-1">
        {/* Title Section */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            TEXCLO Information
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Chính Sách & Điều Khoản Cửa Hàng
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Mọi quy định về mua sắm, giao vận, đổi trả và quyền lợi thành viên đều được TEXCLO công khai minh bạch nhằm mang lại trải nghiệm tối ưu nhất cho bạn.
          </p>
        </div>

        {/* List of Policies Grid - Trải rộng full width đồng bộ padding left/right */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsArticles.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-black transition-all duration-300 overflow-hidden flex flex-col"
            >
              <Link
                href={`/news/${article.slug}`}
                className="relative block w-full h-48 sm:h-52 overflow-hidden bg-gray-100"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/80 text-white backdrop-blur-xs">
                    {article.category}
                  </span>
                </div>
              </Link>

              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Cập nhật: {article.date}</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-black mb-2 transition-colors line-clamp-2">
                  <Link href={`/news/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 mb-5 flex-1">
                  {article.excerpt}
                </p>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center text-xs sm:text-sm font-semibold text-black group-hover:translate-x-1 transition-transform"
                  >
                    Xem chi tiết
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                  <span className="text-[11px] text-gray-400">TEXCLO Official</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
