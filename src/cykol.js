;(function($){
    var defaults = {};
    
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
        var $wrapper = this.element;
        
        $wrapper.addClass('cykol-wrapper');
        this.setActiveSlide($wrapper.find('>:nth-child(2)'));
    }
    
    Cykol.prototype.setActiveSlide = function(slide){
        if(slide.length == 0) return false;
        this.activeSlide = slide;
        this.activeSlide.addClass('cykol-slide-active');
        
        // Set the thumbnails to the left and right of the active image
        var leftSlide = this.activeSlide.prev();
        if(leftSlide.length > 0){ leftSlide.addClass('cykol-slide-preview')}
        
        var rightSlide = this.activeSlide.next();
        if(rightSlide.length > 0){ rightSlide.addClass('cykol-slide-preview')}
        
        return true;
    }

    /* Add a hook so we can use jQuery syntax to call our plugin */
    jQuery.fn.cykol = function(options){
        return new Cykol(this, options);
    }
    
}(jQuery));