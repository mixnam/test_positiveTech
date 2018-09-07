var app = angular.module('TestApp',[])

app.controller('TestAppController',function($scope,$http){
  var self = this;
  
  var currencyList = ['EUR',  //евро
                      'RUB', //рубль
                      'GBP', //фунт
                      'CNY', //китайская йена
                      'USD'] //доллар
  
  self.currency = 'USD'
  self.selectedCart = [
    {price: 20},
    {price: 45},
    {price: 67},
    {price: 1307}
  ]
  
  self.getCurrentTotalCartPrice = function(){
    return self.selectedCart.reduce(function(accum, item){
      return isNaN(Number(item.price))?accum:accum + Number(item.price)},0)
  }
  
  self.totalCartPrice = {}
  
  self.recalcTotal = function(){
    var currentTotalCartPrice = self.getCurrentTotalCartPrice()
    
    currencyList.forEach((newCurrency)=>{
       var url = `https://free.currencyconverterapi.com/api/v6/convert?q=${self.currency}_${newCurrency}&compact=y`
       
       $http.get(url,{cache: true}).then((data,status)=>{
         let key = self.currency + '_' + newCurrency
         let coef = data.data[key].val
         self.totalCartPrice[newCurrency] = (coef * currentTotalCartPrice).toFixed(2)
       }).catch((data,status)=>{
         console.log(data);
         console.log(status)
       })
    })
  }
})