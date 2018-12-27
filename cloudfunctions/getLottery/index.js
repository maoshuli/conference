// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // lottery 数据库中保存着管理添加的抽奖项目
  // name: 抽奖项目名字
  // count: 中奖人数
  // list: 中奖者名单
  let { data } = await db.collection('lottery').get()


  return {
    data
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}