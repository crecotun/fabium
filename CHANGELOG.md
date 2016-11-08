### 2.5.0
- moved PostCSS plugins list from globals to tasks/styles.js
- prevent falling gulp watch when postcss catch an error, by adding `this.emit('end');` to plumber handler
- added postcss-assets

### 2.4.0
- added eslint

### 2.3.0
- gulp-hub for tasks loading
- gulp-newer for `images`
- `tasks/zip.js` -> `tasks/archive.js`
- grouped tasks moved to `tasks/task_groups.js`

### 2.2.0
- removed `bower` task, `bower.json` and `.bowerrc`
- added webpack
- removed `scripts:min` task
- `npm run prod` changed to `npm run production`
- removed `npm run dev`, now you should use only `npm start`

### 2.1.0
- Added .editorconfig

### 2.0.0
- Sass -> PostCSS (with sugarss parser and precss, postcss-import, postcss-hexrgba, postcss-inline-svg, postcss-inline-comment, postcss-svgo, postcss-short, postcss-sass-color-functions)
- jade -> pug
- disabled `sprites` task

### 1.8.0
- Russian readme wip

### 1.7.1
- deploy, rlt fixes

### 1.7
- w3c html validation via `gulp-w3cjs`

### 1.6
- added `gulp-imagemin` and `gulp-csso`

### 1.5
- `deploy` task connects to remove server via ssh, clears folder and uploads files.
- `archive:dist`, `archive:src` — tasks for archive folders with files.

### 1.4
- `gulp-rtlcss` support
- `autoprefixer` via `gulp-postcss`
- `autoprefixer` was removed as separate task, now it's inside `styles` task
- removed `parallel` tasks

### 1.3
- `stylus` replaced with `sass`

### 1.2
- added `jade-inheritance`

### 1.1
- added `browsersync`

### 1.0.1
- added option `since`, to prevent processing unchanged files.

### 1.0.0
- gulp 4
- removed `builder folder`
- splitted all tasks in files
- CoffeeScript -> ES2015
- `gulp-autoprefixer` -> `postcss` + `autoprefixer`
- updated `spritesmith` version

### 0.0.3
- moved all to `devDependencies`
- updated babel to 6 version
- added `.babelrc`
- renamed `config.yml` to `gulp-config.json`

### 0.0.2
Moved gulpfile to ES2015
