var app = getApp()
Page({
  data: {
    movies: [
      { url: '../images/girl.jpg' },
      { url: '../images/pic1.jpg' },
      { url: '../images/pic3.jpg' }
    ],
    elements: [{
      title: '高等数学',
      name: 'superior',
      color: 'cyan',
      icon: 'newsfill'
    },
    {
      title: '离散数学',
      name: 'disperse',
      color: 'blue',
      icon: 'colorlens'
    },
    {
      title: 'Java编程设计',
      name: 'java',
      color: 'purple',
      icon: 'font'
    },
    {
      title: 'C程序设计 ',
      name: 'c',
      color: 'mauve',
      icon: 'icon'
    }]
  },
  onLoad: function () {

  },
  practice: function () {

  }
})
