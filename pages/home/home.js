// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    banner: ['../../img/banner1.png', '../../img/banner2.png', '../../img/banner3.png'],
    fromPlace:"长沙市",
    toPlace:"",
    optionList:[
      {
        id:0,
        value:"2日",
        style:"opt opt-notactive"
      },
      {
        id:1,
        value:"3日",
        style:"opt opt-notactive"
      },
      {
        id:2,
        value:"4日",
        style:"opt opt-notactive"
      },
      {
        id:3,
        value:"5日",
        style:"opt opt-notactive"
      },
      {
        id:4,
        value:"6日",
        style:"opt opt-notactive"
      },
      {
        id:5,
        value:"7日",
        style:"opt opt-notactive"
      },
      {
        id:6,
        value:"8日",
        style:"opt opt-notactive"
      },
      {
        id:7,
        value:"9日",
        style:"opt opt-notactive"
      },
      {
        id:8,
        value:"10日",
        style:"opt opt-notactive"
      },
      {
        id:9,
        value:"10日以上",
        style:"opt opt-notactive"
      },
      {
        id:10,
        value:"15日以上",
        style:"opt opt-notactive"
      },
      {
        id:11,
        value:"不限",
        style:"opt opt-notactive"
      }
    ],
    option:'行程天数(选填)',
    value:'行程天数(选填)',
    hideFlag: true,//true-隐藏  false-显示
    animationData: {},//
    spots:{
      name:"张家界",
      url:"../../img/about.png"
    },
    routes:null,
    // 上拉刷新
    list:[],
    timer: null, // 保存定时器
    scrollTop: 5 // 设定触发条件的距离
  },
  // 上拉加载
  onPullDownRefresh() {
  // 监听该页面用户下拉刷新事件
  // 可以在触发时发起请求，请求成功后调用wx.stopPullDownRefresh()来结束下拉刷新
    console.log('下拉拉拉')
  },
  refresh() { // 函数式触发开始下拉刷新。如可以绑定按钮点击事件来触发下拉刷新
    wx.startPullDownRefresh({
      success(errMsg) {
        console.log('开始下拉刷新', errMsg)
      },
      complete() {
        console.log('下拉刷新完毕')
      }
    })
  },
  scrollFn(e) { 
  // 防抖，优化性能
  // 当滚动时，滚动条位置距离页面顶部小于设定值时，触发下拉刷新
  // 通过将设定值尽可能小，并且初始化scroll-view组件竖向滚动条位置为设定值。来实现下拉刷新功能，但没有官方的体验好
    clearTimeout(this.timer)
    if (e.detail.scrollTop < this.data.scrollTop) {     
      this.timer = setTimeout( () => {
        this.refresh()
      }, 100)
    }
  },
  loadMore() { // 触底加载更多
    var that=this;
    var routes=that.data.routes;
    var isLen=routes.length-that.data.list.length
    if(isLen==0){
      wx.showToast({
        title: '到底了！',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000,
        success:function(){
          if(isLen<6){
            var len=isLen;
          }else{
            var len=6;
          }
          let nowLen=that.data.list.length;
          for(let i = 0; i< len; i++) {
            that.data.list.push(routes[nowLen+i]);
            that.setData({
              'list': that.data.list
            })
          }
        }
      })
    }  
  },
  toSearch(){
    wx.navigateTo({
      url: './search/search',
    })
  },
  toResult(){
    var searchInfo={
      fromPlace:this.data.fromPlace,
      toPlace:this.data.toPlace,
      days:this.data.value
    }
    wx.navigateTo({
      url: './result/result?searchInfo='+JSON.stringify(searchInfo),
    })
  },
  toDetail(e){
    var spu_id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shopDetails/shopDetails?spu_id='+spu_id,
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //根据偏移获取路线
  getRoad: function () {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.104.191.228:8086/spu/get/spugoods/offset',
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          offset: 0,
          userId:app.globalData.userInfo.userid
        },
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          console.log("查询失败")
          console.log(res)
        }
      })
    })
  },
  // 点击选项
  getOption:function(e){
    var index=e.currentTarget.dataset.value.id;
    console.log(index);
    var that = this;
    that.optionStyleInit();
    let active="optionList["+index+"].style"
    that.setData({
      option:e.currentTarget.dataset.value.value,
      [active]:"opt opt-active"
    })
  },
  optionStyleInit:function(){
    var list=this.data.optionList;
    for(var i in list){
      list[i].style="opt opt-notactive"
    }
    this.setData({
      optionList:list
    })
  },
  sure:function(){
    var that=this;
    that.setData({
      value:that.data.option,
      hideFlag: true
    })
  },
  // ----------------------------------------------------------------------modal
  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideFlag: false
    })
    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间
      timingFunction: 'ease',//动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
    })
    this.animation = animation; //将animation变量赋值给当前动画
    var time1 = setTimeout(function () {
      that.slideIn();//调用动画--滑入
      clearTimeout(time1);
      time1 = null;
    }, 100)
  },
 
  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间 默认400ms
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.slideDown();//调用动画--滑出
    var time1 = setTimeout(function () {
      that.setData({
        hideFlag: true
      })
      clearTimeout(time1);
      time1 = null;
    }, 220)//先执行下滑动画，再隐藏模块
    
  },
  //动画 -- 滑入
  slideIn: function () {
    this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
    this.setData({
      //动画实例的export方法导出动画数据传递给组件的animation属性
      animationData: this.animation.export()
    })
  },
  //动画 -- 滑出
  slideDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getRoad().then((res)=>{
      console.log(res)
      this.setData({
        routes:res,
        list:res.slice(0,6)
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let json = currPage.data.toPlace;
    console.log(json)//为传过来的值
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