module.exports = function(grunt) {
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    // caching control
                    urlArgs: 'ts=' + (new Date()).getTime(),
                    name: 'main',
                    insertRequire: ['main'],
                    include: ['requirejs'],
                    baseUrl: './src',
                    mainConfigFile: 'src/config.js',
                    out: 'main.js'
                }
            }
        },
        
        copy: {
            ghpages: {
                files: [
                    {
                        src: 'assets/css/main.css',
                        dest: './main.css'
                    },
                    {
                        src: 'lib/picnic/dist/latest.css',
                        dest: './picnic.css'
                    }
                ]
            }
        }
    });
    
    grunt.task.loadNpmTasks('grunt-contrib-copy');
    grunt.task.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['requirejs:compile', 'copy:ghpages']);
};
