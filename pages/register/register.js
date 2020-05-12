import { request } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    password: '',
    vertification: '',
    text: '获取验证码',
    isCode: false,
    count: 5
  },
  //  前往登录页
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  // 获取输入手机号码
  getMobile(event) {
    this.setData({
      mobile: event.detail.value
    });
  },
  // 获取输入的密码
  getPassword(event) {
    this.setData({
      password: event.detail.value
    })
  },
  // 获取输入的验证码
  getVertification(event) {
    this.setData({
      vertification: event.detail.value
    })
  },
  // 获取手机验证码
  getMobileCode() {
    let count = 5;
    // 检查手机号是否为空
    if (this.data.mobile == '' || !(/^1[3456789]\d{9}$/.test(this.data.mobile))) {
      wx.showToast({
        title: '请输入合法手机号码',
        icon: 'none'
      })
      return
    }
    // 获取验证码
    else {
      let time = setInterval(() => {
        this.setData({
          count: count--,
          text: `还剩${count}秒`,
          isCode: true
        });
        if(this.data.count <= 0) {
          clearInterval(time)
          this.setData({
            text: '重新发送',
            isCode: false
          })
        }
      },1000)
      
      // 发起请求
      request({
        url: '/index.php?s=/wap/Login/sendSmsRegisterCode',
        method: 'post',
        data: {
          vertification: 123,
          mobile: this.data.mobile
        }
      }).then(res => {
        wx.showToast({
          title: '短信发送成功',
          icon: res.data.message
        })
      })
    }
  },




  // 立即注册
  goRegister() {
    // 检测手机号码是否为空
    if (this.data.mobile == '' || !(/^1[3456789]\d{9}$/.test(this.data.mobile))) {
      wx.showToast({
        title: '请输入合法手机号码',
        icon: 'none'
      })
      return
    }
    
    else {
      // 检测手机号码是否已经注册过
      request({
        url: 'index.php?s=/wap/login/checkMobileIsHas',
        method: 'post',
        data: {
          mobile: this.data.mobile
        }
      }).then(res => {
        if(res.data) {
          wx.showToast({
            title: '此手机号已被注册过',
            icon: 'none'
          })
          return
        }
        else {
          // 检测密码是否为空
          if (this.data.password == '') {
            wx.showToast({
              title: '密码不能为空',
              icon: 'none'
            })
            return
          }
          else {
            // 检测验证码是否为空
            if(this.data.vertification == '') {
              wx.showToast({
                title: '手机验证码不能为空',
                icon: 'none'
              })
              return
            }
            // 发起注册请求
            else {
              request({
                url: 'index.php?s=/wap/Login/register',
                method: 'post',
                data: {
                  password: this.data.password,
                  mobile: this.data.mobile,
                  vertification: this.data.vertification,
                }
              }).then(res => {
                if (res.data.retval < 0) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  })
                }
                else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    success: () => {
                      wx.navigateBack({
                        url: '/pages/login/login'
                      })
                    }
                  })
                }
              })
            }
          }
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