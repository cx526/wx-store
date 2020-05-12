import { request } from '../../utils/util.js'
const baseURL = getApp().globalData.baseURL
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currentIndex: 0,
    // 当前分类的id
    category_id: '',
    page: 1,
    goodsList: [],
    id: '',
    flag: false,
    loadingMore:false
  },
  // 获取分类
  getNavList() {
    wx.showLoading({
      title: '数据加载中',
    })
    request({
      url: 'index.php?s=/wap/goods/goodsClassificationList',
      method: 'POST'
    }).then(res => {
      wx.hideLoading()
      // scroll-view横向滚动
      for(let i = 0;i < res.data.list.length;i++) {
        res.data.list[i].id = "item" + res.data.list[i].category_id
      }
      this.setData({
        list: res.data.list
      })
    })
  },
  // 改变当前选中项
  changeNav(event) {
    this.setData({
      goodsList: []
    })
    let index = event.currentTarget.dataset.index;
    this.setData({
      currentIndex: index,
      category_id: this.data.list[index].category_id,
      id: this.data.list[index].id
    })
    this.getGoodsList(this.data.category_id)
  },
  // 获取分类的产品
  getGoodsList(cat_id = 97, page = 1) {
    request({
      url: 'index.php?s=/wap/goods/listCategoryGoods',
      data: {
        cat_id: cat_id,
        page: this.data.page
      }
    }).then(res => {
      let goodsList = res.data.list.data;
      if(goodsList && goodsList.length > 0) {
        // 防止无数据时重复请求
        if (goodsList.length < 10) {
          this.setData({
            loadingMore: true
          })
        }
        goodsList.map((item, index) => {
          return item.pic_cover_mid = baseURL + item.pic_cover_mid
        })
        this.setData({
          goodsList: [...this.data.goodsList, ...goodsList]
        });
      }
      else {
        setTimeout(() => {
          this.setData({
            flag: true
          })
        },700)  
      }
    })
  },
  // 跳转到货品详情
  goDetail(event) {
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/goods-detail/goods-detail?goods_id='+ index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取分类
    this.getNavList();
    this.getGoodsList()
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
    if(!this.data.loadingMore) {
      this.setData({
        page: this.data.page + 1,
      })
      this.getGoodsList(this.data.category_id ? this.data.category_id : undefined, this.data.page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})