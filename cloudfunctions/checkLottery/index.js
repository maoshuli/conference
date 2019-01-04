// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  // 用户信息上下文
  const wxContext = cloud.getWXContext()
  // 用户 openid
  const _openid = wxContext.OPENID

  // 如果用户字段 hasGift 的值等于 点击的 id 则中奖
  let {data} = await db.collection('user').where({
    _openid: _openid
  }).get()

  // 点击抽奖后需要保存已经抽奖状态
  // 用户信息中更新字段
  // 先判度用户的 lotteryList 字段中是否有这个要加进去的字符串
  // 如果有：不加
  // 如果没有：加入
  let user = await db.collection('user').where({
    _openid: _openid
  }).get()

  let self = true
  // 数组字段存在，循环数组字段
  if (user.data[0].lotteryList){
    self = user.data[0].lotteryList.some((item, index) => {
      console.log(item, index)
      // 如果有 跟传入的参数 id相等，则停止
      return (item == event.id)
    })
  }else{
    await db.collection('user').where({
      _openid: _openid
    }).update({
      data: {
        // 将奖项的 id 插入已经抽过奖的数组列表
        lotteryList: _.push(event.id)
      }
    })
  }

  // self 为假,可以将数据传入，不会重复
  if(self == false){
    await db.collection('user').where({
      _openid: _openid
    }).update({
      data: {
        // 将奖项的 id 插入已经抽过奖的数组列表
        lotteryList: _.push(event.id)
      }
    })
  }

  // 中奖返回 1
  // 未中奖返回 -1
  if(data[0].hasGift == event.id){
    return {
      status: 1,
      msg: '恭喜中奖'
    }
  }else{
    return {
      status: -1,
      msg: '遗憾未中奖'
    }
  }
}