import { newsArticles } from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  FileText,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface Params {
  slug: string;
}

interface NewsDetailPageProps {
  params: Promise<Params>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug: articleSlug } = await params;
  const article = newsArticles.find((article) => article.slug === articleSlug);

  // Nếu không tìm thấy bài viết, hiển thị 404
  if (!article) {
    notFound();
  }

  // Lấy các bài viết / chính sách khác
  const relatedArticles = newsArticles.filter((a) => a.slug !== article.slug);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content Area - Trải rộng chuẩn full-width đồng nhất padding left/right */}
      <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24 pt-1 sm:pt-1.5 pb-8 sm:pb-10 lg:pb-12 flex-1">
        {/* Breadcrumb Header Bar */}
        <div className="flex items-center justify-between gap-4 mb-2 sm:mb-2.5">
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/" className="hover:text-black transition-colors">
                  Trang chủ
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href="/news" className="hover:text-black transition-colors">
                  Chính sách & Tin tức
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-gray-900 font-medium line-clamp-1 max-w-[200px] md:max-w-md">
                  {article.title}
                </span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Link
            href="/news"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Tất cả chính sách
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Article Column */}
          <article className="lg:col-span-8 xl:col-span-8 bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-10 lg:p-12">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-black text-white">
                <FileText className="w-3 h-3" />
                {article.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Hiệu lực từ: {article.date}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              {article.title}
            </h1>

            {/* Excerpt Callout */}
            {article.excerpt && (
              <div className="bg-stone-50 border-l-4 border-black p-4 rounded-r-lg mb-8">
                <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Featured Image */}
            {article.image && (
              <div className="relative w-full h-56 sm:h-72 md:h-96 mb-8 rounded-xl overflow-hidden border border-gray-100 shadow-xs">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  priority
                />
              </div>
            )}

            {/* Article Content with Custom Typography Rules */}
            <div
              className="text-gray-700 leading-relaxed text-sm sm:text-base
                [&_h2]:text-lg sm:[&_h2]:text-xl md:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:pt-4 [&_h2]:border-t [&_h2]:border-gray-100 [&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0 [&_h2:first-of-type]:mt-0
                [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2.5
                [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-gray-700
                [&_ul]:list-disc [&_ul]:pl-5 sm:[&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul]:text-gray-700
                [&_ol]:list-decimal [&_ol]:pl-5 sm:[&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-6 [&_ol]:text-gray-700
                [&_li]:leading-relaxed
                [&_strong]:font-semibold [&_strong]:text-gray-900
                [&_hr]:my-8 [&_hr]:border-gray-200
                [&_em]:text-gray-600
              "
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          {/* Sidebar Navigation & Support Column */}
          <aside className="lg:col-span-4 xl:col-span-4 space-y-6">
            {/* Quick Policy Navigation */}
            <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-base font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-black" />
                Danh mục chính sách
              </h2>

              <nav className="flex flex-col space-y-1.5 mb-6">
                {newsArticles.map((item) => {
                  const isActive = item.slug === article.slug;
                  return (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug}`}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-3 rounded-xl text-sm transition-all",
                        isActive
                          ? "bg-black text-white font-semibold shadow-xs"
                          : "text-gray-700 hover:bg-stone-100 hover:text-black font-medium"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        {isActive && <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />}
                        <span className="line-clamp-1">{item.title}</span>
                      </div>
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 flex-shrink-0 transition-transform",
                          isActive ? "text-white translate-x-0.5" : "text-gray-400"
                        )}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Support Info Card */}
              <div className="pt-5 border-t border-gray-100 space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Tổng đài hỗ trợ
                </h3>

                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="p-2 bg-stone-100 rounded-lg text-black mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Hotline CSKH</span>
                    <a
                      href="tel:19001234"
                      className="font-bold text-base text-gray-900 hover:underline"
                    >
                      1900 1234
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="p-2 bg-stone-100 rounded-lg text-black mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Email tư vấn</span>
                    <a
                      href="mailto:texclostore@gmail.com"
                      className="font-medium text-gray-900 hover:underline break-all"
                    >
                      texclostore@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="p-2 bg-stone-100 rounded-lg text-black mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Thời gian hoạt động</span>
                    <span className="font-medium text-gray-800">
                      08:00 - 22:00 tất cả các ngày
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-gray-200 mt-12 sm:mt-16 pt-8 sm:pt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Chính sách liên quan
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Tìm hiểu thêm về các quy định mua hàng tại TEXCLO
                </p>
              </div>
              <Link
                href="/news"
                className="text-xs sm:text-sm font-semibold text-black hover:underline inline-flex items-center gap-1"
              >
                Xem tất cả
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  href={`/news/${relatedArticle.slug}`}
                  className="group flex flex-col bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden hover:shadow-md hover:border-black transition-all"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                      <span className="font-semibold text-black">
                        {relatedArticle.category}
                      </span>
                      <span>•</span>
                      <span>{relatedArticle.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-black line-clamp-1 mb-2 transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-1">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="pt-3 mt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-black group-hover:underline">
                      Xem chi tiết →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
