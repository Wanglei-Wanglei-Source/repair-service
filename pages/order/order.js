const storage = require('../../utils/storage')

Page({
  data: {
    service: '',
    serviceList: ['手机维修', '电脑维修', '平板维修', '屏幕更换', '电池更换', '系统重装', '清灰保养', '其他'],
    model: '',
    desc: '',
    date: '',
    name: '',
    phone: ''
  },

  onLoad(options) {
    // 如果从首页传入了服务类型，就使用传入的
    if (options.service) {
      this.setData({ service: options.service })
    }
  },

  // 选择服务类型
  onServiceChange(e) {
    const index = e.detail.value
    this.setData({
      service: this.data.serviceList[index]
    })
  },

  // 输入设备型号
  onModelInput(e) {
    this.setData({ model: e.detail.value })
  },

  // 输入问题描述
  onDescInput(e) {
    this.setData({ desc: e.detail.value })
  },

  // 选择预约日期
  onDateChange(e) {
    this.setData({ date: e.detail.value })
  },

  // 输入联系人
  onNameInput(e) {
    this.setData({ name: e.detail.value })
  },

  // 输入联系电话
  onPhoneInput(e) {
    this.setData({ phone: e.detail.value })
  },

  // 提交订单
  submitOrder() {
    const { service, model, desc, date, name, phone } = this.data
    
    // 表单验证
    if (!service) {
      wx.showToast({ title: '请选择服务类型', icon: 'none' })
      return
    }
    if (!model) {
      wx.showToast({ title: '请输入设备型号', icon: 'none' })
      return
    }
    if (!desc) {
      wx.showToast({ title: '请描述问题', icon: 'none' })
      return
    }
    if (!name) {
      wx.showToast({ title: '请输入联系人', icon: 'none' })
      return
    }
    if (!phone) {
      wx.showToast({ title: '请输入联系电话', icon: 'none' })
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }
    
    // 创建订单对象
    const order = {
      service,
      model,
      desc,
      date: date || '尽快安排',
      name,
      phone
    }
    
    // 保存订单
    storage.createOrder(order)
    
    // 提示成功
    wx.showToast({ 
      title: '预约成功！', 
      icon: 'success',
      duration: 1500
    })
    
    // 延迟后跳转到我的订单页面
    setTimeout(() => {
      wx.switchTab({ url: '/pages/my/my' })
    }, 1500)
  }
})