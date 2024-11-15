package com.lhdev.SpringCommerce.service.interfaces;

import com.lhdev.SpringCommerce.dto.Response;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public interface ProductService {
    Response createProduct(Long categoryId, String name, String description, String brand, String color, MultipartFile file, BigDecimal price);
    Response updateProduct(Long productId, Long categoryId, String name, String description, String brand, String color, MultipartFile file, BigDecimal price);
    Response deleteProduct(Long productId);
    Response getProductById(Long productId);
    Response getAllProducts();
    Response getProductsByCategoryId(Long categoryId);
    Response getProductsByBrand(String brand);
    Response getProductsByColor(String color);
    Response searchProduct(String keyword);
}
