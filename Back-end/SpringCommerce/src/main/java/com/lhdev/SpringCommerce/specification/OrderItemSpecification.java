package com.lhdev.SpringCommerce.specification;

import com.lhdev.SpringCommerce.entity.OrderItem;
import com.lhdev.SpringCommerce.enums.OrderStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class OrderItemSpecification {
    //hien cac orderitem theo trang thai(status)
    public static Specification<OrderItem> isStatus(OrderStatus status) {
        return ((root, query, criteriaBuilder) ->
                status != null ? criteriaBuilder.equal(root.get("status"), status) : null);
    }
    //hien cac orderitem theo thoi gian
    public static Specification<OrderItem> isCreatedBetweenTime(LocalDateTime startDate, LocalDateTime endDate) {
        return ((root, query, criteriaBuilder) ->{
           if(startDate != null && endDate != null)  {
               return criteriaBuilder.between(root.get("createdAt"), startDate, endDate);
           }else if(startDate != null)  {
               return criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), startDate);
           }else if(endDate != null)  {
               return criteriaBuilder.lessThanOrEqualTo(root.get("createdAt"), endDate);
           }else{
               return null;
           }
        });
    }
    public static Specification<OrderItem> isHasItemId(Long itemId) {
        return ((root, query, criteriaBuilder) ->
                itemId != null ? criteriaBuilder.equal(root.get("id"), itemId) : null);
    }
}

