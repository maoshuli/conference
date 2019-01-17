// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let data, status, msg, tempContent;

  await db.collection('vote').where({
    type: event.type,
  }).get().then( res => {
    data = res.data[0]
  })

  // return {
  //   data
  // }

  data.content[event.item].vote.push(wxContext.OPENID)

  // return {
  //   data,
  //   item: event.item,
  //   content: data.content
  // }

  // 投票在投票人的数组中加入此用户的 openid
  await db.collection('vote').doc(data._id).update({
    data:{
      content: data.content
    }
  })

  return {
    status,
    msg
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}