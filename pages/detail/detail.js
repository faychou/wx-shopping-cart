// pages/detail/detail.js
//模拟获取服务器商品数据
var datas = require('../../data/data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{}
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    console.log(options.goodsId)
    //模拟取得服务器对应商品
    var goods = datas.goods[options.goodsId - 1]
    console.log(goods)
    this.setData({
      goods:goods
    })
  },
  //添加到购物车
  addCount: function (e) {
    var that = this
    //获取缓存中的购物车数据
    var cartItems = wx.getStorageSync("cartItems") || []

    //判断该商品是否已经存在购物车中
    var exist = cartItems.find(function (el) {
      return el.index == that.data.goods.id
    })

    //如果购物车里面有该商品那么他的数量每次加一
    if (exist) {
      exist.num = exist.num + 1
    } else {//否则新增加商品
      cartItems.push({
        index: that.data.goods.id,
        title: that.data.goods.title,
        src: that.data.goods.src,
        price: that.data.goods.price,
        num: 1,
        selected: true
      })
    }
    wx.showToast({
      title: "加入购物车成功！",
      duration: 1000
    })

    //更新缓存数据
    wx.setStorageSync("cartItems", cartItems)
  },
  //前往购物车
  goCart: function () {
    wx.navigateTo({
      url: '../cart/cart'
    })
  }
})