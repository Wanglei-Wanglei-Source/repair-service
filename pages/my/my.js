const storage = require('../../utils/storage')

Page({
  data: {
    orders: [],
    pendingCount: 0,
    completedCount: 0,
    phoneNumber: '138****8888'
  },

  onShow() {
    this.loadOrders()
  },

  loadOrders() {
    const orders = storage.getOrders()
    
    const pendingCount = orders.filter(o => o.status === 'pending').length
    const completedCount = orders.filter(o => o.status === 'completed').length
    
    this.setData({
      orders,
      pendingCount,
      completedCount
    })
  },

  deleteOrder(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定删除这条预约记录吗？',
      success: (res) => {
        if (res.confirm) {
          storage.deleteOrder(id)
          this.loadOrders()
          wx.showToast({ title: '删除成功', icon: 'success' })
        }
      }
    })
  }
})