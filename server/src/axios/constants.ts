export const databaseAPI = `${process.env.POCKETBASE_URL}/api/`;

export const queryKeys = {
  orders: 'order',
  user: 'user',
};

// path for pocketbase API endpoints
export const purchaseOrdersPath = 'collections/purchase_order/records';
export const userPath = 'collections/users/records';
export const submittedOrderPath = 'collections/submitted_orders/records';
