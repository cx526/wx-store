import { request } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },
  // 跳转到注册页
  goRegister() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  // 获取输入的手机号码
  getUserName(event) {
    this.setData({
      username: event.detail.value
    })
  },
  // 获取输入的密码
  getPassword(event) {
    this.setData({
      password: event.detail.value
    })
  },
  // 跳转到忘记密码页
  goForget() {
    wx.navigateTo({
      url: '/pages/forget/forget',
    })
  },
  // 点击立即登录
  login() {
    // 检查手机号是否为空
    if (this.data.username == '' || !(/^1[3456789]\d{9}$/.test(this.data.username))) {
      wx.showToast({
        title: '请输入合法手机号码',
        icon: 'none'
      })
      return
    }
    // 检查密码是否为空
    else if (this.data.password == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return
    }
    // 发起登录请求
    else {
      request({
        url: "index.php?s=/wap/login/index",
        method: "POST",
        data: {
          username: this.data.username,
          password: this.data.password
        }
      }).then(res => {
        if (res.data.retval.code < 0) {
          wx.showToast({
            title: res.data.retval.message,
            icon: 'none'
          })
        }
        else {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            success: () => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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