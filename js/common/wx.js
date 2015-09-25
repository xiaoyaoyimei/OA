// JavaScript Document
$(function(){
		$('.menulist a').click(function (e) {
		 e.preventDefault();
  $(this).tab('show');
});
	try{
	 var spinner = $( ".spinner" ).spinner();
	
   spinner.spinner({
	   min:0,
	   });;
	
	}catch(e){};
$(".add").click(function(){
		$(this).prev().children('input').spinner("stepUp");
	  });
	$(".minus").click(function(){
		$(this).next().children('input').spinner("stepDown");
	});
	$(".table  tbody tr").mouseenter(function(){
		$(this).find('.minus ').show();
			$(this).find('.add ').show();

		});
			$(".table  tbody tr").mouseleave(function(){
				$(this).find('.minus ').hide();
				$(this).find('.add ').hide();

		});
});