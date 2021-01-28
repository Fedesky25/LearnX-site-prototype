# LearnX global network site prototype, by Fedesky25
* All html files in same folder
* All js, css, images in their respective folders
* No dependencies, so no external library that need more HTTP requests and several hundread KB download
* Less template => more unique ;-)
* Podcasts HTML card constructor based on JSON file, in anticipation of server communications
## Doubts / desires
* Side navigation bar: ring on wide screen, openable via a button on mobile devices. Is it too far off the recognizable design?
* It would be cool to put the SVG of the logo as water mark;
* Is the team page necessary? Couldn't it be at the end of the about page?
## Interview page
The podcasts info - name of istitute, student interviewed, description, timestamps - are easily used by a JSON reader to create automatically the cards and the procedural layout.
There are two versions of the page:
* `interviews.html`: the original layout is good and responsive but becomes quickly heavy due to the fact that it loads potentially several embedded documents (i.e. video players) inside many iframes. It may be fixed by loading only podcasts in view, but the overall experience can worsen by doing so.
* `alt_intervies.html`: the alternative layout is lighter, keeps aligned and centered in "fullscreen" (via a subtle snapping effect) video and podcast info, leaving much more space for the description and, more importantly, the list of useful timestamps. While it works best on wide screens, on the downside it isn't much responsive and requires a different solution to adapt to the mobile viewport.
## Feedback
For now, there are only the landing page (`index.html`) and the interviews or podcasts page (`interviews.html - alt_intervies.html`), but if you like this design we'll expand it to all other pages. So, tell me what you think about it.