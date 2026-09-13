"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Search, Menu, X, Phone, Mail, User, Headphones, ChevronDown } from "lucide-react";
import { CartSheet } from "@/components/common/CartSheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { useCategoryStore } from "@/stores/categoryStore";
import Logo from "../common/Logo";
import SearchBar from "../common/SearchBar";

// Component ListItem
const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children?: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "space-y-1 rounded-md p-3 leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent",
            className
          )}
          {...props}
        >
          <div className="text-sm text-left uppercase font-medium leading-none">
            {title}
          </div>
          <p className="text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const { authUser } = useAuthStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
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
        <div className="container mx-auto px-4">
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
            <div className="flex items-center space-x-4 lg:space-x-6">
              <Link
                href="/support"
                className="hover:cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Headphones className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>SUPPORT</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Top Header Bar - Mobile */}
      <div className="bg-black text-white py-1.5 text-xs md:hidden">
        <div className="container mx-auto px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Phone className="w-3 h-3" />
              <span>1900 1234</span>
            </div>
            <Link href="/support" className="transition-colors">
              <div className="flex items-center space-x-1.5">
                <Headphones className="w-3 h-3" />
                <span>SUPPORT</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "bg-white sticky top-0 z-50 py-1 md:py-2 px-2 transition-shadow duration-200",
          scrolled && "shadow-md"
        )}
      >
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="text-xl sm:text-2xl font-bold">
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Trang chủ */}
                  <NavigationMenuItem className="px-1 lg:px-2">
                    <Link href="/">
                      <NavigationMenuLink asChild>
                        <span className="uppercase font-bold text-sm lg:text-base">Trang chủ</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  {parentCategories.map((parent) => {
                    const children = categories.filter(
                      (child) =>
                        child.parentId?.id === parent.id && child.isActive
                    );
                    if (children.length === 0) {
                      return (
                        <NavigationMenuItem key={parent.id} className="px-1 lg:px-2">
                          <Link href={`/categories/${parent.slug}`}>
                            <NavigationMenuLink asChild>
                              <span className="uppercase font-bold text-sm lg:text-base">
                                {parent.name}
                              </span>
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                      );
                    }

                    return (
                      <NavigationMenuItem key={parent.id} className="px-1 lg:px-2">
                        <NavigationMenuTrigger className="uppercase font-bold text-sm lg:text-base">
                          <Link
                            href={`/categories/${parent.slug}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {parent.name}
                          </Link>
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                          <ul className="grid w-[320px] gap-2 md:w-[400px] md:grid-cols-2 lg:w-[500px] p-3 md:p-4">
                            {children.map((child) => (
                              <ListItem
                                key={child.id}
                                title={child.name}
                                href={`/categories/${parent.slug}/${child.slug}`}
                              ></ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  })}

                  <NavigationMenuItem className="px-1 lg:px-2">
                    <Link href="/news">
                      <NavigationMenuLink asChild>
                        <span className="uppercase font-bold text-sm lg:text-base">Tin tức</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Actions: Search, Cart, User, Hamburger */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
              {/* Desktop Search */}
              <SearchBar className="hidden md:block" />

              {/* Mobile Search Button */}
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setIsMenuOpen(false);
                }}
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </button>

              <CartSheet />

              <Link
                href={authUser ? "/user" : "/user/login"}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Tài khoản"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
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
              </button>
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
