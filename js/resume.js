$(function(){
		$(".head_nav a").hover(function(){
		$(this).stop().animate({"margin-top":-50},300);
	},function(){
		$(this).stop().animate({"margin-top":0},300);
		})
	
	$(function(){
		$(".skill-item img").hover(function(){
			$(this).parent().find(".skill-drop").stop().slideToggle("slow");
			});
		});	
		$('#fullpage').fullpage({
			verticalCentered:false,
			anchors:['page1','page2','page3','page4','page5','page6'],
			navigation:true,
			navigationTooltips:['首页','基本资料','专业技能','我的经历','自我评价','感谢阅读'],
			afterLoad:function(link,index){
				switch(index){
					case 1:
						move('.section1 h1').scale(1.2).end();
						move('.section1 .home-cont').set('margin-top','5%').end();
						break;
					case 2:
						move('.section2 h1').set('margin-left','20%').end();
						move('.section2 h2').set('margin-left','20%').end();
						move('.section2 .about-cont').set('margin-top','5%').end();
						break;
					case 3:
						move('.section3 h1').set('margin-left','20%').end();
						move('.section3 h2,.section3 p').set('margin-left','20%').end();
						break;
					case 4:
						move('.section4 h1').set('margin-left','20%').end();
						move('.section4 h2').set('margin-left','20%').end();
						break;
					case 5:
						move('.section5 h1').set('margin-left','20%').end();
						move('.section5 h2').set('margin-left','20%').end();
						break;
					case 6:
						move('.section6 h1').set('margin-left','20%').end();
						move('.section6 h2').set('margin-left','20%').end();
						move('.section6 p').set('margin-top','5%').end();
						break;
					default:
						break;
					}
				},
			onLeave:function(link,index){
				switch(index){
					case 1:
						move('.section1 h1').scale(1).end();
						move('.section1 .home-cont').set('margin-top','800px').end();
						break;
					case 2:
						move('.section2 h1').set('margin-left','1500px').end();
						move('.section2 h2').set('margin-left','-1500px').end();
						move('.section2 .about-cont').set('margin-top','800px').end();
						break;
					case 3:
						move('.section3 h1').set('margin-left','1500px').end();
						move('.section3 h2,.section3 p').set('margin-left','-1500px').end();
						break;
					case 4:
						move('.section4 h1').set('margin-left','1500px').end();
						move('.section4 h2').set('margin-left','-1500px').end();
						break;
					case 5:
						move('.section5 h1').set('margin-left','1500px').end();
						move('.section5 h2').set('margin-left','-1500px').end();
						break;
					case 6:
						move('.section6 h1').set('margin-left','1500px').end();
						move('.section6 h2').set('margin-left','-1500px').end();
						move('.section6 p').set('margin-top','800px').end();
						break;
					default:
						break;
					}
				},
		});
		
	
	});