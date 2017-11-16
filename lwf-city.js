var lwfCity={
	init:function(data){
		this.addDom();
		this.addEvt();
		this.getCallObj=data
	},
	resetCity:function(){
		// localStorage.removeItem("resetCity")
		var cityReturn;
		if(localStorage.getItem("resetCity")){
			cityReturn=JSON.parse(localStorage.getItem("resetCity"))
		}else{
			cityReturn={
				provinceName:"广西",
				provinceId:450000,
				cityName:"桂林市",
				cityId:450300,
				countyName:"平乐县",
				countyId:450330,
			}
			localStorage.setItem("resetCity",JSON.stringify(cityReturn))
		}
		return cityReturn;
	},
	addDom:function(){
		if(document.querySelectorAll(".city-lwf").length){
			var allCity=document.querySelectorAll(".city-lwf");
			var html="";
			//全部先清空一次，避免多次创建
			for(var z=0;z<document.querySelectorAll(".lwf-city").length;z++){//全部先清空一次，避免多次创建
				document.querySelectorAll(".lwf-city")[z].parentNode.remove(document.querySelectorAll(".lwf-city")[z])
			}
			var resetCity=this.resetCity()//进来的时候先重置当前城市
			for(var i=0;i<allCity.length;i++){
				html+='<div class="lwf-city">'
				html+='<div class="thisCity">'+resetCity.provinceName+" "+resetCity.cityName+" "+resetCity.countyName+'</div>';
				html+='<div class="cityMain">';
				html+='<span id="cityClosed">+</span>';
				html+='<ul class="cityTab">';
				html+='<li class="cityShow choseThis" data-id="'+resetCity.provinceId+'">'+resetCity.provinceName+'</li>';
				html+='<li tab="1" data-id="'+resetCity.cityId+'">'+resetCity.cityName+'</li>';
				html+='<li tab="2" data-id="'+resetCity.countyId+'">'+resetCity.countyName+'</li>';
				html+='</ul>';
				html+='<div class="cityTabContent">';
				html+='<ul class="cityShow" id="provinceContent">';
				for(var j=0;j<cityData.length;j++){
	 				if(cityData[j].parentId=='100000'){
	 					if(cityData[j].id==resetCity.provinceId){
	 						html+='<li data-id="'+cityData[j].id+'"><a href="javascript:;" class="thisSelectedCity">'+cityData[j].name+'</a></li>'
	 					}else{
	 						html+='<li data-id="'+cityData[j].id+'"><a href="javascript:;">'+cityData[j].name+'</a></li>'
	 					}
	 					
	 				}
	 			}
				html+='</ul>';
				html+='<ul id="cityContent">';
				for(var j=0;j<cityData.length;j++){
	 				if(cityData[j].parentId==resetCity.provinceId){
	 					html+='<li data-id="'+cityData[j].id+'"><a href="javascript:;">'+cityData[j].name+'</a></li>'
	 				}
	 			}
				html+='</ul>';
				html+='</ul>';
				html+='<ul id="countyContent">';
				for(var j=0;j<cityData.length;j++){
	 				if(cityData[j].parentId==resetCity.cityId){
	 					html+='<li data-id="'+cityData[j].id+'"><a href="javascript:;">'+cityData[j].name+'</a></li>'
	 				}
	 			}
				html+='</ul>';
				html+='</div>';
				html+='</div>';
				allCity[i].innerHTML=html;
			}
		}
	},
	addEvt:function(){
		/*监听鼠标经过显示*/
		document.querySelector(".lwf-city").onclick=function(){
			lwfCity.showCityType(this,'show')
		}
		/*监听城市列表切换*/
		var cityTabLi=document.querySelector(".cityTab").querySelectorAll("li")
		for(var j=0;j<cityTabLi.length;j++){
			(function(j){
				cityTabLi[j].onclick=function(){
					event.stopPropagation();
					lwfCity.tabChange(this,j)
				}
			})(j)
		}
		/*选择监听*/
		var provinceContentLi=document.querySelector("#provinceContent").querySelectorAll("li")
		for(var i=0;i<provinceContentLi.length;i++){
			provinceContentLi[i].onclick=function(event){
				event.stopPropagation();
				lwfCity.created(this,'1');
			}
		}
		/*关闭按钮*/
		document.querySelector("#cityClosed").onclick=function(){
			event.stopPropagation();
			lwfCity.showCityType(document.querySelector(".lwf-city"),"hide")
		}
	},
	addEvtDynamic:function(){
		var cityContentLi=document.querySelector("#cityContent").querySelectorAll("li")
		for(var i=0;i<cityContentLi.length;i++){
			cityContentLi[i].onclick=function(event){
				event.stopPropagation();
				lwfCity.created(this,'2');
			}
		}
		var countyContentLi=document.querySelector("#countyContent").querySelectorAll("li")
		for(var i=0;i<countyContentLi.length;i++){
			countyContentLi[i].onclick=function(event){
				event.stopPropagation();
				lwfCity.created(this,'3');
			}
		}
	},
	showCityType:function(_this,type){
		_this.querySelector(".thisCity").className=type=="show"?"thisCity thisCityShow": "thisCity";
		_this.querySelector(".cityMain").className=type=="show"?"cityMain cityMainShow":"cityMain";
	},
	tabChange:function(_this,num){
		var allTab=_this.parentNode.querySelectorAll("li")
		_this.parentNode.querySelector(".choseThis").className="cityShow";
		_this.className="choseThis cityShow";
		var hint;
		if(num==0){
			hint="请选择省"
		}else if(num==1){
			hint="请选择市"
		}else{
			hint="请选择县"
		}
		_this.innerText=hint;
		for(var j=0;j<allTab.length;j++){
			if(num<j){
				allTab[j].removeAttribute("class")
			}
		}
		var allCityList=_this.parentNode.parentNode.querySelector(".cityTabContent").querySelectorAll("ul");
		for(var i=0;i<allCityList.length;i++){
			if(num==i){
				allCityList[i].className="cityShow";
			}else{
				allCityList[i].removeAttribute("class");
			}
		}
	},
	created:function(_this,lv){
		this.setType(_this,lv);
		if(lv<3){
			var thisId=_this.getAttribute("data-id");
			var html="";
			for(var i=0;i<cityData.length;i++){
 				if(cityData[i].parentId==thisId){
 					html+='<li data-id="'+cityData[i].id+'"><a href="javascript:;">'+cityData[i].name+'</a></li>'
 				}
 			}/*创建下一级*/
 			_this.parentNode.parentNode.querySelectorAll("ul")[lv].innerHTML=html;
		}
		this.addEvtDynamic()
	},
	setType:function(_this,lv){
		if(_this.parentNode.querySelectorAll(".thisSelectedCity").length){
			_this.parentNode.querySelector(".thisSelectedCity").removeAttribute("class");
		}
		_this.querySelector("a").className="thisSelectedCity";/*设置当前这个为红*/

		var parentObj=_this.parentNode.parentNode.parentNode.querySelector(".cityTab").querySelectorAll("li")
		parentObj[lv-1].setAttribute("data-id",_this.getAttribute("data-id"))
		parentObj[lv-1].innerText=_this.innerText;/*tab对应的data-id便于记录*/
		if (lv<3) {
			this.tabChange(parentObj[lv],lv);/*跳到下一个*/
		}else{
			this.submit(_this,parentObj)
		}
		
	},
	submit:function(_this,parentObj){
		var thisCity="";
		for(var i=0;i<parentObj.length;i++){
			thisCity+=" "+parentObj[i].innerText;
		}
		var subcityReturn={
			provinceName:parentObj[0].innerText,
			provinceId:parentObj[0].getAttribute("data-id"),
			cityName:parentObj[1].innerText,
			cityId:parentObj[1].getAttribute("data-id"),
			countyName:parentObj[2].innerText,
			countyId:parentObj[2].getAttribute("data-id"),
		}
		localStorage.setItem("resetCity",JSON.stringify(subcityReturn))
		_this.parentNode.parentNode.parentNode.parentNode.querySelector(".thisCity").innerText=thisCity;
		this.showCityType(document.querySelector(".lwf-city"),"hide")
		this.getCallObj.cityFinish(thisCity)
	}
}
	