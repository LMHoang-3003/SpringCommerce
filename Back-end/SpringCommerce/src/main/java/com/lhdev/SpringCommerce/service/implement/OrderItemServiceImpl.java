package com.lhdev.SpringCommerce.service.implement;

import com.lhdev.SpringCommerce.dto.OrderItemDTO;
import com.lhdev.SpringCommerce.dto.OrderRequest;
import com.lhdev.SpringCommerce.dto.Response;
import com.lhdev.SpringCommerce.entity.Order;
import com.lhdev.SpringCommerce.entity.OrderItem;
import com.lhdev.SpringCommerce.entity.Product;
import com.lhdev.SpringCommerce.entity.User;
import com.lhdev.SpringCommerce.enums.OrderStatus;
import com.lhdev.SpringCommerce.exception.NotFoundException;
import com.lhdev.SpringCommerce.mapper.EntityDTOMapper;
import com.lhdev.SpringCommerce.repository.OrderItemRepository;
import com.lhdev.SpringCommerce.repository.OrderRepository;
import com.lhdev.SpringCommerce.repository.ProductRepository;
import com.lhdev.SpringCommerce.service.interfaces.OrderItemService;
import com.lhdev.SpringCommerce.service.interfaces.UserService;
import com.lhdev.SpringCommerce.specification.OrderItemSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private final EntityDTOMapper entityDTOMapper;

    @Override
    public Response createOrder(OrderRequest orderRequest) {
        User user = userService.getLoginUser();

        List<OrderItem> orderItems = orderRequest.getItems().stream().map(orderItemRequest -> {
            Product product = productRepository.findById(orderItemRequest.getProductId()).orElseThrow(() -> new NotFoundException("No product found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(orderItemRequest.getQuantity());
            orderItem.setPrice(product.getPrice().multiply(BigDecimal.valueOf(orderItemRequest.getQuantity()))); //tien = soluong x tien/mon
            orderItem.setStatus(OrderStatus.PENDING);
            orderItem.setUser(user);
            return orderItem;
        }).collect(Collectors.toList());

        //tinh tong tien
        BigDecimal totalPrice = orderRequest.getTotalPrice() != null && orderRequest.getTotalPrice().compareTo(BigDecimal.ZERO) > 0 ?
                orderRequest.getTotalPrice() : orderItems.stream().map(OrderItem::getPrice).reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setOrderItemList(orderItems);
        order.setTotalPrice(totalPrice);

        orderItems.forEach(orderItem -> {
            orderItem.setOrder(order);
        });
        orderRepository.save(order);

        return Response.builder()
                .status(200)
                .message("Order created successfully")
                .build();
    }

    @Override
    public Response updateOrderItemStatus(Long orderItemId, String status) {
        OrderItem orderItem = orderItemRepository.findById(orderItemId).orElseThrow(() -> new NotFoundException("No orderItem found"));
        orderItem.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        orderItemRepository.save(orderItem);

        return Response.builder()
                .status(200)
                .message("Order status updated successfully")
                .build();

    }

    @Override
    public Response retrieveFilteredOrderItems(OrderStatus status, Long itemId, Pageable pageable, LocalDateTime from, LocalDateTime to) {
        Specification<OrderItem> specOrderItem = Specification.where(OrderItemSpecification.isStatus(status))
                .and(OrderItemSpecification.isCreatedBetweenTime(from, to))
                .and(OrderItemSpecification.isHasItemId(itemId));

        Page<OrderItem> orderItemPage = orderItemRepository.findAll(specOrderItem, pageable);
        if(orderItemPage.isEmpty()){
            throw new NotFoundException("No order found");
        }
        List<OrderItemDTO> orderItemDTOS = orderItemPage.getContent()
                .stream()
                .map(entityDTOMapper::mapOrderItemDTOPlusUserAndProduct)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .orderItemList(orderItemDTOS)
                .totalPage(orderItemPage.getTotalPages())
                .totalElement(orderItemPage.getTotalElements())
                .build();

    }

    @Override
    public Response deleteOrderItem(Long orderItemId) {
        OrderItem orderItem = orderItemRepository.findById(orderItemId).orElseThrow(() -> new NotFoundException("No orderItem found"));
        orderItemRepository.delete(orderItem);

        return Response.builder()
                .status(200)
                .message("Order deleted successfully")
                .build();
    }
}
