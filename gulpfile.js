/*Reference : https://www.pixemweb.com/blog/gulp-4-0-0-with-nodejs-imagemin-browsersync-sass-sourcemaps-cleancss-more/ */

// You can declare multiple variables with one statement by starting with var and seperate the variables with a comma and span multiple lines.
// Below are all the Gulp Plugins we're using.

const { src, dest, watch, series, task } = require("gulp");

const autoprefixer = require("gulp-autoprefixer"),
	browserSync = require("browser-sync").create(),
	reload = browserSync.reload,
	sass = require("gulp-sass")(require("sass")),
	concat = require("gulp-concat"),
	imagemin = require("gulp-imagemin"),
	changed = require("gulp-changed"),
	lineec = require("gulp-line-ending-corrector"),
	sourcemaps = require("gulp-sourcemaps"),
	jshint = require("gulp-jshint"),
	uglify = require("gulp-uglify"),
	babel = require("gulp-babel");

const root = "./",
	scss = root + "assets/scss/pages/",
	js = root + "assets/js/*",
	jsDist = root + "dist/js/",
	cssDist = root + "dist/css/",
	watchLayout = root + "assets/scss/layout/";

// Déclaration js
const phpWatchFiles = root + "**/*.php",
	styleWatchFiles = scss + "**/*.scss";

var imgSRC = root + "assets/images/**/*",
	imgDEST = root + "dist/images/";

var fontsSRC = root + "assets/fonts/**/*",
	fontsDEST = root + "dist/fonts";

function imgmin() {
	return src(imgSRC)
		.pipe(changed(imgDEST))
		.pipe(imagemin([imagemin.gifsicle({ interlaced: true }), imagemin.mozjpeg({ progressive: true }), imagemin.optipng({ optimizationLevel: 5 })]))
		.pipe(dest(imgDEST));
}

function css() {
	return src(scss + "*", { sourcemaps: true })
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(autoprefixer("last 2 versions"))
		.pipe(lineec())
		.pipe(dest(cssDist, { sourcemaps: "." }));
}

function fonts() {
	return src(fontsSRC).pipe(dest(fontsDEST));
}

function javascript() {
	return src(js + "*", { allowEmpty: true }).pipe(babel()).pipe(sourcemaps.init()).pipe(jshint()).pipe(jshint.reporter("jshint-stylish")).pipe(uglify()).pipe(dest(jsDist));
}

function watchTask() {
	browserSync.init({
		open: "external",
		proxy: "http://localhost/projets/comete-ai/srcs/",
	});
	watch(styleWatchFiles, css);
	watch(watchLayout, css);
	watch(imgSRC, imgmin);
	watch(js, javascript);
	watch([phpWatchFiles, jsDist + "devwp.js", cssDist + "main.css"]).on("change", reload);
}

exports.css = css;
// exports.javascript = javascript;
exports.watch = watchTask;
exports.imgmin = imgmin;
exports.fonts = fonts;

const build = series(css, imgmin, fonts, javascript);

task("build", build);
