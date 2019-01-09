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
    this.setData({
      userInfo: app.globalData.userInfo
    })
    if(app.globalData.number){
      this.setData({
        number: app.globalData.number
      })
    }else{
      // 获取当前用户的信息
      wx.cloud.callFunction({
        name: 'getUser',
        data: {
          // 获取所有人的信息
          // scope: 'all'
        },
        success: res => {
          // 所有用户
          let user = res.result;
          console.log('用户信息allData：', user.userInfo[0])
          let tempNumber = user.userInfo[0].number
          if (tempNumber < 9) {
            tempNumber = '0' + tempNumber
          }
          // 先打印自己信息
          this.setData({
            number: tempNumber
          })

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