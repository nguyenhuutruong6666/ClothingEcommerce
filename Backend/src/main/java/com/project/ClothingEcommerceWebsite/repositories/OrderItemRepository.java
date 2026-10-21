package com.project.ClothingEcommerceWebsite.repositories;

import com.project.ClothingEcommerceWebsite.models.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderId(Long orderId);
    boolean existsByProductId(Long productId);
    boolean existsByVariantId(Long variantId);
    List<Long> findVariantIdsByProductId(Long productId);

    @Query(value = "SELECT oi.product_id, COALESCE(SUM(oi.quantity), 0) FROM order_items oi LEFT JOIN orders o ON oi.order_id = o.id WHERE oi.product_id IS NOT NULL AND (o.status IS NULL OR o.status != 'CANCELLED') GROUP BY oi.product_id", nativeQuery = true)
    List<Object[]> getSoldCountsByProductId();

    @Query(value = "SELECT COALESCE(SUM(oi.quantity), 0) FROM order_items oi LEFT JOIN orders o ON oi.order_id = o.id WHERE oi.product_id = :productId AND (o.status IS NULL OR o.status != 'CANCELLED')", nativeQuery = true)
    Long getSoldCountByProductId(@Param("productId") Long productId);
}
