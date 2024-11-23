# Spring Commerce

SpringCommerce is an e-commerce project built with Spring Boot, providing RESTful APIs for managing products, orders, and users. This project applies software development principles, design patterns, and best practices to ensure the code is maintainable, scalable, and reusable.

## Software Development Principles
- **Maintainability, Scalability, and Reusability**:
    - The project is designed to be easily maintained and extended, reducing potential issues when adding new features or making changes.

- **Dependency Injection**:
    - Dependencies between classes are injected externally via the Spring Framework, reducing tight coupling and enhancing testability.

- **Code Reusability**:
    - The project encourages reusing code to minimize duplication and ensure consistency across the application.

## Software Development Patterns

- **RESTful Architecture**:
    - The project uses a RESTful architecture for client-server communication, utilizing HTTP methods such as GET, POST, PUT, and DELETE to manage resources like products and orders.

## Software Development Practices
- **Agile Methodology**:
    - The development process is broken down into short iterations, allowing for quick feedback from users and iterative adjustments throughout the development lifecycle.

## Code Structure

The project follows a layered architecture and employs best practices in organizing the code:

### Back-end:
- Framework: The application is built using the **Spring Boot** framework
- **RESTful API**
- **Main Folders and Components:**
    - Controller: 
        - Contains classes responsible for handling client requests.
        - These classes interact with the service layer to process data and return appropriate responses to the client.
        - Containing: `ProductController.java`, `OrderItemController.java`, `UserController.java`, `CategoryController`, `AuthenticationController`, `AddressController`.

    - DTO (Data Transfer Object):
        - Used to transfer data between layers (usually between the controller and client).
        - These classes are lightweight and often contain only the necessary fields needed for communication.
        - Containing: `ProductDTO.java`, `OrderDTO.java`, `UserDTO.java`, `OrderItemDTO`,...

    - Entity: 
        - Represents the data model of the application.
        - These classes are mapped to database tables using JPA (Java Persistence API).
        - Containing: `Product.java`, `Order.java`, `User.java`, `Category.java`, `OrderItem.java`, `Address.java`.
    
    - Enums:
        - Contains enumerations used throughout the application to represent fixed sets of values.
        - Containing: `OrderStatus.java`, `UserRole.java`.

    - Exception:
      - Includes custom exception classes to handle errors and provide meaningful messages to the client.
      - Containing: `GlobalExceptionHandler.java`, `InvalidCredentialException.java`, `NotFoundException.java`.

    - Mapper: 
      - Contains classes responsible for mapping between entities, DTOs, and other objects.
      - These mappers convert data from one format to another for easier communication between layers.
      - Containing: `EntityDTOMapper.java`.

    - Repository:
        - Contains interfaces for data access, extending `JpaRepository`to provide basic CRUD operations and other operations.
        - Containing: `ProductRepository.java`, `OrderRepository.java`, `UserRepository.java`, `OrderItemRepository.java`, `AddressRepository.java`, `CategoryRepository.java`.

    - Security: 
        - Includes configurations related to application security, such as JWT authentication, user authorization, and role-based access control.
        - Containing: `SecurityConfiguration.java`, `JwtUtils.java`, `JwtAuthenticationFilter.java`, `CustomUserDetailsService.java`, `CorsConfiguration.java`, `AuthenticationUser.java`.
    
    - Service:
        - Contains service **interfaces** and their **implementations**. The service layer holds business logic and calls the repository layer for data access.
        - The service layer provides abstraction for the controller layer and is easier to maintain and extend.
        - Containing: `ProductService.java`, `OrderItemService.java`, `UserService.java`,... and their implementations  `ProductServiceImpl.java`, `UserServiceImpl.java`, `OrderItemServiceImpl.java`,...
    
    - Specification:
        - Used for dynamic queries in the repository layer. It allows flexible querying using JPA Criteria API.
        - Containing: `OrderItemSpecification.java`.
##  All required steps in order to get the application run on a local computer

- **Clone the Repository**  
    - Clone the project to your local machine using the following commands:  
       ```bash
       git clone https://github.com/LMHoang-3003/SpringCommerce.git
       cd SpringCommerce
       ```
   - Install dependencies:
     ```bash
     mvn clean install
     ```
  - Configure the application:
    - Open src/main/resources/application.properties and set up your database configuration.
    - In this project it will be like this:
    ```bash
    spring.datasource.url=jdbc:mysql://localhost:3306/spring_commerce
    spring.datasource.username=your_database_username
    spring.datasource.password=your_database_password
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    server.port = 2424
    spring.jpa.hibernate.ddl-auto=update
    aws.s3.access=${AWS_ACCESS_KEY_ID}
    aws.s3.secrete=${AWS_SECRET_ACCESS_KEY}
    ```
  - Run the application:
    - Start the Spring Boot application using Maven:
    ```bash
    mvn spring-boot:run
    ```
## Full CURL commands or Postman snapshots to verify the APIs including request endpoints, HTTP Headers and request payload if any.
- Authentication:
  - User Login:
    ![user_login](snapshot-postman/user_login.png)
  - User Register:
    ![user_register](snapshot-postman/user_register.png)
- User:
  - Get all users:
    ![get_all_users](snapshot-postman/get_all_users.png)
  - Get user's information and history order:
    ![get_userInfo_history](snapshot-postman/get_userInfo_history.png)
    ![get_userInfo_history](snapshot-postman/get_userInfo_history_2.png)
    ![get_userInfo_history](snapshot-postman/get_userInfo_history_3.png)
- Product:
  - Create Product:
    ![create_product_denied](snapshot-postman/create_product_denied.png)
    ![create_product_success](snapshot-postman/create_product.png)
  - Get all Products:
    ![get_products](snapshot-postman/get_all_products.png)
    ![get_products](snapshot-postman/get_all_products_2.png)
  - Get product by id:
    ![get_product_by_id](snapshot-postman/get_product_by_id.png)
  - Get product by category id:
    ![get_product_by_category_id](snapshot-postman/get_product_by_categoryId.png)
  - Get product by brand:
    ![get_product_by_brand](snapshot-postman/get_product_by_brand.png)
  - Get product by color:
    ![get_product_by_color](snapshot-postman/get_product_by_color.png)
    ![get_product_by_color](snapshot-postman/get_product_by_color2.png)
  - Search Products by keyword:
    ![search_products](snapshot-postman/search_product.png)
    ![search_products](snapshot-postman/search_product_2.png)
    ![search_products](snapshot-postman/search_product_3.png)
  - Update Product:
    ![update_product_denied](snapshot-postman/update_product_denied.png)
    ![update_product_success](snapshot-postman/update_product_success.png)
    ![get_product_test_update](snapshot-postman/get_product_by_id_test.png)
  - Delete Product:
    ![delete_product_denied](snapshot-postman/delete_product_denied.png)
    ![delete_product_success](snapshot-postman/delete_product_success.png)
- Category:
  - Create category:
    ![create_category_denied](snapshot-postman/create_category_denied.png)
    ![create_category_successs](snapshot-postman/create_category_success.png)
  - Get all categories:
    ![get_all_categories](snapshot-postman/get_all_categories.png)
  - Update category:
    ![update_category_denied](snapshot-postman/update_category_denied.png)
    ![update_category_success](snapshot-postman/update_category_success.png)
    ![get_category_test_update](snapshot-postman/get_all_categories_test.png)
  - Delete category:
    ![delete_category_denied](snapshot-postman/delete_category_denied.png)
    ![delete_category_success](snapshot-postman/delete_category_success.png)
    ![get_category_test_delete](snapshot-postman/get_all_categories_test_delete.png)
- Address:
  - Create or Update user's address:
    ![create_address](snapshot-postman/address.png)
    ![get_userInfo_test_address](snapshot-postman/get_userInfo_test_address.png)
- Order:
  - Create order:
    ![order_product](snapshot-postman/order.png)
  - Get all orders:
    ![get_all_orders_denied](snapshot-postman/get_all_orders_denied.png)
    ![get_all_orders_success](snapshot-postman/get_all_orders.png)
    ![get_all_orders_success](snapshot-postman/get_all_orders2.png)
  - Get order by item id:
    ![get_all_orders_by_item_id](snapshot-postman/get_order_by_itemId.png)
    ![get_all_orders_by_item_id](snapshot-postman/get_order_by_itemId2.png)
  - Udate order'status:
    ![update_orderStatus_denied](snapshot-postman/update_order_status_denied.png)
    ![update_orderStatus_success](snapshot-postman/update_order_status_success.png)
    ![get_order_test_update](snapshot-postman/get_order_by_itemId_test_update.png)

- Link video demo:
- [SpringCommerce](https://drive.google.com/file/d/1qp_v8_zXK_QssI3-zFbp7kbVlTQMBHN5/view?usp=sharing)
