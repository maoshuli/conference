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

    // 获取全局保存的 openid
    let _openid = this.data._openid

    // 指示点击的是哪个按钮
    let item = e.currentTarget.dataset.vote
    let content = e.currentTarget.dataset.content

    console.log('type', this.data.vote[item].type)

    // 保存当前活动 type
    let type = this.data.vote[item].type

    console.log('item', item, 'content', content)

    // 保存两个验证，全部通过才能投票，否则返回投票失败
    // 已经投过票，投票列表中有自己的 openid 不能投票
    let hasVote = false
    // 不能投票给自己，如果 actor 列表中有自己则不能投票给自己
    let noActor = false

    // 判断本人有没有投过票，在这个项目中
    // 临时保存投票者数组
    let arr = []
    // 将头过票的保存在一个数组中
    this.data.vote[item].content.forEach((item, index) => {
      arr = arr.concat(item.vote)
      console.log(arr)
    })

    // 判断当前的 openid 不能与存在的 openid 重复
    if (!arr.includes(_openid)){
      hasVote = true
    }

    // 临时保存投票者数组
    arr = []

    // 判断 actor 中有没有本人
    this.data.vote[item].content[content].actor.forEach((item, index) => {
      console.log(item, 'arr._openid', item._openid)
      arr.push(item._openid)
    })

    if (!arr.includes(_openid)) {
      noActor = true
    }


    // 可以投票
    

    console.log('hasVote', hasVote, 'noActor', noActor)

    if(hasVote && noActor){  // 通过两个验证才能继续

      // 投票先更新云端数据，再更新本地数据
      wx.cloud.callFunction({
        name: 'upVote',
        data: {
          // 投票的类型，男女服装或节目
          type: type,
          item,
          content
        },
        success: res => {
          console.log('更新数据库', res.result)
          // 更新数据库成功后更新本地

          this.data.vote[item].content[content].hasVote = true
          this.data.vote[item].content[content].vote.push(_openid)
          let temp = this.data.vote

          this.setData({
            vote: temp
          })
        }
      })
      
    }



    // 点击有首先判断点击的是哪个项目的按钮
    // 获取 content 序号信息
    // 点击后判断是否已经投过票
    //   投过票返回 false
    //   未投票 读写数据库， 将投票信息写入数据库 数据库返回 写入成功才给 本地数据 添加 投过票状态

    // if(e.currentTarget.dataset.hasVote){  // 如果是真不能投票
    //   return ;
    // }else{
    //   wx.cloud.callFunction({
    //     name: 'getVote',
    //     data: {},
    //     success: res => {
    //       console.log(res.result)
    //     }
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()


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

        let data = res.result.data

        let _openid = res.result._openid

        // 需要对 data 做数据处理
        // 如果 vote 中有此用户的 openid
        // 则显示用户的投票状态是已经投票
        // 每个投票项目的投票状态

        data.forEach((type, type_index) => {
          type.content.forEach((content, content_index) => {
            content.vote.forEach((vote, vote_index) => {
              if(vote == _openid) {
                // console.log('相等')
                data[type_index].content[content_index].hasVote = true
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

    // this.setData({
    //   // 投票项目
    //   vote: data
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