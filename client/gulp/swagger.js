var gulp = require('gulp');
var glob = require('glob');
var path = require('path');
var _ = require('lodash');
var beautify = require('js-beautify').js_beautify;

var fs = require('fs');
//var $ = require('gulp-load-plugins')();

gulp.task('swagger:compile', function(done){
    var CodeGen = require('swagger-js-codegen').CodeGen;

    glob('./api/**/*.json', null, function(err, files) {
        files.forEach(function(file){
            var swagger = JSON.parse(fs.readFileSync(file, 'utf-8'));

            var basename = path.basename(file, '.json');

            var methods = [];

            _.forEach(swagger.paths, function(api, path){
                _.forEach(api, function(op, m){
                    if(op.operationId){
                        methods.push({customMethodName: op.operationId, comma: true});
                    }
                });
            });

            var isCapture = false;
            if(swagger.info.description === 'Capture API'){
                isCapture = true
            }

            if(methods.length >= 1){
                delete methods[methods.length - 1].comma
            }

            var nodejsSourceCode =  CodeGen.getCustomCode({
                className: basename,
                swagger: swagger,
                template: {
                    class: fs.readFileSync('mustache/angular-class.mustache', 'utf-8'),
                    method: fs.readFileSync('mustache/angular-method-blank.mustache', 'utf-8'),
                    request: fs.readFileSync('mustache/angular-request.mustache', 'utf-8'),
                },
                mustache: {
                    customMethodNames: methods,
                    isCaptureService: isCapture
                }
            });

            nodejsSourceCode = nodejsSourceCode.slice(0,nodejsSourceCode.length-1).replace("'use strict';", "");

            for (var paths in swagger.paths) {
                if (swagger.paths.hasOwnProperty(paths)) {
                    var route = swagger.paths[paths];
                    for(var method in route){
                        if(route.hasOwnProperty(method)){
                            if(method.toLowerCase() === 'get'
                                || method.toLowerCase() === 'put'
                                || method.toLowerCase() === 'post'
                                || method.toLowerCase() === 'delete')
                            {
                                var responses = route[method].responses;

                                var cached = false;
                                if(responses['304'] !== undefined){
                                    cached = true;
                                }

                                var newSwag = {
                                    swagger: '2.0',
                                    info: {
                                        description: 'leave blank'
                                    },
                                    paths: {
                                        something: swagger.paths[paths]
                                    }
                                };

                                var mustache = {
                                    paths: [],
                                    verb: method.toLowerCase(),
                                    bodyParameters: [],
                                    isCaptureService: false
                                };

                                if(route[method]["x-swagger-router-controller"] === 'capture') {
                                    mustache.isCaptureService = true;
                                }

                                if(route[method].parameters) {
                                    var parameters = route[method].parameters;
                                    for(var i = 0; i < parameters.length; i++){
                                        if(parameters[i].in === 'body'){
                                            mustache.bodyParameters.push({ name: parameters[i].name, comma: true });
                                        }
                                    }
                                }

                                if(mustache.bodyParameters.length > 0){
                                    delete mustache.bodyParameters[mustache.bodyParameters.length-1].comma;
                                }




                                if(paths.indexOf('{') >= 0){
                                    var elementList = paths.split('/');
                                    var newElementList = elementList;
                                    for(var element in newElementList){
                                        if(element != 0){
                                            var param = newElementList[element];
                                            if(param !== ''){
                                                if(param.indexOf('{') >= 0){
                                                    param = param.replace('{','').replace('}','');

                                                }
                                                else {
                                                    param = '"' + param + '"';
                                                }
                                                mustache.paths.push({'element': param});
                                            }
                                        }
                                    }
                                }
                                else {
                                    var newPath = paths.replace('{','').replace('}','').slice(1).split('/');
                                    if(newPath.length > 0){
                                        newPath = newPath.join('/');
                                        mustache.paths.push({'element':'"' + newPath + '"'});
                                    }
                                }


                                var responseIsArray = false;
                                if(responses['200'] !== undefined && responses['200'].schema != undefined){

                                    if(responses['200'].schema.type !== undefined){
                                        if(responses['200'].schema.type === 'array'){
                                            responseIsArray = true;
                                        }
                                    }
                                }

                                if(method.toLowerCase() === 'post'){
                                    nodejsSourceCode += CodeGen.getCustomCode({
                                        className: basename,
                                        swagger: newSwag,
                                        template: {
                                            class: fs.readFileSync('mustache/angular-class-blank.mustache', 'utf-8'),
                                            method: fs.readFileSync('mustache/angular-method-post.mustache', 'utf-8'),
                                            request: fs.readFileSync('mustache/angular-request.mustache', 'utf-8')
                                        },
                                        mustache: mustache
                                    }).replace("'use strict';", "");
                                }
                                else {
                                    if(responseIsArray){
                                        nodejsSourceCode += CodeGen.getCustomCode({
                                            className: basename,
                                            swagger: newSwag,
                                            template: {
                                                class: fs.readFileSync('mustache/angular-class-blank.mustache', 'utf-8'),
                                                method: fs.readFileSync('mustache/angular-method-get-many.mustache', 'utf-8'),
                                                request: fs.readFileSync('mustache/angular-request.mustache', 'utf-8')
                                            },
                                            mustache: mustache
                                        }).replace("'use strict';", "");
                                    }
                                    else{
                                        nodejsSourceCode += CodeGen.getCustomCode({
                                            className: basename,
                                            swagger: newSwag,
                                            template: {
                                                class: fs.readFileSync('mustache/angular-class-blank.mustache', 'utf-8'),
                                                method: fs.readFileSync('mustache/angular-method-get-single.mustache', 'utf-8'),
                                                request: fs.readFileSync('mustache/angular-request.mustache', 'utf-8')
                                            },
                                            mustache: mustache
                                        }).replace("'use strict';", "");
                                    }
                                }
                            }
                        }
                    }
                }
            }


            nodejsSourceCode += CodeGen.getCustomCode({
                className: basename,
                swagger: swagger,
                template: {
                    class: fs.readFileSync('mustache/angular-class-end.mustache', 'utf-8'),
                    method: fs.readFileSync('mustache/angular-method-blank.mustache', 'utf-8'),
                    request: fs.readFileSync('mustache/angular-request.mustache', 'utf-8')
                }
            }).replace("'use strict';", "").replace("var temp = true;", "}");

            var dest = 'app/requests';

            fs.writeFileSync(dest + '/' + basename.charAt(0).toUpperCase() + basename.slice(1) + 'RequestService.js', beautify(nodejsSourceCode, { indent_size: 4, max_preserve_newlines: 2 }), 'UTF-8');
        });
    });

    done();
});

gulp.task('swagger', ['swagger:compile']);
