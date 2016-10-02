# Cykle Slider
Javascript carousel written as a technical abilities test for TeamOne.

### Specifications
Carousel should shows three images: thumbnail, main, and thumbnail. Clicking on either thumbnail will advance the slideshow in that direction. The carousel should be responsive and support touch/swipe inputs. No CSS frameworks are to be used, and do not use jQuery plugins (though plain jQuery CAN be used).

### Dependencies
The only dependency on this project is `jQuery` - used only for DOM manipulation and event binding. This plugin could be rewritten in a dependency free manner but was not simply due to the fact that jQuery allows you to short hand many javascript calls. Maybe I'll try writing a vanilla JS version in the future!

### The Approach
I'm want to write a relatively light weight carousel plugin that leverages CSS3 animations with hardware acceleration to enhance performance. I've written carousels in the past that uses calculations and jQuery's `.animate()` calls to move a rail within a parent container; this time I'd like to keep calculations to a minimum and focus on simplicity.

I also want to focus on code reuse: multiple instances of the plugin should able to run independently of each other on the same page, each with its own configurations. I'd also like to support callback features so that developers can handle events without having to edit the source directly.


