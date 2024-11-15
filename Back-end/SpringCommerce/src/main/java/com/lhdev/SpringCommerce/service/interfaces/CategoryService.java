package com.lhdev.SpringCommerce.service.interfaces;

import com.lhdev.SpringCommerce.dto.CategoryDTO;
import com.lhdev.SpringCommerce.dto.Response;

public interface CategoryService {
    Response createCategory(CategoryDTO categoryRequest);
    Response updateCategory(Long categoryId, CategoryDTO categoryRequest);
    Response deleteCategory(Long categoryId);
    Response getAllCategories();
    Response getCategoryById(Long categoryId);

}
