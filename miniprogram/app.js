//app.js
App({
  globalData: {
  },

  onLaunch: function () {
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
        if (res.result.status == -1){
          console.log('app数据库没有此用户登录信息',res.result)
        }else{
          // 打印 返回数据，返回用户 信息
          console.log('app从数据库获取到用户信息', res.result)

          // 获取到信息后保存到本地(用户信息，用户_openid,_id)
          this.globalData.userInfo = res.result.userInfo[0].userInfo
          this.globalData._openid = res.result.userInfo[0]._openid

          if (this.getUserInfoCallback){
            this.getUserInfoCallback(res)
          }
          
        }
      }
    })
  }
})

// 能获取到用户信息就保存在全局

// 不能获取到用户信息不做处理，由welcom页面获取提交用户信息
