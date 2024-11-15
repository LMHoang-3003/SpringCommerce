package com.lhdev.SpringCommerce.controller;

import com.lhdev.SpringCommerce.dto.OrderRequest;
import com.lhdev.SpringCommerce.dto.Response;
import com.lhdev.SpringCommerce.enums.OrderStatus;
import com.lhdev.SpringCommerce.service.interfaces.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderItemController {
    private final OrderItemService orderItemService;

    @PostMapping("/create")
    public ResponseEntity<Response> createOrder(@RequestBody OrderRequest orderRequest){
        return ResponseEntity.ok(orderItemService.createOrder(orderRequest));
    }

    @PutMapping("/update/{orderItemId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateOrder(@PathVariable Long orderItemId, @RequestParam String orderStatus){
        return ResponseEntity.ok(orderItemService.updateOrderItemStatus(orderItemId, orderStatus));
    }
    @DeleteMapping("/delete/{orderItemId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteOrder(@PathVariable Long orderItemId){
        return ResponseEntity.ok(orderItemService.deleteOrderItem(orderItemId));
    }

    @GetMapping("/filter")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> filterOrderItems(@RequestParam(required = false) Long itemId,
                                                     @RequestParam(required = false) String status,
                                                     @RequestParam(defaultValue = "1") int page,
                                                     @RequestParam(defaultValue = "100") int size,
                                                     @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
                                                     @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate){
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "id"));
        OrderStatus orderStatus = status != null ? OrderStatus.valueOf(status.toUpperCase()) : null;
        return ResponseEntity.ok(orderItemService.retrieveFilteredOrderItems(orderStatus, itemId, pageable, startDate, endDate));
    }
}
