"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  User,
  Package,
  LogOut,
  ChevronRight,
  Home,
  MapPin,
  Star,
} from "lucide-react";
import { toast } from "sonner";
interface UserLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  {
    href: "/user",
    label: "Thông Tin Cá Nhân",
    icon: User,
  },
  {
    href: "/user/orders",
    label: "Đơn Hàng",
    icon: Package,
  },
  {
    href: "/user/address",
    label: "Quản Lý Địa Chỉ",
    icon: MapPin,
  },
  {
    href: "/user/reviews",
    label: "Đánh Giá Sản Phẩm",
    icon: Star,
  },
];

export default function UserLayout({ children }: UserLayoutProps) {
  const pathname = usePathname();
  const { authUser, logout } = useAuthStore();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutDialog(false);
      window.location.href = "/";
    } catch {
      setShowLogoutDialog(false);
      toast.error("Đăng xuất thất bại");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Tài khoản</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* User Sidebar / Mobile Nav Bar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xs border border-stone-200/80 p-4 sm:p-6">
              {/* User Info */}
              <div className="flex items-center justify-between lg:justify-start lg:space-x-3 mb-3 lg:mb-6 pb-3 lg:pb-6 border-b border-stone-100">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs text-stone-500 font-medium tracking-wider uppercase">
                    Xin Chào!
                  </h3>
                  <p className="text-base sm:text-lg text-stone-900 truncate font-bold uppercase">
                    {authUser?.fullName}
                  </p>
                </div>
                {/* Logout Button on Mobile Header */}
                <div className="lg:hidden">
                  <AlertDialog
                    open={showLogoutDialog}
                    onOpenChange={setShowLogoutDialog}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 p-2 rounded-xl"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận đăng xuất</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleLogout}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Đăng Xuất
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* Navigation - Horizontal scroll on Mobile, Vertical list on Desktop */}
              <nav className="flex lg:flex-col overflow-x-auto gap-2 scrollbar-none py-1 lg:space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center whitespace-nowrap px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 shrink-0",
                        isActive
                          ? "bg-black text-white shadow-xs"
                          : "text-stone-700 hover:bg-stone-100 hover:text-stone-900 bg-stone-50 lg:bg-transparent"
                      )}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Logout Button on Desktop */}
              <div className="hidden lg:block mt-6 pt-6 border-t border-stone-100">
                <AlertDialog
                  open={showLogoutDialog}
                  onOpenChange={setShowLogoutDialog}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl border-stone-200"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      <span>Đăng Xuất</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xác nhận đăng xuất</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Đăng Xuất
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
          <div className="lg:col-span-9">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
