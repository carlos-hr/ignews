

<h1 align="center">
      <a href="https://ignews-carlos-hr.vercel.app/" alt="site do ecoleta"> Ignews </a>
</h1>

<h3 align="center">
    News about the <span color="#61dafb">React</span> world.
</h3>


Summary
=================
<!--ts-->
   * [About the Project](#About-the-Project)
   * [Features](#features)
   * [Layout](#layout)
   * [Getting Started](#getting-started)
     * [Requirements](#requirements)
     * [Running the application](#running-the-application)
   * [Technologies](#-echnologies)
     * [WebSite](#user-content-website--react----typescript)
<!--te-->


## 💻 About the Project

  Ignews is a project developed with Nextjs during Rocketseat's Ignite course, which aims to simulate a page that provides news by subscription, where once subscribed you can follow the published content, and if you are not subscribed you can see previews of the news.
The project relies on GitHub authentication and also uses stripe in test mode to intermediate payments.

---


## ⚙️ Features

 - [x] Backend in frontend through:
  - [x] Using API routes and next auth to make the authentication
  - [x] Using FaunaDB as a serverless database
  - [x] Using stripe and webhooks to receive payments
 - [x] Easy creation of content through Prismic as CMS
 - [x] Use of Server Side Rendering and Static Site Genartion to improve user experience

---

## 🎨 Layout

The application layout is available in figma:

<a href="https://www.figma.com/file/wAYpXQptv8pmvHe9TGs9AA/ig.news?node-id=1%3A2">
  <img alt="Made by carlos" src="https://img.shields.io/badge/See%20Layout%20in%20-Figma-%2304D361">
</a>

### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="Home" src="https://user-images.githubusercontent.com/81276751/177615316-d6aa3724-5e07-4063-8525-6dd1852f68ab.png" width="400px">
  <img alt="Posts" src="https://user-images.githubusercontent.com/81276751/177615582-fe926796-1a8a-45de-9235-f4d1c9c9028b.png" width="400px">
  <img alt="Full Post" src="https://user-images.githubusercontent.com/81276751/177616098-95ab5b71-c5cd-410d-9009-e51328e9f8e2.png" width="400px">
  <img alt="Postpreview" src="https://user-images.githubusercontent.com/81276751/177615851-a53af21c-5238-490e-b7ba-fa4fcddb44bc.png" width="400px">
</p>

---

## 🚀 How to run the project:

### Pré-requisitos

Before you start, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com).
Besides this, it is good to have an editor to work with the code, such as [VSCode](https://code.visualstudio.com/)

#### 🧭 Running the Web Application
  
  After clone the project in your machine, you can run the development server, once you enter the project's folder you just need to run:
```bash

$ npm install
# To install the dependencies

$ npm run start
# To start the application


# Open http://localhost:3000 with your browser to see the result.

```

---

## 🛠 Technologies

The following tools were used in the construction of the project:

#### **Website**  ([Next](https://reactjs.org/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **Axios**
-   **FaunaDB**
-   **Prismic**
-   **React Icons**
-   **SASS/SCSS**
-   **Stripe** 

## Deploy on Vercel

The application is deployed with vercel in the link https://ignews-carlos-hr.vercel.app/
