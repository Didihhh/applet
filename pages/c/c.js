// pages/practice/practice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    amount: 1,
    had: 'false',
    next: 'true',
    sort: ['c', 'java'],
    checked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.buttonnext()
    var that = this
    var Product = new wx.BaaS.TableObject("test")
    var query = new wx.BaaS.Query()
    query.compare('amount', '=', that.data.amount)
    Product.setQuery(query).find().then(res => {
      // success
      var that = this
      that.setData({
        next: "true",
        list: res.data.objects,
        //cout: res.data.objects.length
      })
      console.log(res)
    }, err => {
      // err
      console.log(err)
    })
  },
  buttonnext: function(e) {
    var that = this
    var Product = new wx.BaaS.TableObject("test")
    var query = new wx.BaaS.Query()
    that.setData({
      amount: that.data.amount + 1
    })
    query.compare('amount', '=', that.data.amount)
    let query1 = new wx.BaaS.Query()
    query1.compare('sort', '=', that.data.sort[1])
    let andQuery = wx.BaaS.Query.and(query, query1)
    Product.setQuery(andQuery).find().then(res => {
      // success
      var that = this
      if (that.data.amount == 3) {
        that.setData({
          had: 'true',
          next: 'false',
          list: res.data.objects,
          //cout: res.data.objects.length
        })
        console.log(res)
      } else {
        that.setData({
          had: 'true',
          //next:"false",
          list: res.data.objects,
          //cout: res.data.objects.length
        })
        console.log(res)
      }

    }, err => {
      // err
      console.log(err)
    })
  },
  button: function() {
    var that = this
    var Product = new wx.BaaS.TableObject("test")
    var query = new wx.BaaS.Query()
    that.setData({
      amount: that.data.amount - 1
    })
    query.compare('amount', '=', that.data.amount)
    Product.setQuery(query).find().then(res => {
      // success
      var that = this
      if (that.data.amount == 1) {
        that.setData({
          had: 'false',
          next: 'true',
          list: res.data.objects,
          //cout: res.data.objects.length
        })
        console.log(res)
      } else {
        that.setData({
          had: 'true',
          next: 'true',
          list: res.data.objects,
          //cout: res.data.objects.length
        })
        console.log(res)
      }
    }, err => {
      // err
      console.log(err)
    })
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  // button2:function(e)
  // {
  //   let query = new wx.BaaS.Query()
  //   // 应用查询对象
  //   let Product = new wx.BaaS.TableObject("test")
  //   // 不设置查询条件
  //   Product.find().then(res => {
  //     // success
  //     var that = this
  //     that.setData({
  //       list: res.data.objects,
  //       //cout: res.data.objects.length
  //     })
  //     console.log(that.data.list)
  //   }, err => {
  //     // err
  //   })
  // },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})