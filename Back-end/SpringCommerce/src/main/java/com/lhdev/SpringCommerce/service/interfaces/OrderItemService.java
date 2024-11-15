package com.lhdev.SpringCommerce.service.interfaces;

import com.lhdev.SpringCommerce.dto.OrderRequest;
import com.lhdev.SpringCommerce.dto.Response;
import com.lhdev.SpringCommerce.enums.OrderStatus;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface OrderItemService {
    Response createOrder(OrderRequest orderRequest);
    Response updateOrderItemStatus(Long orderItemId, String status);
    Response retrieveFilteredOrderItems(OrderStatus status, Long itemId, Pageable pageable, LocalDateTime from, LocalDateTime to);
    Response deleteOrderItem(Long orderItemId);
}
