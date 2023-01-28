import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../../dbService/orders.db";

export default async (req, res) => {
  const orderData = await updateOrderStatus(req.body.orderId, req.body.status);
  const orders = await fetchAllOrders();
  res.status(200).json({ status: 200, orderData, orders });
};
