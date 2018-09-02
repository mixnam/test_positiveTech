function makeRequest(method, url){
	return new Promise(function(resolved,rejected){
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onload = function(){
			if (this.status == 200){
				resolved(xhr.response)
			}else{
				rejected({
					status: this.status,
					stetusText: xhr.statusText
				})
			}
		}
		xhr.onerror = function(){
			rejected({
				status: this.status,
				statusText: xhr.statusText
			})
		}
		xhr.send()
	})
}

function convertCurrency(baseCurrency, convertCurrency){ 
	 return makeRequest('GET',
						`http://free.currencyconverterapi.com/api/v5/convert?\
						q=${baseCurrency}_${convertCurrency}&compact=y`)
}
