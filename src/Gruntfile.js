module.exports = function (grunt) {
    let _lang_data = grunt.file.readJSON("language.json");
    let _lang = ["ko", "en", "jp", "zh"];

    var pug_config = {};
    var str_config = {};

    for(let i in _lang) {
        let lang = _lang[i];
        pug_config["dev-"+lang] = {
            files: [{
                cwd: "pc/html/",
                src: "*.pug",
                dest: "../www/pc/html/",
                expand: true,
                ext: "."+lang+".html"
            }, {
                cwd: "mobile/html/",
                src: "*.pug",
                dest: "../www/mobile/html/",
                expand: true,
                ext: "."+lang+".html"
            }],
    		options: {
    			pretty: false,
    			data: {
                    _lang_data: _lang_data,
                    _lang: lang
    			}
    		}
        };

        str_config["dev-"+lang] = {
            files: [{
                cwd: "pc/js/",
                src: "*.js",
                dest: "../www/pc/js/",
                expand: true,
                ext: "."+lang+".js"
            },{
                cwd: "mobile/js/",
                src: "*.js",
                dest: "../www/mobile/js/",
                expand: true,
                ext: "."+lang+".js"
            }],
            options: {
                replacements: [{
                    pattern: /_\{(.*?)\}/ig,
                    replacement: function (match, p1) {
                        return _lang_data[p1][lang];
                    }
                }]
            }
        };
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        pug: pug_config,
        'string-replace': str_config,
        copy: {
        	resource: {
        		files: [{
        			expand: true,
        			cwd: "pc/res/",
        			src: "**/*",
        			dest: "../www/pc/"
        		},{
        			expand: true,
        			cwd: "mobile/res/",
        			src: "**/*",
        			dest: "../www/mobile/"
        		}]
        	},
            conf: {
                files: {
                    '../www/pc/robots.txt': 'pc/robots.txt',
                    '../www/mobile/robots.txt': 'mobile/robots.txt'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-pug');

    grunt.registerTask('dev', ['pug', 'string-replace', 'copy']);
};
