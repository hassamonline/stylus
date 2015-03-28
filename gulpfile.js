var
	gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	jeet = require('jeet'),
	nib = require('nib'),
	sourcemaps = require('gulp-sourcemaps')
;

var devpath = {
	root : "dev/",
	html : "dev/html/",
	stylus : "dev/stylus/",
	js : "dev/js/",
	img : "dev/img/"
}

var distpath = {
	root : "dist/",
	html : "dist/html",
	css : "dist/css/",
	js : "dist/js/",
	img : "dist/img/"
}

// browserySync

gulp.task('browserSync', function() {
	browserSync({
		server : {
			baseDir : ["dist"]
		},
		open : false
	})
})


// tasks

// transfer html
gulp.task('html', function() {
	gulp.src(devpath.root + "**/*.html")
		.pipe(gulp.dest(distpath.root))
		.pipe(browserSync.reload({stream:true}))
	;
})


// stylus

gulp.task('stylus', function() {
	gulp.src(devpath.stylus + "*.styl")
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(stylus({
			compress : true,
			use : [nib(),jeet()]
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(distpath.css))
		.pipe(browserSync.reload({stream:true}))
	;
})

// minify js

gulp.task('js', function() {
	gulp.src(devpath.js + "**/*.js")
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest(distpath.js))
		.pipe(browserSync.reload({stream:true}))
	;
})


// minify imgs

gulp.task('imagemin', function() {
	gulp.src(devpath.img + "**/*")
		.pipe(imagemin())
		.pipe(gulp.dest(distpath.img))
		.pipe(browserSync.reload({stream: true}))
	;
})

// watch task

gulp.task('watch', function() {
	gulp.watch(devpath.root + "**/*.html", ['html']);
	gulp.watch(devpath.stylus + "**/*.styl", ['stylus']);
	gulp.watch(devpath.js + "**/*.js", ['js']);
	gulp.watch(devpath.img + "**/*", ['imagemin']);
})


// default task

gulp.task('default', ['html', 'stylus', 'js', 'imagemin', 'browserSync', 'watch'])


