const PythonShell = require('python-shell');


default export class PythonApi {
  constructor() {
    this.options = {
      mode: 'text',
      pythonPath: '/usr/bin/python3',
      scriptPath: process.cwd() + "/api",
      args: JSON.stringify(args)
    };
  }
}
