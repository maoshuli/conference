// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfoCallback = res => {
      console.log(res.result.status)
      // 如果获取不到用户信息
      if (res.result.status == -1){
        return ;
      }
      this.setData({
        userInfo: res.result.userInfo[0].userInfo,
        _opneid: res.result.userInfo[0]._openid,
        number: res.result.userInfo[0].number
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