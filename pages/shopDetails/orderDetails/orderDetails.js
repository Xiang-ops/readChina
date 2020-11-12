// pages/shopDetails/orderDetails/orderDetails.js
var date = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamData: ['五人以上团 1180/人', '情侣团 3000/2人', '一大一小亲子团 2780/2人','一家三口亲子团 3780/3人'],
    num:0,
    youthNum:5,
    childNum:0,
    subBtn:false,
    addBtn:true,
    month:'',
    monthArray2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var teamViews = teamId.childNodes;
    // console.log(teamViews);
    var month = date.getMonth()+1;
    this.setData({
      month:month,
    })
    this.handleChangeMonth(month);
  },
  /**
   * 月份切换
   * @param {month} e 
   */
  handleChangeMonth(e){
    let month;
    if(e.currentTarget){
      month = e.currentTarget.dataset.month;
    }else{
      month = e;
    }
    // this.setData({
    //   month:month,
    // });
    var weekDay = date.getDay();
    var day = date.getDate();
    var year = date.getFullYear();
    var date1 = new Date(year,month-1,1);
    var weekDay1 = date1.getDay();
    console.log(year,"年的",month,"月是星期",weekDay1);
    let weekArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    for(let i=0;i<weekDay1;i++){
      weekArray.unshift(" ");
    }
    console.log(weekArray);
    this.setData({
      monthArray2:weekArray,
    })
    // console.log("year================>", year);
    // console.log("month===============>", month);
    // console.log("weekDay================>", weekDay);
    // console.log("day===================>",day);
  },
  chooseTeam(e){
    console.log(e);
    
    var index = e.currentTarget.dataset.index;
    this.setData({
      num:index
    })
    // if(index==0){
      
    // }
    if(index==1){
      this.setData({
        youthNum:2,
        addBtn:false,
      })
    }
    if(index==2){
      this.setData({
        youthNum:1,
        childNum:1,
        addBtn:false
      })
    }
    if(index==3){
      this.setData({
        youthNum:2,
        childNum:1,
        addBtn:false
      })
    }
  },
  /**
   * 五人团的时候减人数
   */
  subPeople(){
    // if(youthNum)
    console.log(youthNum)
  },
  /**
   * 跳转到确认订单页面
   */
  goToVerify(){
    wx.navigateTo({
      url: '../../orderVerify/orderVerify',
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