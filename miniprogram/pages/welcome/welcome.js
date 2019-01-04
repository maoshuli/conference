// pages/welcome/welcome.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 触发进入会场按钮，获取用户授权，保存在数据库中
  getIn: function(e){

    // 点击进入会场，查找数据库，
    // 如果存在用户信息，直接进入下一页
    // 如果不存在用户信息，提示获取数据，并保持到数据库

    // 数据库获取用户信息
    // 如果获取到用户信息，返回用户信息对象 status: 1
    // 如果找不到用户信息，返回 status: -1
    wx.cloud.callFunction({
      name: 'getUser',
      data: {},
      success: res => {
        console.log('尝试获取用户信息：',res.result)
        if(res.result.status == -1){  // 未找到用户信息
          // 拒绝获取用户信息
          if (e.detail.userInfo == undefined) {
            console.log('用户拒绝获取信息')
            return;
          }
          // 用户为拒绝获取信息
          // 将用户信息保存在数据库后进入下一页
          wx.cloud.callFunction({
            name: 'addUser',
            data: {
              user: e.detail.userInfo
            },
            success: res => {
              // 返回用户的openid,保存到用户信息
              console.log('welcome res.result',res.result)
              // 将数据保存在全局
              app.globalData.userInfo = e.detail.userInfo
              // if (app.userInfoCallback){
              //   app.userInfoCallback(e.detail.userInfo)
              // }
              // 进入下一页
              wx.navigateTo({
                url: '../entry/entry',
              })
            }
          })
        }else if(res.result.status == 1){  // 找到用户信息
          // 将用户信息保存在全局变量，进入下一页
          app.globalData.userInfo = res.result.userInfo
          wx.navigateTo({
            url: '../entry/entry',
          })
        }
      }
    })

    return ;


    // 拒绝获取用户信息
    if (e.detail.userInfo == undefined) {
      console.log('用户拒绝获取信息')
      return;
    }

    // 如果点击时已经存在用户信息直接进入下一页
    if (!(this.data.userInfo == undefined)){
      // 进入下一页
      wx.navigateTo({
        url: '../entry/entry',
      })
      return ;
    }
    
    // 如果数据库不存在用户信息，将用户信息保存到数据库
    wx.cloud.callFunction({
      name: 'addUser',
      data: {
        user: e.detail.userInfo
      },
      success: res => {
        // 返回用户的openid,保存到用户信息
        console.log(res.result)
        app.globalData._opneid = res.result._openid
        app.globalData.userInfo = e.detail.userInfo
        // 进入下一页
        wx.navigateTo({
          url: '../entry/entry',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取页面用户信息保存到本地，如果全局没有用户信息，本页面不显示用户头像等等信息
    app.userInfoCallback = res => {
      this.setData({
        userInfo: res.result.userInfo[0]
      })
    }



    // 如果在数据库中找到用户授权信息，则直接跳过欢迎页，进入主页面
    // 调用云函数，返回用户信息
    // wx.cloud.callFunction({
    //   name: 'getUser',
    //   data: {},
    //   success: res => {
    //     console.log('欢迎页查询结果res.result',res.result.data)
    //   }
    // })
    // wx.getSetting({
    //   success: res => {
    //     console.log(res)
    //     if(res.authSetting['scope.userInfo']){
    //       console.log('存在用户信息')
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // if (app.globalData.userInfo) {
    //   console.log('存在用户')
    //   console.log(app.globalData.userInfo)
    // } else {
    //   console.log('不存在用户')
    // }
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