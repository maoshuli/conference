// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 保存新添加的数据的 id
  let _id;

  // vote 投票数据库
  await db.collection('vote').add({
    data: {
      // 保存投票主题
      name: event.name,
      // 保存投票中的可投项
      item: event.item,
    }
  }).then(res => {
      _id= res._id
  })

  return {
    _id,
    event
  }
}