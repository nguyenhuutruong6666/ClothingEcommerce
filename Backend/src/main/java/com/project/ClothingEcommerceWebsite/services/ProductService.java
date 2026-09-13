package com.project.ClothingEcommerceWebsite.services;

import com.project.ClothingEcommerceWebsite.dtos.request.CreateProductVariantRequest;
import com.project.ClothingEcommerceWebsite.dtos.respond.ProductResponse;
import com.project.ClothingEcommerceWebsite.models.Product;

import java.util.List;

public interface ProductService {
    Product createProductWithVariants(CreateProductVariantRequest request);
    List<ProductResponse> getAllProduct();
    List<ProductResponse> searchByName(String name);
    ProductResponse getProductById(Long id);
    Product updateProduct(Long id, CreateProductVariantRequest request);
    void deleteProduct(Long id);
}
