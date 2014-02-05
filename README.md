parentscroll-fix
================

This fix prevents scrolling of the document when body is set to overflow: hidden on iOS6 and Android.

Issue
-----

The issue is described here:

* http://getbootstrap.com/getting-started/#support-fixed-position-keyboards

Fix
---

The fix tracks the touch position on the document to determine the scrolling direction and prevents scrolling when moving beyond the edges.

Additonal Notes
--------------
You want to trigger smooth scrolling behaviour on iOS like this:

```
.modal {
  -webkit-overflow-scrolling: touch;
}
```