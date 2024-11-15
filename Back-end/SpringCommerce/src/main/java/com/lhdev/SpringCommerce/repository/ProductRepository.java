package com.lhdev.SpringCommerce.repository;

import com.lhdev.SpringCommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByNameContainingOrDescriptionContaining(String name, String description);
    List<Product> findByColor(String color);
    List<Product> findByBrand(String brand);
}
