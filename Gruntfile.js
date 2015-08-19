module.exports = function (grunt) {
	"use strict";

	var path = require('path');

	var EMPTY = "empty:";

	function include(paths) {

		var widgets = [];

		paths = paths.forEach ? paths : [paths];

		paths.forEach(function(path){
			widgets = widgets.concat(grunt.file.expand(path).map(function (file) {
				if(file.indexOf(".js") > -1){
					return file.replace("bin/dist/", "").replace(".js", "");
				}
				if(file.indexOf(".svg") > -1){
					return file.replace("bin/dist/", "text!");
				}
				
				if(file.indexOf(".vml") > -1){
					return file.replace("bin/dist/", "text!");
				}
				
			}));
		});


		return widgets;
	}

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-ejs');

	grunt.registerTask(
		"default", 
		[	"clean", 
			"copy:dist", 
			"ejs", 
			"copy:ejs", 
			"clean:temp", 
			"processhtml", 
			"configSingleRequirejs", 
			"requirejs"
		]
	);


    grunt.registerTask("configSingleRequirejs", "config each requirejs config for index files", function(version){
    	var configObject = {};
    	var allIndexJsFiles = include("bin/dist/modules/**/index.js");


    	allIndexJsFiles.forEach(function(indexFile, index){
    		var cloneFiles = Array.prototype.slice.call(allIndexJsFiles);
    		var paths = {
        		'vector' : EMPTY,
		    	'swiper' : EMPTY,
		        'browser' : EMPTY,
        		'poly' : EMPTY,
        		'jquery' : EMPTY,
			    'less': 'packages/require-less/0.1.5/less',
		        'text': 'packages/require-text/2.0.14/text'
		    };

    		cloneFiles.splice(index, 1);
    		cloneFiles.forEach(function(emptyFiles){
    			paths[emptyFiles] = EMPTY;
    		});

    		configObject[indexFile] = {
    			options:{    				
					baseUrl: 'bin/dist',
                    map: {
                        '*': {
                            'less': 'packages/require-less/0.1.5/less' // path to less
                        }
                    },
				    paths: paths,
					out:  path.join('bin/dist', indexFile, "../built.js"),
					include: [indexFile],
					exclude : ['text', 'less'],
					optimize: "none"
    			}
    		}

    	});

    	//pack all files 
    	configObject.all = {
			options:{    				
				baseUrl: 'bin/dist',
                map: {
                    '*': {
                        'less': 'packages/require-less/0.1.5/less' // path to less
                    }
                },
			    paths: {
			        'jquery' : 'packages/jquery/jquery-1.11.3.min',
        			'vector' : 'packages/vector/svgvml',
			        'swiper':'packages/swiper/swiper.min',
			        'browser' : 'packages/browser/check',
        			'poly' : EMPTY,
			    	'less': 'packages/require-less/0.1.5/less',
			        'text': 'packages/require-text/2.0.14/text',
			        'selectric':'packages/selectric/jquery.selectric',
        			'classList':'packages/classList/classList.min'
			    },
				out:  'bin/dist/modules/mix.built.js',
				include: include(["bin/dist/packages/icons/*.svg", "bin/dist/packages/icons/*.vml"])
							.concat(['jquery', 'swiper', 'less', 'vector', 'browser','classList']),
				optimize: "none"
			}
    	}

        //start to config less task
        grunt.config.merge({
            requirejs: configObject
        });

    });

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			version: "<%= pkg.version %>",
			banner: "// <%= pkg.name %> - <%= pkg.version %> @ <%= grunt.template.today('yyyy-mm-dd HH:MM:ss') %> \r\n"
		},
		ejs: {
			all: {
				src: ['public/modules/**/index.ejs'],
				dest: 'bin/dist/temp',
				expand: true,
				ext: '.html',
			}
		},
		clean: {
			dist: ["bin/dist/"],
			temp: ["bin/dist/temp"]
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: "public/",
					src: "**",
					dest: "bin/dist/"
				}]
			},
			ejs : {
				files: [{
					expand: true,
					cwd: "bin/dist/temp/public/modules/",
					src: "**",
					dest: "bin/dist/modules/"
				}]
			}
		},
		uglify: {
			options: {
				mangle: true,
				compress: {},
				beautify: false,
				banner: "<%= meta.banner %>"
			},
			dist: {
				files: {
					"bin/dist/packages/pages/all.built.min.js": ["bin/dist/packages/pages/all.built.js"]
				}
			}
		},
		less: {
			compile: {
				options: {
					paths: ["bin/dist"]
				},
				files: [{
					expand: true,
					cwd: 'bin/dist/pages',
					src: ['**/*.less'],
					dest: 'bin/dist/pages',
					ext: '.css'
				}]
			}
		},
		cssmin: {
			compress: {
				files: [{
					expand: true,
					cwd: 'bin/dist/pages',
					src: ['**/*.css', '!**/*.min.css'],
					dest: 'bin/dist/pages',
					ext: '.min.css'
				}]

			}
		},
		processhtml : {
			pages : {

				files: [{
					expand: true,
					cwd: "bin/dist/modules/",
					src: "**/*.html",
					dest: "bin/dist/modules/",
					ext: '.html'
				}]
			}
		}
	});
};
