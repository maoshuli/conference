// pages/entry/entry.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 默认为真，防止信息为获得时提示请签到
    userInfo: true
  },

  // 页面跳转
  // 签到
  login: function(e){
    // 点击签到授权
    // 如果本地有用户信息直接跳转
    // 没有用户信息保存用户信息
    if (app.globalData.userInfo) { 
      // 存在全局用户信息，用户信息数据已经获取
      // 跳转到签到显示页
      wx.navigateTo({
        url: '../login/login',
      })
    } else { // 没有用户信息，全局没有说明数据库没有
      console.log('全局没有存在用户信息')
      // 用户同意授权或拒绝授权
      if (e.detail.userInfo) { // 同意
        console.log('获取用户信息', e.detail.userInfo)
        app.globalData.userInfo = e.detail.userInfo
        wx.cloud.callFunction({
          name: 'addUser',
          data: {
            // 保存用户信息参数 user
            user: e.detail.userInfo
          },
          success: res => {
            console.log('调用云函数结果', res.result)
            app.globalData._openid = res.result._openid
            this.setData({
              _openid: res.result._openid
            })
            wx.navigateTo({
              url: '../login/login',
            })
          }
        })
        // 保存到数据库
        this.setData({
          userInfo: e.detail.userInfo
        })
      } else {  // 拒绝
        console.log('用户拒绝授权')
        wx.showToast({
          title: '请先授权登录',
          icon: 'success',
          duration: 2000,
          icon: 'none'
        })
      }
    }
  },

  // 直接进入首页
  // 数据库能找到用户签到信息直接显示
  // 不是找到 提示 先前往签到页
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取到用户信息才显示首页内容
    // 获取不到显示请先签到

    // 直接进入首页的回调函数，获取用户信息
    app.getUserInfoCallback = res => {
      // 不存在用户信息
      if (res.result.status == -1){
        console.log('不存在用户信息')
        this.setData({
          userInfo: false
        })
      }else{  // 存在用户信息
        app.globalData.userInfo = res.result.userInfo[0].userInfo
        app.globalData._opneid = res.result.userInfo[0]._opneid
        app.globalData.number = res.result.userInfo[0].number
        this.setData({
          userInfo: res.result.userInfo[0].userInfo,
          _opneid: res.result.userInfo[0]._openid,
          number: res.result.userInfo[0].number
        })
      }
    }

    // 如果不存在此信息无法执行
    if(app.globalData.userInfo) {
      console.log('存在信息，执行')
      // 从其他页面进入时获取用户信息
      this.setData({
        userInfo: app.globalData.userInfo,
        _opneid: app.globalData._openid,
        number: app.globalData.number
      })
    }
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
    // 进入页面时获取服务器端用户信息,根据 _openid 找到用户
    wx.cloud.callFunction({
      name: 'getUser',
      success: res => {
        // 如果返回空数据没有此用户，不做操作
        if (res.result.status == -1) {
          console.log('app数据库没有此用户登录信息', res.result)
        } else {
          // 打印 返回数据，返回用户 信息
          console.log('app从数据库获取到用户信息', res.result)
          this.setData({
            userInfo: res.result.userInfo[0].userInfo,
            _openid: res.result.userInfo[0]._openid,
            number: res.result.userInfo[0].number
          })
        }
        wx.stopPullDownRefresh({
          success: res => {
            console.log('停止刷新')
          }
        })
      }
    })
    
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