parentscroll-fix
================

This fix prevents scrolling of parent container in overflow elements on iOS and Android. 

Issue
-----

The issue is described here:

* http://getbootstrap.com/getting-started/#support-fixed-position-keyboards

Trigger smooth scrolling behaviour on iOS

```
.modal {
  -webkit-overflow-scrolling: touch;
}
```