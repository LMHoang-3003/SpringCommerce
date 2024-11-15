package com.lhdev.SpringCommerce.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private int status;
    private String message;
    private final LocalDateTime timeStamp = LocalDateTime.now();
    private String token;
    private String role;
    private String expirationTime;
    private int totalPage;
    private long totalElement;
    private AddressDTO address;
    private UserDTO user;
    private List<UserDTO> userList;
    private CategoryDTO category;
    private List<CategoryDTO> categoryList;
    private ProductDTO product;
    private List<ProductDTO> productList;
    private OrderItemDTO orderItem;
    private List<OrderItemDTO> orderItemList;
    private  OrderDTO order;
    private List<OrderDTO> orderList;
}
