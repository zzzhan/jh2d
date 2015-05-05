module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      js:{
        src: [
          "src/jh2d.core.js",
          "src/jh2d.base.js",
          "src/jh2d.dashedLine.js",
          "src/jh2d.dashedBezier.js",
          "src/jh2d.dashedOval.js"
        ],
        dest: "temp/jh2d.js"
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
	  mangle: {toplevel: true},
	  squeeze: {dead_code: false},
	  codegen: {quote_keys: true},
      build: {
		files: {
			'dist/<%= pkg.file %>.min.js':'temp/<%=pkg.file %>.js'
		}
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          $ : true,
          Modernizr : true,
          console: true,
          define: true,
          module: true,
          require: true
        },
        "-W099": true,
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js: {
        src: 'src/<%=pkg.file %>.*.js'
      }
	},
    clean: ['dist','temp']
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify']);
};