(function() {
  /**
   * This fix prevents scrolling of parent container in overflow elements on iOS and Android
   */
  
  var isIOS6 = (function() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      var version = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
      if (version[0] <= 6) return true;
    }
    return false;
  })();
  
  
  var isAndroid = (function() {
    if (/android/i.test(navigator.userAgent)) {
      return true;
    }
    return false;
  })();
  
  if (!isIOS6 && !isAndroid) {
    return;
  }
  
  // the fix applies to iOS6 and android only
  
  var win = window;
  var doc = document;
  var touchPos = null;
  var overflowContainer = null;
  
  function isChildOf(child, parent) {
    while((child = child.parentNode) && child !== parent); 
    return !!child; 
  }
  
  function getStyle(elem, styleName) {
    return win.getComputedStyle(elem, null).getPropertyValue(styleName);
  }
  
  function getOverflowContainer(elem) {
    while(elem) {
      var overflow = getStyle(elem, 'overflow');
      if (overflow == 'scroll' || overflow == 'auto') {
        return elem;
      }
      elem = elem.parentNode;
      if (elem == doc) break;
    }
    return null;
  }
  
  doc.addEventListener('touchstart', function(e) {
    overflowContainer = getOverflowContainer(e.target);
    if (overflowContainer) {
      var touch = event.type == 'touchstart' ? event.changedTouches[0] : event;
      touchPos = {x: touch.clientX, y: touch.clientY};
    }
  });
  
  doc.addEventListener('touchmove', function(e) {
    overflowContainer = getOverflowContainer(e.target);
    if (!overflowContainer) return;
    var touch = event.type == 'touchmove' ? event.changedTouches[0] : event;
    var touchX = touch.clientX;
    var touchY = touch.clientY;
    var dx = (touchX - touchPos.x) * -1;
    var dy = (touchY - touchPos.y) * -1;
    touchPos = {x: touchX, y: touchY};
    var viewportHeight = overflowContainer.offsetHeight;
    var scrollTop = overflowContainer.scrollTop;
    var scrollHeight = overflowContainer.scrollHeight;
    if (scrollHeight <= viewportHeight || scrollTop == 0 && dy < 0 || scrollTop == scrollHeight - viewportHeight && dy > 0) {
      event.preventDefault();
    }
  });
 
})();