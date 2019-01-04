// pages/addLottery/addLottery.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '测试 value',
    num: 1,
    // 已经存在的抽奖，数组对象
    lottery: []
  },

  submit: function(){
      wx.showToast({
        title: '等待云函数执行',
        icon: 'none'
      })
      wx.cloud.callFunction({
        name: 'addLottery',
        data: {
          // 传入参数，奖项名字，中奖人数
          name: this.data.value,
          num: this.data.num
        },
        success: res => {
          console.log('addLottery return',res.result)

          // 中奖人数设置过多提示
          if(res.result.status == -1){
            wx.showToast({
              title: '中奖人数设置超过未中奖总人数',
              icon: 'none'
            })
            return ;
          }

          this.data.lottery.push({ id: res.result._id, name: this.data.value, num: this.data.num})
          let tempLottery = this.data.lottery
          this.setData({
            lottery: tempLottery
          })
          this.setData({
            value: '',
            num: 1
          })
        }
      })
  },

  // 奖项名称更新
  onChange: function(e){
    this.setData({
      value: e.detail
    })
  },

  // 奖项人数更新
  onChangeNum: function(e){
    this.setData({
      num: e.detail
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
        this.setData({
          lottery: data
        })
        console.log('addLottery获取所有奖品信息data',data)
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