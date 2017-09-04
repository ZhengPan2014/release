module.exports = function(grunt){
    grunt.initConfig({
 
        pkg: grunt.file.readJSON('package.json'),

		concat: {
            cssConcat:{
                src:'../html/css/*.css',
                dest:'../html/css/concat/<%= pkg.name %> - <%= pkg.version %>.css' //dest 是目的地输出
            },
            jsConcat:{
                src:'../html/js/*.js',
                dest:'../html/js/concat/<%=pkg.name %> - <%= pkg.version %>.js'
            }
        },

        cssmin:{
            html: {
                files: [{
                    expand: true,
                    cwd: '../html/style',
                    src: ['*.css'],
                    dest: '../../website/html/style'
                }]
            }
        },

        uglify: {
            html: {
                files: [{
                    expand: true,
                    cwd: '../../website/html/js',
                    src: ['*.js'],
                    dest: '../../website/html/js'
                }]
            // },
            // controllers: {
            //     files: [{
            //         expand: true,
            //         cwd: '../../website/ros_webapp/controllers',
            //         src: ['*.js'],
            //         dest: '../../website/ros_webapp/controllers'
            //     }] 
            // },
            // lib: {
            //     files: [{
            //         expand: true,
            //         cwd: '../../website/ros_webapp/lib',
            //         src: ['*.js'],
            //         dest: '../../website/ros_webapp/lib'
            //     }] 
            // },
            // models: {
            //     files: [{
            //         expand: true,
            //         cwd: '../../website/ros_webapp/models',
            //         src: ['*.js'],
            //         dest: '../../website/ros_webapp/models'
            //     }] 
            // },
            // rosnodejs: {
            //     files: [{
            //         expand: true,
            //         cwd: '../../website/ros_webapp/rosnodejs',
            //         src: ['*.js'],
            //         dest: '../../website/ros_webapp/rosnodejs'
            //     }] 
            }
        },

		babel: {
            options: {
                sourceMap: false,
                presets: ['babel-preset-es2015']
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '../html/js',
                    src: ['*.js'],
                    dest: '../../website/html/js'
                }] 
            // },
            // controllers: {
            //     files: [{
            //         expand: true,
            //         cwd: '../ros_webapp/controllers',
            //         src: ['*.js'],
            //         dest: '../../website/ros_webapp/controllers'
            //     }] 
            // },
            // lib: {
            //     files: [{
            //         expand: true,
            //         cwd: '../ros_webapp/lib',
            //         src: ['*.js'],
            //         dest: '../../website/ros_webapp/lib'
            //     }] 
            // },
            // models: {
            //     files: [{
            //         expand: true,
            //         cwd: '../ros_webapp/models',
            //         src: ['*.js'],
            //         dest: '../../website/ros_webapp/models'
            //     }] 
            // },
            // rosnodejs: {
            //     files: [{
            //         expand: true,
            //         cwd: '../ros_webapp/rosnodejs',
            //         src: ['*.js'],
            //         dest: '../../website/ros_webapp/rosnodejs'
            //     }] 
            }
        },
 
        jshint:{
            options:{
                jshintrc:'.jshint'
            },
            build:['Gruntfile.js','../html/js/*js']
        },
 
        csslint:{
            options:{
                csslintrc:'.csslint'
            },
            build:['../html/css/*.css']
        },

        watch:{
            build:{
                files:['../html/js/*.js','../html/css/*.css'],
                tasks:['jshint','csslint','concat','cssmin','uglify'],
                options:{spawn:false}
            }
        }
 
    });

	grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //告诉grunt当我们在终端输入grunt时需要做些什么
    grunt.registerTask('default',['babel','cssmin','uglify']);//先进行语法检查，如果没有问题，再合并，再压缩
};
