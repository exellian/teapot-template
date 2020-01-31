@echo off
pbjs -t static-module -w commonjs -o proto/teapot.js proto/teapot.proto
pbts -o proto/teapot.d.ts proto/teapot.js