import styles from "../../styles/add-new.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddNew() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    actionPrice: "",
    description: "",
    img: "",
  });

  const [error, setError] = useState(false);

  const handleChange = function (e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const addNew = function (category) {
    const route = category.toLowerCase().replaceAll(" ", "");

    if (
      product.name === "" ||
      product.category === "" ||
      product.price === "" ||
      product.actionPrice === "" ||
      product.description === "" ||
      product.img === ""
    ) {
      setError(true);
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/add-new-api`, {
        method: "POST",
        body: JSON.stringify({
          name: product.name,
          category: route[0].toUpperCase() + route.substring(1),
          price: product.price,
          actionPrice: product.actionPrice,
          description: product.description,
          img: product.img,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          router.push(
            `/categories/${route[0].toUpperCase() + route.substring(1)}`
          );
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Please fill the product form</h1>
      <input
        className={styles.input}
        label="Name"
        value={product.name}
        name="name"
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        className={styles.input}
        label="Category"
        value={product.category}
        name="category"
        onChange={handleChange}
        placeholder="Category"
      />
      <input
        className={styles.input}
        label="Price"
        value={product.price}
        name="price"
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        className={styles.input}
        label="Action price"
        value={product.actionPrice}
        name="actionPrice"
        onChange={handleChange}
        placeholder="Action price"
      />
      <input
        className={styles.input}
        label="Description"
        value={product.description}
        name="description"
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        className={styles.input}
        label="Img link"
        value={product.img}
        name="img"
        onChange={handleChange}
        placeholder="Img URL"
      />
      {error ? <p className={styles.warning}>All FIELDS ARE REQUIRED!</p> : ""}
      <button onClick={() => addNew(product.category)} className={styles.btn}>
        Add product
      </button>
    </div>
  );
}
