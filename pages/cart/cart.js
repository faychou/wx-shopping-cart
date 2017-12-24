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
    console.log(cartItems)
    this.sumMoney()
  },
  //增加商品数量
  addCount:function(ev) {
    var that = this
    console.log('增加商品')
    var goodsId = ev.currentTarget.id
    that.data.goods[goodsId].num++
    that.setData({
      goods:that.data.goods
    })
    //更新缓存数据
    wx.setStorageSync("cartItems", that.data.goods)
    //重新计算总价
    that.sumMoney()
  },
  //减少商品数量
  reduceCount:function(ev) {
    console.log('减少商品')
    var that = this
    var goodsId = ev.currentTarget.id
    if(that.data.goods[goodsId].num == 1) {
      that.data.goods[goodsId].num = 1
    } else {
      that.data.goods[goodsId].num--
    }
    that.setData({
      goods: that.data.goods
    })
    //更新缓存数据
    wx.setStorageSync("cartItems", that.data.goods)
    //重新计算总价
    that.sumMoney()
  },
  //总价
  sumMoney:function() {
    console.log(this.data.goods)
    var datas = this.data.goods
    var sum = 0
    for(var i = 0; i < datas.length; i++) {
      sum += datas[i].num * datas[i].price;
    }
    this.setData({
      sum:sum
    })
  }
})