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
