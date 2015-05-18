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
          "src/jh2d.dashedOval.js",
          "src/*.js"
        ],
        dest: "temp/jh2d.js"
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: {toplevel: true},
        squeeze: {dead_code: false},
        codegen: {quote_keys: true}
      },
      build: {
		    files: {
			    'dist/<%= pkg.file %>.min.js':'temp/<%=pkg.file %>.js'
		    }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/<%=pkg.file %>.*.js'
      ]
	  },
    clean: ['dist','temp'],
    cipher: {
      options: {
        pk:grunt.cli.options.pk||grunt.file.read('.pk')
      },
      encrypt: {
        files: [{
          expand:true,
          cwd:'src/',
          src:['*.js'],
          dest:'cipher/'
        }]
      },      
      decrypt: {
        options: {
          method:'decrypt'
        },
        files: [{
          expand:true,
          cwd:'cipher/',
          src:['*.js'],
          dest:'src/'
        }]
      }
    }
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('decrypt', ['cipher:decrypt']);
  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'cipher:encrypt']);
};