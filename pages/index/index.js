//index.js
//获取商品数据
var datas = require('../../data/data.js')

Page({
  data: {
    userInfo: {},
    goods:[]
  },
  onLoad: function () {
    console.log('onLoad')
    this.setData({
      goods:datas.goods
    })
  },
  //添加到购物车
  addCount:function(e) {
    //获取设置在标签上的index值
    var index = e.currentTarget.dataset.index
    
    //获取缓存中的购物车数据
    var cartItems = wx.getStorageSync("cartItems") || []
    
    //判断该商品是否已经存在购物车中
    var exist = cartItems.find(function (el) {
      return el.index == e.target.dataset.index
    })

    //如果购物车里面有该商品那么他的数量每次加一
    if (exist) {
      exist.num = exist.num + 1
    } else {//否则新增加商品
      cartItems.push({
        index: e.target.dataset.index,
        title: e.target.dataset.title,
        price: e.target.dataset.price,
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
  goCart:function() {
    wx.navigateTo({
      url: '../cart/cart'
    })
  }
})
