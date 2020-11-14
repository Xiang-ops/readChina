// pages/orderVerify/orderVerify.js
const app = getApp();     // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personArray:[],
    disable:-1,
    userid:0,
    addShow:false,
    addIndex:1,
    // loading:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let userid = app.globalData.userInfo.userid
    wx.showLoading({
      title: '加载中',
    })
    let userid = 38525052;
    this.setData({
      userid:userid,
      addIndex:1,
    })
    this.getLvInfo(this.data.userid).then((res)=>{
      console.log(res);
      this.setData({
        personArray:res.data,
        // loading:false,
      })
    });
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
   * 编辑
   * @param {index} userid 
   */
  edit(e){
    this.setData({
      disable:e.currentTarget.dataset.index
    })
  },
  /**
   * 获取旅客信息
   * @param {index} e 
   */

  getLvInfo(userid){
    console.log(userid);
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'http://47.104.191.228:8086/rv/get?userId='+userid,
        method: 'GET',
        header: {
          "Content-type": "application/json"
        },
        success:(res)=>{
          wx.hideLoading();
          resolve(res);
        }
      })
    })
    
  },
  /**
   * 新增旅客信息
   * @param {*} e 
   */
  addLv(){
    let addIndex = this.data.addIndex;
    addIndex++;
    this.setData({
      addShow:true,
      addIndex:addIndex
    })
    if(this.data.addIndex>2){
      wx.showModal({
        title: '提示',
        content: '请先提交新增的旅客'
      })
    }
  },
  /**
   * 提交旅客信息
   * @param {index} e 
   */
  submitLvInfo(e){
    console.log(e.detail.value);
    const _this = this;
    let array = e.detail.value;
    let idCardFlag = this.data.personArray.some((item,index)=>{
      return item.rvIdCard==array.rvIdCard;
    })
    if(idCardFlag){
      wx.showModal({
        title: '提示',
        content: '身份证号重复'
      })
    }else{
      // console.log("test");
      if(app.globalData.userInfo){
        // let userid = app.globalData.userInfo.userid;
        let userid = this.data.userid;//12345678991  430781199812120524
        const pages = getCurrentPages();
        const perpage = pages[pages.length - 1];
        perpage.onLoad(perpage.options);
        if(userid){
          wx.request({
            url: 'http://47.104.191.228:8086/rv/create?userId='+userid,
            method: 'POST',
            header: {
              "Content-type": "application/json"
            },
            data:{
              "phone":array.phone, //,
              "realName":array.realName ,//,
              "rvIdCard": array.rvIdCard, //,
              "status":1,
              "userId":userid
            },
            success: (res)=>{
              console.log(res);
              if(res.data===1){
                wx.showToast({
                  title: '创建成功',
                })
                setTimeout(()=>{
                  const pages = getCurrentPages()
                  //声明一个pages使用getCurrentPages方法
                  const perpage = pages[pages.length - 1]
                  //声明一个当前页面
                  perpage.onLoad() 
                },1000);
                
                
              }
            }
          })
        }
      }
    }
   
   
  },
  
  /**
   * 更新旅客信息
   */
  updateInfo(e){
    const _this = this;
    if(this.data.disable>-1){
      let offset = this.data.personArray[this.data.disable]['offset'];
      console.log(offset);
      let array = e.detail.value;
      // console.log("e========================>",e);
      if(app.globalData.userInfo){
        // let userid = app.globalData.userInfo.userid;
        let userid = 38525052;//12345678991  430781199812120524
        if(userid){
          wx.request({
            url: 'http://47.104.191.228:8086/rv/edit?userId='+userid,
            method: 'POST',
            header: {
              "Content-type": "application/json"
            },
            data:{
              "phone":array.phone, //,
              "realName":array.realName ,//,
              "rvIdCard": array.rvIdCard, //,
              "status":1,
              "userId":userid,
              "offset": offset,
            },
            success: (res)=>{
              console.log(res);
              const pages = getCurrentPages()
              //声明一个pages使用getCurrentPages方法
              const perpage = pages[pages.length - 1]
              //声明一个当前页面
              perpage.onLoad() 
              // if(res.data===1){
              //   wx.showToast({
              //     title: '创建成功',
              //   })
              // }
            }
          })
        }
      }
    }
  },
  /**
   * 删除旅客
   */
  delete(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let lvInfo = this.data.personArray[index];
    console.log(lvInfo);
    let RvUser  = JSON.stringify({
      "rvIdCard": lvInfo.rvIdCard,
      "userId": lvInfo.userId
    })
    let userId = lvInfo.userId;
    wx.request({
      url: 'http://47.104.191.228:8086/rv/delete?userId='+userId,
      method: 'POST',
      header:{
        "Content-type": "application/json"
      },
      data:{
        "realName": lvInfo.realName,
        "rvIdCard": lvInfo.rvIdCard,
        "userId": lvInfo.userId
      },
      success(res){
        console.log(res);
        if(res.data==1){
          const pages = getCurrentPages()
          //声明一个pages使用getCurrentPages方法
          const perpage = pages[pages.length - 1]
          //声明一个当前页面
          perpage.onLoad() 
        }
      }
    })
  }
})