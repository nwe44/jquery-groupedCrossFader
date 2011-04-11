jQuery Grouped Cross Fader
==========================

This plugin takes an item, groups it's children into slugs that have a smaller 
width than the parent and then fades between them. Unlike many carousels, it 
does not need to know the width of any of the child items which can be of 
arbitrary and differing sizes and does not require any external css to function. 
It only adds css classes and values it requires to function.

Methods
-------

* init(): initializes the object, returns this
* startAuto(): begins the auto fading between slugs, returns this
* pauseAuto(): temporarily pauses the auto fading, returns this

To come in later versions:
--------------------------

* Ability to add items after initialization
* Proper destroy function
* Carousel mod-cons like pagination and next/previous buttons
* A selection of callbacks
* A demo