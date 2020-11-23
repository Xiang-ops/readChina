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
  getDesResult: function (desctination) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.104.191.228:8086/spu/get/goods/desctination',
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          destination: desctination,
          userId:app.globalData.userInfo.userid
        },
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          console.log("登录失败")
          console.log(res)
        }
      })
    })
  },
  getDateResult:function(days){
    var userId=app.globalData.userInfo.userid;
    console.log(days)
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.104.191.228:8086/spu/get/goods/date?date='+days+"&userId="+userId,
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res)
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
    var that=this;
    var searchInfo=JSON.parse(options.searchInfo);
    if(searchInfo.days=="行程天数(选填)"||searchInfo.days=="不限"){
      searchInfo.days="不限";
    }
    that.setData({
      searchInfo:searchInfo
    })
    that.getDesResult(searchInfo.toPlace).then((res)=>{
      if(res.length==0){
        if(searchInfo.days=="不限"){
          wx.showToast({
            title: '暂无数据',
            icon:'none',
            duration:1000
          })
        }else{
          searchInfo.days=parseInt(searchInfo.days);
          that.getDateResult(searchInfo.days).then((res)=>{
            if(res.length==0){
              wx.showToast({
                title: '暂无数据',
                icon:'none',
                duration:1000
              })
            }else{
              that.setData({
                result:res
              })
            }
          })
        }
      }else{
        that.setData({
          result:res
        })
      }
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