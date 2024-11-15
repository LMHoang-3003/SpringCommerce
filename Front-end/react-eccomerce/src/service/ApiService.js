import axios from "axios";

export default class ApiService {
  static api_url = "http://localhost:2424";
  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    };
  }

  //Authentication and USERS API
  static async registerUser(registration) {
    const response = await axios.post(
      `${this.api_url}/auth/register`,
      registration
    );
    return response.data;
  }

  static async loginUser(loginDetails) {
    const response = await axios.post(
      `${this.api_url}/auth/login`,
      loginDetails
    );

    return response.data;
  }

  static async getLoggedInUserInfo() {
    const response = await axios.get(`${this.api_url}/user/user-info`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  //product
  //create product
  static async addProduct(formData) {
    const response = await axios.post(
      `${this.api_url}/product/create`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  //update product
  static async updateProduct(productId, formData) {
    const response = await axios.put(
      `${this.api_url}/product/update/${productId}`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  //get all products
  static async getAllProducts() {
    const response = await axios.get(`${this.api_url}/product/products`);

    return response.data;
  }

  //search product
  static async searchProducts(keyword) {
    const response = await axios.get(
      `${this.api_url}/product/products/search`,
      {
        params: { keyword },
      }
    );
    return response.data;
  }

  //get product from its category
  static async getAllProductsByCategoryId(categoryId) {
    const response = await axios.get(
      `${this.api_url}/product/products/category/${categoryId}`
    );
    return response.data;
  }

  //get product by product id
  static async getProductsById(productId) {
    const response = await axios.get(
      `${this.api_url}/product/products/${productId}`
    );
    return response.data;
  }

  //delete product
  static async deleteProduct(productId) {
    const response = await axios.delete(
      `${this.api_url}/product/delete/${productId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  //get product by brand
  static async getProductsByBrand(brandName) {
    const response = await axios.get(`${this.api_url}/product/products/brand`, {
      params: { brandName },
    });
    return response.data;
  }

  //get product by color
  static async getProductsByColor(color) {
    const response = await axios.get(`${this.api_url}/product/products/brand`, {
      params: { color },
    });
    return response.data;
  }

  /*-----CATEGORY------*/
  //create category
  static async createCategory(body) {
    const response = await axios.post(`${this.api_url}/category/create`, body, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  //get all categories
  static async getAllCategory() {
    const response = await axios.get(`${this.api_url}/category/categories`);
    return response.data;
  }

  //get category by id
  static async getCategoryById(categoryId) {
    const response = await axios.get(
      `${this.api_url}/category/get-category/${categoryId}`
    );
    return response.data;
  }

  //update category
  static async updateCategory(categoryId, body) {
    const response = await axios.put(
      `${this.api_url}/category/update/${categoryId}`,
      body,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  //delete category
  static async deleteCategory(categoryId) {
    const response = await axios.delete(
      `${this.api_url}/category/delete/${categoryId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**-------ORDER */
  //create order
  static async createOrder(body) {
    const response = await axios.post(`${this.api_url}/order/create`, body, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  //get all orders
  static async getAllOrders() {
    const response = await axios.get(`${this.api_url}/order/filter`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  //get order item by id
  static async getOrderItemById(itemId) {
    const response = await axios.get(`${this.api_url}/order/filter`, {
      headers: this.getHeader(),
      params: { itemId },
    });
    return response.data;
  }

  //get all order items by status
  static async getOrderItemByStatus(status) {
    const response = await axios.get(`${this.api_url}/order/filter`, {
      headers: this.getHeader(),
      params: { status },
    });
    return response.data;
  }

  //update order status
  static async updateOrderItemStatus(orderItemId, orderStatus) {
    const response = await axios.put(
      `${this.api_url}/order/update/${orderItemId}`,
      {},
      {
        headers: this.getHeader(),
        params: { orderStatus },
      }
    );
    return response.data;
  }
  /**----ADDRESSS---- */
  static async saveAddress(body) {
    const response = await axios.post(`${this.api_url}/address/save`, body, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  /**----AUTHENTICATION CHECK */
  static logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  //check token
  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  //check admin
  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }
}
