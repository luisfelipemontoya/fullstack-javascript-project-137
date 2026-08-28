# RSS Reader

RSS Reader es una aplicación web que permite agregar fuentes RSS y consultar sus publicaciones desde una única interfaz.

## Funcionalidades

* Agregar fuentes RSS mediante su URL.
* Validar la URL ingresada.
* Evitar agregar una fuente RSS duplicada.
* Mostrar las fuentes RSS registradas.
* Mostrar las publicaciones de cada fuente.
* Actualizar automáticamente las fuentes cada 5 segundos.
* Detectar y mostrar nuevas publicaciones.
* Marcar las publicaciones visualizadas.
* Mostrar una vista previa de cada publicación mediante un modal de Bootstrap.
* Mostrar mensajes de éxito y error mediante i18next.

## Tecnologías

* JavaScript
* Vite
* Bootstrap
* Valtio
* i18next
* Axios
* UUID

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/luisfelipemontoya/fullstack-javascript-project-137.git
cd fullstack-javascript-project-137
npm install
```

## Ejecución

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en la dirección indicada por Vite, normalmente:

```text
http://localhost:5173/
```

## Build

Para generar la versión de producción:

```bash
npm run build
```

## Verificaciones

El proyecto utiliza ESLint y las comprobaciones automatizadas de Hexlet.

Para ejecutar el linter:

```bash
npm run lint
```

## Aplicación desplegada

**URL:** fullstack-javascript-project-137-steel.vercel.app

## Estado del proyecto

Proyecto desarrollado como parte del programa Fullstack JavaScript de Hexlet.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000.svg?logo=vercel\&style=flat)](fullstack-javascript-project-137-steel.vercel.app)

### Hexlet tests and linter status:
[![Actions Status](https://github.com/luisfelipemontoya/fullstack-javascript-project-137/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/luisfelipemontoya/fullstack-javascript-project-137/actions)

## CI badge  (lint + build)
[![CI](https://github.com/luisfelipemontoya/fullstack-javascript-project-137/actions/workflows/build.yml/badge.svg)](https://github.com/luisfelipemontoya/fullstack-javascript-project-137/actions/workflows/build.yml)

## SonarQube Cloud
[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=luisfelipemontoya_fullstack-javascript-project-137)
