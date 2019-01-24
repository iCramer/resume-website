// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
            reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
          },

          // when this task is run, lint the Gruntfile and all js files in src
          build: ['Gruntfile.js', 'src/**/*.js']
        },

        less: {
          build: {
            files: {
              'output/css/style.css': 'src/styles/style.less',
              'output/css/admin.css': 'src/styles/admin.less'
            }
          }
        },

        open : {
          dev:{
          path: 'http://localhost:8080/output/',
          app: 'Google Chrome'
        }
        },

        // uglify: {
        //   options: {
        //     banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
        //   },
        //   build: {
        //     files: {
        //       'output/js/main.min.js': 'src/js/main.js'
        //     }
        //   }
        // },

        // cssmin: {
        //   options: {
        //     banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
        //   },
        //   build: {
        //     files: {
        //       'output/css/style.min.css': 'output/css/style.css'
        //     }
        //   }
        // },
        watch: {
          files: ['src/styles/*.less'], 
          tasks: ['less'] },

          scripts: { 
            files: 'output/**/*.js', tasks: ['jshint'] 
          } 
        });
grunt.registerTask('default', ['jshint', 'less', 'open', 'watch']); 



  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
