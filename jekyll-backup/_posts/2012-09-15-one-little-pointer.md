---
layout    : post
title     : One Little Pointer
permalink : /one-pointer/
---

> Every Objective-C object must begin with an `isa` pointer, otherwise
> the runtime won't know how to work with it. Everything about a particular
> object's type is wrapped up in that one little pointer. The remainder of an
> object is basically just a big blob and as far as the runtime is concerned, it
> is irrelevant. It's up to the individual classes to give that blob meaning.

&mdash; [Mike Ash](http://www.mikeash.com/pyblog/friday-qa-2009-03-13-intro-to-the-objective-c-runtime.html)
