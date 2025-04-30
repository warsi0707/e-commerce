import React, { useCallback, useEffect, useState } from "react";
import { AuthProvider } from "./Authprovider";
import toast from "react-hot-toast";
import { Backendurl } from "../BckendUrl";

export default function UserAuthContext({ children }) {
  const [userAuth, setUserAuth] = useState(false);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const AuthCheck = useCallback(async () => {
    try {
      const response = await fetch(`${Backendurl}/user/auth`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const result = await response.json();

      if (result.authenticated == true) {
        setUserAuth(true);
      } else {
        setUserAuth(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const AddToCart = (product) => {

    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      toast.success("Item Increased");
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newCart = [...cart, { product, quantity: 1 }];
      toast.success("Item added to cart");
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  const DeleteItem = (id) => {
    const existing = cart.filter((item) => item.product.id !== id);
    setCart(existing);
    localStorage.setItem("cart", JSON.stringify(existing));
    toast.success("Item removed ");
  };
  const IncreaseQuantity = (id) => {
    const existingItem = cart.find((item) => item.product.id === id);
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  const DecreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item.product.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // Remove if quantity becomes 0

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(newTotal);
    localStorage.setItem("cartTotal", newTotal);
  }, [cart]);
  useEffect(() => {
    AuthCheck();
  }, []);
  return (
    <div>
      <AuthProvider.Provider
        value={{
          userAuth,
          setUserAuth,
          cart,
          setCart,
          AddToCart,
          DeleteItem,
          IncreaseQuantity,
          DecreaseQuantity,
          total,
        }}
      >
        {children}
      </AuthProvider.Provider>
    </div>
  );
}
