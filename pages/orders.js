import { useState } from "react";
import MenuPane from "../components/MenuPane/MenuPane";
import { fetchAllOrders } from "../dbService/orders.db";
import "../styles/routes/orders.scss";
import FancyButton from "../components/FancyButton/FancyButton";
import Fetcher from "../utils/Fetcher";
import Select from "react-select";
import { Cashify } from "../utils/Cashify";
import FancyInput from "../components/FancyInput/FancyInput";
export async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const orders = await fetchAllOrders();

  return {
    props: { user: context.req.session.user, orders },
  };
}

export default function Orders({ user, orders }) {
  const [localOrders, setLocalOrders] = useState(orders);
  const [editOrderPane, setEditOrderPane] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const [updatedStatus, setUpdatedStatus] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState(null);
  console.log(orders);

  return (
    <div className="OrdersPage">
      <section className="OrdersPage__col">
        <div className="OrdersPage__col--header">
          <h1>Pending Orders</h1>
        </div>
        <div className="OrdersPage__col--content">
          {localOrders
            .filter((order) => order.orderStatus === "pending")
            .map((order, index) => (
              <div
                key={index}
                className={`OrdersPage__OrderCard OrdersPage__OrderCard--${order.orderStatus}`}
              >
                <h2>Order #{order.id}</h2>
                <div className="OrdersPage__OrderCard--content">
                  <p>{order.description}</p>
                  <div className="OrdersPage__OrderCard--row">
                    <span>{order.fromBusiness}</span>
                    <hr />
                    <span>{order.toBusiness}</span>
                  </div>
                  <div className="OrdersPage__OrderCard--row">
                    <g>
                      {order.predictedPrice
                        ? Cashify(order.predictedPrice)
                        : "--"}
                    </g>
                    <FancyButton
                      onClick={async () => {
                        setEditOrderPane(order.id);

                        await Fetcher("/api/orders/fetch-order-data", {
                          method: "POST",
                          body: { orderId: order.id },
                        }).then((res) => {
                          if (res.status === 200) {
                            setOrderData(res.orderData);
                            console.log(res.orderData);
                          }
                        });
                      }}
                      style={{ height: "30px" }}
                    >
                      Edit
                    </FancyButton>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      <section className="OrdersPage__col">
        <div className="OrdersPage__col--header">
          <h1>In Transit</h1>
        </div>
        <div className="OrdersPage__col--content">
          {localOrders
            .filter((order) => order.orderStatus === "InProgress")
            .map((order, index) => (
              <div
                key={index}
                className={`OrdersPage__OrderCard OrdersPage__OrderCard--${order.orderStatus}`}
              >
                <h2>Order #{order.id}</h2>
                <div className="OrdersPage__OrderCard--content">
                  <p>{order.description}</p>
                  <div className="OrdersPage__OrderCard--row">
                    <span>{order.fromBusiness}</span>
                    <hr />
                    <span>{order.toBusiness}</span>
                  </div>
                  <div className="OrdersPage__OrderCard--row">
                    <g>
                      {order.predictedPrice
                        ? Cashify(order.predictedPrice)
                        : "--"}
                    </g>
                    <FancyButton
                      onClick={async () => {
                        setEditOrderPane(order.id);

                        await Fetcher("/api/orders/fetch-order-data", {
                          method: "POST",
                          body: { orderId: order.id },
                        }).then((res) => {
                          if (res.status === 200) {
                            setOrderData(res.orderData);
                            console.log(res.orderData);
                          }
                        });
                      }}
                      style={{ height: "30px" }}
                    >
                      Edit
                    </FancyButton>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      <section className="OrdersPage__col">
        <div className="OrdersPage__col--header">
          <h1>Received</h1>
        </div>
        <div className="OrdersPage__col--content">
          {localOrders
            .filter((order) => order.orderStatus === "received")
            .map((order, index) => (
              <div
                key={index}
                className={`OrdersPage__OrderCard OrdersPage__OrderCard--${order.orderStatus}`}
              >
                <h2>Order #{order.id}</h2>
                <div className="OrdersPage__OrderCard--content">
                  <p>{order.description}</p>
                  <div className="OrdersPage__OrderCard--row">
                    <span>{order.fromBusiness}</span>
                    <hr />
                    <span>{order.toBusiness}</span>
                  </div>
                  <div className="OrdersPage__OrderCard--row">
                    <g>
                      {order.predictedPrice
                        ? Cashify(order.predictedPrice)
                        : "--"}
                    </g>
                    <FancyButton
                      onClick={async () => {
                        setEditOrderPane(order.id);

                        await Fetcher("/api/orders/fetch-order-data", {
                          method: "POST",
                          body: { orderId: order.id },
                        }).then((res) => {
                          if (res.status === 200) {
                            setOrderData(res.orderData);
                            console.log(res.orderData);
                          }
                        });
                      }}
                      style={{ height: "30px" }}
                    >
                      Edit
                    </FancyButton>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      <section className="OrdersPage__col">
        <div className="OrdersPage__col--header">
          <h1>Rejected</h1>
        </div>
        <div className="OrdersPage__col--content">
          {localOrders
            .filter((order) => order.orderStatus === "rejected")
            .map((order, index) => (
              <div
                key={index}
                className={`OrdersPage__OrderCard OrdersPage__OrderCard--${order.orderStatus}`}
              >
                <h2>Order #{order.id}</h2>
                <div className="OrdersPage__OrderCard--content">
                  <p>{order.description}</p>
                  <div className="OrdersPage__OrderCard--row">
                    <span>{order.fromBusiness}</span>
                    <hr />
                    <span>{order.toBusiness}</span>
                  </div>
                  <div className="OrdersPage__OrderCard--row">
                    <g>
                      {order.predictedPrice
                        ? Cashify(order.predictedPrice)
                        : "--"}
                    </g>
                    <FancyButton
                      onClick={async () => {
                        setEditOrderPane(order.id);

                        await Fetcher("/api/orders/fetch-order-data", {
                          method: "POST",
                          body: { orderId: order.id },
                        }).then((res) => {
                          if (res.status === 200) {
                            setOrderData(res.orderData);
                            console.log(res.orderData);
                          }
                        });
                      }}
                      style={{ height: "30px" }}
                    >
                      Edit
                    </FancyButton>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      <MenuPane
        isOpen={editOrderPane !== null}
        setIsOpen={() => setEditOrderPane(null)}
        style={{
          width: "440px",
        }}
      >
        <div className="OrderPane">
          <h1>Order #{editOrderPane}</h1>
          <div className="OrderPane__content">
            <div className="OrderPane__row">
              <label htmlFor="fromCountry">Status</label>
              <Select
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "100%",
                  }),
                }}
                value={{
                  value: orderData?.orderStatus,
                  label:
                    orderData?.orderStatus === "pending"
                      ? "Pending"
                      : orderData?.orderStatus === "received"
                      ? "Received"
                      : orderData?.orderStatus === "rejected"
                      ? "Rejected"
                      : "In Progress",
                }}
                options={[
                  { value: "InProgress", label: "In Progress" },
                  { value: "received", label: "Received" },
                  { value: "rejected", label: "Rejected" },
                  { value: "pending", label: "Pending" },
                ]}
                onChange={(e) => {
                  setUpdatedStatus(e.value);
                }}
              />
            </div>
            <div className="OrderPane__row">
              <label htmlFor="fromCountry">From</label>
              <div className="OrderPane__column">
                <div className="OrderPane__row--box">
                  <span>Country</span>
                  <h2>{orderData?.fromWarehouse.country}</h2>
                </div>
                <div className="OrderPane__row--box">
                  <span>Business</span>
                  <h2>{orderData?.User.name}</h2>
                </div>
                <div className="OrderPane__row--box">
                  <span>Warehouse</span>
                  <h2>{orderData?.fromWarehouse.name}</h2>
                </div>
              </div>
            </div>
            <div className="OrderPane__row">
              <label htmlFor="fromCountry">To</label>
              <div className="OrderPane__column">
                <div className="OrderPane__row--box">
                  <span>Country</span>
                  <h2>{orderData?.toWarehouse.country}</h2>
                </div>
                <div className="OrderPane__row--box">
                  <span>Business</span>
                  <h2>{orderData?.toWarehouse.User.name}</h2>
                </div>
                <div className="OrderPane__row--box">
                  <span>Warehouse</span>
                  <h2>{orderData?.toWarehouse.name}</h2>
                </div>
              </div>
            </div>
            <div className="OrderPane__row">
              <label htmlFor="fromCountry">Description</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                disabled
                value={orderData?.description}
              />
            </div>
            <div className="OrderPane__column">
              <div className="OrderPane__row">
                <label htmlFor="fromCountry">Predicted Price</label>
                <FancyInput
                  value={
                    orderData?.predictedPrice
                      ? Cashify(orderData?.predictedPrice)
                      : "--"
                  }
                  disabled={true}
                />
              </div>
              {/* <div className="OrderPane__row">
                <label htmlFor="fromCountry">Final Price</label>
                <FancyInput
                  value={orderData?.finalPrice}
                  onChange={(e) => setUpdatedPrice(e)}
                />
              </div> */}
            </div>
          </div>
          <div className="OrderPane__bottom">
            <FancyButton
              disabled={updatedStatus === null && updatedPrice === null}
              onClick={async () => {
                await Fetcher("/api/orders/update-order-status", {
                  method: "POST",
                  body: {
                    orderId: editOrderPane,
                    status: updatedStatus,
                  },
                }).then((res) => {
                  if (res.status === 200) {
                    setEditOrderPane(null);
                    setUpdatedStatus(null);
                    setLocalOrders([...res.orders]);
                  }
                });
              }}
              style={{ width: "100%" }}
            >
              Save
            </FancyButton>
          </div>
        </div>
      </MenuPane>
    </div>
  );
}
