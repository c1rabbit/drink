var gulp = require('gulp');

gulp.task('bootstrap', function(){
  gulp.src('node_modules/bootstrap/dist/css/*.min.css')
    .pipe(gulp.dest('public/stylesheets'));
  gulp.src('node_modules/bootstrap/dist/js/*.min.js')
    .pipe(gulp.dest('public/scripts'));
  gulp.src('node_modules/bootstrap/dist/fonts/*')
    .pipe(gulp.dest('public/fonts'));
  return null;
});

gulp.task('material-design-icons', function(){
  return gulp.src('node_modules/material-design-icons-iconfont/dist/fonts/*.ttf')
    .pipe(gulp.dest('public/fonts'));
})

gulp.task('jquery', function(){
  return gulp.src('node_modules/jquery/dist/*.min.js')
    .pipe(gulp.dest('public/javascripts'));
});


gulp.task('default', [ 'bootstrap' , 'jquery', 'material-design-icons']);
