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
  userLottery: function(e){
    // 抽奖

    // 被点击的奖项的 id
    let id = e.target.dataset.id

    console.log('id:', id)

    // 本页面有保存奖项的信息

    wx.cloud.callFunction({
      // 云函数检查中奖名单，与用户 opneid 对比，返回是否中奖
      name: 'checkLottery',
      // 参数传入当前点击的抽奖项目的 id
      data: {
        id: id
      },
      success: res => {
        console.log('点击抽奖')
        console.log('userLottery return res',res.result)
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
      data: {},
      success: res => {

        // 所有奖品的信息
        let data = res.result.data

        console.log(data)

        // 获取用户抽奖信息
        wx.cloud.callFunction({
          name: 'getUser',
          data: {},
          success: res => {
            let looteryList = res.result.userInfo[0].lotteryList
            let hasGift = res.result.userInfo[0].hasGift
            console.log('lottery获取用户信息getUser,抽过的奖项', res.result.userInfo[0].lotteryList)
            console.log('lottery获取用户信息getUser,抽中的奖品', res.result.userInfo[0].hasGift)

            // 给抽奖项目添加状态
            // status: 0 未抽奖
            // status: -1 未中奖
            // status: 1 中奖
            for (let i = 0; i < data.length; i++) {
              data[i].status = 0
              if (looteryList.indexOf(data[i]._id) >= 0) {  // 找到元素，设置为未中将
                data[i].status = -1
              }

              if ((looteryList.indexOf(data[i]._id) >= 0) && (hasGift.indexOf(data[i]._id) >= 0)) {
                data[i].status = 1
              }
            }
          }
        })
        console.log(data)
        // 将获取到的数据保存在本页变量中
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