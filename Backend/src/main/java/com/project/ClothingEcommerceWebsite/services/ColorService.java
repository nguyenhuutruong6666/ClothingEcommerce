package com.project.ClothingEcommerceWebsite.services;

import com.project.ClothingEcommerceWebsite.dtos.request.CreateColorRequest;
import com.project.ClothingEcommerceWebsite.models.Color;

import java.util.List;

public interface ColorService {
    Color createColor(CreateColorRequest request);
    Color getColorById(Long id);
    List<Color> getAllColors();
    Color updateColor(Long id, CreateColorRequest request);
    void deleteColor(Long id);
}
