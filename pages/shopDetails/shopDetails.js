// pages/shopDetails/shopDetails.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['../../pic/D33.jpg',
    '../../pic/D444.jpg',
    '../../pic/D5.jpg'],
    detailData:[],
    spuId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userId = app.globalData.userInfo.userid;
    const _this = this;
    console.log(options);
    var sku_id=JSON.parse(options.sku_id);
    console.log(sku_id);
    wx.request({
      url: 'http://47.104.191.228:8086/sku/get/skuId/sku',
      method: 'GET',
      data:{
        skuId : sku_id,
        userId: userId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log(res);
        if(res.data){
          _this.setData({
            detailData:res.data
          })
          wx.setStorage({
            data: res.data,
            key: 'detailData',
          })
        }        
      },
      fail(err){
        console.log(err);
      }
    })
  },
  goToOrder: function(){
    wx.navigateTo({
      url: 'orderDetails/orderDetails',

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