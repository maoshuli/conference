// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _openid = wxContext.OPENID
  const id = event.id

  // 读取数据库，获取到参数 id 抽奖项目的中奖名单
  let data = await db.collection('lottery').doc(id).get()

  // 保存中奖名单 openid
  // 循环找到是否有指定的 openid
  let data = data.data

  return {
    data: data.data
  }
  

  if(_openid == list[i]){
    // 用户中奖，给用户数据库添加布尔值，指示此用户不能再参加抽奖
    // db.database('user').where({
    //   _openid: wxContext.OPENID
    // }).update({
    //   data: {
    //     // 更新成有礼物状态，不在参与抽奖
    //     hasGift: true
    //   },
    //   success: res => {
           
    //   }

    // })

    return {
      // 返回1 表示中奖
      msg: 1
    }
  }

  return {
    // 返回 0 表示为中奖
    msg: 0
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}