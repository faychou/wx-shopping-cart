Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods:[]
  },
  onLoad: function (options) {
    //获取缓存中的购物车数据
    var cartItems = wx.getStorageSync("cartItems") || []
    this.setData({
      goods:cartItems
    })
  }
})