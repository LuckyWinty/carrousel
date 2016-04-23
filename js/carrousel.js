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
   //获取图片数量
   this.carrouselItems=this.carrousel.querySelector('.carrousel-list').querySelectorAll('.carrousel-item');
   //默认参数配置
   this.Settings={
   	width:1000,  //幻灯片的宽度
   	height:400,  //幻灯片的高度
   	carrouselWidth:700, //幻灯片第一帧的宽度
   	carrouselHeight:400, //幻灯片第一帧的高度
   	scale:0.9,//记录显示比例关系
   	speed:500,
   	verticalAlign:'middle'
   };
   if(this.getSetting()){
   	this.Settings=extendObj(this.Settings,this.getSetting());
   	// console.log(this.Settings);
   }
   this.setValue();
   this.setPic();

}
Carousel.init=function(carrousels){
	var _this=this;
       //将nodeList转换为数组
       var cals= toArray(carrousels); 
       cals.forEach(function(item,index,array){
       	new _this(item);
       });
   }
   Carousel.prototype={
	//设置配置参数值去控制基本的宽度高度
	setValue:function(){
		this.carrousel.style.width=this.Settings.width+'px';
		this.carrousel.style.height=this.Settings.height+'px';
        //左右按钮设置
        var btnW=(this.Settings.width-this.Settings.carrouselWidth)/2;
        this.preBtn.style.width=btnW+'px';
        this.preBtn.style.height=this.Settings.height+'px';
        this.preBtn.style.zIndex=Math.ceil(this.carrouselItems.length/2);

        this.nextBtn.style.width=btnW+'px';
        this.nextBtn.style.height=this.Settings.height+'px';
        this.nextBtn.style.zIndex=Math.ceil(this.carrouselItems.length/2);
        //第一帧相关设置
        this.carrouselFir.style.left=btnW+'px';
        this.carrouselFir.style.width=this.Settings.carrouselWidth+'px';
        this.carrouselFir.style.height=this.Settings.carrouselHeight+'px';
        this.carrouselFir.style.zIndex=Math.floor(this.carrouselItems.length/2);

    },
	//设置除第一张之外的图片位置关系
	setPic:function(){
		var sliceItems=toArray(this.carrouselItems).slice(1);
		var sliceLength=sliceItems.length/2;
		var rightSlice=sliceItems.slice(0,sliceLength);
		var leftSlice=sliceItems.slice(sliceLength);
		var level=Math.floor(this.carrouselItems.length/2);

		var carrouselSelf=this;
		var rw=this.Settings.carrouselWidth;
		var rh=this.Settings.carrouselHeight;
		var gap=((this.Settings.width-this.Settings.carrouselWidth)/2)/level;


         //第一帧Left
         var firLeft=(this.Settings.width-this.Settings.carrouselWidth)/2;
         //固定偏移量
         var constOffset=firLeft+rw;

        //设置右边图片的位置关系
        var rightIndex=level;
        rightSlice.forEach(function(item,index,array){
        	rightIndex--;
        	var i=index;
        	rw=rw*carrouselSelf.Settings.scale;
        	rh=rh*carrouselSelf.Settings.scale;

        	item.style.zIndex=rightIndex;
        	item.style.width=rw+'px';
        	item.style.height=rh+'px';
        	item.style.opacity=1/(++i);
        	item.style.left=(constOffset+(++index)*gap-rw)+'px';
        	item.style.top=(carrouselSelf.Settings.height-rh)/2+'px';
        });
        //设置左边位置关系
        console.log(rightSlice[rightSlice.length-1].style.width)

        var lw=rightSlice[rightSlice.length-1].style.width;
        var lh=rightSlice[rightSlice.length-1].style.height;
        var leftIndex=level;
        var leftOpa=level;
        leftSlice.forEach(function(item,index,array){
        	leftIndex--;
        	var i=index;
        	item.style.zIndex=leftIndex;
        	item.style.width=lw;
        	item.style.height=lh;
        	item.style.opacity=1/leftOpa;
        	item.style.left=i*gap+'px';
        	item.style.top=(carrouselSelf.Settings.height-rh)/2+'px';
            leftOpa--;

        });
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
//转换数组方法
function toArray(list){
	return Array.prototype.slice.call(list);
}
window['Carrousel']=Carousel;
})();