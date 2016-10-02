# Cykol Slider
Javascript carousel written as a technical abilities test for TeamOne.

### Specifications
Carousel should shows three images: thumbnail, main, and thumbnail. Clicking on either thumbnail will advance the slideshow in that direction. The carousel should be responsive and support touch/swipe inputs. No CSS frameworks are to be used, and do not use jQuery plugins (though plain jQuery CAN be used).

### Dependencies
The only dependency on this project is `jQuery` - used only for DOM manipulation and event binding. This plugin could be rewritten in a dependency free manner but was not simply due to the fact that jQuery allows you to short hand many javascript calls. Maybe I'll try writing a vanilla JS version in the future!

I created a `package.json` that will include `jQuery 3.1.1` locally, but I'm also using a CDN to deliver the script so that this project can be hosted on github pages at a later point. To set up locally, just run:
```
npm install
```
and replace
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
```
with
```
<script src="node_modules/jquery/dist/jquery.min.js"></script>
```

### The Approach
I'm want to write a relatively light weight carousel plugin that leverages CSS3 animations with hardware acceleration to enhance performance. I've written carousels in the past that uses calculations and jQuery's `.animate()` calls to move a rail within a parent container; this time I'd like to keep calculations to a minimum and focus on simplicity.

I also want to focus on code reuse: multiple instances of the plugin should able to run independently of each other on the same page, each with its own configurations. I'd also like to support callback features so that developers can handle events without having to edit the source directly.


### Get Started
Create a div wrapper that contains a collection of `img` or `div` tags. You will be able to instantiate cykol by calling either:
```
var c1 = new Cykol($('#div-wrapper'), {...});
or
var c2 = $('#div-wrapper').cykol({...}); // added since we're using jQuery
```

#### On Responsive Support and Other CSS things
Since the animation portion of the plugin is driven by CSS3, you can use CSS edits or media queries to customize your carousel. In a image only carousel for instance, adding `max-width: 100%;` on `.cykol-slide` is enough to make it responsive. 

### Options
- `duration`: Time in milliseconds for animation to complete
- `easing`: CSS3 defined easing (`ease`, `linear`, `cubic-bezier`, etc)
- `continuous`: Takes `true || false`. Sets up carousel to loop or end at the edges.
- `swipe`: Takes `true || false`. Determines whether bindings for swipe events will occur.
- `onInit`: Function to be run after a new cykol instance is created
- `onAnimation`: Function to be run after a transition starts


### Limitations
Due to time restraints and decisions made during the planning process, there are some limitations to what this carousel can do. I'm documenting the ones I can think of here so that I can work on it in the future.
- `onAnimation` technically calls as the animation starts as we don't track the animation duration in javascript. If we add an event listener we can break this callback into `beforeAnimation`, `duringAnimation`, and `afterAnimation` calls, which would be more useful with slower animation times.
- Due to the way DOM is rendered, you can't have padding or borders directly on the slide element itself. To get around this, you can wrap the image/div in an empty div to act as a slide container, then style the content inside
- Swipe functionality could probably be handled better by a third party script. I custom wrote mine because the specifications said only to use jQuery for DOM manipulation and jQuery doesn't support swipe events unless you package jQuery UI. Works well enough though!