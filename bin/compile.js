const webpack = require('webpack');
const debug = require('debug')('app:bin:compile');
const webpackConfigClient = require('../webpack/webpack.config.js');

const webpackCompiler = (webpackConfig) =>
    new Promise((resolve, reject) => {
        const compiler = webpack(webpackConfig);

        compiler.run((err, stats) => {
            if (err) {
                debug('Webpack compiler encountered a fatal error.', err);
                return reject(err)
            }

            const jsonStats = stats.toJson();
            debug('Webpack compile completed.');

            if (jsonStats.errors.length > 0) {
                debug('Webpack compiler encountered errors.');
                debug(jsonStats.errors.join('\n'));
                return reject(new Error('Webpack compiler encountered errors'))
            } else if (jsonStats.warnings.length > 0) {
                debug('Webpack compiler encountered warnings.');
                debug(jsonStats.warnings.join('\n'))
            } else {
                debug('No errors or warnings encountered.')
            }
            resolve(jsonStats)
        })
    });

const compileClient = () => {
    debug('Starting compiler client.');
    return Promise.resolve()
        .then(() => webpackCompiler(webpackConfigClient))
        .then(() => {
            debug('Compilation completed successfully.');
        })
        .catch((err) => {
            debug('Compiler encountered an error.', err);
            process.exit(1)
        })
};

//Compile the client
compileClient();