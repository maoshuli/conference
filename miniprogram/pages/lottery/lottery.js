// pages/lottery/lottery.js
// 中奖信息
// 全部中奖信息返回一个数组，
// 数组中包含对象
// 每个对象为一个中奖项目信息

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lottery: '',
    hasGift: '',
    // 隐藏自己的获奖信息
    myGiftShow: false,
    // 是否显示未开奖提示
    pageShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getLottery',
      data: {},
      success: res => {
        console.log('lottery 所有中奖信息', res.result)

        if(res.result.data.length <= 0){
          this.setData({
            pageShow: false
          })
        }

        // 显示我的奖品
        this.setData({
          myGiftShow: true
        })
        let data = res.result.data
        // 获取自己的 openid 
        let _openid = res.result._openid

        console.log(data)

        // 在中奖信息里找到自己
        data.some((item1, index1) => {
          item1.gift.some((item2, index2) => {
            if (_openid == item2._openid){
              // 找到后设定值
              this.setData({
                hasGift: data[index1].name
              })
            }
          })
        })
        this.setData({
          lottery: res.result.data
        })
      }
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