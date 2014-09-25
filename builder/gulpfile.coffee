gulp = require 'gulp'
gutil = require 'gulp-util'
plumber = require 'gulp-plumber'
stylus = require 'gulp-stylus'
coffee = require 'gulp-coffee'
spritesmith = require 'gulp.spritesmith'
prefix = require 'gulp-autoprefixer'

# Пути к файлам/папкам
paths =
    src :
        style: "../src/assets/styles/main.styl"
        styl : "../src/assets/styles/**/*.styl"
        scripts:
            local: "../src/assets/scripts/**/*.coffee"
            vendor: "../src/assets/scripts/vendor/**/*.js"
        images: "../src/assets/images/**/*.*"
        sprites: '../src/assets/images/sprite/*'
        sprite: '../src/assets/styles/common/'

    built :
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
    spriteData = gulp.src paths.src.sprites
        .pipe spritesmith({
            imgName: 'sprite.png'
            cssName: 'sprite.styl'
            padding: 2
            cssFormat: 'stylus'
            algorithm: 'binary-tree'
            cssTemplate: 'stylus.template.mustache'
            cssVarMap: (sprite) ->
                sprite.name = 's-' + sprite.name
                return
        })

    spriteData.img.pipe(gulp.dest(paths.built.images)); # путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(paths.src.sprite)); # путь, куда сохраняем стили

# Компиляция coffee в js
gulp.task 'coffee', ->
    gulp.src paths.src.scripts.local
        .pipe plumber({
            errorHandler: consoleErorr
        })
        .pipe coffee({bare: true})
        .pipe gulp.dest paths.built.scripts.local

# перенос скриптов из папки вендор в built
gulp.task 'vendor', ->
    gulp.src paths.src.scripts.vendor
        .pipe gulp.dest paths.built.scripts.vendor

# Компиляция stylus в css
gulp.task 'stylus', ->
    gulp.src paths.src.style
        .pipe plumber({
            errorHandler: consoleErorr
        })
        .pipe stylus()
        .pipe gulp.dest paths.built.styles

# Компиляция stylus в css и добавление префиксов к свойствам
gulp.task 'stylus', ->
    gulp.src paths.src.style
        .pipe plumber({
            errorHandler: consoleErorr
        })
        .pipe stylus()
        .pipe prefix({cascade: true})
        .pipe gulp.dest paths.built.styles

# Копирования картинок из src в built
gulp.task 'images', ->
    gulp.src paths.src.images
        .pipe gulp.dest paths.built.images

gulp.task 'watch', ->
    gulp.watch paths.src.scripts.local, ['coffee']
    gulp.watch paths.src.scripts.vendor, ['vendor']
    gulp.watch paths.src.styl, ['stylus']
    gulp.watch paths.src.images, ['images']
    gulp.watch paths.src.sprites, ['sprite']

    return

# Выполнение всех тасков на продакшене или для продакшена
gulp.task 'default', ['coffee', 'vendor', 'sprite', 'stylus:prod', 'images']

# Dev таск для разработки с отслеживанием измнений файлов и компиляцией их на лету
gulp.task 'dev', ['coffee', 'vendor', 'sprite', 'stylus', 'images', 'watch']
