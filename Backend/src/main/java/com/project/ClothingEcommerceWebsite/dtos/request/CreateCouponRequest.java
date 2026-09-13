package com.project.ClothingEcommerceWebsite.dtos.request;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCouponRequest {
    private String code;
    private String name;
    private String description;
    private Double value;
    private Integer maxUses;
    private Integer maxUsesPerUser;
    private Double minOrderTotal;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime startsAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime endsAt;
    private Boolean isActive;
    private String keepImageUrl;
}
