package com.lhdev.SpringCommerce.repository;

import com.lhdev.SpringCommerce.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
