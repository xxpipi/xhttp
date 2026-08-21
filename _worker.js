export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/xhttp") {
      return new Response(HTML, {
        headers: {
          "content-type": "text/html; charset=UTF-8",
          "cache-control": "public, max-age=3600"
        }
      });
    }

    return new Response("Not Found", {
      status: 404,
      headers: { "content-type": "text/plain; charset=UTF-8" }
    });
  }
};

const HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>XHTTP 配置生成器</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f5f7fa;color:#222}.container{max-width:1100px;margin:30px auto;padding:20px}.card{background:#fff;border-radius:14px;padding:22px;margin-bottom:20px;box-shadow:0 4px 20px rgba(0,0,0,.06)}h1{margin-top:0}h2{font-size:18px;margin-top:0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}label{display:block;font-size:13px;margin-bottom:6px;color:#666}input,select,textarea,button{width:100%;font:inherit}input,select,textarea{padding:10px 12px;border:1px solid #ddd;border-radius:8px;background:#fff}textarea{min-height:260px;resize:vertical}button{border:0;border-radius:8px;padding:11px 16px;cursor:pointer;background:#111;color:#fff}.buttons{display:flex;gap:10px;flex-wrap:wrap}.buttons button{width:auto}.hint{color:#888;font-size:12px;margin-top:5px}.parse{display:flex;gap:10px}.parse input{flex:1}.parse button{width:auto}@media(max-width:600px){.container{margin:0;padding:10px}.card{padding:16px}.parse{flex-direction:column}.parse button{width:100%}}
</style>
</head>
<body>
<div class="container">
<div class="card"><h1>XHTTP 配置生成器</h1><p class="hint">Cloudflare Worker 纯静态版本 · 所有配置在浏览器本地生成。</p></div>
<div class="card"><h2>VLESS / XHTTP 链接解析</h2><div class="parse"><input id="link" placeholder="粘贴 vless:// 链接"><button onclick="parseLink()">解析</button></div></div>
<div class="card"><h2>上行配置</h2><div class="grid">
<div><label>地址</label><input id="address" placeholder="example.com"></div>
<div><label>端口</label><input id="port" type="number" value="443"></div>
<div><label>UUID</label><input id="uuid" placeholder="UUID"></div>
<div><label>Security</label><select id="security"><option value="tls">tls</option><option value="none">none</option></select></div>
<div><label>XHTTP Mode</label><select id="mode"><option value="stream-up">stream-up</option><option value="packet-up">packet-up</option></select></div>
<div><label>Path</label><input id="path" placeholder="/xhttp"></div>
<div><label>SNI</label><input id="sni" placeholder="留空使用地址"></div>
<div><label>Host</label><input id="host" placeholder="留空使用 SNI"></div>
<div><label>优选 IP / 域名</label><input id="preferredIP" placeholder="可选"></div>
</div></div>
<div class="card"><h2>下行配置</h2><div class="grid">
<div><label>下行地址</label><input id="downloadAddress" placeholder="CloudFront 域名"></div>
<div><label>下行端口</label><input id="downloadPort" type="number" value="443"></div>
<div><label>下行 Mode</label><select id="downloadMode"><option value="follow">跟随上行</option><option value="stream-up">stream-up</option><option value="packet-up">packet-up</option></select></div>
<div><label>下行 Security</label><select id="downloadSecurity"><option value="tls">tls</option><option value="none">none</option></select></div>
<div><label>下行 SNI</label><input id="downloadSNI"></div>
<div><label>下行 Path</label><input id="downloadPath" placeholder="留空跟随上行"></div>
<div><label>下行优选 IP / 域名</label><input id="downloadPreferredIP"></div>
</div></div>
<div class="card"><h2>连接调优</h2><div class="grid">
<div><label>最大并发</label><input id="maxConcurrency" type="number"></div>
<div><label>最大连接</label><input id="maxConnections" type="number"></div>
<div><label>复用上限</label><input id="reuse" type="number"></div>
<div><label>每连接请求数</label><input id="requests" type="number"></div>
<div><label>存活秒数</label><input id="idle" type="number"></div>
<div><label>心跳秒数</label><input id="heartbeat" type="number"></div>
<div><label>填充字节</label><input id="padding" type="number"></div>
</div><p class="hint">全部留空时不写入调优字段。</p></div>
<div class="card"><h2>生成结果</h2><div class="buttons"><button onclick="generate()">生成 Xray JSON</button><button onclick="copyConfig()">复制配置</button><button onclick="clearAll()">清空</button></div><br><textarea id="output" placeholder="生成结果会显示在这里"></textarea></div>
</div>
<script>
const v=id=>document.getElementById(id).value.trim();
const n=id=>{const x=v(id);return x===""?undefined:Number(x)};
function setv(id,x){if(x!==undefined&&x!==null)document.getElementById(id).value=x}
function parseLink(){
  try{
    const raw=v('link');
    if(!raw.startsWith('vless://')) throw new Error('请输入 vless:// 链接');
    const u=new URL(raw);
    setv('uuid',decodeURIComponent(u.username));setv('address',u.hostname);setv('port',u.port||443);
    const p=u.searchParams;
    setv('security',p.get('security')||'tls');setv('path',p.get('path')||'/');setv('sni',p.get('sni')||'');setv('host',p.get('host')||'');
    setv('mode',p.get('mode')||p.get('xhttpMode')||'stream-up');
    alert('解析完成');
  }catch(e){alert('解析失败：'+e.message)}
}
function generate(){
  const address=v('preferredIP')||v('address');
  const sni=v('sni')||v('address');
  const host=v('host')||sni;
  const path=v('path')||'/';
  const da=v('downloadPreferredIP')||v('downloadAddress');
  const dsni=v('downloadSNI')||v('downloadAddress');
  const dpath=v('downloadPath')||path;
  const dmode=v('downloadMode')==='follow'?v('mode'):v('downloadMode');
  const xs={mode:v('mode'),path,host,downloadSettings:{address:da,port:Number(v('downloadPort')||443),mode:dmode,security:v('downloadSecurity'),serverName:dsni,path:dpath}};
  const tuning={maxConcurrency:n('maxConcurrency'),maxConnections:n('maxConnections'),reuse:n('reuse'),requests:n('requests'),idle:n('idle'),heartbeat:n('heartbeat'),padding:n('padding')};
  for(const [k,val] of Object.entries(tuning)) if(val!==undefined) xs[k]=val;
  const config={protocol:'vless',settings:{vnext:[{address,port:Number(v('port')||443),users:[{id:v('uuid'),encryption:'none'}]}]},streamSettings:{network:'xhttp',security:v('security'),tlsSettings:{serverName:sni},xhttpSettings:xs}};
  document.getElementById('output').value=JSON.stringify(config,null,2);
}
async function copyConfig(){if(!v('output'))generate();try{await navigator.clipboard.writeText(v('output'));alert('已复制')}catch(e){alert('复制失败，请手动复制')}}
function clearAll(){document.querySelectorAll('input').forEach(x=>{if(x.id!=='port'&&x.id!=='downloadPort')x.value=''});document.getElementById('output').value=''}
</script>
</body></html>`;
