import {
  request
} from '../../utils/util.js'
const baseURL = getApp().globalData.baseURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    cityName: '定位...',
    page: 1,
    shopList: [],
    baseURL: '',
    flag: false
  },
  // 读取定位
  getPosition() {
    wx.getStorage({
      key: 'position',
      success: res => {
        this.setData({
          latitude: res.data[0],
          longitude: res.data[1]
        });
        // 获取当前所处的城市
        this.getLocationName()
      },
      fail: error => {
        wx.getLocation({
          success: res => {
            wx.setStorage({
              key: 'position',
              data: [res.latitude, res.longitude],
            })
          },
        })
      }
    })
  },
  // 获取城市名
  getLocationName() {
    request({
        url: 'index.php?s=/wap/index/apiGetLocateName',
        data: {
          latitude: this.data.latitude,
          longitude: this.data.longitude,
        }
      })
      .then(res => {
        // wx.hideLoading();
        let cityName = res.data.data.result.ad_info.city;
        this.setData({
          cityName
        })
      });
  },
  // 重新获取定位
  getLocation() {
    this.getPosition()
  },
  // 获取附近产品
  getGoodsList() {
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    request({
      url: 'index.php?s=/wap/index/apiGetBoomGoods',
      data: {
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        page: this.data.page
      }
    })
      .then(res => {
        wx.hideLoading();
        let shopList = res.data.list
        if(shopList && shopList.length > 0) {
          shopList.map((item, index) => {
            return item.picture_cover = baseURL + item.picture_cover
          })
          this.setData({
            shopList: [...this.data.shopList, ...shopList]
          })
        }
        else {
          this.setData({
            flag: true
          })
        }
        
      });
  },
  // 跳转到商品详情
  goDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goods-detail/goods-detail?goods_id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 读取本地缓存的经纬度
    this.getPosition();
    // 获取周围商家
    this.getGoodsList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      page: this.data.page+1,
    })
    this.getGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})