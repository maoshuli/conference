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

  // 读取数据库，获取到参数 id 抽奖项目的中奖名单
  let { data }  = await db.collection('lottery').doc(event.id).get()

  // 点击抽奖后需要保存已经抽奖状态
  // 用户信息中更新字段
  // 
  await db.collection('user').where({
    _openid: _openid
  }).update({
    data: {
      // 将奖项的 id 插入已经抽过奖的数组列表
      lotteryList: _.push(event.id)
    }
  })

  for(let i=0; i < data.list.length; i++){
    if(_openid == data.list[i]){
      return {
        msg: '中奖'
      }
    }else{
      return {
        msg: '未中奖'
      }
    }
  }

  // return {
  //   data
  // }

  // 保存中奖名单 openid
  // 循环找到是否有指定的 openid
  // let data = data.data

  // return {
  //   data: data.data
  // }
  

  // if(_openid == list[i]){
  //   // 用户中奖，给用户数据库添加布尔值，指示此用户不能再参加抽奖
  //   // db.database('user').where({
  //   //   _openid: wxContext.OPENID
  //   // }).update({
  //   //   data: {
  //   //     // 更新成有礼物状态，不在参与抽奖
  //   //     hasGift: true
  //   //   },
  //   //   success: res => {
           
  //   //   }

  //   // })

  //   return {
  //     // 返回1 表示中奖
  //     msg: 1
  //   }
  // }

  // return {
  //   // 返回 0 表示为中奖
  //   msg: 0
  // }

}