import db from "../lib/prisma";

export async function fetchAllOrders() {
  return db.order.findMany({
    include: {
      User: true,
      OrderItems: {
        include: {
          Product: true,
        },
      },
    },
  });
}

export async function fetchOrderData(orderId) {
  const orderData = await db.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      User: true,
      OrderItems: {
        include: {
          Product: true,
        },
      },
    },
  });

  const fromWarehouse = await db.warehouse.findUnique({
    where: {
      id: orderData.fromBusinessWarehouse,
    },
  });

  const toWarehouse = await db.warehouse.findUnique({
    where: {
      id: orderData.toBusinessWarehouse,
    },
    include: {
      User: true,
    },
  });

  return {
    ...orderData,
    fromWarehouse,
    toWarehouse,
  };
}

export async function updateOrderStatus(orderId, status) {
  return db.order.update({
    where: {
      id: orderId,
    },
    data: {
      orderStatus: status,
    },
  });
}
