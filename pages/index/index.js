import { request } from '../../utils/util.js'
const baseURL = getApp().globalData.baseURL;
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
    newsList: []
  },
  // 获取数据
  getPageData() {
    wx.showLoading({
      title: '数据加载中',
    })
    request({
      url: 'index.php?s=/wap/index/index',
    }).then(res => {
      wx.hideLoading();
      
      // 处理轮播图数据
      let imgUrl = res.data.plat_adv_list.adv_list;
      let newsList = res.data.goods_list.data;
      imgUrl.map((item,index) => {
        item.adv_image = baseURL + item.adv_image
      });
      newsList.map((item,index) => {
        item.pic_cover_small = baseURL + item.pic_cover_small
      })
      this.setData({
        imgUrl,
        newsList
        
      })
    })
  },
  // 查看商品详情
  goDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goods-detail/goods-detail?goods_id='+id,
    })
  },
  // 查看更多
  checkMore() {
    wx.navigateTo({
      url: '/pages/online-goods/online-goods',
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取定位
    wx.getLocation({
      success: function(res) {
        wx.setStorage({
          key: 'position',
          data: [ res.latitude, res.longitude ],
        })
      },
    })
    // 获取页面相关数据
    this.getPageData()
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