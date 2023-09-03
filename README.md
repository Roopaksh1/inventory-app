<div align=center>
<h1 align=center>InStock</h1>
<p>An inventory management app. It has product and category management with CRUD Operation.<br> <b>Live 👇</b><p>
<a href=https://instockapp.netlify.app/><img src=https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white>
</div></a>

<div align=center>
  <img src="screenshots/home.png" width="720"/>
</div>

## Built With

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Features

### Product And Category Management

Perform actions like add, edit and delete the product from the dashboard. If there is no product inside the category then the category will be removed. All form data gets validated with the express-validator library. Images are handled with cloudinary.

### User Authentication

Authentication is done using jsonWebToken, passportjs and bcryptjs packages. Password is hashed using bcryptjs before saving in database. All products are linked with the user so that each user only has access to their products. 

## Installation

To get a local copy up and running follow these simple example steps.

1. Clone the Repo

```
git clone git@github.com:Roopaksh1/online-tic-tac-toe.git
```

2. Install the dependencies

```
cd frontend
npm install

cd backend
npm install
```

3. To run this project, you will need to add the following environment variables to your .env file

```
Inside backend
PORT
MONGODB_URI
CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

Inside frontend
VITE_API_URL
```

4. Run the server

```
cd backend
node index.js
```

5. Run the client

```
cd frontend
npm run dev
```

Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/)

## Screenshots

<div align=center>
  <img src="screenshots/mobile-home.png" height="400"/>
  <br/>
  <img src="screenshots/dashboard.png" width="720"/>
</div>
