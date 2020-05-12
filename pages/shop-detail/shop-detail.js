import { request } from '../../utils/util.js'
const baseURL = getApp().globalData.baseURL
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: [],
    shop_id: '',
    shop_info: {},
    goodsList: []
  },
  // 获取门店详情
  getShopInfo() {
    wx.showLoading({
      title: '数据加载中',
    });
    request({
      url: "index.php?s=/wap/shop/apiIndex",
      method: "POST",
      data: {
        shop_id: this.data.shop_id,
      }
    }).then(res => {
      wx.hideLoading();
      // 商品信息
      let shop_info = res.data.shop_info;
      if(shop_info) {
        this.setData({
          imgUrl: [ baseURL + shop_info.shop_logo ],
          shop_info
        })
      }
      // 推荐产品
      if(res.data.goods && res.data.goods.length > 0) {
        let goodsList = res.data.goods;
        goodsList.map((item, index) => {
          return item.img = baseURL + item.img
        })
        this.setData({
          goodsList
        })
      }
      
    })
  },
  // 跳转到商品详情
  goDetail(event) {
    let index = event.currentTarget.dataset.index;
    let goods_id = this.data.goodsList[index].goods_id;
    wx.navigateTo({
      url: '/pages/goods-detail/goods-detail?goods_id='+goods_id,
    })
  },
  // 拨打电话
  makePhone() {
    if(!this.data.shop_info.shop_phone) {
      wx.showToast({
        title: '该商家暂没提供预约电话',
        icon: 'none'
      })
      return
    }
    else {
      wx.makePhoneCall({
        phoneNumber: this.data.shop_info.shop_phone
      })
    }
  },
  // 导航
  openMap() {
    if (!this.data.shop_info.latitude && !this.data.shop_info.longitude) {
      wx.showToast({
        title: '该商家暂未提供导航经纬度值',
        icon: 'none'
      })
      return
    }
    else {
      wx.openLocation({
        latitude: parseFloat(this.data.shop_info.latitude),
        longitude: parseFloat(this.data.shop_info.longitude),
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 存储门店id
    this.setData({
      shop_id: options.shop_id
    });
    // 获取数据
    this.getShopInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})