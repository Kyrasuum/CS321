var Carousel = {
    duration: 600,  // Animation duration in milliseconds.
    padding: 0,      // Vertical padding around each image, in pixels.
    index: 0       // Current image index of the slider
  };
  
  function rotateForward() {
    var carousel = Carousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(lastChild, firstChild);
    Carousel.index--;
    if (Carousel.index < 0) {Carousel.index = children.length-1;}
  }

  function rotateBackward() {
    var carousel = Carousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(firstChild, lastChild.nextSibling);
    Carousel.index++;
    if (Carousel.index >= children.length) {Carousel.index = 0;}
  }

  function animate(begin, end, finalTask) {
    var carousel = Carousel.carousel,
        change = end - begin,
        duration = Carousel.duration,
        startTime = Date.now();
    carousel.style.left = begin + 'px';

    var animateInterval = window.setInterval(function () {
      var t = Date.now() - startTime,
      images = carousel.getElementsByTagName('img'),
      length = images.length,
      middle = Math.floor(length/2);
      if (t >= duration) {
        window.clearInterval(animateInterval);
        finalTask();
        return;
      }
      t /= (duration / 2);
      var left = begin + (t < 1 ? change / 2 * Math.pow(t, 3) :
                                 change / 2 * (Math.pow(t - 2, 3) + 2));
      carousel.style.left = left + 'px';

      for (var i = 0; i < images.length; i ++){
        var curr = images[i].opacity,
          tarr = 1 - 2*Math.abs(i - middle)/middle,
          delta = tarr - curr,
          tran = curr + (t < 1 ? delta / 2 * Math.pow(t, 3) :
            delta / 2 * (Math.pow(t - 2, 3) + 2));
        images[i].style.opacity = tran;
        images[i].opacity = tran;
      }
    }, 1000 / 60);
  }

  function panLeft(index) {
    var width = parseFloat(window.getComputedStyle(document.getElementById('carouselContainer')).getPropertyValue('width'), 10), 
      end = width/2, begin = end, amount = Math.floor(Carousel.carousel.children.length/2) - index;

    for(i = 0; i < amount; i++){
      rotateForward();
    }

    for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2); i++) {
      end -= Carousel.carousel.children[i].offsetWidth;
    }
    end -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2)].offsetWidth)/2;

    for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2) + amount; i++) {
      begin -= Carousel.carousel.children[i].offsetWidth;
    }
    begin -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2) + amount].offsetWidth)/2;

    animate(begin, end, function () {
      Carousel.carousel.style.left = end + 'px';
    });
  }

  function panRight(index) {
    var width = parseFloat(window.getComputedStyle(document.getElementById('carouselContainer')).getPropertyValue('width'), 10),
      end = width/2, begin = end, amount = index - Math.floor(Carousel.carousel.children.length/2);

    for(i = 0; i < amount; i++){
      rotateBackward();
    }

    for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2); i++) {
      end -= Carousel.carousel.children[i].offsetWidth;
    }
    end -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2)].offsetWidth)/2;

    for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2) - amount; i++) {
      begin -= Carousel.carousel.children[i].offsetWidth;
    }
    begin -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2) - amount].offsetWidth)/2;


    animate(begin, end, function () {
      Carousel.carousel.style.left = end + 'px';
    });
  }
  
  window.onload = function () {
    document.getElementById('spinner').style.display = 'none';
    var carousel = Carousel.carousel = document.getElementById('carousel'),
      container = Carousel.container = document.getElementById('carouselContainer'),
      images = carousel.getElementsByTagName('img'),
      numImages = images.length;

    for (var i = 0; i < numImages; ++i) {
      var image = images[i],
          frame = document.createElement('div');
      frame.className = 'pictureFrame';
      carousel.insertBefore(frame, image);
      frame.appendChild(image);
      image.opacity = 1;
      frame.addEventListener("click", function(e) {
        var arr = Array.from(Carousel.carousel.children),
          index = arr.indexOf(this)
        if (index < Math.floor(Carousel.carousel.children.length/2)){
          panLeft(index);
        }
        if (index > Math.floor(Carousel.carousel.children.length/2)){
          panRight(index);
        }
      }, false);
    }

    for (var i = 0; i < numImages; ++i) {
      rotateForward();
    }


    var wrapper = Carousel.wrapper = document.createElement('div');
    wrapper.id = 'carouselWrapper';
    wrapper.style.width = carousel.offsetWidth + 'px';
    wrapper.style.height = carousel.offsetHeight + 'px';
    carousel.parentNode.insertBefore(wrapper, carousel);
    wrapper.appendChild(carousel);

    Carousel.index = Math.floor(numImages/2);
    var width = parseFloat(window.getComputedStyle(container).getPropertyValue('width'), 10), 
      left = width/2;

    for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2); i++) {
      left -= Carousel.carousel.children[i].offsetWidth;
    }
    left -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2)].offsetWidth)/2;
    carousel.style.left = left + 'px';

    carousel.style.visibility = 'visible';
  };

  window.onresize = function(){
    var carousel = Carousel.carousel,
      wrapper = Carousel.wrapper,
      container = Carousel.container,
      images = carousel.getElementsByTagName('img'),
      numImages = images.length,
      width = parseFloat(window.getComputedStyle(container).getPropertyValue('width'), 10), 
      height = parseFloat(window.getComputedStyle(container).getPropertyValue('height'), 10), 
      left = width/2;

    for (var i = 0; i < Math.floor(numImages/2); i++) {
      left -= images[i].offsetWidth;
    }
    left -= (carousel.children[Math.floor(numImages/2)].offsetWidth)/2;
    carousel.style.left = left + 'px';

    carousel.style.width = width + 'px';
    carousel.style.height = height + 'px';

    wrapper.style.width = width + 'px';
    wrapper.style.height = height + 'px';
  };