  //our global struct for storing carousel variables
  var Carousel = {
    duration: 600,  // Animation duration in milliseconds.
    padding: 0,      // Vertical padding around each image, in pixels.
    index: 0       // Current image index of the slider (based on image order before being put in carousel)
  };
  
  //changes the images order in the containers
  function rotateForward() {
    var carousel = Carousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(lastChild, firstChild);
    Carousel.index--;
    if (Carousel.index < 0) {Carousel.index = children.length-1;}
  }

  //changes the images order in the containers
  function rotateBackward() {
    var carousel = Carousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(firstChild, lastChild.nextSibling);
    Carousel.index++;
    if (Carousel.index >= children.length) {Carousel.index = 0;}
  }

  //animates the images moving from side to side
  function animate(begin, end, finalTask) {
    var carousel = Carousel.carousel,
        change = end - begin,
        duration = Carousel.duration,
        startTime = Date.now();
    carousel.style.left = begin + 'px';

    //does the actual animation work
    //runs on a timer in the window
    var animateInterval = window.setInterval(function () {
      var t = Date.now() - startTime,
      images = carousel.getElementsByTagName('img'),
      length = images.length,
      middle = Math.floor(length/2);

      //check if we are done
      if (t >= duration) {
        window.clearInterval(animateInterval);
        finalTask();
        return;
      }
      //update time
      t /= (duration / 2);
      //find new offset
      var left = begin + (t < 1 ? change / 2 * Math.pow(t, 3) :
                                 change / 2 * (Math.pow(t - 2, 3) + 2));
      carousel.style.left = left + 'px';

      //update transparency for each image
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

  //attempts panning to the inputted index
  function pan(index) {
    if (index < Math.floor(Carousel.carousel.children.length/2)){
      panLeft(index);
    }
    if (index > Math.floor(Carousel.carousel.children.length/2)){
      panRight(index);
    }
  }

  //pan's the carouse to the right to inputted index
  //should not be called directly... call pan instead
  function panLeft(index) {
    var width = parseFloat(window.getComputedStyle(document.getElementById('carouselContainer')).getPropertyValue('width'), 10), 
      end = width/2, begin = end, amount = Math.floor(Carousel.carousel.children.length/2) - index;
    //change image order first.. makes math easier
    for(i = 0; i < amount; i++){
      rotateForward();
    }
    //we always want to be centered at the end
    for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2); i++) {
      end -= Carousel.carousel.children[i].offsetWidth;
    }
    //only need half the width for center image
    end -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2)].offsetWidth)/2;

    //start animation offset the amount we are moving
    for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2) + amount; i++) {
      begin -= Carousel.carousel.children[i].offsetWidth;
    }
    //only need half the width for center image
    begin -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2) + amount].offsetWidth)/2;

    //finally input our variables and play the animation
    animate(begin, end, function () {
      Carousel.carousel.style.left = end + 'px';
    });
  }

  //pan's the carouse to the left to inputted index
  //should not be called directly... call pan instead
  function panRight(index) {
    var width = parseFloat(window.getComputedStyle(document.getElementById('carouselContainer')).getPropertyValue('width'), 10),
      end = width/2, begin = end, amount = index - Math.floor(Carousel.carousel.children.length/2);
    //change image order first.. makes math easier
    for(i = 0; i < amount; i++){
      rotateBackward();
    }
    //we always want to be centered at the end
    for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2); i++) {
      end -= Carousel.carousel.children[i].offsetWidth;
    }
    //only need half the width for center image
    end -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2)].offsetWidth)/2;

    //start animation offset the amount we are moving
    for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2) - amount; i++) {
      begin -= Carousel.carousel.children[i].offsetWidth;
    }
    //only need half the width for center image
    begin -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2) - amount].offsetWidth)/2;

    //finally input our variables and play the animation
    animate(begin, end, function () {
      Carousel.carousel.style.left = end + 'px';
    });
  }
  
  //intializes our carousel
  //carousel images should start transparent and become visible after this function
  //this initiales structs, sets transparency, and starting index
  window.onload = function () {
    document.getElementById('spinner').style.display = 'none';
    var carousel = Carousel.carousel = document.getElementById('carousel'),
      container = Carousel.container = document.getElementById('carouselContainer'),
      images = carousel.getElementsByTagName('img'),
      numImages = images.length,
      length = images.length,
      middle = Math.floor(length/2);

    //initialize images
    for (var i = 0; i < numImages; ++i) {
      var image = images[i],
          frame = document.createElement('div'),
          tran = image.style.opacity = image.opacity = 1 - 2*Math.abs(i - middle)/middle;

      frame.className = 'pictureFrame';
      carousel.insertBefore(frame, image);
      frame.appendChild(image);

      frame.addEventListener("click", function(e) {
        var arr = Array.from(Carousel.carousel.children),
          index = arr.indexOf(this)
        pan(index);
      }, false);
    }

    //hacky fix to remove gaps between images that shouldnt be there
    for (var i = 0; i < numImages; ++i) {
      rotateForward();
    }

    //trick to make sure images down wrap around to next line
    var wrapper = Carousel.wrapper = document.createElement('div');
    wrapper.id = 'carouselWrapper';
    wrapper.style.width = carousel.offsetWidth + 'px';
    wrapper.style.height = carousel.offsetHeight + 'px';
    carousel.parentNode.insertBefore(wrapper, carousel);
    wrapper.appendChild(carousel);

    //initialize our current index and offset
    Carousel.index = Math.floor(numImages/2);
    var width = parseFloat(window.getComputedStyle(container).getPropertyValue('width'), 10), 
      left = width/2;

    for (var i = 0; i < middle; i++) {
      left -= Carousel.carousel.children[i].offsetWidth;
    }
    left -= (Carousel.carousel.children[middle].offsetWidth)/2;
    carousel.style.left = left + 'px';

    //let it be visible
    carousel.style.visibility = 'visible';

    var next = document.getElementbyId('next');
    var prev = document.getElementbyId('prev');

    next.onclick = function(){
      var width = parseFloat(window.getComputedStyle(document.getElementById('carouselContainer')).getPropertyValue('width'), 10),
      end = width/2, begin = end, amount = 1;
      //change image order first.. makes math easier
      for(i = 0; i < amount; i++){
        rotateBackward();
      }
      //we always want to be centered at the end
      for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2); i++) {
        end -= Carousel.carousel.children[i].offsetWidth;
      }
      //only need half the width for center image
      end -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2)].offsetWidth)/2;

      //start animation offset the amount we are moving
      for (var i = 0; i < Math.floor(Carousel.carousel.children.length/2) - amount; i++) {
        begin -= Carousel.carousel.children[i].offsetWidth;
      }
      //only need half the width for center image
      begin -= (Carousel.carousel.children[Math.floor(Carousel.carousel.children.length/2) - amount].offsetWidth)/2;

      //finally input our variables and play the animation
      animate(begin, end, function () {
        Carousel.carousel.style.left = end + 'px';
      });
    };

    prev.onclick = function(){
      panLeft(1); 
    };
  };

  //handles the window changing size
  //needs to resize any object that does not resize itself
  //this also means we need to fix our offsets
  window.onresize = function(){
    var carousel = Carousel.carousel,
      wrapper = Carousel.wrapper,
      container = Carousel.container,
      images = carousel.getElementsByTagName('img'),
      numImages = images.length,
      width = parseFloat(window.getComputedStyle(container).getPropertyValue('width'), 10), 
      height = parseFloat(window.getComputedStyle(container).getPropertyValue('height'), 10), 
      left = width/2;

    //calculation for offset
    for (var i = 0; i < Math.floor(numImages/2); i++) {
      left -= images[i].offsetWidth;
    }
    left -= (carousel.children[Math.floor(numImages/2)].offsetWidth)/2;
    carousel.style.left = left + 'px';

    //updating sizes
    carousel.style.width = width + 'px';
    carousel.style.height = height + 'px';

    wrapper.style.width = width + 'px';
    wrapper.style.height = height + 'px';
  };