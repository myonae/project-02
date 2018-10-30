var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

/*var sass = require('gulp-sass');
gulp.task('sass', function() {
        return gulp.src('css/style.css')

    };)
    /*--TOP LEVEL FUNCTIONS--
    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.dest - Points to folder to output
    gulp.watch - watch files and folders for changes
    */
// Logs Message
gulp.task('message', function() {
    return console.log('Gulp is running...');
});
gulp.task('copyHtml', function() {
    gulp.src('*.html')
        .pipe(gulp.dest('dist/'));
});
// optimize images
gulp.task('imageMin', () =>
    gulp.src('assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))

);
//uglify files (compress them, minify JS)
gulp.task('minify', function() {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// compile sass
gulp.task('sass', function() {
    gulp.src('/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
});
//scripts
gulp.task('scripts', function() {
    gulp.src('/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts']);
//watch
gulp.task('watch', function() {
    gulp.watch('/js/*.js', ['scripts']);
    gulp.watch('assets/images/*', ['imageMin']);
    gulp.watch('/sass/*.scss', ['sass']);
    gulp.watch('*.html', ['copyHtml']);
});
//clean
gulp.task('default', function() {
    return gulp.src('app/tmp', { read: false })
        .pipe(clean());
});