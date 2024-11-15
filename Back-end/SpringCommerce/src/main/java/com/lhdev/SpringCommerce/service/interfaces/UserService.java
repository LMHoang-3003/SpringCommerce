package com.lhdev.SpringCommerce.service.interfaces;

import com.lhdev.SpringCommerce.dto.LoginRequest;
import com.lhdev.SpringCommerce.dto.Response;
import com.lhdev.SpringCommerce.dto.UserDTO;
import com.lhdev.SpringCommerce.entity.User;

public interface UserService {
    Response registerUser(UserDTO regisRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
    Response getUserInfoAndOrderHistory();
}
