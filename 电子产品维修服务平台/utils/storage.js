// 存储key
const ORDERS_KEY = 'repair_orders'

// 获取所有订单
function getOrders() {
  const orders = wx.getStorageSync(ORDERS_KEY)
  return orders ? orders : []
}

// 创建订单
function createOrder(order) {
  const orders = getOrders()
  order.id = Date.now()
  order.createTime = new Date().toLocaleString()
  order.status = 'pending'  // pending:待处理, processing:处理中, completed:已完成
  orders.unshift(order)
  wx.setStorageSync(ORDERS_KEY, orders)
  return order
}

// 更新订单状态
function updateOrderStatus(id, status) {
  const orders = getOrders()
  const index = orders.findIndex(order => order.id === id)
  if (index !== -1) {
    orders[index].status = status
    wx.setStorageSync(ORDERS_KEY, orders)
  }
}

// 删除订单
function deleteOrder(id) {
  let orders = getOrders()
  orders = orders.filter(order => order.id !== id)
  wx.setStorageSync(ORDERS_KEY, orders)
}

module.exports = {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder
}