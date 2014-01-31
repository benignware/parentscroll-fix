parentscroll-fix
================

This fix prevents scrolling of parent container in overflow elements on iOS6 and Android.

Issue
-----

The issue is described here:

* http://getbootstrap.com/getting-started/#support-fixed-position-keyboards

Fix
---

The fix tracks the touch position on the document to determine the scrolling direction and prevents default behaviour when moving beneath the edge.

Additonal Notes
--------------
You want to trigger smooth scrolling behaviour on iOS like this:

```
.modal {
  -webkit-overflow-scrolling: touch;
}
```