var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var watchify = require('watchify');

var path = {
    MINIFIED_OUT: 'app.min.js',
    DEST_BUILD: 'assets/js',
    ENTRY_POINT: './src/app.jsx'
};

gulp.task('watch', function() {
    var watcher  = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    return watcher.on('update', function () {
        watcher.bundle()
            .pipe(source(path.MINIFIED_OUT))
            .pipe(streamify(uglify({file: path.MINIFIED_OUT})))
            .pipe(gulp.dest(path.DEST_BUILD));
        console.log('Updated !');
    })
        .bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify({file: path.MINIFIED_OUT})))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('build', function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify]
    })
        .bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify({file: path.MINIFIED_OUT})))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('default', ['build']);