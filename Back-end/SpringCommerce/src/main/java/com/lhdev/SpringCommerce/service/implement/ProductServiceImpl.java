package com.lhdev.SpringCommerce.service.implement;

import com.lhdev.SpringCommerce.dto.ProductDTO;
import com.lhdev.SpringCommerce.dto.Response;
import com.lhdev.SpringCommerce.entity.Category;
import com.lhdev.SpringCommerce.entity.Product;
import com.lhdev.SpringCommerce.exception.NotFoundException;
import com.lhdev.SpringCommerce.mapper.EntityDTOMapper;
import com.lhdev.SpringCommerce.repository.CategoryRepository;
import com.lhdev.SpringCommerce.repository.ProductRepository;
import com.lhdev.SpringCommerce.service.AwsS3Service;
import com.lhdev.SpringCommerce.service.interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final EntityDTOMapper entityDTOMapper;
    private final AwsS3Service awsS3Service;

    @Override
    public Response createProduct(Long categoryId, String name, String description, String brand, String color, MultipartFile file, BigDecimal price) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new NotFoundException("Category not found"));
        String productImgURL = awsS3Service.saveImgToS3(file);
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setBrand(brand);
        product.setColor(color);
        product.setCategory(category);
        product.setPrice(price);
        product.setImageUrl(productImgURL);
        productRepository.save(product);

        return Response.builder()
                .status(200)
                .message("Product is created successfully")
                .build();

    }

    @Override
    public Response updateProduct(Long productId, Long categoryId, String name, String description, String brand, String color, MultipartFile file, BigDecimal price) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException("Product not found"));
        Category category = null;
        String productImgURL = null;
        if(categoryId != null) {
            category = categoryRepository.findById(categoryId).orElseThrow(() -> new NotFoundException("Category not found"));
        }
        if (file != null && !file.isEmpty()) {
            productImgURL = awsS3Service.saveImgToS3(file);
        }
        if(category != null) {product.setCategory(category);}
        if(name != null && !name.isEmpty()) {product.setName(name);}
        if(price != null) {product.setPrice(price);}
        if(description != null && !description.isEmpty()) {product.setDescription(description);}
        if(brand != null && !brand.isEmpty()) {product.setBrand(brand);}
        if(color != null && !color.isEmpty()) {product.setColor(color);}
        if(productImgURL != null && !productImgURL.isEmpty()) {product.setImageUrl(productImgURL);}
        productRepository.save(product);

        return Response.builder()
                .status(200)
                .message("Product is updated successfully")
                .build();
    }

    @Override
    public Response deleteProduct(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException("Product not found"));
        productRepository.delete(product);

        return Response.builder()
                .status(200)
                .message("Product is deleted successfully")
                .build();
    }

    @Override
    public Response getProductById(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException("Product not found"));
        ProductDTO productDTO = entityDTOMapper.mapProductToDTO(product);

        return Response.builder()
                .status(200)
                .product(productDTO)
                .build();
    }

    @Override
    public Response getAllProducts() {
        Page<Product> productPage = productRepository.findAll(
                PageRequest.of(0, 100, Sort.Direction.DESC, "id")
        );
        List<ProductDTO> products = productPage.getContent()
                .stream()
                .map(entityDTOMapper::mapProductToDTO)
                .collect(Collectors.toList());
//        List<ProductDTO> products = productRepository.findAll(Sort.by(Sort.Direction.DESC, "id"))
//                .stream()
//                .map(entityDTOMapper::mapProductToDTO)
//                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(products)
                .totalPage(productPage.getTotalPages())
                .totalElement(productPage.getTotalElements())
                .build();

    }

    @Override
    public Response getProductsByCategoryId(Long categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        if(products.isEmpty()){
            throw new NotFoundException("No products in this category");
        }
        List<ProductDTO> productDTOS = products.stream()
                .map(entityDTOMapper::mapProductToDTO)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productDTOS)
                .build();

    }

    @Override
    public Response getProductsByBrand(String brand) {
        List<Product> products = productRepository.findByBrand(brand);
        if(products.isEmpty()){
            throw new NotFoundException("No products in this brand");
        }
        List<ProductDTO> productDTOS = products.stream()
                .map(entityDTOMapper::mapProductToDTO)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productDTOS)
                .build();
    }

    @Override
    public Response getProductsByColor(String color) {
        List<Product> products = productRepository.findByColor(color);
        if(products.isEmpty()){
            throw new NotFoundException("There is no product with this color");
        }
        List<ProductDTO> productDTOS = products.stream()
                .map(entityDTOMapper::mapProductToDTO)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productDTOS)
                .build();
    }

    @Override
    public Response searchProduct(String keyword) {
        List<Product> products = productRepository.findByNameContainingOrDescriptionContaining(keyword, keyword);
        if(products.isEmpty()){
            throw new NotFoundException("No products found");
        }
        List<ProductDTO> productDTOS = products.stream()
                .map(entityDTOMapper::mapProductToDTO)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productDTOS)
                .build();

    }
}
