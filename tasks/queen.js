/*
 * grunt-queen
 * https://github.com/plumlee/grunt-queen
 *
 * Copyright (c) 2013 Scott Plumlee
 * Licensed under the MIT license.
 */

'use strict';

var queen = require('queen');
var queenRunner = require('queen-remote').runner;

module.exports = function(grunt) {

    grunt.registerMultiTask('queen', 'Start up queenjs server via queen-remote runner.', function() {

        var done = this.async();
        var config = {};
        config.config = this.data.config;

        if (this.target === 'start') {
            queenRunner(queen, config, function(callback) {
                if (callback instanceof Error) {
	                grunt.fatal('Error starting queen server, stopping.');
                } else {
	                grunt.log.writeln('Queen server running.');
	                grunt.event.once('stopqueen', function() {
	                    callback.kill();
	                });
	                done();
                }
            });
        }
        else if (this.target === 'stop') {
            grunt.log.writeln('Stopping queen server.');
            grunt.event.emit('stopqueen');
            done();
        }

    }); // queenRunner

    // });

};
