<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top" id="readme-top"></a>


<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->

<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- FUTURES
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]-->

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <a href="https://github.com/LaSalleGracia-Projectes/projecte-aplicaci-web-servidor-richard-stallman">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Diveni</h3>

<p align="center">
    Diveni backend
    <br />
    <!-- Link to Memory PDF -->
    <a href="https://github.com/LaSalleGracia-Projectes/projecte-aplicaci-web-servidor-richard-stallman"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- Link to Demo Video -->
    <a href="https://back.pollorebozado.com/">Ver Demo</a>
    ·
    <a href="https://github.com/LaSalleGracia-Projectes/projecte-aplicaci-web-servidor-richard-stallman/issues">Report Bug</a>
    ·
    <a href="https://github.com/LaSalleGracia-Projectes/projecte-aplicaci-web-servidor-richard-stallman/issues">Request Feature</a>
  </p>
</div>

[Contributors][contributors-url]
[MIT License][license-url]

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Indice</summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#contribuidores">Contribuidores</a></li>
        <li><a href="#hecho-con">Hecho con</a></li>
      </ul>
    </li>
    <li>
      <a href="#para-empezar">Para empezar</a>
      <ul>
        <li><a href="#prerequisitos">Prerequisitos</a></li>
        <li><a href="#instalacion">Instalacion</a></li>
        <li><a href="#despliegue">Despliegue</a></li>
      </ul>
    </li>
    <li><a href="#test">Test</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## Sobre el proyecto

Esta repo contiene el backend para Diveni una App de quiz multijugador en tiempo real, este solo se usara durante los juegos y para ver estadisticas de los mismos.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contribuidores

[Contributors][contributors-url]

Gerard Du Pre - [@gerardPolloRebozado](https://github.com/GerardPolloRebozado)

### Hecho con:

* [![Node.js][Node.js]][Node.js-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Socket.io][Socket.io]][Socket.io-url]
* [![Prisma][Prisma]][Prisma-url]
* [![Eslint][Eslint]][Eslint-url]
* [![MySQL][MySQL]][MySQL-url]
* [![Firebase][Firebase]][Firebase-url]
* [![Express][Express]][Express-url]

<!-- See: https://github.com/alexandresanlim/Badges4-README.md-Profile?tab=readme-ov-file#-terminal -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Para empezar

Para poder ejecutar el proyecto en local deberas seguir los siguientes pasos.

### Prerequisitos

Requirements for the software and other tools to build, test and push
Debes tener instalado el siguiente software:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

En caso de querer usar la PWA sera necesario tener un proxy con SSL como por ejemplo:
- [Caddy](https://caddyserver.com/)
- [Nginx](https://www.nginx.com/)

### Instalacion


1. Descarga el repositorio
    ```sh
    git clone https://github.com/LaSalleGracia-Projectes/projecte-aplicaci-web-servidor-richard-stallman
    ```
2. Abre la carpeta e instala los paquetes
   ```js
   npm i
   ```
3. Cambiar los valores por defecto del .env y el docker-compose.yml

### Despliegue

1. Crea el contenedor para la base de datos
   ```sh
    docker-compose up -d
   ```
2. Ejecuta las migraciones de prisma
   ```sh
   npx prisma migrate deploy
   ```
3. Introduce los datos de las diferentes preguntas de los quiz en la base de datos
   ```sh
    npm run seed
   ```
4. Compila el servidor
    ```sh
      npm run build
    ```
5. Inicia el servidor
    ```sh
      npm run start
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Test

Para ejecutar los test de Cypress debes ejecutar el siguiente comando

```sh
   npm run cypress:open
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## Licencia

[MIT License][license-url]

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Agradecimientos

Use this space to list resources you find helpful and would like to give credit to.

Gracias a estos recursos este proyecto ha sido posible

* [Choose an Open Source License](https://choosealicense.com)
* [Img Shields](https://shields.io)
* [Noje.js](https://nodejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Socket.io](https://socket.io/)
* [Prisma](https://www.prisma.io/)
* [Firebase](https://firebase.google.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/LaSalleGracia-Projectes/projecte-aplicaci-web-servidor-richard-stallman.svg?style=for-the-badge
[contributors-url]: https://github.com/LaSalleGracia-Projectes/projecte-aplicaci-web-servidor-richard-stallman/graphs/contributors
[license-shield]: https://img.shields.io/github/license/LaSalleGracia-Projectes/projecte-aplicaci-web-servidor-richard-stallman.svg?style=for-the-badge
[license-url]: https://github.com/LaSalleGracia-Projectes/projecte-aplicaci-web-servidor-richard-stallman/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
[Socket.io]: https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white
[Socket.io-url]: https://socket.io/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node.js-url]: https://nodejs.org/en/
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Eslint]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white
[Eslint-url]: https://eslint.org/
[MySQL]: https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[Firebase]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
[Express]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/



