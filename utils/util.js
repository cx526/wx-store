const baseURL = "https://admin.dxsc.vip/"
export function request(options) {
  return new Promise((resolve, reject) => {
    Token().then(res => {
      let token = res;
      if (token !== '-1') {
        if (options.data !== undefined) {
          options.data["token"] = token;
        }
      }
      wx.request({
        url: baseURL + options.url,
        method: options.method || 'GET',
        data: options.data || { token: token },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          // if (res.statusCode != 200) {
          //   uni.showToast({
          //     title: '数据加载失败',
          //     icon: 'none'
          //   })
          // }

          // if (typeof res.code != undefined) {
          //   if (res.data.code == 201) {
          //     uni.showToast({
          //       title: res.data.msg,
          //       icon: 'none'
          //     })
          //   }
          // }
          // if (res.data.code == -1002) {
          //   uni.reLaunch({
          //     url: "/pages/components/telephone/telephone"
          //   })
          // }
          resolve(res)
        },
        fail: (error) => {
          reject(error.errMsg)
        },
      })
    });
  })
}

// 获取token
export function Token() {
  return new Promise((resolve, reject) => {
    let startTime = new Date().getTime();
    let token;
    // 查看本地是否有token
    wx.getStorage({
      key: 'token',
      fail: res => {
        getToken().then(res => { token = res; resolve(token) });
      },
      success: res => {
        let data = res.data;
        let nowTime = new Date().getTime();
        if (data[1] < nowTime) {
          token = getToken();
        } else {
          token = data[0];
        }
        resolve(token);
      }
    });

  })

}
export function getToken() {
  return new Promise((resolve, reject) => {
    let token;
    wx.request({
      url: baseURL + 'index.php?s=wap/captchac/getUserToken',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        token = res.data.token;
        let endTime = new Date().getTime() + 86400000;
        wx.setStorageSync("token", Array(token, endTime));
        resolve(token);
      }
    })
  })
}
