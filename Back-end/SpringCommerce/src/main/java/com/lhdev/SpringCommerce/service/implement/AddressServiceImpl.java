package com.lhdev.SpringCommerce.service.implement;

import com.lhdev.SpringCommerce.dto.AddressDTO;
import com.lhdev.SpringCommerce.dto.Response;
import com.lhdev.SpringCommerce.entity.Address;
import com.lhdev.SpringCommerce.entity.User;
import com.lhdev.SpringCommerce.repository.AddressRepository;
import com.lhdev.SpringCommerce.service.interfaces.AddressService;
import com.lhdev.SpringCommerce.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    private final UserService userService;

    @Override
    public Response saveAndUpdateAddress(AddressDTO addressDTO) {
        User user = userService.getLoginUser();
        Address address = user.getAddress();
        if(address == null){
            address = new Address();
            address.setUser(user);
        }
        if (addressDTO.getStreet() != null) address.setStreet(addressDTO.getStreet());
        if (addressDTO.getCity() != null) address.setCity(addressDTO.getCity());
        if (addressDTO.getState() != null) address.setState(addressDTO.getState());
        if (addressDTO.getZipCode() != null) address.setZipCode(addressDTO.getZipCode());
        if (addressDTO.getCountry() != null) address.setCountry(addressDTO.getCountry());

        addressRepository.save(address);

        String message = (user.getAddress() == null) ? "Address is created successfully" : "Address is updated successfully";

        return Response.builder()
                .status(200)
                .message(message)
                .build();
    }
}
