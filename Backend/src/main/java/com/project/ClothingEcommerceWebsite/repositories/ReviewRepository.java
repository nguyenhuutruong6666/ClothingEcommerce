package com.project.ClothingEcommerceWebsite.repositories;

import com.project.ClothingEcommerceWebsite.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByUserIdAndOrderId(Long userId, Long orderId);
    void deleteAllByUserId(Long userId);
    void deleteAllByProductId(Long productId);
    List<Review> findAllByProductId(Long productId);
    List<Review> findAllByUserId(Long userId);
    List<Review> findAllByProduct_IdIn(List<Long> productIds);
}
