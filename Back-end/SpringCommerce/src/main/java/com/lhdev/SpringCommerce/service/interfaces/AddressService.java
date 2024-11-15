package com.lhdev.SpringCommerce.service.interfaces;

import com.lhdev.SpringCommerce.dto.AddressDTO;
import com.lhdev.SpringCommerce.dto.Response;

public interface AddressService {
    Response saveAndUpdateAddress(AddressDTO addressDTO);
}
