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
      var t = Date.now() - startTime;
      if (t >= duration) {
        window.clearInterval(animateInterval);
        finalTask();
        return;
      }
      t /= (duration / 2);
      var left = begin + (t < 1 ? change / 2 * Math.pow(t, 3) :
                                 change / 2 * (Math.pow(t - 2, 3) + 2));
      carousel.style.left = left + 'px';
    }, 1000 / 60);
  }
  
  window.onload = function () {
    document.getElementById('spinner').style.display = 'none';
    var carousel = Carousel.carousel = document.getElementById('carousel'),
        images = carousel.getElementsByTagName('img'),
        numImages = images.length;

    for (var i = 0; i < numImages; ++i) {
      var image = images[i],
          frame = document.createElement('div');
      frame.className = 'pictureFrame';
      carousel.insertBefore(frame, image);
      frame.appendChild(image);
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

    Carousel.index = Math.floor(numImages/2) - 1;
    var width = parseFloat(window.getComputedStyle(document.getElementById('carouselContainer')).getPropertyValue('width'), 10), 
      left = width/2;

    for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2); i++) {
      left -= Carousel.carousel.children[i].offsetWidth;
    }
    left -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2)].offsetWidth)/2;
    carousel.style.left = left + 'px';

    carousel.style.visibility = 'visible';
    var prevButton = document.getElementById('prev'),
        nextButton = document.getElementById('next');

    prevButton.onclick = function () {
      var width = parseFloat(window.getComputedStyle(document.getElementById('carouselContainer')).getPropertyValue('width'), 10), 
      end = width/2 - (Carousel.carousel.children[Carousel.carousel.children.length - 1].offsetWidth), begin = end;

      for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2) - 1; i++) {
        end -= Carousel.carousel.children[i].offsetWidth;
      }
      end -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2) - 1].offsetWidth)/2;

      for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2); i++) {
        begin -= Carousel.carousel.children[i].offsetWidth;
      }
      begin -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2)].offsetWidth)/2;

      prevButton.disabled = nextButton.disabled = true;
      rotateForward();
      animate(begin, end, function () {
        Carousel.carousel.style.left = end + 'px';
        prevButton.disabled = nextButton.disabled = false;
      });
    };

    nextButton.onclick = function () {
      var width = parseFloat(window.getComputedStyle(document.getElementById('carouselContainer')).getPropertyValue('width'), 10),
      end = width/2, begin = end;

      for (var i = 1; i < Math.floor(Carousel.carousel.children.length/2) + 1; i++) {
        end -= Carousel.carousel.children[i].offsetWidth;
      }
      end -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2) + 1].offsetWidth)/2;

      for (var i = 1; i < Math.floor(Carousel.carousel.children.length/2); i++) {
        begin -= Carousel.carousel.children[i].offsetWidth;
      }
      begin -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2)].offsetWidth)/2;

      prevButton.disabled = nextButton.disabled = true;
      rotateBackward();
      animate(begin, end, function () {
        Carousel.carousel.style.left = end + 'px';
        prevButton.disabled = nextButton.disabled = false;
      });
    };
  };