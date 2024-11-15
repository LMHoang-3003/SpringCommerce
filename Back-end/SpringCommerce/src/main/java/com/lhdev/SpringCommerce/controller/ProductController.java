package com.lhdev.SpringCommerce.controller;

import com.lhdev.SpringCommerce.dto.Response;
import com.lhdev.SpringCommerce.exception.InvalidCredentialException;
import com.lhdev.SpringCommerce.service.interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> createProduct(@RequestParam Long categoryId,
                                                  @RequestParam String name,
                                                  @RequestParam String description,
                                                  @RequestParam String brand,
                                                  @RequestParam String color,
                                                  @RequestParam MultipartFile image,
                                                  @RequestParam BigDecimal price){

        if(categoryId == null || name == null || description == null || brand == null || color == null || image == null || price == null){
            throw new InvalidCredentialException("All properties are required");
        }
        return ResponseEntity.ok(productService.createProduct(categoryId, name, description, brand, color, image, price));
    }
    @PutMapping("/update/{productId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateProduct(@PathVariable Long productId,
                                                  @RequestParam(required = false) Long categoryId,
                                                  @RequestParam(required = false) String name,
                                                  @RequestParam(required = false) String description,
                                                  @RequestParam(required = false) String brand,
                                                  @RequestParam(required = false) String color,
                                                  @RequestParam(required = false) MultipartFile image,
                                                  @RequestParam(required = false) BigDecimal price){
        return ResponseEntity.ok(productService.updateProduct(productId, categoryId, name, description, brand, color, image, price));
    }

    @DeleteMapping("/delete/{productId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteProduct(@PathVariable Long productId){
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }
    @GetMapping("/products")
    public ResponseEntity<Response> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<Response> getProductById(@PathVariable Long productId){
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @GetMapping("/products/category/{categoryId}")
    public ResponseEntity<Response> getAllProductsByCategory(@PathVariable Long categoryId){
        return ResponseEntity.ok(productService.getProductsByCategoryId(categoryId));
    }

    @GetMapping("/products/brand")
    public ResponseEntity<Response> getAllProductsByBrand(@RequestParam String brandName){
        return ResponseEntity.ok(productService.getProductsByBrand(brandName));
    }
    @GetMapping("/products/color")
    public ResponseEntity<Response> getAllProductsByColor(@RequestParam String color){
        return ResponseEntity.ok(productService.getProductsByColor(color));
    }
    @GetMapping("/products/search")
    public ResponseEntity<Response> searchForProduct(@RequestParam String keyword){
        return ResponseEntity.ok(productService.searchProduct(keyword));
    }


}
