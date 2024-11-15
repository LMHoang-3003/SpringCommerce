package com.lhdev.SpringCommerce.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.lhdev.SpringCommerce.entity.OrderItem;
import lombok.*;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private String phoneNumber;
    private String password;
    private String role;
    private List<OrderItemDTO> orderItemList;
    private AddressDTO address;


    public UserDTO(long l, String mail, String name, String number, String role) {
        this.id = l;
        this.email = mail;
        this.name = name;
        this.phoneNumber = number;
        this.role = role;
    }
}
