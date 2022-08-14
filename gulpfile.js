// function tarea(callBack){
//     console.log('MI PRIMER TAREA');
//     callBack(); //el callBack es una funcion dentro de otra funcion en gulp de utlizar de esa manera para que le de uncierre a la tarea depues de terminar 
// }
// exports.primerTarea = tarea; //Al hacer el llamdo em la terminal, se hace de manera  npx gulp y el nombre que tengas exports.nombre / tambine se puede llamar igual que la funcion
const{src, dest, watch, parallel} = require('gulp'); //src sirve para identificar una carpeta o archivos /dest sirve para almacenar y guardarlo
//Estas dependencias son de Css (SCSS)-sass
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");

//const autoprefixer = require('autoprefixer');
//const cssnano = require('cssnano');
//const postcss = require('gulp-postcss');
//const sourcemaps = require('gulp-sourcemaps');

// estas dependencias son de imagenes 
const cache = require('gulp-cache');
const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');
const avif = require('gulp-avif');
function css(done){
    //Pasos para compilar una hoja de estilos de Sass
    //1 Identificar el archivo de SASS/2 Compilar las funciones de Sass/3 Compilar o Almanacenar en el disco duro
    src('src/scss/*/.scss')//1
        //.pipe(sourcemaps.init())
        .pipe( plumber() ) // plumber para poder ejecutar las funciones y que la ejecucion no pare
        .pipe( sass() )//2
        //.pipe(postcss([autoprefixer(), cssnano()]))
        //.pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') ) //3//Los pipe() son acciones que se realizan uno despues del otro respentando su orden
    done(); //CallBack que avisa que a gulp cuando llegamos al final
}
function imagenes (done){
    const opciones = {
        optimizationLevel:3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones) ) )
    .pipe( dest('build/img') )
    done();
 }
function versionWebp (done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones) )
    .pipe( dest('build/img') )
    done();
}
 function versionAvif (done){    
      const opciones = {
          quality: 50
      };
      src('src/img/**/*.{png,jpg}')
      .pipe(avif(opciones) )
      .pipe( dest('build/img') )
      done();
 }
 function javascript(done){
    src('src/scss/js/**/*.js')
    .pipe( dest('build/js') )
      done();
 }
function dev(done){
    watch('src/scss/**/*.scss', css)
    watch('src/scss/js/**/*.js', javascript)
    done();
}
exports.css = css; //exports = Llamando la funcion
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(javascript,versionAvif,imagenes,versionWebp,dev);
