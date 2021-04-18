<h1 align="center">
  <img alt="simple-raffle" title="simple-raffle" src=".github/quiz-lite-title.png" />
</h1>
<p align="center">
  <a href="#-techs">✨ Techs</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">💻 Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">🔖 Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-start">🚀 How to start</a>&nbsp;&nbsp;&nbsp;
</p>
<p align="center">
  <img alt="License" src="https://img.shields.io/apm/l/vim-mode?color=DB8E35">
</p>
<p align="center">
  <img width="700" src=".github/macbook-image.png" />  
</p>

## ✨ Techs

This project was created using this following technologies:

- [React](https://reactjs.org)
- [Nodejs](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## 💻 Project

This project allows you to create and play quizzes. You'll be able to create your own, play others quizzes and check the result of your own quiz. 

## 🔖 Layout

<p align="center">
  <img width="700" src=".github/home_page.png" />
</p>

<p align="center">
  <img width="700" src=".github/search_quiz.png" />
</p>

<p align="center">
  <img width="700" src=".github/search_result.png" />
</p>

<p align="center">
  <img width="700" src=".github/quiz_result.png" />
</p>

<p align="center">
  <img width="700" src=".github/quiz_player_result.png" />
</p>

<p align="center">
  <img width="700" src=".github/quiz_player_info.png" />
</p>

<p align="center">
  <img width="700" src=".github/questions.png" />
</p>

## 🚀 How to start

- Clone this repository
- Start postgres database (you'll need Docker):
  - `docker-compose up`
- Back-end:
  - `cd server`
  - `yarn typeorm:dev migration:run`
  - `yarn start:dev`
- Front-end: 
  - `cd client`
  - `yarn start`

Now you can access [`localhost:3000`](http://localhost:3000) in your browser.
