// pages/mark/mark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 投票主题
    name: '',
    // 投票项目,用数组保存项目
    // 每次内容变动同步整个数组
    item: [
      {
        // 可投票项目的名字
        name: '',
        // 保存此选项的赞数
        // 在一个投票项目中，每人只有一票
        // 新建默认票数为 0
        awesome: 0
      }
    ] 
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

  // 名字修改
  changeName: function(e){
    this.setData({
      name: e.detail.value
    })
  },

  // 项目内容修改
  changeItem: function(e){
    let index = e.currentTarget.dataset.index
    this.data.item[index].name = e.detail.value
    let temp = this.data.item
    this.setData({
      item: temp
    })
  },

  // 增加投票项目
  addItem: function(e){
    this.data.item.push({name: ''})
    let temp = this.data.item
    this.setData({
      item: temp
    })
  },

  // 删除项目
  delItem: function(e){
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    this.data.item.splice(index, 1)

    let temp = this.data.item
    this.setData({
      item: temp
    })
  },

  // 增加投票
  addVote: function(e){
    // 提交不能有未填写表单
    if(this.data.name == ''){
      console.log('主题不能为空')
      return ;
    }
    for(let i=0;i<this.data.item.length;i++){
      if(this.data.item[i].name == ''){
        console.log('投票项目不能有空')
        return;
      }
    }

    wx.cloud.callFunction({
      name: 'addVote',
      data: {
        name: this.data.name,
        item: this.data.item
      },
      success: res => {
        console.log('添加投票主题', res.result)
      }
    })
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
  // 云端删除调用成功后本地数据删除
  removeProgram: function(e){
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
    // 进入页面时获取云端数据
    // 如果获取不到信息则返回提示
    wx.cloud.callFunction({
      name: 'getProgram',
      data: {},
      success: res => {
        console.log('mark页面onload加载数据',res.result)
        // 设置节目信息数据到 data
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