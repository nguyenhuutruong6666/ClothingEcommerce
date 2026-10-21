"use client";

import React, { useState } from "react";
import Link from "next/link";
import { newsArticles } from "@/data/news";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ!");
      return;
    }
    setIsSubscribed(true);
    toast.success("Cảm ơn bạn đã đăng ký nhận tin từ TEXCLO!");
    setEmail("");
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61582315304972",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@texclostore",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5.19-3L10 9v6z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-black text-white w-full border-t border-zinc-900">
      {/* Main Footer Container */}
      <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* Cột 1: Thông tin thương hiệu (5 cột trên desktop) */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <Link href="/" className="inline-block mb-3">
                <span className="font-extrabold text-2xl sm:text-3xl tracking-wider text-white uppercase">
                  TEXCLO
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4 max-w-sm">
                TEXCLO - Thương hiệu thời trang phong cách và hiện đại, mang đến sự tự tin, thoải mái và khác biệt trong từng thiết kế.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-zinc-400 mr-1 hidden sm:inline">
                  Kết nối:
                </span>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Cột 2: Chính sách bán hàng (3 cột trên desktop) */}
          <div className="sm:col-span-1 lg:col-span-3">
            <h3 className="font-bold text-sm sm:text-base uppercase tracking-wider text-white mb-3.5 sm:mb-4 pb-1.5 border-b border-zinc-800 inline-block">
              Chính sách bán hàng
            </h3>
            <ul className="space-y-2.5">
              {newsArticles.map((article) => (
                <li key={article.id}>
                  <Link
                    href={`/news/${article.slug}`}
                    className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {article.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Thông tin liên hệ & Hỗ trợ (4 cột trên desktop) */}
          <div className="sm:col-span-1 lg:col-span-4">
            <h3 className="font-bold text-sm sm:text-base uppercase tracking-wider text-white mb-3.5 sm:mb-4 pb-1.5 border-b border-zinc-800 inline-block">
              Thông tin liên hệ
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  136 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>
                  Hotline:{" "}
                  <a
                    href="tel:19001234"
                    className="text-white font-semibold hover:underline"
                  >
                    1900 1234
                  </a>{" "}
                  (8:00 - 22:00)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>
                  Email:{" "}
                  <a
                    href="mailto:texclostore@gmail.com"
                    className="text-white hover:underline"
                  >
                    texclostore@gmail.com
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>Mở cửa: 08:30 - 22:00 hàng ngày</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Methods */}
        <div className="border-t border-zinc-800/80 mt-8 sm:mt-10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 text-center sm:text-left">
            © {new Date().getFullYear()} TEXCLO. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
