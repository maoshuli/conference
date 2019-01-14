// pages/lottery/lottery.js
// 中奖信息
// 全部中奖信息返回一个数组，
// 数组中包含对象
// 每个对象为一个中奖项目信息
let info = [
  {
    // 奖品名称
    name: '一等奖',
    // 中奖信息数组
    gift: [
      // 每个对象中保存一个中奖者的信息
      {
        nickname: '中奖信息',
        opneid: '中奖者opneid',
        imgUrl: '中奖头像'
      }
    ]
  },
  {
    name: '二等奖',
    gift: [
      {
        nickname: '中奖信息',
        opneid: '中奖者opneid',
        imgUrl: '中奖头像'
      },
      {
        nickname: '中奖信息',
        opneid: '中奖者opneid',
        imgUrl: '中奖头像'
      }
    ]
  },
  {
    name: '三等奖',
    gift: [
      {
        nickname: '中奖信息',
        opneid: '中奖者opneid',
        imgUrl: '中奖头像'
      },
      {
        nickname: '中奖信息',
        opneid: '中奖者opneid',
        imgUrl: '中奖头像'
      },
      {
        nickname: '中奖信息',
        opneid: '中奖者opneid',
        imgUrl: '中奖头像'
      }
    ]
  }

]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lottery: '',
    hasGift: ''
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
        let data = res.result.data
        // 获取自己的 openid 
        let _openid = res.result._openid

        console.log(data)

        data.some((item1, index1) => {

          item1.gift.some((item2, index2) => {
            if (_openid == item2._openid){
              // 找到后设定值
              this.setData({
                hasGift: data[index1].name
              })
              return index2
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