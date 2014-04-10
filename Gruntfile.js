module.exports = function(grunt){
    
    grunt.initConfig({
    
        pkg: grunt.file.readJSON('package.json'),
        
        coffee: {
          compile: {
            files: {
                  'server.js'        : 'server.coffee',
                  'public/js/main.js': 'public/js/main.coffee' // 1:1 compile
                  //'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile and concat into single file
                }
            }
        },
        
        watch: {
          scripts: {
                files: ['**/*.coffee'],
                tasks: ['coffee'],
                options: {
                    spawn: false,
                    debounceDelay: 250
                }
            }
        }
        
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');    
    
    grunt.registerTask('default', ['watch']);
};