'use strict';

const fs = require('fs');
const { JSDOM } = require('jsdom');
const URL = 'https://game8.jp/mhw/200096/';

(async() => {

  const dom = await JSDOM.fromURL(URL, {
    includeNodeLocations: true
  });

  const wrapper = dom.window.document.getElementsByClassName('archive-style-wrapper')[0];

  const data = {};
  const toJSON = {};

  let cls = 9;
  for (let i = 0; i < [...wrapper.children].length; i++) {
    const v = [...wrapper.children][i];
    if (v.id === `hm_${cls}`) {
      data[`rare${cls-8}`] = [];
      while(1) {
        i++;
        const elem = [...wrapper.children][i];
        if (elem.tagName !== 'TABLE') break;
        data[`rare${cls-8}`].push(elem);
      }
      cls++;
    }
    if (cls === 17) break;
  }

  for (const [k, v] of Object.entries(data)) {
    toJSON[k] = [];
    for (const value of v) {
      const obj = {};
      obj.name = value.children[0].children[0].children[0].children[0].innerHTML;
      obj.slot = value.children[0].children[3].children[1].innerHTML;
      obj.atk  = value.children[0].children[5].children[0].innerHTML;
      obj.def  = value.children[0].children[5].children[1].innerHTML;
      obj.cri  = value.children[0].children[5].children[2].innerHTML;
      obj.type = value.children[0].children[5].children[3].innerHTML;
      obj.anti = value.children[0].children[5].children[4].innerHTML;
      for (const [status, param] of Object.entries(obj)) {
        obj[status] = param.replace(/(&nbsp;| )/g, '');
      }
      toJSON[k].push(obj);
    }
  }

  fs.writeFileSync('./MHW_WEP_LANCE.json', JSON.stringify(toJSON, undefined, 4));

})();
