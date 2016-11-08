Front-end automated boilerplate
====================

## How to use
1. install deps `npm i`
2. all tasks should be started via npm. e.g. `npm run gulp`, `npm run gulp dev`.
	It looks a bit ugly, but this is the only way to work with 4 ver of gulp until it'll be finally released.

## So, what do we have under the hood for now?
- pug -> html
- postcss -> css
- browsersync
- autoprefixer
- bower
- es2015 compilation
- watch 'n compile

Автоматизированный шаблон для быстрого старта front-end разработки

## Навигация
* [Для чего все это?](#Для-чего-все-это)
* [Установка](#Установка)
* [Что в мешке?](#Что-в-мешке)
    * [Сборщик проекта](#Сборщик-проекта)
    * [Автоматизированные задачи](#Автоматизированные-задачи)
    * [Файловая структура](#Файловая-структура)
* [Как все работает?](#Как-все-работает)
    - [Задачи](#Задачи)
    - [Группы задач](#Группы-задач)
* [TODO](#TODO)

## Для чего все это?
Этот шаблон, в первую очередь, предназначен для автоматизации рутинных задач в процессе верстки. Он не подойдет для разработки приложений на ReactJS или Angular, но отлично потянет простую верстку с вкраплениями JavaScript функционала.

Шаблон собран на основе моего опыта и потребностей, поэтому я не обещаю, что он может быть полезен вам в первоначальном виде, но его можно использовать как наглядный пример и дорабатывать под свои нужды.

## Установка
- Скачать и установить [node.js](https://nodejs.org/)
- Склонировать этот проект и удалить `.git`, чтобы привязать свой гит репозиторий
- установить все зависимости `npm i`
- сохранить файл `gulpfile.js/tasks/ssh.json.example` как `ssh.json` со своими данными

## Что в мешке?

### Автоматизированные задачи
- Компиляция es2015
- Компиляция [Jade](http://jade-lang.com/)-шаблонов
- Компиляция Sass
- Сборка спрайтов и генерация стиля для них. Я писал [статью](http://habrahabr.ru/post/227945/) о том, как это все работает.
- Добавление вендорных префиксов к свойствам
- Минификация css и js
- Оптимизация картинок
- авто-обновление браузера
- подготовка стилей `rtl`
- загрузка зависимостей js через bower
- загрузка файлов на сервер по ssh
- Валидация html на w3c
- архивирование файлов `dist` и `src` папок
- слежение за изменениями файлов

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

### Задачи
Все задачи запускаются посредством npm scripts.

#### NPM
- `npm start` — запуск `gulp dev`. Чтобы запустить browsersync на другом порту, можно писать `PORT=8080 npm start`
- `npm run prod` — запуск `gulp production`
- `npm run deploy` — запуск `gulp deploy`
- `npm run validate` — запуск `gulp validate`
- `npm run minify` — запуск `gulp minify`

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
- `bower` — загрузка bower зависимостей
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
