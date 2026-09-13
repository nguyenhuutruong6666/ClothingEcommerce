"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Order } from "@/stores/orderStore";
import { OrderStatusBadge, PaymentMethodBadge } from "./StatusBadges";
import { useRouter } from "next/navigation";
import { formatDate, formatPrice } from "@/lib/utils";
interface OrderTableProps {
  orders: Order[];
}

export function OrderTable({ orders }: OrderTableProps) {
  const router = useRouter();

  const handleViewInvoice = (orderId: number) => {
    router.push(`/user/orders/${orderId}`);
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <div className="text-gray-500 text-lg mb-2">
          Không tìm thấy đơn hàng
        </div>
        <div className="text-gray-400">
          Thử điều chỉnh bộ lọc để xem thêm kết quả
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Card View (< 640px) */}
      <div className="block sm:hidden space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg border p-4 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-gray-900 text-sm">#{order.code}</span>
              <OrderStatusBadge status={order.status} />
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>
                <span className="block text-gray-400">Thời gian đặt</span>
                <span>{formatDate(order.createdAt || "")}</span>
              </div>
              <div>
                <span className="block text-gray-400">Phương thức</span>
                <PaymentMethodBadge method={order.paymentMethod} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div>
                <span className="text-xs text-gray-400 block">Tổng tiền</span>
                <span className="font-semibold text-base text-gray-900">
                  {formatPrice(order.grandTotal)}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-xs"
                onClick={() => handleViewInvoice(order.id)}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Xem chi tiết</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View (>= 640px) */}
      <div className="hidden sm:block bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">
                MÃ ĐƠN HÀNG
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                THỜI GIAN ĐẶT
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                PHƯƠNG THỨC
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                SỐ TIỀN
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                TRẠNG THÁI
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                HÓA ĐƠN
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">#{order.code}</TableCell>
                <TableCell className="text-gray-600">
                  {formatDate(order.createdAt || "")}
                </TableCell>
                <TableCell>
                  <PaymentMethodBadge method={order.paymentMethod} />
                </TableCell>
                <TableCell className="font-medium">
                  {formatPrice(order.grandTotal)}
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleViewInvoice(order.id)}
                      title="Xem hóa đơn"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
