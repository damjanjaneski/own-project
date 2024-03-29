import styles from "../styles/Cart.module.css";
import CartComponent from "../../components/CartComponent";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Cart({
  cartProducts,
  setCartProducts,
  loggedIn,
  setTrigger,
  trigger,
  formatNumber,
  totalAmount,
  setTotalAmount,
  setActiveCategory,
  setLastPrice,
}) {
  const [cProducts, setCProducts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url !== "/Cart") {
        setTotalAmount(0);
      }
    };

    router.events.on("beforeHistoryChange", handleRouteChange);

    return () => {
      router.events.off("beforeHistoryChange", handleRouteChange);
    };
  }, []);
  setActiveCategory("");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart-api?userId=${loggedIn}`)
      .then((res) => res.json())
      .then((data) => {
        setCProducts(data);
        setCartProducts(data.map((item) => item._id));
        if (totalAmount === 0) {
          setTotalAmount(calculateInitialPrice(data));
        }
      });
  }, [trigger, loggedIn]);

  const calculateInitialPrice = (products) => {
    return products.reduce(
      (acc, product) => acc + Number(product.actionPrice),
      0
    );
  };

  const updateTotalAmount = function (price) {
    setTotalAmount((totalAmount) => totalAmount + Number(price));
  };

  const checkOut = function () {
    setLastPrice(totalAmount);
    setTotalAmount(0);
    router.push("/CheckOut");
  };

  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.title}>Your cart</h1>
      <div>
        {cProducts.length !== 0 ? (
          cProducts.map((product, x) => {
            return (
              <CartComponent
                setTotalAmount={setTotalAmount}
                formatNumber={formatNumber}
                updateTotalAmount={updateTotalAmount}
                setTrigger={setTrigger}
                loggedIn={loggedIn}
                key={x}
                item={product}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
              />
            );
          })
        ) : (
          <p className={styles.empty}>
            You have no products added to you cart yet!
          </p>
        )}
      </div>
      <div className={styles.amountWraper}>
        <div className={styles.payAmount}>
          <p>TOTAL:</p>

          <p>MKD {formatNumber(totalAmount)}.00</p>
        </div>
        <button onClick={checkOut}>Check out</button>
      </div>
    </div>
  );
}
