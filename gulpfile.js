var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	refresh = require('gulp-livereload'),
	connect = require('connect'),
	lr = require('tiny-lr'),
	server = lr();

gulp.task('scripts', function() {
	gulp.src(['src/index.js'], {buffer: false})
		.pipe(browserify({
			debug:true
		}))
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('build'))
		.pipe(refresh(server))
})

gulp.task('lr-server', function() {
	server.listen(35729, function(err) {
		if (err) console.log(err);
	});
})

gulp.task('serve', function() {
	connect()
		.use(connect.static(__dirname))
		.listen(8080);
})

gulp.task('default', function() {
	gulp.run('lr-server', 'scripts', 'serve');
	gulp.watch('src/**', function(event) {
		gulp.run('scripts');
	})
})