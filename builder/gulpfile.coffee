gulp = require 'gulp'
gutil = require 'gulp-util'
plumber = require 'gulp-plumber'
stylus = require 'gulp-stylus'
coffee = require 'gulp-coffee'
spritesmith = require 'gulp.spritesmith'
jade = require 'gulp-jade'
imagemin = require 'gulp-imagemin'

# Пути к файлам/папкам
paths =
    src :
        path: "../src/"
        styles:
            main: "../src/assets/styles/main.styl"
            watch : "../src/assets/styles/**/*.styl"

        sprites:
            images: "../src/assets/images/sprite/*"
            style: "../src/assets/styles/common/"

        scripts:
            local: "../src/assets/scripts/**/*.coffee"
            vendor: "../src/assets/scripts/vendor/**/*.js"

        images: "../src/assets/images/**/*.*"

        templates:
            path: '../src/templates/**/*.jade'
            blocks: '../src/templates/blocks/**/*.jade'
            pages: '../src/templates/pages/**/*.jade'

    built :
        path: "../built/"
        styles: "../built/assets/styles"
        scripts: 
            local: "../built/assets/scripts"
            vendor: "../built/assets/scripts/vendor/"
        images: "../built/assets/images"


# Если случается ошибка при работе галпа, воспроизводтся звук
consoleErorr = (err) ->
    gutil.beep()
    console.log(err)

    return


## Таски

# Генерация спрайтов
gulp.task 'sprite', ->
    spriteData = gulp.src paths.src.sprites.images
        .pipe spritesmith
            imgName: 'sprite.png'
            cssName: 'sprite.styl'
            padding: 2
            cssFormat: 'stylus'
            algorithm: 'binary-tree'
            cssTemplate: 'stylus.template.mustache'
            cssVarMap: (sprite) ->
                sprite.name = 's-' + sprite.name
                return

    spriteData.img.pipe(gulp.dest(paths.built.images)); # путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(paths.src.sprites.style)); # путь, куда сохраняем стили

    return

# Компиляция coffee в js
gulp.task 'coffee', ->
    gulp.src paths.src.scripts.local
        .pipe plumber
            errorHandler: consoleErorr
        .pipe coffee
            bare: true
        .pipe gulp.dest paths.built.scripts.local

# перенос скриптов из папки вендор в built
gulp.task 'vendor', ->
    gulp.src paths.src.scripts.vendor
        .pipe gulp.dest paths.built.scripts.vendor

# Компиляция stylus в css
gulp.task 'stylus', ->
    gulp.src paths.src.styles.main
        .pipe plumber
            errorHandler: consoleErorr
        .pipe stylus()
        .pipe gulp.dest paths.built.styles

# Копирования картинок из src в built
gulp.task 'images', ->
    gulp.src paths.src.images
        .pipe gulp.dest paths.built.images

# Оптимизация картинок
gulp.task 'images:min', ->
    gulp.src paths.built.images
        .pipe gulp.dest paths.built.images


# Генерирование jade шаблонов
# Генерируется только папка pages
gulp.task 'jade', ->
    gulp.src paths.src.templates.pages
        .pipe plumber
            errorHandler: consoleErorr
        .pipe jade
            pretty: true
        .pipe gulp.dest paths.built.path

# Генерация сжатого html
gulp.task 'jade:min', ->
    gulp.src paths.src.templates.pages
        .pipe plumber
            errorHandler: consoleErorr
        .pipe jade()
        .pipe gulp.dest paths.built.path


# Отслеживанием изменение файлов
gulp.task 'watch', ->
    gulp.watch paths.src.scripts.local, ['coffee']
    gulp.watch paths.src.scripts.vendor, ['vendor']
    gulp.watch paths.src.styles.watch, ['stylus']
    gulp.watch paths.src.images, ['images']
    gulp.watch paths.src.sprites.images, ['sprite']
    gulp.watch paths.src.templates.path, ['jade']

    return

# Выполнение всех тасков на продакшене или для продакшена
gulp.task 'default', ['coffee', 'vendor', 'sprite', 'stylus', 'images', 'jade']

# Таски для выкатывания на продакшн. Генерация всех стилей, скриптов, картинок и последующая оптимизация
gulp.task 'prod', ['coffee', 'vendor', 'sprite', 'stylus', 'images', 'jade:min', 'css:min', 'js:min', 'images:min']

# Dev таск для разработки с отслеживанием измнений файлов и компиляцией их на лету
gulp.task 'dev', ['coffee', 'vendor', 'sprite', 'stylus', 'images', 'jade', 'watch']
