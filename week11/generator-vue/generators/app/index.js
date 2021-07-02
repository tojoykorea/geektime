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
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {
                "webpack": "^5.38.1",
                "vue-loader": "^14.0.0",
                "vue-template-compiler": "^2.6.14",
                "vue-style-loader": "^4.1.3",
                "css-loader": "^5.2.6",
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
    }
};
