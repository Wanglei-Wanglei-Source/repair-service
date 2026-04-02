Page({
  data: {},

  onLoad() {},

  selectService(e) {
    const service = e.currentTarget.dataset.service
    console.log('选择的服务：', service)  
    wx.navigateTo({
      url: `/pages/order/order?service=${service}`
    })
  }
})