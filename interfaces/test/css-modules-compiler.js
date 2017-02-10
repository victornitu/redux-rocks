const hook = require('css-modules-require-hook');
const sass = require('node-sass');
const path = require('path');

hook({
    extensions: ['.scss'],
    preprocessCss: function (css, filepath) {
        const result =  sass.renderSync({
            data: css,
            includePaths: [ path.resolve(filepath, '..') ]
        });

        return result.css;
    }
});