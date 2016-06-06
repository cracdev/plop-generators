const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => ['ES6 Class', 'Stateless Function'],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
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
  ],
  actions: data => {
    const actions = [
      {
        type: 'add',
        path: '../app/components/{{properCase name}}/index.jsx',
        templateFile:
          data.type === 'ES6 Class'
          ? './component/es6.jsx.hbs'
          : './component/stateless.jsx.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../app/components/{{properCase name}}/test/index.test.js',
        templateFile: './component/test.js.hbs',
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
