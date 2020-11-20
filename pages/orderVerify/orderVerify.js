// pages/orderVerify/orderVerify.js
const app = getApp();     // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personArray:[],
    userid:0,
    addShow:false,
    addIndex:1,
    lxrPhone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userid;
    let lxrPhone;
    if(app.globalData.userInfo){
      userid = app.globalData.userInfo.userid;
      lxrPhone = app.globalData.userInfo.phone;
    }else{
      userid = 38525052;
      lxrPhone = '15873889873'
    }
    this.setData({
      lxrPhone:lxrPhone,
      addIndex:1,
      userid:userid
    })
    const _this = this;
    wx.getStorage({
      key: 'skuInfo',
      success(res){
        console.log(res.data);
        _this.setData({
          detailData:res.data
        })
      }
    })
    wx.showLoading({
      title: '加载中',
    })
    _this.getLvInfo(_this.data.userid).then((res)=>{
      console.log(res);
      _this.setData({
        personArray:res.data,
      })
      wx.setStorage({
        data: _this.data.personArray,
        key: 'personArray',
      })
    });
    var peopleArray = _this.data.personArray;
    for(let i=0;i<peopleArray.length;i++){
      peopleArray[i].flag = false;
    }
    _this.setData({
      personArray:peopleArray
    })
  },
  /**
   * 
   * @param {*} e 
   */
  goToAdd(){
    wx.navigateTo({
      url: 'addLv/addLv',
    })
  },
  /**
   * 选择旅客
   */
  checkOn(e){
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var _this = this;
    var array = _this.data.personArray;
    array[index].flag = !(array[index].flag);
    _this.setData({
      personArray:array,
    })
  },
  /**
   * 编辑
   * @param {index} userid 
   */
  edit(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: 'addLv/addLv?index='+index,
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
        // const pages = getCurrentPages();
        // const perpage = pages[pages.length - 1];
        // perpage.onLoad(perpage.options);
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
  },
  /**
   * 提交订单
   */
  submitOrder(e){
    let userid = this.data.userid;
    let detailData = this.data.detailData;
    let lvInfoData = [];
    console.log("personArray============>",this.data.personArray);
    for(let i=0;i<this.data.personArray.length;i++){
      if(this.data.personArray[i].flag){
        lvInfoData.push(this.data.personArray[i].rvIdCard);
      }
    }
    console.log("选择的旅客人===========》",lvInfoData.toString());
    wx.request({
      url: 'http://47.104.191.228:8086/orders/create?userId='+userid,
      method:"POST",
      header:{
        "Content-type": "application/json"
      },
      data:{
        "payInfo": lvInfoData.toString(),
        "payPrice": detailData.originPrice,
        "payType": 0,
        "productNum":lvInfoData.length,
        "skuId": detailData.skuId,
        "skuName": detailData.skuName,
        "spuId": detailData.spuId,
        "spuName": detailData.spuName,
        "totalPrice": detailData.currentPrice,
        "userId": userid,
      },
      success:(res)=>{
        console.log(res);
      }
    })
  }
})