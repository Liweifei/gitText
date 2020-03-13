console.log("zz");

var viewphoto={
	reset:function(){
		this.setWidth();/*根据li数设置宽度*/
		this.addEvtLR();/*监听左右按钮*/
		this.listHover();
		this.enter();/*监听进入图片*/
		this.move();/*在图片中移动=>查看范围*/
		this.leave();/*监听离开图片*/
	},
	setWidth:function(){
		window.listL=document.getElementById("picList").getElementsByTagName("li").length;
		document.getElementById("picList").style.width=listL*68-10+"px";
	},
	addEvtLR:function(){
		if(listL>5){
			console.log("可以移动")
			document.getElementById("arrowLeft").onclick=function(){/*往左*/
				viewphoto.left(viewphoto.getNum())
			}
			document.getElementById("arrowRight").onclick=function(){/*往右*/
				viewphoto.right(viewphoto.getNum())
			}
		}
	},
	listHover:function(){
		var listLi=document.getElementById("picList").getElementsByTagName("li")
		for(i=0;i<listL;i++){
			listLi[i].onmouseenter=function(){
				this.parentNode.getElementsByClassName("thisPic")[0].removeAttribute("class")
				this.className="thisPic"
				document.getElementById("zoomPic").src=this.getElementsByTagName("img")[0].src;
				document.getElementById("hadZoomPic").src=this.getElementsByTagName("img")[0].src;
			}
		}
		// document.getElementById("hadZoomPic").src=document.getElementById("picList").getElementsByTagName("li")[getNum].getElementsByTagName("img")[0].src
	},
	left:function(getNum){
		getNum--;
		getNum=getNum<0?0:getNum;
		this.setType(getNum)
	},
	right:function(getNum){
		getNum++;
		getNum=getNum>(listL-5)?(listL-5):getNum;
		this.setType(getNum)
	},
	getNum:function(){
		var num=document.getElementById("picList").getAttribute("data-num")
		return num
	},
	setType:function(getNum){
		document.getElementById("picList").style.left=-getNum*68+"px"
		document.getElementById("picList").setAttribute("data-num",getNum)
	},
	showType:function(getType){
		document.getElementById("range").style.display=getType;
		document.getElementById("hadZoomPicBox").style.display=getType;
	},
	enter:function(){
		document.getElementById("zoomPicBox").onmouseenter=function(event){/*移动*/
			viewphoto.showType("block")
		}
	},
	move:function(){
		document.getElementById("zoomPicBox").onmousemove=function(event){/*移动*/
			var e = event || window.event; 
			var mouseX = e.clientX,mouseY = e.clientY;//鼠标的相对位置
			var boxX = this.offsetLeft,boxY = this.offsetTop;//盒子距离浏览器的相对位置
			var scrollTop=0;//需要加上滚动条的高度，避免位置计算不准确
			var	scrollLeft=0;
		    if(document.documentElement&&document.documentElement.scrollTop){//兼容获取滚动条宽高
		        scrollTop=document.documentElement.scrollTop;
		        scrollLeft=document.documentElement.scrollLeft;
		    }else if(document.body)
		    {
		        scrollTop=document.body.scrollTop;
		        scrollLeft=document.documentElement.scrollLeft;
		    }
			var range=document.getElementById("range")//里面区域盒子
			var _left=mouseX-boxX+scrollLeft-(range.offsetWidth/2);//以盒子的一半为界
			var _top=mouseY-boxY+scrollTop-(range.offsetHeight/2);
			var proportionX,proportionY;//比例
			if(_left<0){
				_left=0;
			}else if(_left>(this.offsetWidth-range.offsetWidth)){
				_left=this.offsetWidth-range.offsetWidth;
			}
			if(_top<0){
				_top=0;
			}else if(_top>(this.offsetHeight-range.offsetHeight)){
				_top=(this.offsetHeight-range.offsetHeight);
			}
			range.style.left=_left+"px";
			range.style.top=_top+"px";
			proportionX=_left/(this.offsetWidth-range.offsetWidth);//比例 鼠标的位置/(大黑子的宽-区域盒子)
			proportionY=_top/(this.offsetHeight-range.offsetHeight);

			/*根据比例计算大图片的位置*/
			var bigimgLeft,bigimgTop;
			var hadZoomPicBox=document.getElementById("hadZoomPicBox");
			var hadZoomPic=document.getElementById("hadZoomPic");
			bigimgLeft=proportionX*(hadZoomPic.offsetWidth-hadZoomPicBox.offsetWidth);
			bigimgTop=proportionY*(hadZoomPic.offsetHeight-hadZoomPicBox.offsetHeight);
			hadZoomPic.style.left= -bigimgLeft+"px";
			hadZoomPic.style.top= -bigimgTop+"px";
		}
	},
	leave:function(){
		document.getElementById("zoomPicBox").onmouseleave=function(event){/*移动*/
			viewphoto.showType("none")
		}
	}
}
console.log("aab")
