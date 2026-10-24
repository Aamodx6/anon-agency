import { spawn } from 'node:child_process';
import fs from 'node:fs';

const profile = process.env.TEMP + '\\edge_cdp_rea';
fs.mkdirSync(profile, { recursive: true });

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--remote-debugging-port=9222',
  '--headless=new',
  '--no-first-run',
  '--no-default-browser-check',
  `--user-data-dir=${profile}`,
  'https://www.awakeagency.dev/',
  'http://localhost:3005/'
], {
  detached: true,
  stdio: 'ignore'
});

edge.unref();
console.log('Edge spawned with PID:', edge.pid);
