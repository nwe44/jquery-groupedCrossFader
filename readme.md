jQuery Grouped Cross Fader
==========================

This plugin takes an item, groups it's children into slugs that have a smaller 
width than the parent and then fades between them. Unlike many carousels, it 
does not need to know the width of any of the child items which can be of 
arbitrary and differing sizes and does not require any external css to function. 
It only adds css classes and values it requires to function.

Sample usage
------------

    <ul id="crossFader" style="width:1000px">
        <li style="float:left;"><img src="dummyImage.jpg" width="200" height="100" /></li>
        <li style="float:left;"><img src="dummyImage.jpg" width="400" height="100" /></li>
        <li style="float:left;"><img src="dummyImage.jpg" width="500" height="100" /></li>
        <li style="float:left;"><img src="dummyImage.jpg" width="300" height="100" /></li>
        <li style="float:left;"><img src="dummyImage.jpg" width="100" height="100" /></li>
        <li style="float:left;"><img src="dummyImage.jpg" width="200" height="100" /></li>
        <li style="float:left;"><img src="dummyImage.jpg" width="500" height="100" /></li>
        <li style="float:left;"><img src="dummyImage.jpg" width="200" height="100" /></li>
        <li style="float:left;"><img src="dummyImage.jpg" width="500" height="100" /></li>
        <li style="float:left;"><img src="dummyImage.jpg" width="300" height="100" /></li>
        <li style="float:left;"><img src="dummyImage.jpg" width="100" height="100" /></li>
    </ul>
    
    <script type="text/javascript">
    $(document).ready(function() { 
        $('#crossFader').groupedCrossFader();
    });
    </script>

Methods
-------

* init(): initializes the object, returns this
* startAuto(): begins the auto fading between slugs, returns this
* pauseAuto(): temporarily pauses the auto fading, returns this
* next(): advances to the next slug, or loops to the first, returns this

Options
-------
* time: time (in ms) between transitions (default: 6000) 
* transitionSpeed: time (in ms) that individual transitions take (default: 500)
* hoverPause: Pauses the auto transition if the user hovers over the parent (default: true)


To come in later versions:
--------------------------

* Ability to add items after initialization
* Proper destroy function
* Carousel mod-cons like pagination and next/previous buttons
* A selection of callbacks
* Add a prettier demo