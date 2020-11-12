// pages/home/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[
      "云南","凤凰"
    ],
    hotSpots:[
      "云南","凤凰","江西","成都"
    ],
    place:""
  },
  getPlace:function(e){
    this.setData({
      place:e.detail.value
    })
  },
  cancel:function(){
    this.setData({
      place:""
    })
  },
  getItem:function(e){
    this.setData({
      place:e.target.dataset.toplace
    })
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
    var pages = getCurrentPages();
    var _this=this;
    var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      toPlace: _this.data.place
    })
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