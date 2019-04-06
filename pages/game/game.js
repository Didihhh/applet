// pages/game/game.js
var app = getApp()
var start_time;
var end_time;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:'拇指放在圆圈上\nReady？Go！'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

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
  
  },

   /**
   * 返回result
   */
  push_start:function(event){
    start_time=new Data().getTime();
  },
  push_end: function (event){
    end_time=new Data().getTime();
    var diff_time_in_scode = (end_time - start_time)/1000.0;
    var diff_time = Math.abs(diff_time_in_scode-1);
    var diff_ratio=new Number(diff_time*100).toFixed(2);
    var wording;
    if(0<=diff_time&&0.05>diff_time){
      wording='太准时了,简直是天才！';
    } else if (0.05 <= diff_time && 0.1 > diff_time){
      wording = '时间感不错,接近天才了！';
    } else if (0.1 <= diff_time && 0.3 > diff_time) {
      wording = '水平不错,不过可以再精确些！';
    } else if (0.3 <= diff_time && 0.5 > diff_time) {
      wording = '差强人意,继续努力吧！';
    } else if (0.5 <= diff_time && 1 > diff_time) {
      wording = '太差劲了,居然差这么多！';
    }else{
      wording='无语了，差到瓜娃到！';
    }
    var diff_time_second=parseFloat(diff_time_in_secode);
    var wording_html='你按出了'+diff_time_second+'秒，误差是'+diff_ratio+'%\n'+wording;
    this.setData(
      {result:wording_html}
    );
  }
})