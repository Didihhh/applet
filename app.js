App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    require('./sdk-v1.16.0')
    wx.BaaS.init('fdbf1d21e6f912955532')
  },

  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口  
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  }, 

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  /**
   * 微信用户登录
   */
  Login: function (e, cb) {
    let that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: function (response) {
          var code = response.code

          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                //首次进入防止网络问题出现页面一直无法显示(添加loading动画)           
                wx.showLoading({
                  title: '登录中',
                })

                wx.request({
                  url: that.globalData.url + "/ApiLogin",
                  method: "POST",
                  data: {
                    code: code,
                    iv: e.detail.iv,
                    encryptedData: e.detail.encryptedData
                  },
                  success: function (res) {

                    //请求完成 隐藏loading动画
                    wx.hideLoading()

                    // 本地存储
                    wx.setStorage({
                      key: 'userInfo',
                      data: res.data,
                    })
                    that.globalData.userInfo = res.data;
                    typeof cb == "function" && cb(that.globalData.userInfo)

                  }
                })
              }
            }
          })
        }
      })
    }
  },

  globalData: {
    user: false,
    userInfo: null
  }
})
