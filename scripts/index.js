"use strict";

/*global document*/

var addResizeEvent = require("element-resize-event");
var domReady = require("domready");
var imagesLoaded = require("imagesloaded");

function fit(image, container) {
    if ((image.naturalWidth / image.naturalHeight) >= (container.clientWidth / container.clientHeight)) {
        image.style.width = container.clientWidth + "px";
        image.style.height = image.naturalHeight * (container.clientWidth / image.naturalWidth) + "px";
    }
    else {
        image.style.width = image.naturalWidth * (container.clientHeight / image.naturalHeight) + "px";
        image.style.height = container.clientHeight + "px";
    }

    image.style.position = "absolute";
    image.style.top = (container.clientHeight - image.clientHeight) / 2 + "px";
    image.style.left = (container.clientWidth - image.clientWidth) / 2 + "px";
}

domReady(function () {
    imagesLoaded("#photo", function (instance) {
        if (instance.images.length === 1) {
            var image = instance.images[0].img;
            var container = document.getElementById("photo-container");

            addResizeEvent(container, function () {
                fit(image, container);
            });

            fit(image, container);
            image.className = "visible";
        }
    });

    document.getElementById("nav-toggle").addEventListener("click", function () {
        document.getElementById("menu").classList.toggle("expand");
    });
});
