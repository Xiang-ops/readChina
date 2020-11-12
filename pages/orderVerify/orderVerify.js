// pages/orderVerify/orderVerify.js
const app = getApp();     // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personArray:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const peopleNum = 2;
    let peopleArray = [];
    let people = {
      // name:"",
      // card:"",
      // phone:""
    };
    for(let i=0;i<peopleNum;i++){
      peopleArray.push(people);
    }
    this.setData({
      personArray:peopleArray
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

  },
  /**
   * 获取旅客信息
   * @param {index} e 
   */
  getLvInfo(e){
    console.log(e);
    let array = JSON.stringify(e.detail.value);
    // array.push(e.detail.value);
    if(app.globalData.userInfo){
      // let userid = app.globalData.userInfo.userid;
      let userid = 38525052;
      if(userid){
        wx.request({
          url: 'http://47.104.191.228:8086/rv/create?userId='+userid,
          method: 'POST',
          header: {
            "Content-type": "application/json"
          },
          data:{
            "phone":array.lvPhone,
            "realName":array.lvName,
            "rvIdCard":array.lvCard
          },
          success: (res)=>{
            console.log(res);
          }
        })
      }
    }
  },
  /**
   * 提交旅客信息
   */
  // submitBtn(e){
  //   let lvIndex = e.currentTarget.dataset.index;
  //   console.log(this.data.personArray);
  //   console.log(e);
    
  // },
  /**
   * 提交订单
   */
  submitOrder(){

  }
})