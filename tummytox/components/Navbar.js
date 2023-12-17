import navbarStyle from "./styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./styles/Navbar.module.css";

export default function Navbar({
  loggedIn,
  setLoggedIn,
  activeCategory,
  setLikedProducts,
  setCartProducts,
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const logOut = function () {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", JSON.stringify(false));
    localStorage.setItem("userType", JSON.stringify(""));
    setLikedProducts([]);
    setCartProducts([]);
    localStorage.setItem("likedProducts", JSON.stringify([]));
    localStorage.setItem("cartProducts", JSON.stringify([]));
    router.push("/authentication/Login");
  };

  useEffect(() => {}, [activeCategory]);

  const paragraphs = [
    "100% premium quiality",
    "Free delivery for orders over €100",
    "Delivery 1-3 business days",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % paragraphs.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.slide}>
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            style={{
              display: index === currentIndex ? "block" : "none",
            }}
          >
            {paragraph}
          </p>
        ))}
        <div className={styles.fbInsta}>
          <Link
            style={{ background: "inherit" }}
            href="https://www.facebook.com/tummytox.mk/"
            target="blank"
          >
            <img height={30} src="/images/fb-logo.png" alt="fb-logo" />
          </Link>
          <Link
            style={{ background: "inherit" }}
            href="https://www.instagram.com/tummytox.mk/"
            target="blank"
          >
            <img height={30} src="/images/insta-logo.png" alt="insta-logo" />
          </Link>
        </div>
      </div>
      <div className={navbarStyle.nav}>
        <div className={navbarStyle.subDiv}>
          <Link href="/" style={{ backgroundColor: "inherit" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </Link>
          <span>Experiences</span>
          <span>Blog</span>
        </div>
        <div>
          <img src="https://aptekibruno.mk/wp-content/uploads/2023/08/0x0-1.png" />
        </div>
        {loggedIn ? (
          <div className={navbarStyle.subDiv}>
            <div className={navbarStyle.likeAndBuy}>
              <Link style={{ backgroundColor: "inherit" }} href="/WhishList">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
              </Link>
              <Link style={{ backgroundColor: "inherit" }} href="/Cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
              </Link>
            </div>
            <button onClick={logOut} className={navbarStyle.btn}>
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          <div className={navbarStyle.subDiv}>
            <Link href="/authentication/Login" className={navbarStyle.link}>
              <span>Log In</span>
            </Link>
            <Link href="/authentication/Register" className={navbarStyle.link}>
              <span>Register</span>
            </Link>
          </div>
        )}
      </div>
      <div className={styles.directions}>
        <Link href="/categories/AllProducts">
          <div
            className={activeCategory === "All Products" ? styles.active : ""}
          >
            All Products
          </div>
        </Link>
        <Link href="/categories/Health-and-detox">
          <div
            className={activeCategory === "HealthAndDetox" ? styles.active : ""}
          >
            Health and detox
          </div>
        </Link>
        <Link href="/categories/Weightloss">
          <div className={activeCategory === "Weightloss" ? styles.active : ""}>
            Weight loss
          </div>
        </Link>
        <Link href="/categories/Sport">
          <div className={activeCategory === "Sport" ? styles.active : ""}>
            Sport
          </div>
        </Link>
        <Link href="/categories/Beauty">
          <div className={activeCategory === "Beauty" ? styles.active : ""}>
            Beauty
          </div>
        </Link>
        <Link href="/categories/Accessories">
          <div
            style={{ borderRight: "none" }}
            className={activeCategory === "Accessories" ? styles.active : ""}
          >
            Accessories
          </div>
        </Link>
      </div>
    </>
  );
}
