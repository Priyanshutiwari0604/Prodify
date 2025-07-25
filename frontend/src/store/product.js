import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],

  // Set all products
  setProducts: (products) => set({ products }),

  // Add a new product
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required." };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Something went wrong" };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return { success: true, message: "Product created successfully!" };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  },

  // Fetch all products
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  // Update a product (with API call)
  updateProduct: async (id, updatedProduct) => {
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
      return { success: false, message: "All fields are required." };
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Something went wrong" };
      }

      // Update local state with the updated product from server
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? { ...product, ...data.data } : product
        ),
      }));

      return { success: true, message: "Product updated successfully!" };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  },

  // Update product locally only (for optimistic updates if needed)
  updateProductLocal: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? { ...product, ...updatedProduct } : product
      ),
    })),

  // Delete a product
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: "Product deleted successfully!" };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  },

  // Clear all products
  clearProducts: () => set({ products: [] }),
}));