# carrousel
This is a very cool image carrousel making by original javascript.
###HTML Structrue
    <div class="carrousel-main" data-setting='{"width":1000,"height":400,"carrouselWidth":700,"carrouselHeight":400,"scale":0.9,	"verticalAlign":"middle"}'>
	    	<div class="carrousel-btn carrousel-btn-pre"></div>
    		<ul class="carrousel-list">
    			<li class="carrousel-item">
    				<a href="#"><img src="img/1.jpg"></a>
        			</li>
        			<li class="carrousel-item">
		    		<a href="#"><img src="img/2.jpg"></a>
    			</li>
			    <li class="carrousel-item">
	    			<a href="#"><img src="img/3.jpg"></a>
    			</li>
    			<li class="carrousel-item">
			    	<a href="#"><img src="img/4.jpg"></a>
    			</li>
		    	<li class="carrousel-item">
    				<a href="#"><img src="img/5.jpg"></a>
    		</ul>
    		<div class="carrousel-btn carrousel-btn-next"></div>
    	</div>
###Supplementary explanation
In this HTML structure，the attribute of data-setting is use to setting the params of carrousel.It will be read by JS.
In a way,This plugin used this way to deliver params.

###Parameter configuration
    width:1000,  //幻灯片区域的宽度
    height:400,  //幻灯片区域的高度
    carrouselWidth:700, //幻灯片第一帧的宽度
    carrouselHeight:400, //幻灯片第一帧的高度
    scale:0.9,//记录显示比例关系，例如第二张图比第一张图显示的时候宽高小多少
    autoPlay:true,//是否自动播放
    timeSpan:3000,//自动播放时间间隔
    verticalAlign:'middle'  //图片对齐方式，有top\middle\bottom三种方式，默认为middle
###usage
    Just like this way:
	    window.onload=function(){
    		Carrousel.init(document.querySelectorAll('.carrousel-main'));
    	}
