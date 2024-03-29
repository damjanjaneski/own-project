import styles from "./styles/CartComponent.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartComponent({
  item,
  setCartProducts,
  loggedIn,
  setTrigger,
  updateTotalAmount,
  formatNumber,
  cartProducts,
  setTotalAmount,
}) {
  const [qty, setQty] = useState(1);
  const router = useRouter();

  const increase = function () {
    setQty((prev) => prev + 1);
    updateTotalAmount(item.actionPrice);
    setTrigger((trigger) => !trigger);
  };

  const decrease = function () {
    qty > 1 ? setQty((prev) => prev - 1) : "";
    qty > 1 ? updateTotalAmount(0 - item.actionPrice) : "";
    setTrigger((trigger) => !trigger);
  };

  const remove = function (id) {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users?userId=${loggedIn}&target=cart&request=delete`,
      {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
      }
    );
    setCartProducts(cartProducts.filter((p) => p !== id));
    setTotalAmount((x) => x - qty * item.actionPrice);
    setTrigger((trigger) => !trigger);
  };

  const goTo = function (id) {
    router.push(`/products/${id}`);
  };

  return (
    <>
      <div className={styles.wraper}>
        <img onClick={() => goTo(item._id)} src={item.img} />
        <div className={styles.rightDiv}>
          <h2 onClick={() => goTo(item._id)} className={styles.title}>
            {item.name}
          </h2>
          <div>
            <h3>Qty:</h3>
            <div className={styles.changeQty}>
              <button className={styles.down} onClick={decrease}>
                -
              </button>
              <div>{qty}</div>
              <button className={styles.up} onClick={increase}>
                +
              </button>
            </div>
          </div>
        </div>
        <p className={styles.price}>
          MKD {formatNumber(Number(qty) * item.actionPrice)}.00
        </p>
        <button className={styles.remove} onClick={() => remove(item._id)}>
          X
        </button>
      </div>
    </>
  );
}
