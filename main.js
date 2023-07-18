const { spawn } = require('child_process');
const readline = require('readline');
 const serverPath = 'server.jar';
const serverArgs = ['-Xmx1024M', '-Xms1024M', '-jar', serverPath, 'nogui'];
 const minecraftServer = spawn('java', serverArgs);
 const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 minecraftServer.stdout.on('data', (data) => {
  console.log(`Server: ${data}`);
});
 minecraftServer.stderr.on('data', (data) => {
  console.error(`Server error: ${data}`);
});
 minecraftServer.on('close', (code) => {
  console.log(`Server has been closed with code ${code}`);
});
 rl.on('line', (input) => {
  minecraftServer.stdin.write(`${input}\n`);
});
 rl.on('close', () => {
  minecraftServer.stdin.write('stop\n');
});