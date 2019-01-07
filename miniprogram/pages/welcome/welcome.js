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
    // 先检查全局是否有全局信息
    // 如果有全局信息，进入下一页
    // 如果没有全局信息，提示授权
    if(app.globalData.userInfo != undefined){  // app查找到用户信息
      console.log('当前全局存在用户信息，跳转到下一页！')
      // 进入下一页
      wx.navigateTo({
        url: '../entry/entry',
      })
    } else { // 不存在全局信息
      // 授权使用小程序开放能力获取用户信息
      console.log('当前全局不存在用户信息，用户同意授权并保存到全局和数据库后跳转到下一页！')
      console.log('授权信息', e.detail.userInfo)
      // app.globalData.userInfo = e.detail.userInfo
      if (e.detail.userInfo != undefined){  // 用户同意授权
        // 调用云函数，保存用户数据
        wx.cloud.callFunction({
          name: 'addUser',
          data: {
            // 云函数传参 user 代表 userInfo
            user: e.detail.userInfo
          },
          success: res => {
            // 获取返回值的 opneid,保存到全局
            app.globalData._openid = res.result._openid
            // 获取用户信息
            app.globalData.userInfo = e.detail.userInfo
            console.log('welcome提交用户到数据库',res.result)
            // 进入下一页
            wx.navigateTo({
              url: '../entry/entry',
            })
          }
        })
      }else{
        console.log('拒绝授权')
      }
    }

    return ;
    // 点击进入会场，查找数据库，
    // 如果存在用户信息，直接进入下一页
    // 如果不存在用户信息，提示获取数据，并保存到数据库

    // 数据库获取用户信息
    // 如果获取到用户信息，返回用户信息对象 status: 1
    // 如果找不到用户信息，返回 status: -1
    // wx.cloud.callFunction({
    //   name: 'getUser',
    //   data: {},
    //   success: res => {
    //     console.log('尝试获取用户信息：',res.result)
    //     if(res.result.status == -1){  // 未找到用户信息，需要用户同意授权
    //       // 用户拒绝授权信息
    //       if (e.detail.userInfo == undefined) {
    //         console.log('用户拒绝获取信息')
    //         return;
    //       }
    //       // 用户同意授权信息
    //       // 将用户信息保存在数据库后进入下一页
    //       wx.cloud.callFunction({
    //         name: 'addUser',
    //         data: {
    //           user: e.detail.userInfo
    //         },
    //         success: res => {
    //           // 返回用户的openid,保存到用户信息
    //           console.log('welcome res.result',res.result)
    //           // 将数据保存在全局
    //           app.globalData.userInfo = e.detail.userInfo
    //           // if (app.userInfoCallback){
    //           //   app.userInfoCallback(e.detail.userInfo)
    //           // }
    //           // 进入下一页
    //           wx.navigateTo({
    //             url: '../entry/entry',
    //           })
    //         }
    //       })
    //     }else if(res.result.status == 1){  // 找到用户信息
    //       // 将用户信息保存在全局变量，进入下一页
        
    //       app.globalData.userInfo = res.result.userInfo[0].userInfo
    //       app.globalData._openid = res.result.userInfo[0]._openid
    //       console.log('welcome 用户信息：', res.result.userInfo)
    //       wx.navigateTo({
    //         url: '../entry/entry',
    //       })
    //     }
    //   }
    // })

    return ;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // // 获取页面用户信息保存到本地，如果全局没有用户信息，本页面不显示用户头像等等信息
    // app.userInfoCallback = res => {
    //   this.setData({
    //     userInfo: res.result.userInfo[0].userInfo,
    //     _opneid: res.result.userInfo[0]._openid
    //   })
    // }

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