import { response } from "express";
import React, { useState } from "react";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // name, price, category, description
  const handleSubmit = () => {
    const payload = {
      name: name,
      price: price,
      category: category,
      description: description,
    };
    const response = axios.post("http://localhost:3001/products", payload);
  };
  return <div></div>;
}
