// pages/entry/entry.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  // 跳转抽奖页面
  lottery: function () {
    wx.navigateTo({
      url: '../lottery/lottery',
    })
  },

  // 跳转打分页面
  mark: function(){
    wx.navigateTo({
      url: '../mark/mark',
    })
  },

  // 点击管理，跳转到配置页
  confugure: function(){
    wx.navigateTo({
      url: '../configure/configure',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 获取页面用户信息保存到本地，如果全局没有用户信息，本页面不显示用户头像等等信息
    // app.userInfoCallback = res => {
    //   this.setData({
    //     userInfo: res.result.userInfo[0]
    //   })
    // }
    this.setData({
      userInfo: app.globalData.userInfo[0]
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