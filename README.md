## Sparta Project 1 part 2


### Description
---
This project was developed after Sparta Project 1, due to progress in the weeks development being faster than expected, I decided to create a second game.

### Tech used
---
##### Languages
This project utilised basic HTML5 and CSS3 to estabish page structure and page styling respectively.Javascript was used to manage game logic. Git was used to traverse file structures and connect with GitHub
##### Environments
The majority of the programming was done inside the Atom text editor. MacDown was used in the creation of this ReadMe. GitHub was used to establish development branches and version control. The terminal was also used to traverse branches and set up live test servers.

### Challenges
---
Prior to this project, I had no exprience in using the HTML 5 canvas, and so learning how to draw elements to the screen and animate them was quite difficult. As well as this, managing collisions was more difficult than expected, and still does not work entierly as expected

### Takeaways
---
This project enabled me to test myself by using technologies and features that I had not used before. As such, it helped me to develop my research skills.

### GitHub links
GitHub Repo: <https://github.com/samGilbert95/sparta-project-2/>

Github Pages: <https://samgilbert95.github.io/sparta-project-2/>

### Codeblocks
---
##### HTML Example Code
###### Canvas Creation
```html
<canvas id='playerCanv'></canvas>
<canvas id="hitCanv"></canvas>
<canvas id='styleCanv'></canvas>
```
##### CSS Example Code
###### Canvas Stylings
```css
#styleCanv {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height:600px;
  width: 1300px;
  margin: 50px;
  border: 10px solid;
  border-style: inset;
  background-size: cover;
  background-image: url('../images/back.png');
}
```
##### Javascript Example Code
###### Function for drawing standing animation
```javascript
function drawStandFrame(frameX,frameY,canvasX,canvasY){
    width = 47;
    height = 90;
    yPos = 70;
    k.drawImage(img,3 + frameX*width,3 + frameY*height,width,height,canvasX,canvasY,width,height);
  }
```
###### Animation Management on keypress
```javascript
  function init() {
    img.checkHurt();
    if (key === 97){
      window.cancelAnimationFrame(step);
      window.cancelAnimationFrame(kick);
      window.requestAnimationFrame(punch);
    } else if (key === 115) {
      window.cancelAnimationFrame(step);
      window.cancelAnimationFrame(punch);
      window.requestAnimationFrame(kick);
    } else {
      window.cancelAnimationFrame(punch);
      window.cancelAnimationFrame(kick);
      window.requestAnimationFrame(step);
    }
  }
```

### Download Instructions
----
These instructions assume that the user has a GitHub Account and Git installed on their terminal. In case these assumptions are incorrect, resoruces for installation are provided below.

Git Installation:<https://gist.github.com/derhuerst/1b15ff4652a867391f03>

GitHub Signup: <https://services.github.com/on-demand/intro-to-github/create-github-account>

##### Step 1: Clone Repo
Go to <https://github.com/samGilbert95/sparta-project-2> and
##### Step 2:	CD into terminal
Copy the project into the chosen directory using the Git Clone Command

---
###### Author:	Sam Gilbert
