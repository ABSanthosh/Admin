import { fetchOrderData } from "../../../dbService/orders.db";

export default async (req, res) => {
  const orderData = await fetchOrderData(req.body.orderId);
  res.status(200).json({ status: 200, orderData });
};
