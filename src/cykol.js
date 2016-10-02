;(function($){
    var defaults = {
        continuous: true, //Set to false for the carousel to stop at the edges
        swipe: true, //Set to false to disable swipe support
        duration: 250, //animation duration in ms
        easing: 'ease', //linear, ease, or other CSS3 supported easing calls
        timeout: 0 //Time to auto advance to next in ms, 0 disables the feature
    };
    
    /* 
        Constructor
        element: Target of the plugin
        options: Object containing configuration changes for the plugin
    */
    Cykol = function(element, options){
        this.element = element;
        this.options = $.extend({}, defaults, options); //Merge default config with options and store to this.options
        this.activeSlide = null;
        
        this.init();
    };
    
    Cykol.prototype.init = function(){
        var $wrapper = this.element;
        
        $wrapper.children().addClass('cykol-slide');
        $wrapper.addClass('cykol-wrapper');
        
        if(this.options.continuous == true){
            //If the carousel is going to be continuous, we prepend the last 2 images since we need a thumb and something to transition to
            this.prependSlide(2);
            this.setActiveSlide($wrapper.find('>:nth-child(3)')); 
        } else {
            //If the carousel isn't continuous, start at the first item
            this.setActiveSlide($wrapper.find('>:nth-child(1)')); 
        }
        
        //Event Bindings
        this.initEventBindings();       
        
        //Attach transition css live for easier configuration
        //Wrapped in a setTimeout to delay the animation trigger on load
        var instance = this;
        setTimeout(
            function(){
                var transition = 'all ' + instance.options.duration + 'ms ' + instance.options.easing;
                instance.element.find('.cykol-slide').css({
                    '-webkit-transition': transition,
                    '-o-transition': transition,
                    'transition': transition
                });
            }
        , 0);
        
        //Start auto if set
        if(this.options.timeout > 0){
            this.autoplay();
        }
                
        if(typeof this.options.onInit == 'function') this.options.onInit(); //Callback function run after initialization
    }
    
    Cykol.prototype.initEventBindings = function(){
        var instance = this;
        var $wrapper = this.element;
        
        var swipeYTolerance = 25; //Swipe distance above this value in the Y direction is ignored
        var swipeXTolerance = 200; //Swipe distance below this value in the X direction is ignored
        var touchstartX = 0;
        var touchstartY = 0;
        var touchendX = 0;
        var touchendY = 0;
        
        if(instance.options.swipe == true){
            //Custom swipe handler... wasn't sure if I could use jQuery Mobile to handle swipes. Better safe than sorry!
            $wrapper.on('touchstart', function(e){
                touchstartX = e.touches[0].clientX;
                touchstartY = e.touches[0].clientY;
            });
            $wrapper.on('touchend', function(e){
                touchendX = e.changedTouches[0].clientX;
                touchendY = e.changedTouches[0].clientY;

                if(Math.abs(touchendY - touchstartY) > swipeYTolerance && Math.abs(touchendX - touchstartX) < swipeXTolerance){
                    // If we're swiping more in the Y direction(above the tolerance), don't handle the event
                    return false;
                }

                if (touchendX < touchstartX) {
                    instance.nextSlide();
                }
                if (touchendX > touchstartX) {
                    instance.prevSlide();
                }
            });
        }
        
        //Click Handlers
        $wrapper.on('click', '.cykol-next', function(){
            instance.nextSlide();
        });
        $wrapper.on('click', '.cykol-prev', function(){
            instance.prevSlide();
        });
    }
    
    Cykol.prototype.setActiveSlide = function(slide){
        if(slide.length == 0) return false;
        
        this.clearSlideStyles(); //remove existing classes first
        
        this.activeSlide = slide;
        this.activeSlide.addClass('cykol-slide-active');
        
        //Set the thumbnails to the left and right of the active image
        var leftSlide = this.activeSlide.prev();
        if(leftSlide.length > 0){ leftSlide.addClass('cykol-slide-preview').addClass('cykol-prev')}
        
        var rightSlide = this.activeSlide.next();
        if(rightSlide.length > 0){ rightSlide.addClass('cykol-slide-preview').addClass('cykol-next')}
        
        return true;
    }
    
    Cykol.prototype.clearSlideStyles = function(){
        this.element.find('.cykol-slide-preview').removeClass('cykol-slide-preview');
        this.element.find('.cykol-slide-active').removeClass('cykol-slide-active');
        this.element.find('.cykol-prev').removeClass('cykol-prev');
        this.element.find('.cykol-next').removeClass('cykol-next');
    }
    
    Cykol.prototype.advanceToSlide = function(slide){
        this.setActiveSlide(slide);
        if(typeof this.options.onAnimation == 'function') this.options.onAnimation(); //Callback function run after slide transition starts.
        
        if(this.options.timeout > 0){
            if(this.autoplayTimer) clearInterval(this.autoplayTimer);
            this.autoplay();
        }
    }
    
    Cykol.prototype.nextSlide = function(){
        this.advanceToSlide(this.activeSlide.next());
        
        if(this.options.continuous == true){
            //To continously advance forward, we take first child and insert it to the back of the line. 
            var $wrapper = this.element;
            $wrapper.find('>:first-child').appendTo($wrapper).after(' ');
        }       
    }
    
    Cykol.prototype.prevSlide = function(){
        if(this.options.continuous == true){
            //To advance backward, we take the last child and stick it on the front.
            this.prependSlide();
        }
        
        this.advanceToSlide(this.activeSlide.prev());        
    }
    
    Cykol.prototype.prependSlide = function(numberOfSlides){
        var $wrapper = this.element;
        var numberOfSlides = (typeof numberOfSlides == 'number')? numberOfSlides : 1;
        
        for(var i = 0; i < numberOfSlides; i++){
            //`.after(' ')` is required because DOM Objects usually have spaces between them that are removed when appending and prepending
            $wrapper.find('>:last-child').prependTo($wrapper).after(' '); 
        }
    }
    
    Cykol.prototype.autoplay = function(){
        var instance = this;
        this.autoplayTimer = setTimeout(function(){
            instance.nextSlide();
        }, this.options.timeout);
    }
    
    Cykol.prototype.stop = function(){
        clearTimeout(this.autoplayTimer);
    }
    
    /* Add a hook so we can use jQuery syntax to call our plugin */
    jQuery.fn.cykol = function(options){
        return new Cykol(this, options);
    }
    
}(jQuery));