const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  changeTab(e){
    // 如果当前已经是相同的值点击后不再相应
    if (this.data.active == e.target.dataset.id) {
      return;
    }
    this.setData({
      active: e.target.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getVote',
      data: {},
      success: res => {
        console.log(res.reuslt)
        // 返回数组中有三个对象
        // 云函数获取到的数组信息
        [{
         type: 'preform',  // 投票类型  节目 服装男 服装女
         title: '最佳节目',  // 投票标题
         content: [
           {
              name: '过河',  // 节目名字
              vote: ['opendi'],  // 此节目的投票者
              actor: [{ imgUrl: '', nickname: '', opneid: '' }],  // 演员
           },
           {
             name: '双人相声',  // 节目名字
             vote: ['opendi'],  // 此节目的投票者
             actor: [{ imgUrl: '', nickname: '', opneid: '' }],  // 演员
           }
         ]
        },
        {
          type: 'boy',  // 投票类型  节目 服装男 服装女
          title: '最佳男服装',  // 投票标题
          content: [
            {
              vote: ['opendi'],  // 此节目的投票者
              actor: [{ imgUrl: '', nickname: '', opneid: '' }],  // 演员
            },
            {
              vote: ['opendi'],  // 此节目的投票者
              actor: [{ imgUrl: '', nickname: '', opneid: '' }],  // 演员
            }
          ]
        },
        {
          type: 'girl',  // 投票类型  节目 服装男 服装女
          title: '最佳女服装',  // 投票标题
          content: [
            {
              vote: ['opendi'],  // 此节目的投票者
              actor: [{ imgUrl: '', nickname: '', opneid: '' }],  // 演员
            },
            {
              vote: ['opendi'],  // 此节目的投票者
              actor: [{ imgUrl: '', nickname: '', opneid: '' }],  // 演员
            }
          ]
        }]
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