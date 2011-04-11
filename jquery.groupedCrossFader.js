/*!
*	
*				Grouped Cross Fader jQuery Plugin
*				github.com/nwe44/jquery-groupedCrossFader
*
*	Author: 	Nick Evans
*				www.nick-evans.com
*	Version:	0.11
*	
*	This plugin takes an item, groups it's children into slugs that have a smaller 
*	width than the parent and then fades between them. Unlike many carousels, it 
*	does not need to know the width of any of the child items which can be of 
*	arbitrary and differing sizes and does not require any external css to function. 
*	It only adds css classes and values it requires to function.
*	
*	Methods:
*
*		init()		:	initializes the object
*						returns this
*
*		startAuto()	:	begins the auto fading between slugs
*						returns this
*		
*		pauseAuto()	:	temporarily pauses the auto fading
*						returns this
*
*************************************************************************************
*
*	To come in later versions:
*	
*	Ability to add items after initialization
*	Proper destroy function
*	A demo
*
*
*************************************************************************************	
*	Please use and edit as you wish, but a credit would be nice. Thanks.
*	
*/

;(function( $ ){
    var options 
    
	var methods = {
		init : function( options ) { 
			var opts = $.extend({}, $.fn.groupedCrossFader.defaults, options);
			// count the total number of elements
			return this.each(function() {
				var $this = $(this);

	             data = $this.data('groupedCrossFader');
				if ( ! data ) {
					 // If the plugin hasn't been initialized yet
					// get the width of the container
					var cw = $this.width();
					
					// put all elements in to an array, with a separate array item for their width
					var $children = $this.children();
					var slugWidth = 0;
					var slugNo = 0;
					var noOfSlugs = 0;
					var maxHeight = 0;
					
					
					for(var i = 0; i < $children.length; i++) {
						var $slugItem = $children.eq(i);
						// find the current item's width
						var slugItemWidth =  parseInt($slugItem.outerWidth(true));
						var slugItemHeight =  parseInt($slugItem.outerHeight(true));
						if(slugItemHeight > maxHeight)
							maxHeight = slugItemHeight;
						// Check to see if this item has a width, if not, we can't use it
						if(!slugItemWidth)
							continue;

						// if adding the new slugItem will push us over then create a new slug
						if(slugWidth + slugItemWidth > cw){
							slugWidth = 0;	
							if(!slugNo){
								$children.slice(slugNo,i).addClass("slug-" + noOfSlugs);
							}else{
								$children.slice(slugNo,i).addClass("slug-" + noOfSlugs).hide();
							}
							slugNo = i;
							noOfSlugs++;
						}
						
						$slugItem.css("position", "absolute").css('left', slugWidth );
						// add the current item's width to the slug width
						slugWidth += slugItemWidth;	
								
					}
					
					
					$(this).height(maxHeight);
					// label the last slug
					if(!slugNo){
						$children.slice(slugNo, $children.length).addClass("slug-item slug-" + noOfSlugs);
					}else{
						$children.slice(slugNo, $children.length).addClass("slug-item slug-" + noOfSlugs).hide();
					}

					$(this).data('groupedCrossFader', {
					   currentSlugNo : 0,
					   noOfSlugs : noOfSlugs,
					   opts: opts
					});

		          }

		          if(noOfSlugs){ // don't attempt to animate a slide of one.
		          
					methods.startAuto.apply(this);

					if(opts.hoverPause){
						$(this).mouseover(function(){
							methods.pauseAuto.apply(this);
						});

						$(this).mouseout(function(){
							methods.startAuto.apply(this);
						});

					}

		          }
			      
			          
			        
			});
		},
		
		 /**
         * Moves the carousel forwards.
         */
        next: function() {
	       return $(this).each(function(){
				
				var $this = $(this),
					data = $this.data('groupedCrossFader');
					
				// get the current slug
				var currentSlug = $this.find('.slug-' +data.currentSlugNo);
				
				// get the next slug
				var nextSlugNo = (data.currentSlugNo < data.noOfSlugs) ? data.currentSlugNo + 1 : 0;
				var nextSlug = $this.find('.slug-' + nextSlugNo);
				
				// hide the current slug
				currentSlug.each(function(i){
					$(this).delay(i * 100).fadeOut(data.opts.transitionSpeed);
				});
				
				// show the next slug
				nextSlug.delay(currentSlug.length * 100).each(function(i){
					$(this).delay(i * 100).fadeIn(data.opts.transitionSpeed);
				});
				
				// reset the current Slug
				data.currentSlugNo = nextSlugNo;
				$this.data('groupedCrossFader', data);
				
				//loop
				methods.startAuto.apply(this );
	       });
        },
		/**
         * Starts autoscrolling.
         */
        startAuto: function() {
			return $(this).each(function(){
				var $this = $(this),
					data = $this.data('groupedCrossFader');
				var self = this;
				this.timer = window.setTimeout(function() { methods.next.apply(self); }, data.opts.time);
	       });
        },

        /**
         * Pauses autoscrolling.
         */
        pauseAuto: function() {
	       return $(this).each(function(){
				var $this = $(this),
					data = $this.data('groupedCrossFader');
	            if (this.timer === null) {
	                return;
	            }
	            window.clearTimeout(this.timer);
	            this.timer = null;
            });
        }
	}

  $.fn.groupedCrossFader = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.groupedCrossFader' );
    }
  };

	$.fn.groupedCrossFader.defaults = {
		time: 6000,
		transitionSpeed: 500,
		hoverPause:true
	};
})(jQuery);
