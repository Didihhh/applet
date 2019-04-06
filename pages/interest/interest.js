// Page({
//   data: {
//     items1: [
//       { name: 'USA', value: '\r\t信息系统项目管理师' },
//       { name: 'CHN', value: '\r\t系统分析师' },
//       { name: 'BRA', value: '\r\t系统架构设计师' },
//       { name: 'JPN', value: '\r\t网络规划设计师' }
//     ],
//     items2: [
//       { name: 'USA', value: '\r\t软件设计师' },
//       { name: 'CHN', value: '\r\t网络工程师' },
//       { name: 'BRA', value: '\r\t信息系统管理工程师' },
//       { name: 'JPN', value: '\r\t信息安全工程师' },
//       { name: 'USA', value: '\r\t系统集成项目管理工程师' },
//       { name: 'CHN', value: '\r\t数据库系统工程师' },
//       { name: 'BRA', value: '\r\t信息系统监理师' },
//       { name: 'JPN', value: '\r\t软件评测师' }
//     ],
//     items3: [
//       { name: 'USA', value: '\r\t程序员' },
//       { name: 'CHN', value: '\r\t网络管理员' },
//       { name: 'BRA', value: '\r\t信息处理技术员' }
//     ]
//   },
//   checkboxChange: function (e) {
//     console.log('checkbox发生change事件，携带value值为：', e.detail.value)
//   }
// })

const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: [{
      title: '关于高等数学',
      name:"gs",
      color: 'cyan',
      //img:'../images/gs.jpg',
      //url: '../indexes/indexes'
    },
    {
      title: '关于离散数学',
      name:"ls",
      color: 'blue',
      //img: '../images/ls.jpg',
     // url: '../animation/animation'
    },
    {
      title: '关于C程序设计',
      name:"c",
      color: 'purple',
      //img: '../images/c.jp',
      //url: '../drawer/drawer'
    },
    {
      title: '关于Java编程设计',
      name:"java",
      color: 'mauve',
      //img: '../images/java.jp',
     // url: '../verticalnav/verticalnav'
    }
    ]
  },
  // methods: {
  //   toChild(e) {
  //     wx.navigateTo({
  //       url: e.currentTarget.dataset.url
  //     })
  //   },
  // },
  // pageLifetimes: {
  //   show() {
  //     if (typeof this.getTabBar === 'function' &&
  //       this.getTabBar()) {
  //       this.getTabBar().setData({
  //         selected: 2
  //       })
  //     }
  //   }
  // }
});