'use strict';

const fs = require('fs');
const { JSDOM } = require('jsdom');
const URL = 'https://game8.jp/mhw/185081/';

(async () => {

  const dom = await JSDOM.fromURL(URL, {
    includeNodeLocations: true
  });

  const wrapper = dom.window.document.getElementsByClassName('archive-style-wrapper')[0];

  const data = [];
  const toJSON = {};

  const parseSkill = (elem) => {
    elem.innerHTML = elem.innerHTML.replace(/(&nbsp;| |\n)/g, '');
    if (elem.innerHTML === '-') {
      return {
        name: '-',
        lv: '-' 
      };
    }
    else return {
      name: elem.children[0].innerHTML.match(/(^.+\<)/).shift().slice(0, -1),
      lv: elem.innerHTML.match(/(スキルLv[0-9])/).shift().split('').pop()
    };
  };

  const jp = 'あかさたなはまやらわ'.split('');
  for (let i = 0; i < 10; i++) {
    const point = dom.window.document.getElementById(`hm_${i + 1}`);
    const index = [...wrapper.children].indexOf(point) + 1;
    data.push([...wrapper.children][index]);
  }

  data.forEach((table, i) => {
    toJSON[jp[i]] = [];
    if (table instanceof dom.window.HTMLTableElement) {
      const tbody = table.children[0];
      let obj = {};
      [...tbody.children].forEach((tr, index) => {
        if (index !== 0) {
          if (index % 2 === 1) {
            obj.name = tr.children[0].children[0].innerHTML;
            obj.skl1 = parseSkill(tr.children[1]);
          }
          else {
            obj.skl2 = parseSkill(tr.children[0]);
            toJSON[jp[i]].push(obj);
            obj = {};
          }
        }
      });
    }
  });

  fs.writeFileSync('./MHW_ACCESORY.json', JSON.stringify(toJSON, undefined, 4));

})();
