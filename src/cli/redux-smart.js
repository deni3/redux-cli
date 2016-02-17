import commander from 'commander';

import ProjectSettings from '../projectSettings';
import Generator from '../generator';
import { info, normalizeComponentName } from '../util/textHelper';
import { version } from '../version';

class SmartComponent {
  constructor(componentName) {
    this.componentName = normalizeComponentName(componentName);
    this.settings = new ProjectSettings();
  }

  generate() {
    console.log(info(`Generating new Smart Component named: ${this.componentName}`));

    const sourceBase = this.settings.getSetting('sourceBase');
    const creationPath = this.settings.getSetting('smartPath');
    const extension = this.settings.getSetting('fileExtension');
    const testCreationPath = this.settings.getSetting('testPath');

    const args = {
      templatePath: '/templates/Smart.js',
      testTemplatePath: '/templates/Smart.test.js',
      componentName: this.componentName,
      creationPath,
      extension,
      testCreationPath,
      sourceBase
    };

    const generator = new Generator(args);
    generator.generate();
  }
}

commander
  .version(version())
  .arguments('<ComponentName>')
  .action(name => {
    const component = new SmartComponent(name);
    component.generate();
  })
  .parse(process.argv);
