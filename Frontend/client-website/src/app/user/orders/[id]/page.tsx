"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrderStore } from "@/stores/orderStore";
import { InvoiceTemplate } from "@/components/common/InvoiceTemplate";
import { CancelOrderDialog } from "@/components/common/CancelOrderDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import UserLayout from "@/components/layouts/UserLayout";
import { OrderStatus } from "@/stores/orderStore";
import { toast } from "sonner";
import useAuthStore from "@/stores/useAuthStore";
export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = parseInt(params.id as string, 10);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const { authUser } = useAuthStore();
  const { currentOrder, isLoading, fetchOrderById, cancelOrder } =
    useOrderStore();

  useEffect(() => {
    if (orderId && !isNaN(orderId)) {
      fetchOrderById(orderId);
    }
  }, [orderId, fetchOrderById]);
  const handleGoBack = () => {
    router.replace("/user/orders");
  };
  const canCancelOrder = (status: OrderStatus): boolean => {
    return status === "NEW" || status === "CONFIRMED";
  };
  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!authUser?.id) {
      toast.error("Vui lòng đăng nhập để hủy đơn hàng!");
      return;
    }
    try {
      await cancelOrder(authUser.id, orderId);
      setIsCancelDialogOpen(false);
      toast.success("Đơn hàng đã được hủy thành công!");

      // Show refund info if payment was made
      if (
        currentOrder?.paymentMethod === "WALLET" &&
        currentOrder?.paymentStatus === "PAID"
      ) {
        toast.info("Quy trình hoàn tiền đã được khởi tạo.");
      }
    } catch (error) {
      toast.error("Không thể hủy đơn hàng. Vui lòng thử lại!");
      console.error("Error cancelling order:", error);
    }
  };
  if (isLoading) {
    return (
      <UserLayout>
        <div className="space-y-6">
          <div className="mb-6">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-96" />
        </div>
      </UserLayout>
    );
  }

  if (!currentOrder) {
    return (
      <UserLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy đơn hàng
          </h2>
          <p className="text-gray-600 mb-6">
            Đơn hàng bạn tìm kiếm không tồn tại hoặc có thể đã bị xóa.
          </p>
          <Button onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại đơn hàng
          </Button>
        </div>
      </UserLayout>
    );
  }

  // Normal view layout
  return (
    <UserLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleGoBack} className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Hóa đơn</h1>
                <p className="text-gray-600">Order #{currentOrder.code}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {/* Cancel Button - Only for NEW or CONFIRMED orders */}
              {canCancelOrder(currentOrder.status) && (
                <Button
                  variant="destructive"
                  onClick={() => setIsCancelDialogOpen(true)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Hủy đơn hàng
                </Button>
              )}

              {/* Info if order cannot be cancelled */}
              {!canCancelOrder(currentOrder.status) &&
                currentOrder.status !== "CANCELLED" && (
                  <p className="text-sm text-gray-500 italic flex items-center">
                    <span className="mr-2">🚫</span>
                    Đơn hàng không thể hủy
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <InvoiceTemplate order={currentOrder} />

        {/* Cancel Order Dialog */}
        <CancelOrderDialog
          open={isCancelDialogOpen}
          onOpenChange={setIsCancelDialogOpen}
          onConfirm={handleCancelOrder}
          orderCode={currentOrder.code}
          paymentMethod={currentOrder.paymentMethod}
          paymentStatus={currentOrder.paymentStatus}
        />
      </div>
    </UserLayout>
  );
}
