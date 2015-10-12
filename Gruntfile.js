module.exports = function (grunt) {
	grunt.initConfig({
		less: {
			compile: {
				files: {
					"tmp/app.css": [
						"dev/less/**/**.less"
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
					"assets/css/app.css": [
					   "dev/css/bootstrap.css",
					   "tmp/app.css"
					]
				}
			}
		},

		concat: {
			develop: {
				files: {
					"assets/js/libs.js": [
					   "dev/libs/jquery.js",
					   "dev/libs/bootstrap.js",
					   "dev/libs/angular.js",
					   "dev/libs/angular-route.js"
					],
					
					"assets/js/app.js" : [
					   "dev/app/**/**.js"
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
					"assets/js/app.js": ["assets/js/app.js"],
					"assets/js/libs.js" : ["assets/js/libs.js"]
				}
			}
		},
	
		clean: ["tmp"],
	
		watch: {
			scripts: {
				files: [
				    "dev/app/**/**.js",
				],
				tasks: [
				    "concat"
				]
			},
			styles: {	
				files: [
					"dev/less/**/**.less",
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