// pages/entry/entry.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  // 页面跳转
  lottery: function () {
    wx.navigateTo({
      url: '../lottery/lottery',
    })
  },
  mark: function(){
    wx.navigateTo({
      url: '../mark/mark',
    })
  },

  // 跳转到配置页
  confugure: function(){
    wx.navigateTo({
      url: '../configure/configure',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 全局的用户信息存在直接使用
    if(app.globalData.userInfo){
      // 直接使用全局用户信息
      console.log('数据库找到用户直接使用全局用户信息', app.globalData)
      this.setData({
        userInfo: app.globalData.userInfo,
        _openid: app.globalData._openid
      })
    }else{
      // 调用云函数获取用户信息
      wx.cloud.callFunction({
        name: 'getUser',
        data: {},
        success: res => {
          console.log('entry getUser:', res.result)
          if (res.result.status == -1) {  // 数据库没有用户信息，返回首页
            wx.navigateTo({
              url: '../welcome/welcome'
            })
          } else if (res.result.status == 1) {  // 在数据库找到用户信息
            this.setData({
              userInfo: res.result.userInfo[0]
            })
          }
        }
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