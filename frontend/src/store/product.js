import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
      return { success: false, message: "Failed to create product" };
    }
    const product = await response.json();
    set((state) => ({
      products: [...state.products, product.data],
    }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProcucts: async () => {
    const response = await fetch("/api/products");
    if (!response.ok) {
      return { success: false, message: "Failed to fetch products" };
    }
    const data = await response.json();
    set({ products: data.data });
    return { success: true, message: "Products fetched successfully" };
  },
  deleteProducts: async (id) => {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return { success: false, message: "Failed to delete product" };
    }
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
    return { success: true, message: "Product deleted successfully" };
  },
  updateProducts: async (id, updatedProduct) => {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) {
      return { success: false, message: "Failed to update product" };
    }
    const product = await response.json();
    set((state) => ({
      products: state.products.map((p) => (p._id === id ? product.data : p)),
    }));
    return { success: true, message: "Product updated successfully" };
  },
}));
