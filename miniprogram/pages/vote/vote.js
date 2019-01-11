// pages/vote/vote.js
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
    wx.cloud.callFunction({
      name: 'vote',
      data:{},
      success: res => {
        console.log('获取投票信息', res.result)
        // 活动的数据格式
        // 一个对象代表一个投票活动
        // 节目投票
        let data =  {
          // 投票类型， 节目 或服装 perform fashion
          type: 'perform',
          // 投票名称
          name: '最佳节目',
          // 投票选项
          project: [
            // 一个对象代表一个投票可选项
            {
              // 节目标题
              title: '歌唱大赛我的家',
              // 表演者
              actor: ['小王', '小李'],
              // 投票人
              vote: ['_opneid', '_opneid_334r393432']
            },
            {
              title: '看一江春水向东流',
              actor: ['李玉刚'],
              vote: ['_opneid', '_opneid_334r39343245']
            },
          ]
        }
        // 服装投票
        let data1 = {
          type: 'fashion',
          // 投票名称
          name: '最佳男服装',
          project: [
            // 一个投票项 对象
            {
              // 姓名
              title: '小王',
              // 投此选项的openid  默认为空
              vote: ['opneid', '121212123']
              // 签到
            }
          ]
        }
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