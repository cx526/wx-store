import { request } from '../../utils/util.js'
const baseURL = getApp().globalData.baseURL
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: [
      '/images/dianxia.png',
      '/images/dianxia.png',
      '/images/dianxia.png'
    ],
    goods_id: '',
    goods_info: {},
    description: ''
  },
  // 获取对应商品的详情
  getGoodsInfo() {
    wx.showLoading({
      title: '数据加载中',
    })
    request({
      url: 'index.php?s=/wap/goods/Apigoodsdetail',
      method: 'POST',
      data: {
        id: this.data.goods_id
        // id: 33
      }
    }).then(res => {
      wx.hideLoading()
      let goodsInfo = res.data.goods_detail;
      let description = res.data.goods_detail.description.replace(/<img /g,'<img class="rich-img"')
      goodsInfo.img_list.map((item,index) => {
        return item.pic_cover = baseURL + item.pic_cover
      })
      // 轮播图
      this.setData({
        imgUrl: goodsInfo.img_list,
        goods_info: goodsInfo,
        description
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({
      goods_id: options.goods_id
    })
    console.log(this.data.goods_id);
    this.getGoodsInfo()
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