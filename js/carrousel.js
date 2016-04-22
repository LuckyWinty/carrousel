;(function(){
	window.onload=function(){
		Carrousel.init(document.querySelectorAll('.carrousel-main'));
	}
	var Carousel=function(carrousel){
   //保存单个旋转图片对象
   this.carrousel=carrousel;
   //获取左右按钮
   this.preBtn=this.carrousel.querySelector('.carrousel-btn-pre');
   this.nextBtn=this.carrousel.querySelector('.carrousel-btn-next');
   //获取第一张图片
   this.carrouselFir=this.carrousel.querySelector('.carrousel-list').firstElementChild;
   //默认参数配置
   this.Settings={
   	width:1000,  //幻灯片的宽度
   	height:400,  //幻灯片的高度
   	carrouselWidth:700, //幻灯片第一帧的宽度
   	carrouselHeight:400, //幻灯片第一帧的高度
   	scale:0.9,
   	speed:500,
   	verticalAlign:'middle'
   };
   if(this.getSetting()){
   	this.Settings=extendObj(this.Settings,this.getSetting());
   	// console.log(this.Settings);
   }
   this.setValue();
}
Carousel.init=function(carrousels){
	var _this=this;
       //将nodeList转换为数组
       var cals= Array.prototype.slice.call(carrousels); 
       cals.forEach(function(item,index,array){
       	new _this(item);
       });
   }
Carousel.prototype={
	//设置配置参数值去控制基本的宽度高度
	setValue:function(){
		this.carrousel.style.width=this.Settings.width+'px';
		this.carrousel.style.height=this.Settings.height+'px';

		var btnW=(this.Settings.width-this.Settings.carrouselWidth)/2;
		this.preBtn.style.width=btnW+'px';
		this.preBtn.style.height=this.Settings.height+'px';

		this.nextBtn.style.width=btnW+'px';
		this.nextBtn.style.height=this.Settings.height+'px';

		this.carrouselFir.style.left=btnW+'px';

	},
	//获取DOM中的配置参数
   	getSetting:function(){
   		var setting=this.carrousel.getAttribute('data-setting');
   		if(setting&&setting!=null){
   			setting=JSON.parse(setting);
   			return setting;
   		}else{
   			return {};
   		}
   	}
   };
//类似$.extend的扩展对象的方法
function cloneObj(oldObj){//复制对象方法
	if((oldObj==null)||(typeof(oldObj!='object'))){
		return oldObj;
	}
	var newObj=new Object();
	for(var item in oldObj){
		newObj[item]=cloneObj(oldObj[item]);
	}
	return newObj;
}
function extendObj(){//扩展对象
	var args=arguments;
	if(args.length<2){
		return;
	}
	var temp=cloneObj(args[0]);
	for(var i=1;i<args.length;i++){
		for(var item in args[i]){
			temp[item]=args[i][item];
		}
	}
	return temp;
}

window['Carrousel']=Carousel;
})();