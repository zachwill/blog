---
layout    : post
title     : objc_msgSend
permalink : /objc-msgSend/
---

In which [Mike Ash](https://twitter.com/mikeash) blows my mind, by implementing `objc_msgSend` in assembly:

> The need to go fast becomes much less important at this point, partly because
> it's already doomed to be slow, and partly because this path should be taken
> extremely rarely. Because of that, it's acceptable to drop out of the assembly
> code and call into more maintainable C.

[Fantastic blog post](http://www.mikeash.com/pyblog/friday-qa-2012-11-16-lets-build-objc_msgsend.html).
