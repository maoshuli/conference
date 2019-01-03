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
  // list: 中奖者名单，不获取
  let { data } = await db.collection('lottery').get()

  // 返回奖项的 id, name, num, 奖项中奖信息不返回
  for(let i=0;i<data.length;i++){
    // 删除中奖信息
    delete data[i]['list']
  }

  return {
    data
  }
}