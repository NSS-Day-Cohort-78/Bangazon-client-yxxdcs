import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardLayout from "../components/card-layout";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import CartDetail from "../components/order/detail";
import CompleteFormModal from "../components/order/form-modal";
import { completeCurrentOrder, getCart } from "../data/orders";
import { getPaymentTypes } from "../data/payment-types";
import { removeProductFromOrder } from "../data/products";

export default function Cart() {
  const [cart, setCart] = useState({});
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [showCompleteForm, setShowCompleteForm] = useState(false);
  const router = useRouter();

  const refresh = () => {
    getCart().then((cartData) => {
      if (cartData) {
        console.log("Raw cart data from API:", cartData);
        console.log("Does it have lineitems?", cartData.lineitems);
        console.log("Does it have products?", cartData.products);
        setCart(cartData);
      }
    });
  };

  useEffect(() => {
    refresh();
    getPaymentTypes().then((paymentData) => {
      if (paymentData) {
        setPaymentTypes(paymentData);
      }
    });
  }, []);

  const completeOrder = (paymentTypeId) => {
    completeCurrentOrder(cart.id, paymentTypeId).then(() =>
      router.push("/my-orders")
    );
  };

  // const removeProduct = (productId) => {
  //   removeProductFromOrder(productId).then(refresh)
  // }

  const removeProduct = (productId) => {
    console.log("1. Starting remove for product:", productId);
    removeProductFromOrder(productId)
      .then(() => {
        console.log("2. API call succeeded, now refreshing...");
        return refresh();
      })
      .then(() => {
        console.log("3. Refresh complete, cart should be updated");
      })
      .catch((error) => {
        console.error("Failed:", error);
      });
  };

  // const mockCart = {
  //   total: 29.99,
  //   products: [
  //     { id: 998, name: "Test Product 1", price: 14.99 },
  //     { id: 999, name: "Test Product 2", price: 15.0 },
  //   ],
  // };

  return (
    <>
      <CompleteFormModal
        showModal={showCompleteForm}
        setShowModal={setShowCompleteForm}
        paymentTypes={paymentTypes}
        completeOrder={completeOrder}
      />
      <CardLayout title="Your Current Order">
        <CartDetail cart={cart} removeProductFromOrder={removeProduct} />
        <>
          <a
            className="card-footer-item"
            onClick={() => setShowCompleteForm(true)}
          >
            Complete Order
          </a>
          <a className="card-footer-item">Delete Order</a>
        </>
      </CardLayout>
    </>
  );
}

Cart.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  );
};
