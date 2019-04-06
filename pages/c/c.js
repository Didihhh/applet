// pages/practice/practice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      had:true,
      next:false,

        },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.button()
    let query = new wx.BaaS.Query()
    // 应用查询对象
    let Product = new wx.BaaS.TableObject("test")
    // 不设置查询条件
    Product.limit(1).find().then(res => {
      // success
      var that = this
      that.setData({
        list: res.data.objects,
        //cout: res.data.objects.length
      })
      console.log(that.data.list)

    }, err => {
      // err
    })
  },
  button:function(e)
  {
    
    
    var Product = new wx.BaaS.TableObject("test")
    var query = new wx.BaaS.Query()
    query.compare('amount', '>', '0')

    Product.setQuery(query).limit(1).offset(1).find().then(res => {
      // success
      var that = this
      that.setData({
        list: res.data.objects,
        //cout: res.data.objects.length
      })
      console.log(res)
    }, err => {
      // err
      console.log(err)
    })
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})