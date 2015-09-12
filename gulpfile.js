var gulp = require('gulp'),
		minifyCss = require('gulp-minify-css'),
		concatCss = require('gulp-concat-css'),
		clean = require('gulp-clean'),
		gulpif = require('gulp-if'),
		stripCssComments = require('gulp-strip-css-comments'),
		concat = require('gulp-concat'),
		useref = require('gulp-useref'),
		uglify = require('gulp-uglify');

/* Moved folder with images & fonts */
var filesToMove = [
    'development/img/**/',
    'development/fonts/**/'
  ];
 

/* Clean production folder */
gulp.task('clean', function () {
  return gulp.src('production/**', {read: false})
    .pipe(clean());
});


/* Minify & Concat Js */ 
gulp.task('minify-js', function() {
  return gulp.src('development/js/*.js')
    .pipe(uglify())
    .pipe(concat('base.min.js'))
    .pipe(gulp.dest('production/js'));
});


/* Minify & Concat Css */
gulp.task('minify-css', function() {
  return gulp.src('development/css/*.css')
    .pipe(concatCss("base.min.css"))
    .pipe(stripCssComments({preserve: false}))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('production/css'));
});


/* Move folder with images & fonts */
gulp.task('move-files', function() {
  gulp.src(filesToMove, { base: 'development/' })
  .pipe(gulp.dest('production/'));
});


/* Gulp watcher */
gulp.task('watch', function(){
  gulp.watch('development/css/*.css', ['minify-css']);
});


/* Build production version */
gulp.task('build', ['clean'], function() {
	var assets = useref.assets();

	gulp.run('move-files');

	return gulp.src('development/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('production'));
});


/* Default task */
// gulp.task('default', ['watch']);
gulp.task('default', function() {
	// gulp.run('minify-js', 'minify-css');
});  