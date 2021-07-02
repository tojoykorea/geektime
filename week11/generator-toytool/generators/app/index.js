var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    async initPackage() {
        let answer = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname
            }
        ]);

        const pkgJson = {
            "name": answer.name,
            "version": "1.0.0",
            "main": "generators/app/index.js",
            "scripts": {
                "build": "webpack",
                "test": "mocha --require @babel/register",
                "coverage": "nyc mocha"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {
                "@babel/core": "^7.14.6",
                "@babel/preset-env": "^7.14.7",
                "@babel/register": "^7.14.5",
                "@istanbuljs/nyc-config-babel": "^3.0.0",
                "babel-plugin-istanbul": "^6.0.0",
                "mocha": "^9.0.1",
                "nyc": "^15.1.0",
                "webpack": "^5.38.1",
                "vue-loader": "^16.0.0",
                "vue-template-compiler": "^2.6.14",
                "vue-style-loader": "^4.1.3",
                "css-loader": "^5.2.6",
                "babel-loader": "^8.2.2",
                "webpack-cli": "^4.7.2"
            },
            "dependencies": {
                "vue": "^2.0.0",
            }
        };
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
    copyFiles() {
        this.fs.copyTpl(
            this.templatePath('Hello.vue'),
            this.destinationPath('src/Hello.vue')
        )
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        )
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
        )
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        )
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc')
        )
        this.fs.copyTpl(
            this.templatePath('test.js'),
            this.destinationPath('test/test.js')
        )
        this.fs.copyTpl(
            this.templatePath('add.js'),
            this.destinationPath('src/add.js')
        )
    }
};
