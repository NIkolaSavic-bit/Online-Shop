import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./AddProduct.css";

const AddProduct = () => {
  const { userId } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    newPrice: "",
    oldPrice: "",
  });
  const [sizes, setSizes] = useState([{ size: "", quantity: "" }]); // niz veličina
  const [imageFiles, setImageFiles] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAdmin = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`http://localhost:5145/api/auth/${userId}`);
        const user = await res.json();
        setIsAdmin(user.isAdmin);
      } catch (err) {
        console.error(err);
      }
    };
    checkAdmin();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const addSizeField = () => {
    setSizes([...sizes, { size: "", quantity: "" }]);
  };

  const removeSizeField = (index) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  const handleFileChange = (e) => {
    setImageFiles(Array.from(e.target.files)); // pretvori FileList u niz
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin)
      return setMessage("Samo administrator može dodavati proizvode.");
    if (imageFiles.length === 0)
      return setMessage("Morate izabrati barem jednu sliku.");

    try {
      const formToSend = new FormData();
      formToSend.append("name", formData.name);
      formToSend.append("category", formData.category);
      formToSend.append("newPrice", formData.newPrice);
      formToSend.append("oldPrice", formData.oldPrice || "");
      formToSend.append("userId", userId);

      // Dodavanje više fajlova
      imageFiles.forEach((file) => formToSend.append("imageFiles", file));

      // Veličine
      sizes.forEach((s, index) => {
        formToSend.append(`Sizes[${index}].Size`, s.size);
        formToSend.append(`Sizes[${index}].Quantity`, s.quantity);
      });

      const res = await fetch("http://localhost:5145/api/products", {
        method: "POST",
        body: formToSend,
      });

      if (res.ok) {
        setMessage("Proizvod uspješno dodat!");
        setFormData({ name: "", category: "", newPrice: "", oldPrice: "" });
        setSizes([{ size: "", quantity: "" }]);
        setImageFiles([]);
      } else {
        const data = await res.text();
        setMessage(data || "Greška prilikom dodavanja proizvoda.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Greška prilikom dodavanja proizvoda.");
    }
  };

  if (!userId)
    return <p>Morate biti prijavljeni da biste dodavali proizvode.</p>;
  if (!isAdmin) return <p>Samo administrator može dodavati proizvode.</p>;

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Dodaj novi proizvod</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          name="name"
          placeholder="Naziv proizvoda"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Kategorija"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="newPrice"
          placeholder="Nova cijena"
          value={formData.newPrice}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="oldPrice"
          placeholder="Stara cijena"
          value={formData.oldPrice}
          onChange={handleChange}
        />

        <h3>Veličine i količine</h3>
        {sizes.map((s, index) => (
          <div key={index} className="size-field">
            <input
              type="text"
              placeholder="Veličina (S, M, L)"
              value={s.size}
              onChange={(e) => handleSizeChange(index, "size", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Količina"
              value={s.quantity}
              onChange={(e) =>
                handleSizeChange(index, "quantity", e.target.value)
              }
              required
            />
            {sizes.length > 1 && (
              <button type="button" onClick={() => removeSizeField(index)}>
                Ukloni
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addSizeField}>
          Dodaj veličinu
        </button>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          required
        />
        <button type="submit">Dodaj proizvod</button>
      </form>
      {message && <p className="add-product-message">{message}</p>}
    </div>
  );
};

export default AddProduct;
