const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if ((/.+/).test(value)) {
          return (
            componentExists(value)
            ? 'A component or container with this name already exists'
            : true
          );
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'propTypes',
      default: true,
      message: 'Does it have props?',
    },
    {
      type: 'confirm',
      name: 'constants',
      default: true,
      message: 'Do you want constants for this container?',
    },
    {
      type: 'confirm',
      name: 'actions',
      default: true,
      message: 'Do you want actions for this container?',
    },
    {
      type: 'confirm',
      name: 'reducer',
      default: true,
      message: 'Do you want reducer for this container?',
    },
  ],
  actions: data => {
    const actions = [{
      type: 'add',
      path: '../app/containers/{{properCase name}}/index.jsx',
      templateFile: './container/index.jsx.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../app/containers/{{properCase name}}/test/index.test.js',
      templateFile: './container/index.test.js.hbs',
      abortOnFail: true,
    }];

    if (data.constants) {
      actions.push({
        type: 'add',
        path: '../app/containers/{{properCase name}}/constants.js',
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.actions) {
      actions.push({
        type: 'add',
        path: '../app/containers/{{properCase name}}/actions.js',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../app/containers/{{properCase name}}/test/actions.test.js',
        templateFile: './container/actions.test.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.reducer) {
      actions.push({
        type: 'add',
        path: '../app/containers/{{properCase name}}/reducer.js',
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../app/containers/{{properCase name}}/test/reducer.test.js',
        templateFile: './container/reducer.test.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
