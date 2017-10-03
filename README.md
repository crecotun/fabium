Front-end automated boilerplate
====================

## How to use
1. Install deps `npm i`
2. Run `npm run prepare`
3. all tasks should be started via npm. e.g. `npm run gulp`, `npm run gulp dev`.
	It looks a bit ugly, but this is the only way to work with 4 ver of gulp until it'll be finally released.

## So, what do we have under the hood for now?
- pug -> html
- sass -> postcss -> css
- browsersync
- autoprefixer
- es2015 compilation
- watch 'n compile
- generator for styles and templates

Boilerplate for UI development

## Навигация
* [What is this?](#What is this)
* [Installation](#Installation)
* [Что в мешке?](#Что-в-мешке)
    * [Сборщик проекта](#Сборщик-проекта)
    * [Автоматизированные задачи](#Автоматизированные-задачи)
    * [Файловая структура](#Файловая-структура)
* [Как все работает?](#Как-все-работает)
    - [Задачи](#Задачи)
    - [Группы задач](#Группы-задач)
* [TODO](#TODO)

## What is this?
This is a boilerplate for reducing amount of routine tasks in UI development.
The boilerplate is built based on my experience and needs, so I don't guarantee it will be useful for you as is. You can use it as an example and modify it or build your own.

## Intallation
- Download and install [node.js](https://nodejs.org/)
- Clone this repository and remove `.git` in order to connect your own git repository later
- Install all dependencies `npm i`
- Run `npm run prepare`

## Что в мешке?

### Автоматизированные задачи
- Компиляция es2015
- Компиляция [Jade](http://jade-lang.com/)-шаблонов
- PostCSS с синтаксисом sugarss
- Добавление вендорных префиксов к свойствам
- Минификация css и js
- Оптимизация картинок
- авто-обновление браузера
- подготовка стилей `rtl`
- загрузка зависимостей js через npm
- загрузка файлов на сервер по ssh
- Валидация html на w3c
- архивирование файлов `dist` и `src` папок
- слежение за изменениями файлов
- генерация файлов стилей и шаблонов
- stylelint

### PostCSS plugins
- sugarss
- postcss-scss
- postcss-import
- precss
- postcss-inline-svg
- postcss-assets
- postcss-svgo
- postcss-hexrgba
- postcss-sass-color-functions
- postcss-short
- autoprefixer

### Файловая структура

- `gulpfile.js` — папка в которой лежит `gulpfile` и таски.
- `src` — исходные файлы проекта
- `dist` — результат билда

**Содержимое папки `src`**
- `assets`
	+ `styles` — стили проекта
		- `common`
		- `components`
		- `helpers`
	+ `images` — картинки проекта, включая `content` папку для картинок в контенте
	+ `scripts` — скрипты
- `templates`
	+ `pages` — шаблоны страниц
	+ `components` — блоки из которых будут собираться страницы.
	+ `partials`
	+ `layout`

## Как все работает?
В `gulpfile.js/index.js` описаны таски, которые выполняют те или иные действия. Таски можно вызывать по отдельности и группами. Вызов группами — самый частый юзкейс.
Все `gulp`-плагины загружаются автоматически из `package.json` с помощью плагина `gulp-load-plugins`. Это позволяет уменьшить объем `gulpfile`.
`Gulp` в процессе работы берет файл из 1 папки, выполняет с ним необходимые операции и сохраняет в другой папке. Для удобства, все пути к файлам я вынес в переменные и храню их в файле `config.json`.

### Генератор файлов
В процессе работы много времени уходит на создание файлов для компонентов и страниц. Я решил это дело автоматизировать.
Теперь одной командой `npm run add` можно создать:
- стиль для компонента
- миксин
- шаблон для компонента
- и страницу

При создании стиля для компонента, можно создать файл для респонсив версии, и все это автоматически подключится в main.sass
При создании новой страницы, она добавится в список всех страниц в файле index.pug

### Задачи
Все задачи запускаются посредством npm scripts.

#### NPM
- `npm start` — запуск `gulp dev`. Чтобы запустить browsersync на другом порту, можно писать `PORT=8080 npm start`
- `npm run production` — запуск `gulp production`
- `npm run deploy` — запуск `gulp deploy`
- `npm run validate` — запуск `gulp validate`
- `npm run minify` — запуск `gulp minify`
- `npm run add` — запуск генератора файлов

#### Gulp

##### Отдельные
- `styles` — компиляция sass
- `styles:min` — минификация `csso`
- `styles:rtl` — вариант стилей справа-налево
- `scripts` — компиляция es2015
- `scripts:min` — минификация js
- `images` — перенос картинок из `src` в `dist`
- `images:min` — оптимизация картинок в `dist`
- `templates` — компиляция jade-шаблонов
- `sprites` — сборка спрайтов
- `watch` — слежение за изменениями файлов
- `browsersync` — автообновление в браузере
- `archive` — архивация `dist` и `src` папок
- `archive:dist` — архивация `dist`
- `archive:src` — архивация `src`
- `ssh` — запуск задач `ssh:clean`, `ssh:upload`, `ssh:unzip`
- `ssh:clean` — заходит на сервер, чистит папку проекта
- `ssh:upload` — загружает на сервер архив `dist` папки
- `ssh:unzip` — распаковывае на сервере `dist` архив и удаляет его
- `w3c:html` — валидация html кода

##### Группы
- `default` — `bower`, `images`, `styles`, `scripts`, `templates`, `sprites`
- `dev` — `default`, `browsersync`, `watch`
- `minify` — `images:min`, `styles:min`, `scripts:min`
- `production` — `default`, `styles:rtl`, `minify`
- `deploy` — `production`, `archive`, `ssh`
- `validate` — `w3c:html`
