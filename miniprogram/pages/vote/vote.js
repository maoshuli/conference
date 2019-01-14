const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 切换
  changeTab(e){
    // 如果当前已经是相同的值点击后不再相应
    if (this.data.active == e.target.dataset.id) {
      return;
    }
    this.setData({
      active: e.target.dataset.id
    })
  },

  // 投票
  vote(e){
    console.log('vote')
    console.log(e)

    if(e.currentTarget.dataset.hasVote){  // 如果是真不能投票
      return ;
    }else{
      wx.cloud.callFunction({
        name: 'getVote',
        data: {},
        success: res => {
          console.log(res.result)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let data = [{
      type: 'preform',  // 投票类型  节目 服装男 服装女
      title: '最佳节目',  // 投票标题
      content: [
        {
          name: '过河',  // 节目名字
          vote: ['opendi'],  // 此节目的投票者
          actor: [{ imgUrl: '', nickname: '小米', opneid: '' }, { imgUrl: '', nickname: '大米', opneid: '' }],  // 演员
        },
        {
          name: '双人相声',  // 节目名字
          vote: ['opendi', 'oYtjq0J_LRtgkIgQ91qjwYbRy-r8'],  // 此节目的投票者
          actor: [{ imgUrl: '', nickname: '郭德纲', opneid: '' }],  // 演员
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
          actor: [{ imgUrl: '', nickname: '', opneid: '' }],  // 演员
          vote: ['oYtjq0J_LRtgkIgQ91qjwYbRy-r8'],  // 此节目的投票者
        },
        {
          vote: ['opendi'],  // 此节目的投票者
          actor: [{ imgUrl: '', nickname: '', opneid: '' }],  // 演员
        }
      ]
    }]

    wx.cloud.callFunction({
      name: 'getVote',
      data: {},
      success: res => {
        console.log(res.result)

        let _openid = res.result._openid

        // 需要对 data 做数据处理
        // 如果 vote 中有此用户的 openid
        // 则显示用户的投票状态是已经投票

        data.some((item, index) => {
          console.log(item, index)
          item.content.some((content, index2) => {
            console.log('content')
            console.log(content, index2)
            content.vote.some((vote, index) => {
              if (vote == _openid){
                console.log('相等')
                content.hasVote = true
              }
            })
          })
        })

        let tempData = data


        this.setData({
          _openid: res.result._openid,
          vote: tempData
        })
      }
    })

    this.setData({
      // 投票项目
      vote: data
    })

    // wx.cloud.callFunction({
    //   name: 'getVote',
    //   data: {},
    //   success: res => {
    //     console.log(res.reuslt)
    //     // 返回数组中有三个对象
    //     // 云函数获取到的数组信息
        
    //   }
    // })
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
    console.log('分享')
  }
})