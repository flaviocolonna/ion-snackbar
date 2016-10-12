# ion-snackbar
## Description
The new type of Android notification in Ionic.
This component is new in the material design and it is supposed to be an alternative of the Toasts.
Its style is really simple but in the same time complicated if you want to follow the material design guidelines written in [Google Material Design](https://material.google.com/components/snackbars-toasts.html),  as I did.
This component is optimized both for mobile and tablet. You can customize message text, message color, button text, button color, button function and then, thanks to promises, you are able to detect when the Snackbar disappears in order to call your own function.

## How to use:

Snackbar js contains the angular module and service that your app needs to implement the snackbar. So first of all add as dependency the 'snackbar' module to your app module.
```javascript
var myapp = angular.module('myapp',['snackbar'])
```
Then add the service $snackbar to the controller on which you want to use the snackbar functions.
```javascript
myapp.controller("mycontroller", function($snackbar) {
    //my logic
})
```
Now let's see how to use properly the snackbar. To call the snackbar simply write this:
```javascript
var options = {
    message: 'Hello World!',
    time: 'SHORT',
    buttonName: 'Close',
    messageColor: 'red',
    buttonColor: 'white',
    buttonFunction: helloWorld
}
$snackbar.show(options).then(function(value){
    console.log("Snackbar disappeared");
    // here you can call another function
})

/**
* Example of function you can call
*/
function helloWorld() {
    console.log("Hello world!")
}
```
In order to close the snackbar:
```javascript
$snackbar.hide().
```

Here there are the options available for the 'show' function:

- message (compulsory)
- buttonName (optional)
- buttonColor (optional but default #a1c2fa)
- messageColor (optional but default WHITE)
- time (optional but default SHORT)
- buttonFunction (optional but default snackbar.hide())

The 'message' parameter inside the options object is compulsory and without it snackbar doesn't work, firing an exception.
$snackbar it is also a promise so you can call:
```javascript
$snackbar.show({message : 'hello'}).then(function(success){},function(error){})
```

to execute something after the snackbar disappears. Timing in snackbar is expressed by a string that could be ['SHORT','LONG','INDETERMINATE'];
*SHORT* will be 3000 MS, *LONG* will be 8000 MS and *INDETERMINATE* will not close automatically the snackbar.
When *buttonName* is not defined you will have a simple snackbar without button. Remember that usually snackbar allows multi-line in mobile but just one line in tablet.
Don't put too large text in snackbar due to has not been created for that at the start.

## Animation

Each animation use GPU acceleration to give a smoother movement, essential for hybrid apps like Ionic apps.

## Dependecies

Roboto font style for text
Ng Animate to close the previous snackbar when you try to open a new one in the same time. For any further explanation contact me via comments please. Thanks!
The code is licensed under GNU AGP v3 license.

## Contacts

For any bug or improvement don't hesitate to contact me at my page [here](http://flaviocolonnaromano.altervista.org)

DONE WITH :heart:
