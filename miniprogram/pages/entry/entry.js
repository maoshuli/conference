// pages/entry/entry.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
  },

  // 跳转打分页面
  mark: function(){
    wx.navigateTo({
      url: '../mark/mark',
    })
  },

  // 跳转抽奖页面
  lottery: function(){
    wx.navigateTo({
      url: '../lottery/lottery',
    })
  },

  // 点击管理，跳转到配置页
  confugure: function(){
    wx.navigateTo({
      url: '../configure/configure',
    })
  },

  // 点击添加用户
  addUser: function(e){

    // 获取用户信心，在云端函数连同 _openid 一同保存
    // 传递给函数参数： 用户信息，其他在云端拿到信息
    // id: xxxx
    // _openid: xxxx
    // userInfo: {}
    let userInfo = e.detail.userInfo

    // 如果用户拒绝获取用户信息
    if(!userInfo){
      console.log('用户拒绝获取用户信息！')
      wx.showToast({
        title: '请先允许微信授权',
        icon: 'none',
        duration: 2000
      })
      return ;
    }

    // 加载提示
    wx.showLoading({
      title: '',
      mask: true
    })

    // 调用增加用户函数
    wx.cloud.callFunction({
      name: 'addUser',
      data: {
        user: userInfo
      },
      success: res => {
        console.log('res success', res)
        // 设置用户信息
        // 全局
        app.globalData.userInfo = userInfo;
        app.globalData._openid = res.result._openid;

        this.setData({
          userInfo: userInfo
        })

        wx.navigateTo({
          url: '../login/login',
          complete: res => {
            wx.hideLoading()
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取页面用户信息保存到本地，如果全局没有用户信息，本页面不显示用户头像等等信息
    // 


    app.userInfoCallback = res => {
      this.setData({
        userInfo: res.result.data[0].userInfo,
        _openid: res.result.data[0]._openid
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