package com.project.ClothingEcommerceWebsite.dtos.respond;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponse {
    private Long id;
    private String productName;
    private int quantity;
    private Double price;
}
