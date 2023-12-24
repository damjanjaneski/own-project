import styles from "../../styles/Health-And-Detox.module.css";
import ProductCard from "../../../components/Card";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HealthAndDetox({
  trigger,
  setTrigger,
  likedProducts,
  setLikedProducts,
  setActiveCategory,
  cartProducts,
  setCartProducts,
  formatNumber,
}) {
  setActiveCategory("HealthAndDetox");

  const router = useRouter();
  const [healthDetox, setHealthDetox] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/productsList?collection=healthanddetox")
      .then((res) => res.json())
      .then((data) => {
        setHealthDetox(data);
      });
  }, [trigger]);

  const userType = JSON.parse(localStorage.getItem("userType"));

  return (
    <>
      <h1 className={styles.title}>Health And Detox</h1>
      <Grid container>
        <div className={styles.container}>
          {userType === "admin" ? (
            <button
              onClick={() => {
                router.push("/admin/add-new");
              }}
              className={styles.addNew}
            >
              Add new
            </button>
          ) : (
            ""
          )}
          {healthDetox.map((item, x) => (
            <Grid key={x} item sm={6} md={3} lg={3}>
              <div className={styles.card}>
                <ProductCard
                  formatNumber={formatNumber}
                  collection={"healthDetox"}
                  trigger={trigger}
                  setTrigger={setTrigger}
                  cartProducts={cartProducts}
                  setCartProducts={setCartProducts}
                  setLikedProducts={setLikedProducts}
                  likedProducts={likedProducts}
                  key={x}
                  product={item}
                />
              </div>
            </Grid>
          ))}
        </div>
      </Grid>
    </>
  );
}