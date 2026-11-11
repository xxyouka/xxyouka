"use strict";
const projects={"cat": {"title": "校园猫猫", "category": "数字产品 / 校园社区", "description": "一个围绕校园猫咪信息与救助协作的微信小程序，将分散的信息整理为可以持续维护的档案。", "points": ["猫咪档案、相册与偶遇记录，让个体信息有迹可循。", "关注与反馈连接日常使用，公开救助进展。", "使用原生微信小程序与 CloudBase，持续迭代管理功能。"]}, "pet": {"title": "pet-id", "category": "AI 探索 / 个体检索", "description": "一个独立推进的宠物个体识别实验，从图片中检测动物、提取特征，再与底库比对。", "points": ["建立检测、特征提取、相似度检索的处理链路。", "通过独立网页测试台观察识别与检索结果。", "关注相似个体与无法识别的情况，继续探索实际边界。"]}, "ninth": {"title": "一只猫的第九条命", "category": "互动创作 / 多模态叙事", "description": "粤港澳大湾区大学生艺术节数智创新类互动叙事作品。观众扮演一只校园流浪猫，做四次选择，走向五个结局。", "points": ["设计分支节点与结局，让选择带来可感知的后果。", "结合插画、文字、氛围声音与 AI 生成，构建阅读体验。", "支持手机与电脑浏览，并提供结局分享海报。"], "url": "https://jiutiaoming.pages.dev", "linkLabel": "体验作品 ↗"}, "meal": {"title": "双人食刻", "category": "数字产品 / 生活工具", "description": "面向两个人的家庭餐桌小程序，把菜谱、点菜、库存与做饭轮值放进同一个共享空间。", "points": ["共享菜谱与点菜，整理当餐菜单与餐后评价。", "结合库存与采购清单，减少重复记录。", "围绕两人空间设计账号、数据隔离与美食相册。"]}};
const caseMeta={"cat":{"year":"2026","role":"产品设计与开发","stack":"微信小程序 · CloudBase","accent":"#fab387","outcome":"把分散的校园猫咪信息收拢成可维护、可回访的档案。","evidence":[{"value":"117","label":"猫咪档案"},{"value":"1,382","label":"相册"},{"value":"4.4w","label":"浏览"}],"evidenceNote":"数据来自小程序界面截图 / 2026-11；公开截图中的项目名已替换为公开用名「校园猫猫」。","process":[{"n":"01","title":"档案优先","text":"先以猫为档案中心，而不是以帖子或相册为中心。"},{"n":"02","title":"归并信息","text":"把偶遇、相册和救助进展挂到同一只猫。"},{"n":"03","title":"建立回路","text":"用关注、反馈与回访，把一次记录变成持续关系。"}],"tradeoff":"优先做可维护的档案结构，而不是先做信息流。先保证每只猫能被找到，再谈互动。","next":"把救助状态推进到可流转的流程，并让回访有提醒，让档案从「可查」走向「可跟进」。"},"pet":{"year":"2026","role":"独立实验","stack":"检测 · 特征提取 · 向量检索","accent":"#cba6f7","outcome":"打通检测、特征提取与底库检索，并在测试台里观察相似个体与无法识别的情况。","evidence":[{"value":"84.4%","label":"留出图 Top-1"},{"value":"1,235","label":"底库图片"},{"value":"111","label":"猫咪个体"}],"evidenceNote":"数据来自 pet-id 测试台界面 / 2026-11：199 张留出图、底库约 11 张/猫；Top-1 84.4% 为测试口径，非线上准确率。","process":[{"n":"01","title":"检测","text":"先检测猫并裁出面积最大的一只，减少多猫照片的干扰。"},{"n":"02","title":"特征","text":"把个体外观编码成特征，按猫聚合底库参考图。"},{"n":"03","title":"检索","text":"对候选做相对分数排序，把 Top-K 交给测试台人工确认。"}],"tradeoff":"先做可解释的 top-k 排序，而不是直接判断「是不是同一只」。相似个体和低分候选需要人来复核。","next":"把 199 张留出图固化为回归集，观察阈值变化对误匹配和漏识别的影响，再补更难负样本。"},"ninth":{"year":"2026","role":"叙事与前端","stack":"H5 · 分支叙事 · 生成式 AI","accent":"#94e2d5","outcome":"把四次选择做成可感知的分支体验，并留下可分享的结局海报。","evidence":[{"value":"4","label":"次选择"},{"value":"5","label":"个结局"},{"value":"LIVE","label":"在线体验"}],"evidenceNote":"数据来自在线作品说明（jiutiaoming.pages.dev）：观众扮演一只校园流浪猫，做四次选择，走向五个结局；手机与电脑均可打开。","process":[{"n":"01","title":"选择","text":"把故事收束成四次选择，让每次选择都改变后续。"},{"n":"02","title":"内容","text":"用插画、文字、氛围声音与 AI 生成组成同一条阅读节奏。"},{"n":"03","title":"交付","text":"做成手机和电脑都能直接打开的 H5，并生成结局分享海报。"}],"tradeoff":"用四次选择收束出五个结局，而不是无限铺分支。每个选择都要有可感知的后果，内容量才能被控制。","next":"让结局分享海报带上本次选择路径，并把分支扩展到更多可回访的节点。"},"meal":{"year":"2026","role":"产品设计与开发","stack":"微信小程序 · CloudBase","accent":"#f9e2af","outcome":"菜谱、点菜、库存与轮值整合进同一个两人共享空间。","evidence":[{"value":"31","label":"道菜谱"},{"value":"2","label":"餐次 / 天"},{"value":"2","label":"人共享空间"}],"evidenceNote":"数据来自双人食刻界面截图 / 2026-11：午餐与晚餐两个餐次；菜谱卡按现有库存显示可满足项（如 3/6、2/5）。","process":[{"n":"01","title":"共享空间","text":"先建立两个人的共享空间，账号与数据隔离。"},{"n":"02","title":"当餐菜单","text":"把菜谱、点菜和当餐菜单放在同一条路径上。"},{"n":"03","title":"日常回路","text":"用库存、采购与轮值把下一餐的决策接上。"}],"tradeoff":"先做两人共享的最小闭环，而不是大而全的菜谱社区。库存和采购放进同一个空间，减少重复记录。","next":"继续把库存消耗、优先推荐与采购清单串成自动回路，减少手动维护。"}};
const caseNotes={"cat": {"question": "如何让分散的校园猫咪信息，被持续记录和使用？", "approach": "以猫咪个体档案为中心，连接偶遇、相册与救助记录，让关心落到具体的信息和行动上。", "images": [["assets/campus-full-neutral-20261102.jpg", "实际首页 · 模拟器", true], ["assets/campus-brand-neutral-20261102.webp", "项目品牌分享卡"]]}, "pet": {"question": "外观相似的宠物，能否通过图像区分到个体？", "approach": "将检测、特征提取与底库检索串起来，通过测试台观察相似个体和无法识别的情况。", "images": [["assets/pet-full-20261101.jpg", "真实样本 · 识别结果"]]}, "ninth": {"question": "怎样让观众通过选择，感受流浪猫生命中的不同可能？", "approach": "将分支节点、结局判定与多模态内容结合，让每次选择都有后果，并把故事做成可直接体验的网页。", "images": [["assets/ninth-full-20261101.jpg", "开场 · 雨夜"], ["assets/ninth-choice.webp", "互动 · 选择"]]}, "meal": {"question": "今晚吃什么、谁来做，以及冰箱还剩什么？", "approach": "围绕两人共享空间，整合点菜、当餐菜单、库存、采购与轮值，把分散的餐桌日常放到一起。", "images": [["assets/meal-full-20261101.jpg", "实际首页 · 模拟器", true], ["assets/meal-recipes-full-20261101.jpg", "实际菜谱 · 模拟器", true]]}};
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const dialog=$('#project-dialog'),viewer=$('#image-viewer');
let currentKey='',galleryIndex=0,lastTrigger=null;let ownsCaseRoute=false,closingFromRoute=false;const projectOrder=$$('.project .visual[data-project]').map(x=>x.dataset.project);
function syncLock(){document.body.classList.toggle('modal-open',dialog.open||viewer.open)}
function closeOnBackdrop(element){element.addEventListener('click',event=>{if(event.target!==element)return;const r=element.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)element.close()})}
[dialog,viewer].forEach(element=>{element.querySelector('.close').addEventListener('click',()=>element.close());element.addEventListener('close',syncLock);closeOnBackdrop(element)});
function imagesFor(key){return caseNotes[key]?.images||[]}
function showCover(key,index){const host=$('#dialog-cover');host.replaceChildren();const images=imagesFor(key);galleryIndex=index;const image=document.createElement('img');image.className='cover-art real-cover';image.src=images[index][0];image.alt=images[index][1];host.append(image);const zoom=document.createElement('button');zoom.className='zoom-image';zoom.type='button';zoom.textContent='放大查看 ↗';zoom.addEventListener('click',()=>{$('#full-image').src=image.src;$('#full-image').alt=image.alt;viewer.querySelector('.image-caption').textContent=image.alt;viewer.showModal();syncLock()});host.append(zoom);host.classList.toggle('cover-phone',Boolean(images[index][2]));$$('#case-gallery button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)))}
function openProject(key,trigger,updateRoute=true){if(!Object.hasOwn(projects,key))return;const project=projects[key];const wasOpen=dialog.open;currentKey=key;if(trigger)lastTrigger=trigger;const index=projectOrder.indexOf(key);$('#case-index').textContent=String(index+1).padStart(2,'0')+' / '+String(projectOrder.length).padStart(2,'0');$('#case-prev').disabled=index===0;$('#case-next').disabled=index===projectOrder.length-1;$('#share-status').textContent='';$('#share-url').hidden=true;$('#dialog-title').textContent=project.title;$('#dialog-category').textContent=project.category;$('#dialog-description').textContent=project.description;const meta=caseMeta[key];const facts=$('#case-facts');facts.replaceChildren();if(meta){[['YEAR',meta.year],['ROLE',meta.role],['STACK',meta.stack]].forEach(([label,value])=>{const cell=document.createElement('div');const b=document.createElement('span');b.textContent=label;const s=document.createElement('strong');s.textContent=value;cell.append(b,s);facts.append(cell)})}const outcome=$('#case-outcome');outcome.replaceChildren();if(meta?.outcome){const h=document.createElement('h3');h.textContent='结果';const p=document.createElement('p');p.textContent=meta.outcome;outcome.append(h,p)}dialog.style.setProperty('--case-accent',meta?.accent||'#cba6f7');const process=$('#case-process');process.replaceChildren();if(meta?.process){const ph=document.createElement('h3');ph.textContent='过程 / PROCESS';process.append(ph);const grid=document.createElement('div');grid.className='case-steps';meta.process.forEach(step=>{const d=document.createElement('div');d.className='case-step';const n=document.createElement('b');n.textContent=step.n;const t=document.createElement('strong');t.textContent=step.title;const txt=document.createElement('p');txt.textContent=step.text;d.append(n,t,txt);grid.append(d)});process.append(grid);if(meta.tradeoff){const q=document.createElement('blockquote');q.className='case-tradeoff';const l=document.createElement('span');l.textContent='TRADEOFF / 取舍';const qt=document.createElement('p');qt.textContent=meta.tradeoff;q.append(l,qt);process.append(q)}if(meta.next){const nx=document.createElement('p');nx.className='case-next';const nb=document.createElement('b');nb.textContent='NEXT';nx.append(nb,document.createTextNode(meta.next));process.append(nx)}}const evidence=$('#case-evidence');evidence.replaceChildren();if(meta?.evidence){const eh=document.createElement('h3');eh.textContent='证据 / EVIDENCE';evidence.append(eh);const metrics=document.createElement('div');metrics.className='case-metrics';meta.evidence.forEach(item=>{const d=document.createElement('div');d.className='case-metric';const v=document.createElement('b');v.textContent=item.value;const s=document.createElement('span');s.textContent=item.label;d.append(v,s);metrics.append(d)});evidence.append(metrics);if(meta.evidenceNote){const note=document.createElement('p');note.className='case-evidence-note';note.textContent=meta.evidenceNote;evidence.append(note)}}$('#dialog-points').replaceChildren(...project.points.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));const link=dialog.querySelector('.dialog-links a');link.href=project.url||'https://github.com/xxyouka';link.textContent=project.linkLabel||'浏览我的公开项目 ↗';const delivery=projectDelivery[key];const deliveryHost=$('#case-delivery');deliveryHost.replaceChildren();if(delivery){const label=document.createElement('h3');label.textContent='交付形态';const text=document.createElement('p');text.textContent=delivery;deliveryHost.append(label,text)}const context=$('#case-context');context.replaceChildren();const note=caseNotes[key];if(note){[['问题',note.question],['思路',note.approach]].forEach(([title,text])=>{const section=document.createElement('section');const h=document.createElement('h3');h.textContent=title;const p=document.createElement('p');p.textContent=text;section.append(h,p);context.append(section)})}const gallery=$('#case-gallery');gallery.replaceChildren();const images=imagesFor(key);if(images.length>1){images.forEach(([,title],index)=>{const button=document.createElement('button');button.type='button';button.textContent=title;button.setAttribute('aria-pressed',String(index===0));button.addEventListener('click',()=>showCover(key,index));gallery.append(button)})}showCover(key,0);if(!wasOpen)dialog.showModal();dialog.scrollTop=0;syncLock();if(updateRoute){const route='#project/'+key;if(wasOpen)history.replaceState(history.state,'',route);else{const base=location.hash||'#work';history.pushState({portfolioCase:true,base},'',route);ownsCaseRoute=true}}}
$$('[data-project]').forEach(button=>button.addEventListener('click',event=>{if(button.tagName==='A'){if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault()}openProject(button.dataset.project,button)}));
dialog.addEventListener('close',()=>{if(!closingFromRoute&&location.hash.startsWith('#project/')){if(ownsCaseRoute){ownsCaseRoute=false;history.back()}else history.replaceState(null,'','#work')}closingFromRoute=false;if(lastTrigger?.isConnected&&lastTrigger.getClientRects().length)lastTrigger.focus({preventScroll:true});else $('#work').focus({preventScroll:true})});
dialog.addEventListener('keydown',event=>{if(viewer.open||event.target.closest('input, textarea, select, [contenteditable="true"]')||!['ArrowLeft','ArrowRight'].includes(event.key))return;const images=imagesFor(currentKey);if(images.length<2)return;event.preventDefault();showCover(currentKey,(galleryIndex+(event.key==='ArrowRight'?1:-1)+images.length)%images.length)});
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{$$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$$('.project').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&!card.dataset.category.split(' ').includes(button.dataset.filter);if(!card.hidden)card.classList.add('in-view')});$('.result-count').textContent=String($$('.project:not([hidden])').length).padStart(2,'0')+' / 作品';requestAnimationFrame(updateScroll)}));
const nav=$('#main-nav'),menu=$('.nav-toggle');function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','打开导航');menu.textContent='☰'}menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'关闭导航':'打开导航');menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus()}});document.addEventListener('click',e=>{if(!e.target.closest('.top'))closeMenu()});
let scrollPending=false;const progress=$('.progress'),tools=$('.reading-tools');const sections=[$('.stage'),...$$('.below>.section')];
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform='scaleX('+(max>0?Math.max(0,Math.min(1,scrollY/max)):0)+')';tools.classList.toggle('is-reading',scrollY>250);let active='';sections.forEach(section=>{if(section.getBoundingClientRect().top<innerHeight*.4)active=section.id||''});nav.querySelectorAll('a[href^="#"]').forEach(a=>{if(a.hash==='#'+active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});scrollPending=false}
window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateScroll)}},{passive:true});window.addEventListener('resize',()=>{if(innerWidth>600)closeMenu();updateScroll()});window.addEventListener('load',updateScroll);updateScroll();
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.06});$$('.project,.more-work').forEach(element=>{element.classList.add('js-reveal');observer.observe(element)})}

$('#case-prev').addEventListener('click',()=>{const index=projectOrder.indexOf(currentKey);if(index>0){openProject(projectOrder[index-1]);$('#dialog-title').focus({preventScroll:true})}});
$('#case-next').addEventListener('click',()=>{const index=projectOrder.indexOf(currentKey);if(index<projectOrder.length-1){openProject(projectOrder[index+1]);$('#dialog-title').focus({preventScroll:true})}});
$('#share-case').addEventListener('click',async()=>{const url=new URL(location.href);url.hash='project/'+currentKey;try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(url.href);$('#share-status').textContent='链接已复制'}catch{const input=$('#share-url');input.value=url.href;input.hidden=false;input.focus();input.select();$('#share-status').textContent='选中链接后复制即可'}});
function syncCaseRoute(){const key=location.hash.startsWith('#project/')?location.hash.slice(9):'';if(Object.hasOwn(projects,key)){if(!dialog.open||currentKey!==key){if(viewer.open)viewer.close();ownsCaseRoute=Boolean(history.state?.portfolioCase);openProject(key,null,false)}}else if(dialog.open){if(viewer.open)viewer.close();closingFromRoute=true;dialog.close();ownsCaseRoute=false}}
window.addEventListener('popstate',syncCaseRoute);window.addEventListener('hashchange',syncCaseRoute);

const projectDelivery={cat:'微信小程序 · 猫咪档案、偶遇与救助信息管理',pet:'独立识别实验 · 检测、特征提取、底库检索与网页测试台',ninth:'可体验的 H5 互动作品 · 分支叙事、AI 生成与结局分享',meal:'双人共享小程序 · 菜谱、点菜、库存与轮值管理'};
$('#copy-email').addEventListener('click',async()=>{try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText('1420272691@qq.com');$('#email-status').textContent='邮箱已复制，可以粘贴到邮件中'}catch{$('#email-status').textContent='邮箱：1420272691@qq.com'}});

syncCaseRoute();

/* V3: pixel-transition preview + pointer spotlight (vanilla, hover-capable only) */
(() => {
  const visuals = $$('.project .visual[data-project]');
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!visuals.length || !canHover || reduced) return;
  const COLS = 34, ROWS = 22;
  const accents = { ninth: '#94e2d5', cat: '#fab387', pet: '#cba6f7', meal: '#f9e2af' };
  const twoShots = new Set(['ninth', 'cat', 'meal']);

  const roundRect = (c, x, y, w, h, r) => {
    const rr = Math.min(r, w / 2, h / 2);
    c.beginPath();
    c.moveTo(x + rr, y);
    c.arcTo(x + w, y, x + w, y + h, rr);
    c.arcTo(x + w, y + h, x, y + h, rr);
    c.arcTo(x, y + h, x, y, rr);
    c.arcTo(x, y, x + w, y, rr);
    c.closePath();
  };

  visuals.forEach(el => {
    const key = el.dataset.project;
    const shots = (caseNotes[key]?.images || []).slice(0, twoShots.has(key) ? 2 : 1).map(item => item[0]);
    if (!shots.length) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'pixel-preview';
    canvas.setAttribute('aria-hidden', 'true');
    const scrim = document.createElement('span');
    scrim.className = 'hover-scrim';
    scrim.setAttribute('aria-hidden', 'true');
    const spot = document.createElement('span');
    spot.className = 'spotlight';
    spot.setAttribute('aria-hidden', 'true');
    el.append(canvas, scrim, spot);
    el.classList.add('preview-ready');
    const ctx = canvas.getContext('2d');
    const off = document.createElement('canvas');
    const offCtx = off.getContext('2d');
    const images = shots.map(src => ({ el: new Image(), ok: false, src }));
    let ready = false, loading = false, settled = 0;
    let cw = 0, ch = 0, raf = 0, cells = [], full = false, pending = null;
    const accent = accents[key] || '#cba6f7';
    spot.style.setProperty('--spot', accent + '2b');

    function load() {
      if (loading || ready) return;
      loading = true;
      images.forEach(state => {
        state.el.decoding = 'async';
        const done = () => {
          state.ok = true;
          if (++settled === images.length) {
            ready = true;
            loading = false;
            resize();
            if (pending) { const p = pending; pending = null; start(p.x, p.y); }
          }
        };
        state.el.onload = done;
        state.el.onerror = done;
        state.el.src = state.src;
      });
    }

    function drawFrame(state, cx, cy, maxW, maxH, angle) {
      if (!state.ok) return;
      const im = state.el;
      const ia = im.naturalWidth / im.naturalHeight;
      let iw, ih;
      if (ia > maxW / maxH) { iw = maxW; ih = iw / ia; }
      else { ih = maxH; iw = ih * ia; }
      const pad = Math.max(4, Math.round(cw * 0.012));
      const fw = iw + pad * 2, fh = ih + pad * 2;
      offCtx.save();
      offCtx.translate(cx, cy);
      offCtx.rotate(angle);
      offCtx.shadowColor = 'rgba(0,0,0,.55)';
      offCtx.shadowBlur = Math.round(cw * 0.04);
      offCtx.shadowOffsetY = Math.round(cw * 0.012);
      offCtx.fillStyle = '#0b0b12';
      roundRect(offCtx, -fw / 2, -fh / 2, fw, fh, pad * 1.6);
      offCtx.fill();
      offCtx.shadowColor = 'transparent';
      offCtx.strokeStyle = accent + '4d';
      offCtx.lineWidth = Math.max(1, cw / 1000);
      roundRect(offCtx, -fw / 2, -fh / 2, fw, fh, pad * 1.6);
      offCtx.stroke();
      offCtx.save();
      roundRect(offCtx, -iw / 2, -ih / 2, iw, ih, pad * 1.1);
      offCtx.clip();
      offCtx.drawImage(im, -iw / 2, -ih / 2, iw, ih);
      offCtx.restore();
      offCtx.restore();
    }

    function source() {
      if (!ready) return;
      off.width = cw;
      off.height = ch;
      const W = cw, H = ch;
      offCtx.fillStyle = '#11111b';
      offCtx.fillRect(0, 0, W, H);
      if (images[0].ok) {
        const im = images[0].el;
        const ia = im.naturalWidth / im.naturalHeight;
        const ca = W / H;
        let sw, sh, sx = 0;
        if (ia > ca) { sh = im.naturalHeight; sw = sh * ca; sx = (im.naturalWidth - sw) / 2; }
        else { sw = im.naturalWidth; sh = sw / ca; }
        offCtx.globalAlpha = 0.14;
        offCtx.drawImage(im, sx, 0, sw, sh, 0, 0, W, H);
        offCtx.globalAlpha = 1;
        offCtx.fillStyle = 'rgba(17,17,27,.68)';
        offCtx.fillRect(0, 0, W, H);
      }
      const glow = offCtx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, W * 0.68);
      glow.addColorStop(0, accent + '26');
      glow.addColorStop(1, accent + '00');
      offCtx.fillStyle = glow;
      offCtx.fillRect(0, 0, W, H);
      const gap = Math.max(10, Math.round(W / 46));
      const dot = Math.max(0.5, gap * 0.04);
      offCtx.fillStyle = 'rgba(186,194,222,.10)';
      for (let y = gap; y < H; y += gap) {
        for (let x = gap; x < W; x += gap) {
          offCtx.beginPath();
          offCtx.arc(x, y, dot, 0, Math.PI * 2);
          offCtx.fill();
        }
      }
      if (images.length > 1) {
        drawFrame(images[0], W * 0.38, H * 0.51, W * 0.46, H * 0.7, -2.5 * Math.PI / 180);
        drawFrame(images[1], W * 0.67, H * 0.55, W * 0.42, H * 0.6, 3.5 * Math.PI / 180);
      } else {
        drawFrame(images[0], W * 0.5, H * 0.5, W * 0.54, H * 0.72, -1.5 * Math.PI / 180);
      }
    }

    function resize() {
      if (!ready) return;
      const r = el.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const nw = Math.max(1, Math.round(r.width * dpr));
      const nh = Math.max(1, Math.round(r.height * dpr));
      if (nw === cw && nh === ch) return;
      cw = nw; ch = nh;
      canvas.width = cw; canvas.height = ch;
      source();
      if (full) { ctx.clearRect(0, 0, cw, ch); ctx.drawImage(off, 0, 0); }
    }

    function block(c) {
      const x0 = Math.floor(c.x * cw / COLS), x1 = Math.floor((c.x + 1) * cw / COLS);
      const y0 = Math.floor(c.y * ch / ROWS), y1 = Math.floor((c.y + 1) * ch / ROWS);
      ctx.drawImage(off, x0, y0, x1 - x0, y1 - y0, x0, y0, x1 - x0, y1 - y0);
    }

    function makeCells(ox, oy) {
      const list = [];
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const nx = (x + 0.5) / COLS, ny = (y + 0.5) / ROWS;
          const d = Math.hypot(nx - ox, ny - oy);
          list.push({ x, y, t: Math.min(0.94, d * 0.78 + Math.random() * 0.12), done: false, cleared: false });
        }
      }
      return list.sort((a, b) => a.t - b.t);
    }

    function start(ox, oy) {
      if (!ready) { pending = { x: ox, y: oy }; load(); return; }
      cancelAnimationFrame(raf);
      resize();
      if (!cw || !ch) return;
      ctx.clearRect(0, 0, cw, ch);
      full = false;
      cells = makeCells(ox, oy);
      const t0 = performance.now(), dur = 640;
      function frame(now) {
        const t = Math.min(1, (now - t0) / dur);
        for (const c of cells) {
          if (!c.done && c.t <= t) { block(c); c.done = true; }
        }
        if (t < 1) raf = requestAnimationFrame(frame);
        else { ctx.clearRect(0, 0, cw, ch); ctx.drawImage(off, 0, 0); full = true; }
      }
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      cancelAnimationFrame(raf);
      pending = null;
      if (!ready || !cw) return;
      if (!cells.length) { ctx.clearRect(0, 0, cw, ch); full = false; return; }
      const t0 = performance.now(), dur = 300;
      const list = cells.slice().reverse();
      function frame(now) {
        const t = Math.min(1, (now - t0) / dur);
        for (const c of list) {
          if (!c.cleared && (1 - c.t) <= t) {
            const x0 = Math.floor(c.x * cw / COLS), x1 = Math.floor((c.x + 1) * cw / COLS);
            const y0 = Math.floor(c.y * ch / ROWS), y1 = Math.floor((c.y + 1) * ch / ROWS);
            ctx.clearRect(x0, y0, x1 - x0, y1 - y0);
            c.cleared = true;
          }
        }
        if (t < 1) raf = requestAnimationFrame(frame);
        else { ctx.clearRect(0, 0, cw, ch); full = false; }
      }
      raf = requestAnimationFrame(frame);
    }

    function place(e) {
      const r = el.getBoundingClientRect();
      return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    }

    el.addEventListener('pointerenter', e => {
      const r = el.getBoundingClientRect();
      spot.style.setProperty('--sx', `${e.clientX - r.left}px`);
      spot.style.setProperty('--sy', `${e.clientY - r.top}px`);
      const p = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
      if (!ready) { pending = p; load(); } else start(p.x, p.y);
    });
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      spot.style.setProperty('--sx', `${e.clientX - r.left}px`);
      spot.style.setProperty('--sy', `${e.clientY - r.top}px`);
      if (!ready && pending) pending = place(e);
    }, { passive: true });
    el.addEventListener('pointerleave', stop);
    el.addEventListener('pointercancel', stop);
    el.addEventListener('focus', () => {
      if (!el.matches(':focus-visible')) return;
      if (!ready) { pending = { x: 0.5, y: 0.5 }; load(); } else start(0.5, 0.5);
    });
    el.addEventListener('blur', stop);
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(el);
  });
})();