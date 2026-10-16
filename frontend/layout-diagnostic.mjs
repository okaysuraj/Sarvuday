import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage({viewport:{width:390,height:900}});
await page.goto('http://127.0.0.1:4174/login');
await page.waitForSelector('form');
console.log(JSON.stringify(await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('*')].map(el=>({el,box:el.getBoundingClientRect()})).filter(({box})=>box.width>0&&(box.right>innerWidth+1||box.left< -1)).slice(0,15).map(({el,box})=>({tag:el.tagName,className:el.className,x:box.x,width:box.width,text:el.textContent.slice(0,60)}))})),null,2));
await browser.close();
