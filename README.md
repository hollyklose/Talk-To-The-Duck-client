# Talk to the Duck
##### By Hicham Boualam, Eliza Davis, Holly Klose, & Kevin Rosario-Adorno

This is the front end of the Talk to the Duck application which is a software development themed blog. It's designed to let users create blog posts related to their software development challenges and triumphs, and read about the experiences of others. Users can read all posts and blog comments at any time, but must be logged in to create, edit or delete their own blog posts or comments. Logged in users can also like other posts as well as following the blog authors they like most. In addition, users can add and edit their profile pictures.

### User Stories
- As a unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a unregistered user, I would like to see all users blog posts.
- As a unregistered user, I would like to see comments on those blog posts.
- As a signed in user, I would to create blog posts.
- As a signed in user, I would to comment on other users' blog posts.
- As a signed in user, I would to update my blog posts and comments.
- As a signed in user, I would to delete my blog posts and comments.

### Technologies Used
- JavaScript
- HTML/CSS
- Bootstrap
- MongoDB & Mongoose
- Node.js
- Express.js
- Handlebars
- jQuery/AJAX
- moment (node package)
- AWS

### The Process

When our team was assigned the topic of creating a blog platform, we were instantly excited by the idea of tying in our experience with software engineering. The theme we decided on was a blog where programmers can post about and discuss how to overcome issues that they have encountered in their development processes. Inspired by the "rubber duck" method of thinking through problems out loud, Talk to the Duck was born!

In our planning stage, we decided that the best way to collaborate, particularly for working on the back end, would be through pair programming. We split into two pairs for the first day, with the team of Holly and Eliza building the API and Hicham and Kevin tackling the front end. Since we figured there would be more opportunities to divide tasks on the front end, our primary goal was to give everyone a share in working on the back end. We set the following schedules, with pair programming teams indicated:

##### Back End Schedule:
1. (HK & ED) Update User model: We decided to keep the login functionality limited to email and password, but we wanted to have posts display the author's name. We added "name" as a document required upon sign up.
  1. CRUD and test authorization.
2. (HK & ED) Create collection for blog posts, build model and routes.
  1. CRUD and test blog posts.
3. (KR & HB) Create collection for comments, build model and routes.
  1. CRUD and test comments.

##### Front End Schedule:
1. (KR & HB) Authorization template.
2. (HK & ED) Index template - viewing all posts. Viewing individual posts was secondary goal.
  1. API, event functions and handlers, UI and messaging.
3. (HK & ED) "Create New Post" form template.
  1. API, event functions and handlers, UI and messaging.
4. (KR & HB) "Update a Post" form template available to users on their respective posts and comments.
  1. API, event functions and handlers, UI and messaging.
5. (KR & HB) "Delete a Post" button available to users on their respective posts and comments.
  1. API, event functions and handlers, UI and messaging.

##### Stretch Goals:
1. Adding "likes."
2. Adding images and/or avatars.
3. Adding tags.
4. Adding search.
5. Adding followers.

In general, our actual process stayed pretty close to the schedule and assignments that we set. By about halfway through our second day, we had begun to split up and work on tasks individually. However, we remained in close communication and collaborated on tackling issues throughout the entire project.

As much as we like to think we're a dream team, we obviously ran into some issues along the way! Some problems we overcame include (but aren't limited to):
1. Naming issues. We originally named our primary collection "post" with a document of "body" - then realized that might cause some problems with functionality, if not just readability confusion. We modified our collection to "blogPost" and the document to "postBody."
2. Ownership. We had some trouble figuring out how to restrict editability of posts and comments to those that a given user created. We solved this by creating a new document.
3. Association between posts and comments. We solved this by making comments a document as an array within blogPosts. This is probably the biggest difference between our original plan and our final product.
4. Posts were displaying in blocks of text without line breaks that the user had included while writing. We solved this with simple CSS.
5. "Read More/Show Less" feature for posts. We found a node package that seemed like the perfect fit for accomplishing this goal, but a recent jQuery update removed the selector that the package functioned on. Holly solved this problem by crafting a couple of new methods.

##### Future Iterations
We were able to accomplish several of our stretch goals, but a couple of things that we did not get to were functionality to view a single post, search posts, or tags for posts.

[Front and Back End deployed sites]

[Back end](https://stormy-reaches-73065.herokuapp.com/)

[Front end](https://hollyklose.github.io/Talk-To-The-Duck-client/)



[Front End Repository](https://github.com/hollyklose/Talk-To-The-Duck-client)

[Back End Repository](https://github.com/hollyklose/Talk-To-The-Duck-API)


Wireframe:

![Wireframe](./public/wireframetttd.jpg)

Background Photo Credit:

[CC BY 3.0](https://en.wikipedia.org/w/index.php?curid=14230777)
