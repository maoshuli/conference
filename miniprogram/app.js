//app.js
App({
  globalData: {
    // 全局保存用户信息
  },

  onLaunch: function () {

    let _this = this;
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    // 进入页面时获取服务器端用户信息,根据 _openid 找到用户
    wx.cloud.callFunction({
      name: 'getUser',
      success: res => {
        // 如果返回空数据没有此用户，不做操作
        if (res.result.data.length == 0){
          console.log('数据库没有此用户登录信息',res.result)
        }else{
          // 打印看看 返回数据，返回用户 信息
          console.log('从数据库获取到用户信息', res.result)

          // 获取到用户信息后保存到本地
          this.globalData.userInfo = res.result.data[0].userInfo
          this.globalData._openid = res.result.data[0]._openid
          if (this.userInfoCallback){
            this.userInfoCallback(res)
          }
        }
      }
    })
  }
})
