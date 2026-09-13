"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // ["Admin", "Staff"]
  requireAdmin?: boolean;
  requireStaff?: boolean; // Cho phép cả Admin và Staff
  fallback?: React.ReactNode;
}

export function RoleGuard({
  children,
  allowedRoles,
  requireAdmin = false,
  requireStaff = false,
  fallback,
}: RoleGuardProps) {
  const router = useRouter();
  const { authUser, hasRole, isAdmin, isAdminOrStaff } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Xác định roles được phép
  const hasAccess = (() => {
    if (!mounted) return true;
    if (requireAdmin) return isAdmin();
    if (requireStaff) return isAdminOrStaff();
    if (allowedRoles && allowedRoles.length > 0) {
      return allowedRoles.some((role) => hasRole(role));
    }
    return true; // Nếu không có điều kiện gì -> cho phép
  })();

  useEffect(() => {
    // Nếu đã có user nhưng không có quyền -> redirect về dashboard
    if (mounted && authUser && !hasAccess) {
      router.push("/");
    }
  }, [mounted, authUser, hasAccess, router]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Nếu không có quyền
  if (!hasAccess) {
    // Hiển thị fallback nếu có
    if (fallback) {
      return <>{fallback}</>;
    }

    // Hiển thị UI mặc định
    return (
      <div className="flex h-screen items-center justify-center bg-background p-4">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle>Không có quyền truy cập</CardTitle>
            </div>
            <CardDescription>
              Bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị
              viên nếu bạn cho rằng đây là lỗi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm">
                <strong>Vai trò hiện tại:</strong>{" "}
                {authUser?.roles?.map((r) => r.name).join(", ") ||
                  "Không xác định"}
              </p>
              <p className="text-sm mt-2">
                <strong>Yêu cầu:</strong>{" "}
                {requireAdmin
                  ? "Admin"
                  : requireStaff
                  ? "Admin hoặc Staff"
                  : allowedRoles?.join(", ") || "Không xác định"}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/")} className="w-full">
              Quay về Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Có quyền -> hiển thị children
  return <>{children}</>;
}
