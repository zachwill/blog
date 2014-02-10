---
layout    : post
title     : Flappy Bird by the Numbers
permalink : /flappy-bird/
---

After hearing about [Flappy Bird][app] the past couple days, I decided to download its 68,000 iTunes reviews last night. I explain some of the technical details down below, but I honestly don't think that's the most interesting story here. In fact, while the internet keeps pushing The Verge's [$50,000-a-day story][verge] about the app, I think the onslaught of Flappy Bird downloads that's happened in the past two weeks is a much more interesting storyline.

[app]: http://en.wikipedia.org/wiki/Flappy_Bird
[verge]: http://www.theverge.com/2014/2/5/5383708/flappy-bird-revenue-50-k-per-day-dong-nguyen-interview

---

![Flappy Bird Daily Reviews (US App Store)][graph]

[graph]: /img/flappy_bird.png

In late December and early January, I'm guessing [Dong Nguyen][dongatory] probably used [some sort of service to download/rate Flappy Bird][bots] on the App Store. The end goal was probably to generate some buzz for a game that originally had been released at the end of May and then updated in September for iOS 7. With six months of nothing happening on a game he had made in a week's spare time, a marketing experiment around the holiday download season couldn't hurt.

[bots]: http://www.bluecloudsolutions.com/blog/flappy-birds-smoke-mirrors-scamming-app-store/
[dongatory]: https://twitter.com/dongatory

It worked. Flappy Bird started getting over 20 reviews a day (sometimes a whole 5 reviews in a single hour). At the time, this had to be somewhat encouraging. I mean, with weeks of nothing happening, 20 reviews every day from the end of December until the beginning of January had to be a good start.

**On January 9th, Flappy Bird hit the milestone of 90 reviews in a single day.** The experiment paid off. The game could become a niche success with thousands of downloads (approximating from review count). And, that's the end of the story.

But wait, by the 12th, that number doubled — and by the 17th, it doubled again. The game no one cared about was up to over 400 reviews a day. On the 18th, over 600 — on the 19th, more than 680.

And, then it started to come back down to Earth. Still over 600 reviews a day on January 20th and 21st, but it had probably peaked. All good things must come to an end, right?

**Except January 22nd was the first day of 100 reviews in an hour.** In a single hour, 100 reviews. A new record of 800 total reviews on the day. If you keep that in mind, and use the numbers as a yardstick for what his download count must have looked like, **the next week must have been absolutely insane.**

On the 24th, Flappy Bird had 136 reviews submitted in a single hour — over 1,100 total reviews on the day. Two days later, on January 26th, it peaked at 206 an hour (and 1,600 reviews on the day). Two days later, 330 reviews an hour. The next day, over 400. On January 30th, more than 500 reviews in an hour (more than 4,600 total reviews on the day). On the last day of the month, more than 630 reviews in a single hour — 5,500 total on the day.

**And then, February 1st hit.**

You've got to keep in mind that this game is a [Helicopter clone][helicopter] with Mario-inspired graphics. **It was made in a single week, and largely ignored by users for months.** The initial release was ignored. The update was ignored. The reviews and ratings during the holiday season were ignored.

[helicopter]: http://helicoptergame.net

Even after possibly using some sort of small bot network, the total app downloads had to be relatively minor at the beginning of January. It was still going completely unnoticed on the App Store. (I'd suggest probably less than 10,000 iOS devices had Flappy Bird on them before January 9th.)

**January 22nd Dong Nguyen was probably extremely excited about the couple months worth of revenue his marketing experiment had pulled off.** With the recurring in-game ads and 800 reviews in a single day, Flappy Bird was beyond a success. Mission accomplished.

**February 1st Dong Nguyen, on the other hand, must have questioned if the world had lost its mind.**

On February 1st, reviews exploded to 800 in a single hour. **6,500 iTunes App Store reviews in a single day.** February 1st is the day Dong Nguyen woke up, stretched, checked email, checked Twitter, checked iTunes, and witnessed millions of downloads happening.

**Millions.**

You can only imagine what that must have felt like.

This is the same app no one cared about for more than half a year. Just one month prior, it was a great day if Flappy Bird got 20 total reviews on the App Store. Up until January 9th, there had never been an hour in which Flappy Bird received even 10 reviews (most of the time it was under 5).

After that, the rest is history. An obscure game no one loved became the most downloaded app on the App Store (not of all time, but of the moment). [The App Store even tweeted their high score.][tweet] And then, [he took it down][removed].

[tweet]: https://twitter.com/AppStore/status/431537791642918912
[removed]: http://www.macrumors.com/2014/02/09/flappy-bird-removed/

**This is less a story about a guy making $50,000 a day and more about a developer who just rode one hell of a roller coaster this past month.**

---

### Technical Notes

If you think of iTunes as a big hybrid native/web app (which it is), then it's probably safe to assume JSON/HTML APIs exist for apps and reviews (which there are). I used [Charles][charles] and wrote a simple [Scrapy][scrapy] project to download the 68,000 reviews and user pages.

[charles]: http://www.charlesproxy.com
[scrapy]: http://doc.scrapy.org/en/latest/

I was originally planning to focus on the December/January Flappy Bird reviews — I thought it'd be fun to prove that they were most likely bots. After loading the reviews into [`pandas`][pandas] and playing around with the data, though, it became pretty clear those had little to nothing to do with the success of Flappy Bird.

[pandas]: http://pandas.pydata.org

**The bump in reviews on January 9th probably started the snowball effect for Flappy Bird.** I'm not exactly sure what influencer or dumb luck helped make that possible, but the 20ish reviews each day at the end of December are a pretty moot point. Diving into the numbers for the past two weeks, I'd be surprised if Dong even remembers that time. He's seriously been on one hell of a roller coaster ride — and that ended up being much more interesting (at least to me).
