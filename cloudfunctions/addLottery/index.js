// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

let _id;

// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('lottery').add({
    data: {
      // 奖品名称，奖品数量
      name: event.name,
      num: event.num
    }
  }).then(res => {
    _id = res._id;
  })

  return {
    _id
  }

  
  

}