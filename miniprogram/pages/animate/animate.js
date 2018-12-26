// pages/animate/animate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lAnimate: '',
    rAnimate: '',
    start: '北京',
    end: '深圳'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  trigger(){
    console.log('动画')
    let vm = this;
    let option = {
      duration: 100,
      timingFunction: 'ease-in'
    }

    var lanimation = wx.createAnimation(option)
    var ranimation = wx.createAnimation(option)

    // 起点
    lanimation.translateX(100)
    lanimation.scale(2)
    lanimation.opacity(0.1).step();

    // 终点
    ranimation.translateX(-100)
    ranimation.scale(2)
    ranimation.opacity(0.1).step()

    vm.setData({
      lAnimate: lanimation.export(),
      rAnimate: ranimation.export()
    })

    setTimeout(() => {
      // 起点
      lanimation.translateX(0)
      lanimation.scale(1)
      lanimation.opacity(1).step()

      // 终点
      ranimation.translateX(0)
      ranimation.scale(1)
      ranimation.opacity(1).step()

      // 替换文字
      let temp = vm.data.end;

      vm.setData({
        lAnimate: lanimation.export(),
        rAnimate: ranimation.export(),
        end: vm.data.start,
        start: temp
      })

    }, 100)

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