##################################################################################
##### Зависимости
##################################################################################

# node modules
fs = require 'fs'
yaml = require 'js-yaml'

# gulp modules
gulp = require 'gulp'
gutil = require 'gulp-util'
plumber = require 'gulp-plumber'
stylus = require 'gulp-stylus'
coffee = require 'gulp-coffee'
spritesmith = require 'gulp.spritesmith'
jade = require 'gulp-jade'
imagemin = require 'gulp-imagemin'
pngcrush = require 'imagemin-pngcrush'
minifyCSS = require 'gulp-minify-css'
uglify = require 'gulp-uglify'
autoprefixer = require 'gulp-autoprefixer'

# config.yml file
config = yaml.load(fs.readFileSync("config.yml", "utf8"))


##################################################################################
##### Функции-помощники
##################################################################################

# Если случается ошибка при работе галпа, воспроизводтся звук
consoleErorr = (err) ->
    gutil.beep()
    console.log err.message

    return


##################################################################################
##### Таски
##################################################################################

# Генерация спрайтов
gulp.task 'sprite', ->
    spriteData = gulp.src config.paths.src.sprites.images.all
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

    spriteData.img.pipe(gulp.dest(config.paths.built.images.path)); # путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(config.paths.src.sprites.style)); # путь, куда сохраняем стили

    return

# Компиляция coffee в js
gulp.task 'coffee', ->
    gulp.src config.paths.src.scripts.local.all
        .pipe plumber
            errorHandler: consoleErorr
        .pipe coffee
            bare: true
        .pipe gulp.dest config.paths.built.scripts.local.path

# перенос скриптов из папки вендор в built
gulp.task 'vendor', ->
    gulp.src config.paths.src.scripts.vendor.all
        .pipe gulp.dest config.paths.built.scripts.vendor.path

gulp.task 'scripts', ['coffee', 'vendor']

# Компиляция stylus в css
gulp.task 'stylus', ->
    gulp.src config.paths.src.styles.main
        .pipe plumber
            errorHandler: consoleErorr
        .pipe stylus()
        .pipe gulp.dest config.paths.built.styles.path

# Копирования картинок из src в built
gulp.task 'images', ->
    gulp.src [config.paths.src.images.all, '!'+config.paths.src.sprites.images.all]
        .pipe gulp.dest config.paths.built.images.path

# Генерирование jade шаблонов
# Генерируется только папка pages
gulp.task 'jade', ->
    gulp.src config.paths.src.templates.pages.all
        .pipe plumber
            errorHandler: consoleErorr
        .pipe jade
            pretty: true
        .pipe gulp.dest config.paths.built.path

# Добавление вендорных префиксов
gulp.task 'autoprefixer', ->
    gulp.src config.paths.built.styles.all
        .pipe autoprefixer()
        .pipe gulp.dest config.paths.built.styles.path


##################################################################################
##### Такси оптимизации
##################################################################################

# Оптимизация скриптов
gulp.task 'scripts:min', ->
    gulp.src config.paths.built.scripts.all
        .pipe plumber
            errorHandler: consoleErorr
        .pipe uglify()
        .pipe gulp.dest config.paths.built.scripts.path

# Оптимизация картинок
gulp.task 'images:min', ->
    gulp.src config.paths.built.images.all
        .pipe plumber
            errorHandler: consoleErorr
        .pipe imagemin
            progressive: true
            svgoPlugins: [
                removeViewBox: false
            ]
            use: [
                pngcrush()
            ]
        .pipe gulp.dest config.paths.built.images.path

gulp.task 'styles:min', ->
    gulp.src config.paths.built.styles.all
        .pipe plumber
            errorHandler: consoleErorr
        .pipe minifyCSS()
        .pipe gulp.dest config.paths.built.styles.path


# Отслеживанием изменение файлов
gulp.task 'watch', ->
    gulp.watch config.paths.src.scripts.local.all, ['coffee']
    gulp.watch config.paths.src.scripts.vendor.all, ['vendor']
    gulp.watch config.paths.src.styles.all, ['stylus']
    gulp.watch config.paths.src.images.all, ['images']
    gulp.watch config.paths.src.sprites.images.all, ['sprite']
    gulp.watch config.paths.src.templates.all, ['jade']

    return


##################################################################################
##### Таски по группам
##################################################################################

# Выполнение всех тасков
gulp.task 'default', ['sprite', 'stylus', 'scripts', 'images', 'jade']

# Dev таск для разработки с отслеживанием измнений файлов и компиляцией их на лету
gulp.task 'dev', ['default', 'watch']

# минификация js, css и оптимизация изображений.
gulp.task 'minify', ['scripts:min', 'styles:min', 'images:min']

# Подготовка проекта для продакшена. Исполнение всех задах + минификация файлов
# TODO: Реализовать нормальную синхронность выполнения. Сейчас синхронность реализуется с устаревшим gulp.run
gulp.task 'prod', ['default', 'autoprefixer'], ->
    gulp.run 'minify'
