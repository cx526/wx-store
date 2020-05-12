import { request } from '../../utils/util.js'
const baseURL = getApp().globalData.baseURL
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    latitude: '',
    longitude: '',
    shopList: [],
    flag: false
  },
  // 获取周围商家店铺
  getShopList() {
    wx.showLoading({
      title: '数据加载中',
    });
    request({
      url: 'index.php?s=/wap/index/apiGetShopList',
      data: {
        page: this.data.page,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
      }
    }).then(res => {
      wx.hideLoading()
      // 处理星级评分(shop_deliverycredit);
      if(res.data.data && res.data.data.length > 0) {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].all = res.data.data[i].shop_deliverycredit / 1;
          res.data.data[i].half = res.data.data[i].shop_deliverycredit % 1 != 0 ? 1 : 0;
          res.data.data[i].none = 5 - res.data.data[i].all - res.data.data[i].half;
          res.data.data[i].shop_logo = baseURL + res.data.data[i].shop_logo
        }
        this.setData({
          shopList: [...this.data.shopList, ...res.data.data]
        })
      }
      else {
        this.setData({
          flag: true
        })
      }
    })
  },
  // 跳转到店家详情
  goShopDetail(event) {
    let shop_id = this.data.shopList[event.currentTarget.dataset.index].shop_id;
    wx.navigateTo({
      url: '/pages/shop-detail/shop-detail?shop_id='+shop_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopList()
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
    if(!this.data.flag) {
      this.setData({
        page: this.data.page + 1
      })
      this.getShopList()
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})