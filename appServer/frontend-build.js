const args = [ 'run', 'build', '--production' ];
const opts = { stdio: 'inherit', cwd: '../app', shell: true };
require('child_process').spawn('npm', args, opts);
