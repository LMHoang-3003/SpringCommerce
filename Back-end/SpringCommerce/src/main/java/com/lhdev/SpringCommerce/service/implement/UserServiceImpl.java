package com.lhdev.SpringCommerce.service.implement;

import com.lhdev.SpringCommerce.dto.AddressDTO;
import com.lhdev.SpringCommerce.dto.LoginRequest;
import com.lhdev.SpringCommerce.dto.Response;
import com.lhdev.SpringCommerce.dto.UserDTO;
import com.lhdev.SpringCommerce.entity.User;
import com.lhdev.SpringCommerce.enums.UserRole;
import com.lhdev.SpringCommerce.exception.InvalidCredentialException;
import com.lhdev.SpringCommerce.exception.NotFoundException;
import com.lhdev.SpringCommerce.mapper.EntityDTOMapper;
import com.lhdev.SpringCommerce.repository.UserRepository;
import com.lhdev.SpringCommerce.security.AuthenticationUser;
import com.lhdev.SpringCommerce.security.JwtUtils;
import com.lhdev.SpringCommerce.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.awt.dnd.InvalidDnDOperationException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EntityDTOMapper entityDTOMapper;

    @Override
    public Response registerUser(UserDTO regisRequest) {
        UserRole role = UserRole.USER;
        if(regisRequest.getRole() != null && regisRequest.getRole().equalsIgnoreCase("admin")) {
            role = UserRole.ADMIN;
        }
        User user = User.builder()
                .name(regisRequest.getName())
                .email(regisRequest.getEmail())
                .password(passwordEncoder.encode(regisRequest.getPassword()))
                .phoneNumber(regisRequest.getPhoneNumber())
                .role(role)
                .build();

        User savedUser = userRepository.save(user);
        System.out.println(savedUser);
        UserDTO userDTO = entityDTOMapper.mapUserToDTO(savedUser);
        return Response.builder()
                .status(200)
                .message("User registered successfully")
                .user(userDTO)
                .build();
    }

    @Override
    public Response loginUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()-> new NotFoundException("Email not found"));
        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialException("Wrong password");
        }
        String token = jwtUtils.generateToken(user);

        return Response.builder()
                .status(200)
                .message("User logged in successfully")
                .token(token)
                .expirationTime("Your expiration time is 6 months")
                .role(user.getRole().toString())
                .build();
    }

    @Override
    public Response getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOS = users.stream()
                .map(entityDTOMapper::mapUserToDTO)
                .toList();

        return Response.builder()
                .status(200)
                .userList(userDTOS)
                .build();
    }

    @Override
    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        log.info("User email: ", email);
        return userRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("Email not found"));
    }

    @Override
    public Response getUserInfoAndOrderHistory() {
        User user = getLoginUser();
        UserDTO userDTO = entityDTOMapper.mapUserToDTOPlusAddressAndOrderHistory(user);
        return Response.builder()
                .status(200)
                .user(userDTO)
                .build();
    }
}
