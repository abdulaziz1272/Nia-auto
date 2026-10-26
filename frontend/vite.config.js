import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import os from 'node:os'
function urls(){const ips=Object.values(os.networkInterfaces()).flat().filter(x=>x.family==='IPv4'&&!x.internal).map(x=>x.address);return ips}
export default defineConfig({plugins:[vue(),{name:'nia-auto-local-links',configureServer(server){server.httpServer?.once('listening',()=>{console.log('\n  NIA AUTO — PHONE LINKS (same Wi-Fi):');for(const ip of urls())console.log(`  http://${ip}:${server.config.server.port||5175}`);console.log('  Camera access on phones requires HTTPS. See README for secure tunnel.\n')})}}],server:{host:'0.0.0.0',port:5175,strictPort:true,proxy:{'/api':{target:'http://127.0.0.1:5000',changeOrigin:true}}}})
