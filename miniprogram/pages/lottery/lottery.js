// pages/lottery/lottery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lottery: '',
  },

  // 用户抽奖, 返回抽奖结果
  // 指定点击的抽奖项目的id
  // 在此id的中奖名单中查找是否有此用户
  // 没有返回未中奖
  // 找到返回中奖
  userLottery: function(){
    wx.cloud.callFunction({
      // 云函数检查中奖名单，与用户 opneid 对比
      name: 'checkLottery',
      // 参数传入当前点击的抽奖项目的 id
      data: {
        id: 'XCWX2HffS3SWT7EH'
      },
      success: res => {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 进入页面时先查看数据库中保存的抽奖
    wx.cloud.callFunction({
      name: 'getLottery',
      data: {

      },
      success: res => {
        // 所有奖品的信息
        let data = res.result.data
        console.log(data)
        this.setData({
          lottery: data
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