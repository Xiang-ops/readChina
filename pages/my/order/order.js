// pages/my/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    noData:false
  },
  getData(e){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: 'http://47.104.191.228:8086/orders/get/userId/order?userId1='+e+"&userId="+e,
        method:'get',
        success: function (res) {
          resolve(res.data);
        },
        fail: function (res) {
          console.log("查询失败")
          console.log(res)
        }
      })
    })
  },
  getType(res){
    var result="";
    switch(res){
      case 0:result="虚拟支付";break;
      case 1:result="支付宝";break;
      case 2:result="微信";break;
      default:result="0元单";break;
    }
    return result;
  },
  getStatus(res){
    var result="";
    switch(res){
      case 1:result="已创建";break;
      case 2:result="已确认，支付中";break;
      case 3:result="已支付";break;
      case 4:result="已取消";break;
      case 5:result="已关闭";break;
      case 6:result="退款审核中";break;
      case 7:result="退款中";break;
      default:result="已退款";break;
    }
    return result;
  },
  //获得时间正确格式
  renderTime(date) {
    var result=date.split(".")[0].replace("T"," ");
    return result;
  },
  getList(userId){
    var that=this;
    return new Promise((resolve,reject)=>{
      this.getData(userId).then((res)=>{
        if(res.length>0){
          for(var i=0;i<res.length;i++){
            res[i].status=that.getStatus(res[i].status);
            res[i].payType=that.getType(res[i].payType);
            res[i].createTime=that.renderTime(res[i].createTime);
          } 
        }
        resolve(res);
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var app=getApp();
    var userId=app.globalData.userInfo.userid;
    userId=84519326;
    that.getList(userId).then((res)=>{
      console.log(res);
      if(res.length==0){
        that.setData({
          noData:true
        })
      }else{
        that.setData({
          noData:false,
          list:res
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