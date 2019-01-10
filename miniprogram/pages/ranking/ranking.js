import * as echarts from '../../lib/ec-canvas/echarts';

let chart = null;
// let optionData1 = [320, 230, 410, 144, 230, 120, 230, 330, 170]
let option = {
  color: ['#37a2da', '#32c5e9', '#67e0e3'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    },
    confine: true
  },
  legend: {
    data: ['热度'],
    show: true
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 15,
    top: 40,
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎', '汽车之家', '今日头条'],
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }
  ],
  series: [
    {
      name: '票数',
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'inside'
        }
      },
      data: [1,2,1,1,1,1,1],
      itemStyle: {
        // emphasis: {
        //   color: '#37a2da'
        // }
      }
    }
  ]
};

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {  },
      fail: function () { }
    }
  },
  
  data: {
    // 切换样式
    active: 1,

    // 数据图
    ec1: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart
    },
    ec3: {
      onInit: initChart
    }
  },

  changeTab: function(e){
    // 如果当前已经是相同的值点击后不再相应
    if(this.data.active == e.target.dataset.id){
      return ;
    }
    this.setData({
      active: e.target.dataset.id
    })
    let index = e.target.dataset.id
    if(index ==1){
      option.series[0].data = [320, 230, 410, 144, 230, 120, 230, 330, 170]
    }
    if (index == 2) {
      option.series[0].data = [20, 80, 40, 44, 99, 66, 88, 44, 33]
    }
    if (index == 3) {
      option.series[0].data = [365, 212, 123, 500, 32, 22, 0, 6, 5]
    }
    chart.setOption(option);
  },

  onLoad: function () {
    // 请求所有数据

    // 节目
    let item1 = [320, 230, 410, 144, 230, 120, 230, 330, 170]
    // 服装男
    let item2 = []
    // 服装女
    let item3 = []
    option.series[0].data = [1, 2, 3, 4, 5, 6, 7, 9, 10]
    chart.setOption(option);
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
});
