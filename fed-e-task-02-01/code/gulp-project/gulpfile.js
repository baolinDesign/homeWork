const {src, dest, parallel, series, watch} = require('gulp')

const del = require('del')

const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()
const bs = browserSync.create()

const clean = () => {
  return del(['dist'])
}

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const style = () => {
  return src('src/assets/styles/*.scss', {base: 'src'})
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
    .pipe(bs.reload({ stream: true }))
}

const script = () => {
  return src('src/assets/scripts/*.js', {base: 'src'})
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'))
    .pipe(bs.reload({ stream: true }))
}

const page = () => {
  return src('src/*.html', {base: 'src'})
    .pipe(plugins.swig({ data, defaults: { cache: false }  }))
    .pipe(dest('dist'))
    .pipe(bs.reload({ stream: true }))
}

const image = () => {
  return src('src/assets/images/**', {base: 'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', {base: 'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', {base:'public'})
    .pipe(dest('dist'))
}

const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)

  bs.init({
    notify: false,
    port: 2080,
    // open: true,  是否打开浏览器
    // files: 'dist/**',  // dist目录里面的文件发生改变后，浏览器自动更新
    server: {
      baseDir: ['dist','src','public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

const useref = ()=> {
  return src('dist/*.html', { base: 'dist' })
    .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
    // html js css
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page)

// 上线之前执行的任务
const build = series(clean, parallel(compile, image, font, extra))

const develop = series(compile, serve)

module.exports = {
  clean,
  compile,
  build,
  develop
}