// JavaScript Document
$(function(){
	try{
	 var spinner = $( ".spinner" ).spinner();
	
   spinner.spinner({
	   min:1,
	   });;
	   $('.dropdown-toggle').dropdown();
	}catch(e){};
$(".add").click(function(){

		$(this).prev().children('input').spinner("stepUp");
	  });
	$(".minus").click(function(){
		$(this).next().children('input').spinner("stepDown");
	});
	$('.size-color').click(function(){
		window.location.href='detail-size.html';});
		$('.see-image').click(function(){
		window.location.href='detail-img-intro.html';});
		$(".choosesize dd:not('.disabled')").click(function(){
		$(this).addClass('choose').siblings().removeClass('choose');
		});
		$('.choose-bt').click(function(){
			$(this).children('i').toggleClass('fa-chevron-down');
			$(this).next().toggle();
			});
				try{
		$("img.lazy").lazyload({
			effect : "fadeIn"});}catch(e){};
			$('.fa-search').click(function(){
		window.location.href='list.html';
		});
		
		
		      //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失  
     
            $(window).scroll(function(){  
                if ($(window).scrollTop()>100){  
                    $(".back-to-top").show();  
                }  
                else  
                {  
                    $(".back-to-top").hide();  
                }  
            });  
  
            //当点击跳转链接后，回到页面顶部位置  
  
            $(".back-to-top").click(function(){  
                $('body,html').animate({scrollTop:0},1000);  
                return false;  
            });  
    
});
