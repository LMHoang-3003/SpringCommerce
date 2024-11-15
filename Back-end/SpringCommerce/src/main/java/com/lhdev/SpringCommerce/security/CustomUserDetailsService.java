package com.lhdev.SpringCommerce.security;

import com.lhdev.SpringCommerce.dto.UserDTO;
import com.lhdev.SpringCommerce.entity.User;
import com.lhdev.SpringCommerce.exception.NotFoundException;
import com.lhdev.SpringCommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new NotFoundException("User not found"));
        return AuthenticationUser.builder()
                .user(user)
                .build();
    }

}
