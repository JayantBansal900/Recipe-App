# 🍳 Recipe App

A simple and responsive Recipe App built using **HTML, CSS, and JavaScript**.  
The application uses **TheMealDB API** to fetch recipes and allows users to search, explore categories, view recipe details, and discover random meals.

## ✨ Features

- 🔍 Search recipes by name
- 📂 Filter recipes by category
- 🔥 Explore popular recipe categories
- 🎲 Get a random recipe using the "Surprise Me" feature
- 📖 View complete recipe details
- 🥗 View ingredients and measurements
- 📝 View cooking instructions
- 📱 Responsive design for desktop, tablet, and mobile
- ⚡ Recipe data fetched dynamically using TheMealDB API

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- TheMealDB API
- Font Awesome

## 🌐 API Used

This project uses the free **TheMealDB API** for recipe data.

API Documentation:

https://www.themealdb.com/api.php

Base API URL:

```text
https://www.themealdb.com/api/json/v1/1
```

Some endpoints used in the project:

```text
Search Recipe:
https://www.themealdb.com/api/json/v1/1/search.php?s=chicken

Filter by Category:
https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

Recipe Details:
https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772

Random Recipe:
https://www.themealdb.com/api/json/v1/1/random.php
```

## 📂 Project Structure

```text
Recipe-App/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the structure of the application including the navigation bar, search bar, category filter, recipe cards, and recipe details popup.

### `style.css`

Contains all styling for the application including the recipe cards, navigation bar, filters, popup, hover effects, and responsive design.

### `script.js`

Contains the main application logic including API calls, recipe search, category filtering, random recipe generation, and recipe detail handling.

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git
```

### 2. Open the project folder

```bash
cd YOUR-REPOSITORY-NAME
```

### 3. Start a local server

If Python is installed:

```bash
python -m http.server 5500
```

or on some Windows systems:

```bash
py -m http.server 5500
```

### 4. Open the application

Open your browser and visit:

```text
http://localhost:5500
```

You can also open `index.html` directly in the browser, although using a local server is recommended.

## 🎯 How It Works

1. The application loads a collection of recipes when the page starts.
2. Users can search for recipes using the search bar.
3. Recipes can be filtered using the category dropdown.
4. Popular category buttons provide quick access to common categories.
5. The **Surprise Me** button fetches a random recipe.
6. Clicking **View Recipe** displays ingredients and cooking instructions in a popup.

## 📱 Responsive Design

The application is responsive and works across:

- Desktop
- Laptop
- Tablet
- Mobile devices

## 🔮 Future Improvements

Possible future improvements include:

- Add favorites using Local Storage
- Add cuisine filtering
- Add ingredient filtering
- Add dark/light theme
- Add recipe sharing
- Add pagination or infinite scrolling

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you would like to contribute:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Create a Pull Request

## 📄 License

This project is created for educational and learning purposes.

## 👨‍💻 Author

**Jayant Bansal**

Built as a frontend web development project using HTML, CSS, JavaScript, and TheMealDB API.
