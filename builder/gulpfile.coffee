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
        styles : "../src/assets/styles/**/*.styl"
        scripts: "../src/assets/scripts/**/*.coffee"
        images: "../src/assets/images/*.*"

    built :
        styles: "../built/assets/styles"
        scripts: "../built/assets/scripts"
        images: "../built/assets/images"


# Если случается ошибка при работе галпа, воспроизводтся звук
consoleErorr = (err) ->
    gutil.beep()
    console.log(err)

    return

# Таски

# Генерация спрайтов
buildSprite = ->
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
        })

    spriteData.img.pipe(gulp.dest(paths.built.images)); # путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(paths.src.sprite)); # путь, куда сохраняем стили

# Компиляция coffee в js
gulp.task 'coffee', ->
    gulp.src paths.src.scripts
        .pipe plumber({
            errorHandler: consoleErorr
        })
        .pipe coffee({bare: true})
        .pipe gulp.dest paths.built.scripts

# Компиляция stylus в css
gulp.task 'stylus', ->
    gulp.src paths.src.style
        .pipe plumber({
            errorHandler: consoleErorr
        })
        .pipe stylus()
        .pipe gulp.dest paths.built.styles

# Копирования картинок из src в built
gulp.task 'images', ->
    gulp.src paths.src.images
        .pipe gulp.dest paths.built.images

gulp.task 'watch', ->
    gulp.watch paths.src.scripts, ['coffee']
    gulp.watch paths.src.styles, ['stylus']
    gulp.watch paths.src.images, ['images']

    return

gulp.task 'default', ['coffee', 'stylus', 'images', 'watch']

