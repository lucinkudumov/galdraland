module.exports = function (grunt) {
	grunt.initConfig({
		bower: grunt.file.readJSON('./.bowerrc'),
		less: {
			compile: {
				files: {
					"tmp/app.css": [
						"public/dev/less/**/**.less"
					],
				}
			}
		},

		cssmin: {
			compress: {
				options: {
					keepSpecialComments: "0"
				},
				files: {
					"public/assets/css/app.css": [
						"bower_components/**/**.css",
						"public/dev/css/bootstrap.cs",
						"tmp/app.css"
					]
				}
			}
		},

		concat: {
			develop: {
				files: {
					"public/assets/js/libs.js": [
					   "public/dev/libs/jquery.js",
					   "public/dev/libs/bootstrap.js",
					   "public/dev/libs/angular.js",
					   "public/dev/libs/angular-route.js",
					   "public/dev/libs/angular-ui-router.js",
					   "public/dev/libs/angular-cookies.js",
					   "public/dev/libs/ui-bootstrap.min.js",
//                       "public/dev/libs/ui-bootstrap-tpls-1.3.3.js",
					   "bower_components/**/**.js"
					],
					
					"public/assets/js/app.js" : [
					   "public/dev/app/**/**.js"
					]
				}
			}
		},

		uglify: {
			app: {
				options: {
					preserveComments: false,
					wrap: false
				},
				files: {
					"public/assets/js/app.js": ["public/assets/js/app.js"],
					"public/assets/js/libs.js" : ["public/assets/js/libs.js"]
				}
			}
		},
	
		clean: ["tmp"],
	
		watch: {
			scripts: {
				files: [
				    "public/dev/app/**/**.js",
				],
				tasks: [
				    "concat"
				]
			},
			styles: {	
				files: [
					"public/dev/less/**/**.less",
				],
				tasks: [
					"less",
					"cssmin",
				]
			}
		},
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-watch");
	
	grunt.registerTask("default", ["less", "cssmin", "concat",  "clean", "watch"]);
	grunt.registerTask("build", ["less", "cssmin", "concat", "uglify", "clean"]);
}