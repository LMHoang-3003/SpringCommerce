package com.lhdev.SpringCommerce.mapper;


import com.lhdev.SpringCommerce.dto.*;
import com.lhdev.SpringCommerce.entity.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EntityDTOMapper {
    //map user to DTO
    public UserDTO mapUserToDTO(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole().name());
        return userDTO;
    }
    //map address to DTO
    public AddressDTO mapAddressToDTO(Address address){
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setId(address.getId());
        addressDTO.setStreet(address.getStreet());
        addressDTO.setCity(address.getCity());
        addressDTO.setState(address.getState());
        addressDTO.setZipCode(address.getZipCode());
        addressDTO.setCountry(address.getCountry());
        return addressDTO;
    }
    //map category to DTO
    public CategoryDTO mapCategoryToDTO(Category category){
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        return categoryDTO;
    }
    //map orderitem to DTO
    public OrderItemDTO mapOrderItemToDTO(OrderItem orderItem){
        OrderItemDTO orderItemDTO = new OrderItemDTO();
        orderItemDTO.setId(orderItem.getId());
        orderItemDTO.setQuantity(orderItem.getQuantity());
        orderItemDTO.setPrice(orderItem.getPrice());
        orderItemDTO.setStatus(orderItem.getStatus().name());
        orderItemDTO.setCreatedAt(orderItem.getCreatedAt());
        return orderItemDTO;
    }
    //map product to DTO
    public ProductDTO mapProductToDTO(Product product){
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setBrand(product.getBrand());
        productDTO.setColor(product.getColor());
        productDTO.setPrice(product.getPrice());
        if(product.getCategory() != null){
            CategoryDTO categoryDTO = mapCategoryToDTO(product.getCategory());
            productDTO.setCategory(categoryDTO);
        }

        productDTO.setImageUrl(product.getImageUrl());
        return productDTO;
    }
    //map user to address
    public UserDTO mapUserToDTOPlusAddress(User user){
        UserDTO userDTO = mapUserToDTO(user);
        if(user.getAddress() != null){
            AddressDTO addressDTO = mapAddressToDTO(user.getAddress());
            userDTO.setAddress(addressDTO);
        }
        return userDTO;
    }
    //map orderitem to dto plus product
    public OrderItemDTO mapOrderItemToDTOPlusProduct(OrderItem orderItem){
        OrderItemDTO orderItemDTO = mapOrderItemToDTO(orderItem);
        if(orderItem.getProduct() != null){
            ProductDTO productDTO = mapProductToDTO(orderItem.getProduct());
            orderItemDTO.setProduct(productDTO);
        }
        return orderItemDTO;
    }
    //map orderitem to dto plus user and product
    public OrderItemDTO mapOrderItemDTOPlusUserAndProduct(OrderItem orderItem){
        OrderItemDTO orderItemDTO = mapOrderItemToDTOPlusProduct(orderItem);
        if(orderItem.getUser() != null){
            UserDTO userDTO = mapUserToDTOPlusAddress(orderItem.getUser());
            orderItemDTO.setUser(userDTO);
        }
        return orderItemDTO;
    }
    //map user to dto with address and order items history
    public UserDTO mapUserToDTOPlusAddressAndOrderHistory(User user){
        UserDTO userDTO = mapUserToDTOPlusAddress(user);
        if (user.getOrderItemList() != null && !user.getOrderItemList().isEmpty()){
            userDTO.setOrderItemList(user.getOrderItemList()
                    .stream()
                    .map(this::mapOrderItemToDTOPlusProduct)
                    .collect(Collectors.toList()));
        }
        return userDTO;
    }
}
