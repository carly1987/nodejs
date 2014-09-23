define('transitions',[
		'url'
	],function(Url){
	var $html = $('#html');
	var $stage = $('#stage');
	var $section = $stage.find('section');
	var classes = [$stage.attr('data-classes')];
	var $left = $stage.attr('data-left').split(',');
	var $right = $stage.attr('data-right').split(',');
	var $top = $stage.attr('data-top').split(',');
	var $bottom = $stage.attr('data-bottom').split(',');
	var $array = [$left, $right, $top, $bottom];
	var Transitions = {
		init : function(){
			var h = $html.height()-80;
			$section.css('min-height',h+'px');
			$stage.css('min-height',h+'px');
			this.initSection($left, 'left', 'left');
			this.initSection($right, 'left', 'right');
			this.initSection($top, 'bottom', 'top');
			this.initSection($bottom, 'top', 'bottom');
			var id =Url.init().replace('#', '');
			if(id && id!=""){
				id = "sec-"+id;
				$section.removeClass('secMain');
				$('#'+id).addClass('secMain');
				this.slideToDirection(id, 1);
			}else{
				$('#sec-main').addClass('secMain');
			}
		},
		initSection : function(a, dir1, position){
			$.each(a, function(i){
				var v = a[i].split(' ');
				var n1,n2=0,dir2;
				switch (position){
					case 'left':
						n1 = -(i+1)*100+ "%";
						dir2 = 'top';
						break;
					case 'right':
						n1 = (i+1)*100+ "%";
						dir2 = 'top';
						break;
					default:
						n1 = '100%';
						dir2 = 'left';
						break;
				}
				if(v.length>1){
					$.each(v, function(j){
						var section = $('#'+v[j]);
						section.css(dir1,n1);
						section.css(dir2,n2);
					});
				}else{
					var section = $('#'+a[i]);
					section.css(dir1,n1);
					section.css(dir2,n2);
				}
			});
		},
		renderSection : function(a, dir1, n1){
			$.each(a, function(i){
				var v = a[i].split(' ');
				if(v.length>1){
					$.each(v, function(j){
						var section = $('#'+v[j]);
						section.css(dir1,n1);
					});
				}else{
					var section = $('#'+a[i]);
					section.css(dir1,n1);
				}

			});
		},
		getIndex : function(id){
			var i=0;
			var dir="";
			var r=[dir, 0, 0, 0];
			$.each($array, function(m){
				var $m=$array[m];
				i=$m.indexOf(id);
				if(i<0){
					$.each($m, function(n){
						var v = $m[n].split(' ');
						if(v.length>1){
							i=v.indexOf(id);
							if(i>=0){
								r[2]=n;
								return false;
							}
						}
					});
				}
				
				if(i>=0){
					switch (m){
						case 0:
							dir = 'right';
							break;
						case 1:
							dir = 'left';
							break;
						case 2:
							dir = 'bottom';
							break;
						case 3:
							dir = 'top';
							break;
					}
					r[0] = dir;
					r[1] = m;
					r[3] = i;
					return false;
				}
			});
			return r;
		},
		getId : function(m,i){
			var $a = $array[m];
			return $a[i];
		},
		//type:0 是anim； 1 是css
		slideToDirection : function(id,type){
			var r = this.getIndex(id);
			var i = r[3];
			var direction = r[0];
			var m = r[1];
			var n = r[2];
			var p = $stage.attr("data-position").split(",");
			var pleft = parseInt(p[0]);
			var ptop = parseInt(p[1]);
			switch (direction){
				case 'left':
					var left = -(n+1+pleft)*100+'%';
					if(type==0){
						$stage.css({
							'transform': 'translate('+left+', 0)',
							'-moz-transform': 'translate('+left+', 0)',
							'-webkit-transform': 'translate('+left+', 0)',
							'-o-transform': 'translate('+left+', 0)'
						});
					}else{
						pleft = -(n+1);
						$stage.css({
							left:left,
							top:0
						});
					}
					var n1 = ((n+1))*100+'%';
					this.renderSection($top, 'left', n1);
					this.renderSection($bottom, 'left', n1);
					break;
				case 'right':
					var left = (n+1-pleft)*100+'%';
					if(type==0){
						$stage.css({
							'transform': 'translate('+left+', 0)',
							'-moz-transform': 'translate('+left+', 0)',
							'-webkit-transform': 'translate('+left+', 0)',
							'-o-transform': 'translate('+left+', 0)'
						});
					}else{
						pleft = n+1;
						$stage.css({
							left:left,
							top:0
						});
					}
					var n1 = -(n+1)*100+'%';
					this.renderSection($top, 'left', n1);
					this.renderSection($bottom, 'left', n1);
					break;
				case 'top':
					$('#'+id).css({
						'transform': 'translate(0, -100%)',
						'-moz-transform': 'translate(0, -100%)',
						'-webkit-transform': 'translate(0, -100%)',
						'-o-transform': 'translate(0, -100%)'
					});
					break;
				case 'bottom':
					$('#'+id).css({
						'transform': 'translate(0, 100%)',
						'-moz-transform': 'translate(0, 100%)',
						'-webkit-transform': 'translate(0, 100%)',
						'-o-transform': 'translate(0, 100%)'
					});
					break;
				default:
					break;
			}
			p=[pleft, ptop];
			$stage.attr("data-position", p);
		},
		slide : function(e){
			var self = $(e.target);
			var direction = self.attr('data-direction');
			var classN = direction+'-transition';
			var sec = '#sec-'+self.attr('href').replace('#', '');
			var id = sec.replace('#', '');
			this.slideToDirection(id,0);
			$section.removeClass('secMain');
			$(sec).addClass('secMain');
		}
	}
	return Transitions;
});