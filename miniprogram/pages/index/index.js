// pages/entry/entry.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
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



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      number: app.globalData.number
    })
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