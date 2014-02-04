(function() {
  /**
   * This fix prevents scrolling of parent container in overflow elements on iOS and Android
   */
  
  var isIOS = (function() {
    return /iP(hone|od|ad)/.test(navigator.platform);
  })();
  
  var isAndroid = (function() {
    if (/android/i.test(navigator.userAgent)) {
      return true;
    }
    return false;
  })();
  
  if (!isIOS && !isAndroid) {
    return;
  }
  
  // the fix applies to iOS6 and android only
  
  var win = window;
  var doc = document;
  var touchPos = null;
  var overflowContainer = null;
  var overflowHiddenParent = null;
  
  function isChildOf(child, parent) {
    while((child = child.parentNode) && child !== parent); 
    return !!child; 
  }
  
  function getStyle(elem, styleName) {
    return win.getComputedStyle(elem, null).getPropertyValue(styleName);
  }
  
  function getOverflowHiddenParent(elem) {
    while(elem && elem.style) if (getStyle(elem, 'overflow') == 'hidden') return elem; else elem = elem.parentNode;
    return null;
  }
  
  function getOverflowContainer(elem) {
    while(elem) {
      if (elem == doc.body) return null;
      var overflow = getStyle(elem, 'overflow');
      if (overflow == 'scroll' || overflow == 'auto') return elem; else elem = elem.parentNode;
    }
    return null;
  }
  
  doc.addEventListener('touchstart', function(e) {
    overflowContainer = getOverflowContainer(e.target);
    overflowHiddenParent = getOverflowHiddenParent(e.target);
    var touch = event.changedTouches[0];
    touchPos = { y: touch.clientY};
  });
  
  doc.addEventListener('touchmove', function(e) {
    if (!overflowContainer || !overflowHiddenParent) return;
    var touch = event.changedTouches[0];
    var touchY = touch.clientY;
    var dy = (touchY - touchPos.y) * -1;
    touchPos = {y: touchY};
    var viewportHeight = overflowContainer.offsetHeight;
    var scrollTop = overflowContainer.scrollTop;
    var scrollHeight = overflowContainer.scrollHeight;
    if (scrollHeight <= viewportHeight || scrollTop == 0 && dy < 0 || scrollTop == scrollHeight - viewportHeight && dy > 0) {
      event.preventDefault();
    }
  });
 
})();
