package com.lhdev.SpringCommerce.repository;

import com.lhdev.SpringCommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
