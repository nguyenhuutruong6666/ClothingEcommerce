"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Search, Menu, X, Phone, Mail, User, Headphones, ChevronDown } from "lucide-react";
import { CartSheet } from "@/components/common/CartSheet";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { useCategoryStore } from "@/stores/categoryStore";
import Logo from "../common/Logo";
import SearchBar from "../common/SearchBar";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openDesktopCategory, setOpenDesktopCategory] = useState<number | null>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const { authUser } = useAuthStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Click outside to close desktop category dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(event.target as Node)
      ) {
        setOpenDesktopCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCloseDesktopMenu = useCallback(() => {
    setOpenDesktopCategory(null);
  }, []);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      } else {
        setOpenDesktopCategory(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const parentCategories = categories.filter(
    (cat) => !cat.parentId && cat.isActive
  );

  const toggleCategory = useCallback((id: number) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  }, []);

  return (
    <>
      {/* Top Header Bar - Desktop */}
      <div className="bg-black text-white py-2 text-xs sm:text-sm hidden md:block">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>HOTLINE: 1900 1234</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden lg:inline">support@texclo.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Header Bar - Mobile */}
      <div className="bg-black text-white py-1.5 text-xs md:hidden">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Phone className="w-3 h-3" />
              <span>1900 1234</span>
            </div>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "bg-white/95 backdrop-blur-md border-b border-gray-200/70 sticky top-0 z-50 py-1 md:py-2 transition-all duration-200",
          scrolled && "shadow-md border-transparent"
        )}
      >
        <div className="w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="text-xl sm:text-2xl font-bold">
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav ref={desktopNavRef} className="hidden md:flex items-center gap-1 lg:gap-2">
              {/* Trang chủ */}
              <Link
                href="/"
                onClick={handleCloseDesktopMenu}
                className="px-2.5 lg:px-3 py-2 uppercase font-bold text-sm lg:text-base text-gray-800 hover:text-black hover:bg-gray-100/70 rounded-md transition-colors"
              >
                Trang chủ
              </Link>

              {parentCategories.map((parent) => {
                const children = categories.filter(
                  (child) =>
                    child.parentId?.id === parent.id && child.isActive
                );

                if (children.length === 0) {
                  return (
                    <Link
                      key={parent.id}
                      href={`/categories/${parent.slug}`}
                      onClick={handleCloseDesktopMenu}
                      className="px-2.5 lg:px-3 py-2 uppercase font-bold text-sm lg:text-base text-gray-800 hover:text-black hover:bg-gray-100/70 rounded-md transition-colors"
                    >
                      {parent.name}
                    </Link>
                  );
                }

                const isOpen = openDesktopCategory === parent.id;

                return (
                  <div key={parent.id} className="relative">
                    {/* Nút danh mục cấp 1 - Click để mở/đóng, không hover */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDesktopCategory((prev) =>
                          prev === parent.id ? null : parent.id
                        )
                      }
                      className={cn(
                        "flex items-center gap-1 px-2.5 lg:px-3 py-2 uppercase font-bold text-sm lg:text-base transition-colors rounded-md cursor-pointer select-none",
                        isOpen
                          ? "text-black bg-gray-100"
                          : "text-gray-800 hover:text-black hover:bg-gray-100/70"
                      )}
                      aria-expanded={isOpen}
                    >
                      <span>{parent.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-200 text-gray-500",
                          isOpen && "rotate-180 text-black"
                        )}
                      />
                    </button>

                    {/* Menu cấp 2 (Dropdown) - Căn thẳng hàng lề trái với menu cấp 1 (left-0), khi click mục con thì đóng menu */}
                    {isOpen && (
                      <div className="absolute top-full left-0 mt-1.5 w-48 sm:w-52 bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                        {/* Tất cả {parent.name} */}
                        <Link
                          href={`/categories/${parent.slug}`}
                          onClick={handleCloseDesktopMenu}
                          className="flex items-center justify-between px-3 py-2 text-xs uppercase font-bold tracking-wider text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 mb-1"
                        >
                          <span>Tất cả {parent.name}</span>
                          <span className="text-[11px] text-gray-400">→</span>
                        </Link>

                        {/* Danh sách danh mục con */}
                        <div className="flex flex-col space-y-0.5">
                          {children.map((child) => (
                            <Link
                              key={child.id}
                              href={`/categories/${parent.slug}/${child.slug}`}
                              onClick={handleCloseDesktopMenu}
                              className="block px-3 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100/80 rounded-lg transition-colors font-medium"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Tin tức */}
              <Link
                href="/news"
                onClick={handleCloseDesktopMenu}
                className="px-2.5 lg:px-3 py-2 uppercase font-bold text-sm lg:text-base text-gray-800 hover:text-black hover:bg-gray-100/70 rounded-md transition-colors"
              >
                Tin tức
              </Link>
            </nav>

            {/* Right Actions: Search, Cart, User, Hamburger */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
              {/* Desktop Search */}
              <SearchBar className="hidden md:block" />

              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700 hover:text-gray-900"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setIsMenuOpen(false);
                }}
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </Button>

              <CartSheet />

              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-gray-700 hover:text-gray-900 md:-mr-2"
              >
                <Link
                  href={authUser ? "/user" : "/user/login"}
                  aria-label="Tài khoản"
                >
                  <User className="w-5 h-5" />
                </Link>
              </Button>

              {/* Mobile Hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700 hover:text-gray-900 -mr-2"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setIsSearchOpen(false);
                }}
                aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Panel */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
              isSearchOpen ? "max-h-24 py-3 border-t" : "max-h-0"
            )}
          >
            <div className="bg-gray-50 rounded-lg px-2 py-2">
              <SearchBar
                isMobile={true}
                onClose={() => setIsSearchOpen(false)}
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
              isMenuOpen ? "max-h-screen border-t" : "max-h-0"
            )}
          >
            <nav className="py-2 space-y-0.5">
              <Link
                href="/"
                className="flex items-center px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>

              {parentCategories.map((parent) => {
                const children = categories.filter(
                  (child) =>
                    child.parentId &&
                    child.isActive &&
                    (typeof child.parentId === "object"
                      ? child.parentId.id === parent.id
                      : child.parentId === parent.id)
                );

                if (children.length === 0) {
                  return (
                    <Link
                      key={parent.id}
                      href={`/categories/${parent.slug}`}
                      className="flex items-center px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {parent.name}
                    </Link>
                  );
                }

                const isOpen = openCategory === parent.id;

                return (
                  <div key={parent.id}>
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => toggleCategory(parent.id)}
                    >
                      <span>{parent.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200 ease-in-out",
                        isOpen ? "max-h-96" : "max-h-0"
                      )}
                    >
                      <div className="pl-4 pb-2 space-y-0.5 border-l-2 border-gray-100 ml-4">
                        <Link
                          href={`/categories/${parent.slug}`}
                          className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Tất cả {parent.name}
                        </Link>
                        {children.map((child) => (
                          <Link
                            key={child.id}
                            href={`/categories/${parent.slug}/${child.slug}`}
                            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              <Link
                href="/news"
                className="flex items-center px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tin tức
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
