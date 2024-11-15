package com.lhdev.SpringCommerce.service.implement;

import com.lhdev.SpringCommerce.dto.CategoryDTO;
import com.lhdev.SpringCommerce.dto.Response;
import com.lhdev.SpringCommerce.entity.Category;
import com.lhdev.SpringCommerce.exception.NotFoundException;
import com.lhdev.SpringCommerce.mapper.EntityDTOMapper;
import com.lhdev.SpringCommerce.repository.CategoryRepository;
import com.lhdev.SpringCommerce.service.interfaces.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final EntityDTOMapper entityDTOMapper;

    @Override
    public Response createCategory(CategoryDTO categoryRequest) {
        Category category = new Category();
        category.setName(categoryRequest.getName());
        categoryRepository.save(category);
        return Response.builder()
                .status(200)
                .message("Category is created successfully")
                .build();
    }

    @Override
    public Response updateCategory(Long categoryId, CategoryDTO categoryRequest) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(()-> new NotFoundException("Category Not Found"));
        category.setName(categoryRequest.getName());
        categoryRepository.save(category);
        return Response.builder()
                .status(200)
                .message("Category is successfully updated")
                .build();
    }

    @Override
    public Response deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(()-> new NotFoundException("Category Not Found"));
        categoryRepository.delete(category);
        return Response.builder()
                .status(200)
                .message("Category is successfully deleted")
                .build();

    }

    @Override
    public Response getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOS = categories.stream()
                .map(entityDTOMapper::mapCategoryToDTO)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .categoryList(categoryDTOS)
                .build();
    }

    @Override
    public Response getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(()-> new NotFoundException("Category Not Found"));
        CategoryDTO categoryDTO = entityDTOMapper.mapCategoryToDTO(category);
        return Response.builder()
                .status(200)
                .category(categoryDTO)
                .build();
    }
}
