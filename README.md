# NiirShops

A fullstack web Application that locates nearby shops.

## Present Features
-A user can sign up using a username and a password  
-A user can sign in using his username and password  
-A user can browse through nearby shops sorted by distance  
-A user can browse through his preferred shops  
-A user can like/add a shop to his preferred list  
-A user can dislike a shop to hide it for 2 hours (well actually it's 10 secs for demonstration purposes)  
-A user can remove a shop from his preferred list

## Technologies
This application is made using the MEAN stack "Mongodb Express Angular Nodejs"   
Besides the main technologies we used ipapi.co api to dynamicaly get the user's location

## Important Note
This app is using the Geolocalisation(latitude and latitude) to calculate distances  
Do not reload the application pages cuz user data will be lost (waiting for enhancement)

## Missing Features
well.. we need only to wait for further developpement thoughts

## Details
### Operational
This application permits a user to authenticate using a username and a password to see the available shops
sorted by distance. The distance is calculated using mathematical equations on the real latitude and longitude
of the shops to make it easier to integrate with geolocation apis such as google places and so on.  
The user then can like a shop to add it to his preferred shops list, as well as he can dislike it to hide it for a certain amount of time (10 seconds in our case for demonstration purposes).  
In case the user added some shops to his preferred shops list, he can remove them from ther as well.  

### Choices I made
I could have gone with a radius parameter to show only nearby shops depending on the dinamically fetched user location, BUT i had already started with an architecture that is suitable for google-places-web api (has already a radius param) and i couldn't change much when i figured the horrible limit of requests quota of the service.  
And this doesn't go for only the radius but also the shops as they are hard coded in the database and not fetched dynamically depending on the user's location or using an api, thus they are only arbitraty places with real longitude and latitude coordinates.(but it will later)  
  
This application has weak security management (no tokens no hash and salt for passwords no protection vs sql injections) because i only wanted to bring the MVP as soon as possible and then progressively polish the application features by time. so if you are testing the app **DO NOT RELOAD THE PAGE (OR USE BACKWAR/FORWARD ARROW) UNLESS YOU WANT TO LOGOUT**

## how to run the app
### 1) installing packages
a-Open a cmd/terminal in NodeApp and another one in AngularApp.  
b-In both type **"npm install"** and then press enter.  
### 2) After the installation is finished  
a-in NodeApp's cmd/terminal type **"node server.js"** and then press enter.  
b-in AngularApp's cmd/terminal type **"ng serve -o"** and then press enter.  
### 3) Testing(optional)
-If you want to really test the localisation functionnality run a vpn on your computer on china or america and see how the fetched data will get sorted (after re-login of course).  
--just be sure to run a vpn on your system and not the browser, because node is the one handeling the localisation api and node doesn't run on the browser.

## Further thoughts
-enhance security of authentication through JWT and use sessions  
-Implementing google places Api to dynamically get real life nearby shops
