const http=require('http');
const fs=require('fs');
const path=require('path');
const root=process.cwd();
const server=http.createServer((req,res)=>{
  let urlPath = decodeURIComponent((req.url||'/').split('?')[0]);
  if(urlPath==='/' ) urlPath='/allocation-mindmap.html'; // 默认首页为当前页面
  const filePath=path.join(root, urlPath.replace(/^\//,''));
  fs.readFile(filePath, (err,data)=>{
    if(err){
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.end('Not found');
    }else{
      const ext=path.extname(filePath).toLowerCase();
      const type=
        ext==='.html'? 'text/html' :
        ext==='.css'? 'text/css' :
        ext==='.js'? 'application/javascript' :
        ext==='.svg'? 'image/svg+xml' :
        ext==='.png'? 'image/png' :
        'text/plain';
      res.writeHead(200, {'Content-Type': type});
      res.end(data);
    }
  });
});
const PORT = process.env.PORT || 5513;
const HOST = process.env.HOST || '127.0.0.1';
server.listen(PORT, HOST, ()=> console.log(`Preview: http://${HOST}:${PORT}/allocation-mindmap.html`));