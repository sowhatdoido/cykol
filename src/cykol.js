;(function($){
    var defaults = {
        continuous: true, // Set to false for the carousel to stop at the edges
        //timeout: 0 // Time to auto advance to next in ms, 0 disables the feature
    };
    
    /* 
        Constructor
        element: Target of the plugin
        options: Object containing configuration changes for the plugin
    */
    Cykol = function(element, options){
        this.element = element;
        this.options = $.extend({}, defaults, options); // Merge default config with options and store to this.options
        this.activeSlide = null;
        
        this.init();
    };
    
    Cykol.prototype.init = function(){
        var $cykol = this; // Save this to be accessed later
        var $wrapper = this.element;
        
        $wrapper.children().addClass('cykol-slide');
        $wrapper.addClass('cykol-wrapper');
        
        if(this.options.continuous == true){
            // If the carousel is going to be continuous, we prepend the last 2 images since we need a thumb and something to transition to
            this.prependSlide(2);
            this.setActiveSlide($wrapper.find('>:nth-child(3)')); 
        } else {
            // If the carousel isn't continuous, start at the first item
            this.setActiveSlide($wrapper.find('>:nth-child(1)')); 
        }
        
        //Event Binding
        $wrapper.on('click', '.cykol-next', function(){
            $cykol.nextSlide();
        });
        $wrapper.on('click', '.cykol-prev', function(){
            $cykol.prevSlide();
        });
                
        if(typeof this.options.onInit == 'function') this.options.onInit(); //Callback function run after initialization
    }
    
    Cykol.prototype.setActiveSlide = function(slide){
        if(slide.length == 0) return false;
        
        this.clearSlideStyles(); //remove existing classes first
        
        this.activeSlide = slide;
        this.activeSlide.addClass('cykol-slide-active');
        
        // Set the thumbnails to the left and right of the active image
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
        if(typeof this.options.onAnimation == 'function') this.options.onAnimation(); // Callback function run after slide transition starts.
    }
    
    Cykol.prototype.nextSlide = function(){
        this.advanceToSlide(this.activeSlide.next());
        
        if(this.options.continuous == true){
            // To continously advance forward, we take first child and insert it to the back of the line. 
            var $wrapper = this.element;
            $wrapper.find('>:first-child').appendTo($wrapper).after(' ');
        }
    }
    
    Cykol.prototype.prevSlide = function(){
        if(this.options.continuous == true){
            // To advance backward, we take the last child and stick it on the front.
            this.prependSlide();
        }
        
        this.advanceToSlide(this.activeSlide.prev());        
    }
    
    Cykol.prototype.prependSlide = function(numberOfSlides){
        var $wrapper = this.element;
        var numberOfSlides = (typeof numberOfSlides == 'number')? numberOfSlides : 1;
        
        for(var i = 0; i < numberOfSlides; i++){
            // `.after(' ')` is required because DOM Objects usually have spaces between them that are removed when appending and prepending
            $wrapper.find('>:last-child').prependTo($wrapper).after(' '); 
        }
    }
    
    /* Add a hook so we can use jQuery syntax to call our plugin */
    jQuery.fn.cykol = function(options){
        return new Cykol(this, options);
    }
    
}(jQuery));