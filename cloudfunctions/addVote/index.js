// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let _id;

  // 节目数据库
  await db.collection('program').add({
    data: {
      name: event._name,
      type: event._type,
      actor: event._actor
    }
  }).then(res => {
      _id= res._id
  })

  return {
    _id,
    event
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}