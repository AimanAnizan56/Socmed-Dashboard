// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass')); // to compile sass
const postcss = require('gulp-postcss'); // plugin
const autoprefixer = require('autoprefixer'); // add browser prefixer to support older browser
const cssnano = require('cssnano'); // minify css file
const babel = require('gulp-babel'); // compile modern js (es6 above) to older version to support older browser
const terser = require('gulp-terser'); // minify js file
const browsersync = require('browser-sync').create();

// Use dart-sass for @use
// sass.compiler = require('dart-sass'); // use dart sass as compiler

// Sass Task -- compile sass file
function scssTask() {
    return src('src/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// Javascript Task -- compile js file
function jsTask() {
    return src('src/js/script.js', { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync -- local server
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
}
// to reload browser
function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task -- if detect change, run browserSyncReload
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(['src/scss/**/*.scss', 'src/**/*.js'], series(scssTask, jsTask, browserSyncReload));
}

// Default Gulp Task -- run when typing 'gulp' in command line
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
