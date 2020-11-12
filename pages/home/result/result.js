// pages/home/result/result.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInfo:{},
    result:null
  },
  toDetail:function(e){
    var spu_id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../shopDetails/shopDetails?spu_id='+spu_id,
    })
  },
  getResult: function (info) {
    console.log(info)
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.104.191.228:8086/sku/get/goods/desctination',
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          destination: info.toPlace,
          userId:app.globalData.userInfo.userid
        },
        success: function (res) {
          resolve(res.data[0])
        },
        fail: function (res) {
          console.log("登录失败")
          console.log(res)
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var searchInfo=JSON.parse(options.searchInfo)
    this.getResult(searchInfo).then((res)=>{
      this.setData({
        searchInfo:searchInfo,
        result:res
      })
    })
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

  }
})