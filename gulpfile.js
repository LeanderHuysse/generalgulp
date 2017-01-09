/**
 * DO NOT EDIT BELOW
 */

var options = require('./gulpconfig.js');

/**
 * Utility functions
 */

function silent() {
  this.emit('end');
}

function getOpt(option, modifier) {
  return (options.settings[modifier][option]) ? options.settings[modifier][option] : false;
}

function getEnv(option, modifier) {
  return (options.directories[modifier][option]) ? options.directories[modifier][option] : false;
}

try {
  require.resolve('gulp-sass');
} catch(e) {
  console.error('++++++++++++++++++++++++++++++++++++++++++++++');
  console.error('Please run `npm install` in this folder first!');
  console.error('++++++++++++++++++++++++++++++++++++++++++++++');
  process.exit(e.code);
}

var gulp        = require('gulp');
var imageMin    = require('gulp-imagemin');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps  = require('gulp-sourcemaps');
var styleLint   = require('gulp-stylelint');
var concat      = require('gulp-concat');
var cssNano     = require('gulp-cssnano');
var cache       = require('gulp-cache');
var autoPrefixer= require('gulp-autoprefixer');
var notify      = require('gulp-notify');
var gulpif      = require('gulp-if');

gulp.task('stylesheet', function() {
  return gulp.src(getEnv('input', 'stylesheet'))
    .pipe(gulpif(getOpt('linter', 'stylesheet'), styleLint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    })))
    .pipe(gulpif(getOpt('minify', 'stylesheet'), sourcemaps.init()))
    .pipe(autoPrefixer({
      browsers: ['> 5%'],
      cascade: false
    }))
    .pipe(sass({
      outputStyle: 'compact'
    }).on('error', notify.onError('Uh-oh, <%= error.message %>')))
    .pipe(gulpif(getOpt('minify', 'stylesheet'), cssNano()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(getEnv('output', 'stylesheet')))
    .pipe(gulpif(getOpt('notify', 'stylesheet'), notify('KA-BLAMO!, <%= file.relative %> converted.')))
    .pipe(gulpif(getOpt('enabled', 'browsersync'), browserSync.stream()));
});

gulp.task('javascript', function() {
  return gulp.src(getEnv('input', 'javascript'))
    .pipe(gulp.dest(getEnv('output', 'javascript')));
});

gulp.task('image', function() {
  return gulp.src(getEnv('input', 'image'))
    .pipe(gulpif(getOpt('minify', 'image'), cache(imageMin().on('error', silent))))
    .pipe(gulp.dest(getEnv('output', 'image')));
});

gulp.task('browsersync', function() {
  browserSync.init({
    open: 'external',
    proxy: getOpt('proxy', 'browsersync')
  });
});

var tasks = [];

Object.keys(options.settings).forEach(function(key,index) {
    if(options.settings[key].enabled === true) {
      tasks.push(key);
    }
});


gulp.task('default', tasks, function() {
  if (tasks.indexOf('stylesheet') > -1 ) {
    gulp.watch(getEnv('watch', 'stylesheet'), ['stylesheet'] )
  }
  if (tasks.indexOf('javascript') > -1 ) {
    gulp.watch(getEnv('watch', 'javascript'), ['javascript'] )
  }
  if (tasks.indexOf('browsersync') > -1 ) {
    gulp.watch(getEnv('watch', 'template'), browserSync.reload())
  }
  if (tasks.indexOf('images') > -1 ) {
    gulp.watch(getEnv('watch', 'image'), ['image'])
  }
});
