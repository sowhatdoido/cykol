var compressor = require('node-minify');
 
// Using Google Closure 
new compressor.minify({
    type: 'gcc',
    fileIn: 'src/cykol.js',
    fileOut: 'dist/cykol.min.js',
    callback: function(err, min){
        console.log(err);
        //console.log(min); 
    }
});

new compressor.minify({
    type: 'yui-css',
    fileIn: 'src/cykol.css',
    fileOut: 'dist/cykol.min.css',
    callback: function(err, min){
        console.log(err);
        //console.log(min); 
    }
})