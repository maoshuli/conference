// pages/mark/mark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 保存已经有的节目项目
    program:[],
    // 节目名称
    name: '节目名字测试',
    // 节目类型
    type: '小品',
    // 表演团队
    actor: '艺术团'
  },

  // 重置表单
  resetInput: function(){
    this.setData({
      name: '',
      type: '',
      actor: ''
    })
  },

  // 表单输入监控
  onChange: function(e){
    let target = e.target.dataset.variable
    if(target == 'name'){
      this.setData({
        name: e.detail.value
      })
    }

    if (target == 'type') {
      this.setData({
        type: e.detail.value
      })
    }

    if (target == 'actor') {
      this.setData({
        actor: e.detail.value
      })
    }
  },

  // 添加节目
  // 添加节目后前端用户可以看到相关节目，并且可以评分
  addProgram: function(){
    wx.cloud.callFunction({
      name: 'addProgram',
      data: {
        _name: this.data.name,
        _type: this.data.type,
        _actor: this.data.actor
      },
      success: res => {
        console.log('mark addProgram:', res.result)
        // 添加成功后，在本地数据中添加对应节目
        this.data.program.push({_id: res.result._id, name: this.data.name, type: this.data.type, actor: this.data.actor})
        let tempData = this.data.program
        console.log(tempData)
        this.setData({
          program: tempData
        })
      }
    })
  },

  // 删除节目
  removeProgram: function(e){
    console.log(e)
    wx.cloud.callFunction({
      name: 'deleteProgram',
      data: {
        id: e.target.dataset.variable
      },
      success: res => {
        console.log('删除节目')
        // 在本地清除这条数据
        // 根据点击的 id 清除数据
        // 循环所有本地数据
        for(let i=0;i<this.data.program.length;i++){
          if(e.target.dataset.variable == this.data.program[i]._id){
            this.data.program.splice(i, 1)
            let temp = this.data.program
            this.setData({
              program: temp
            })
          }
        }

      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用云函数读取数据库中的评分节目，如果获取不到信息则返回提示
    wx.cloud.callFunction({
      name: 'getProgram',
      data: {},
      success: res => {
        console.log('onload res',res.result)
        this.setData({
          program: res.result.data
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