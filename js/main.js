$(function(){
	const parts = ['wepon','head','body','arm','belt','foot','stone'];
	let selectedItemSkill = {
		wepon:[],
		head:[],
		body:[],
		arm:[],
		belt:[],
		foot:[],
		stone:[],
	}
	let selectedItemStatus = {
		wepon:[],
		head:[],
		body:[],
		arm:[],
		belt:[],
		foot:[],
		stone:[],
	}
	let selectedItemStatus2 = {
		wepon:[],
		head:[],
		body:[],
		arm:[],
		belt:[],
		foot:[],
		stone:[],
	}
	let selectedItemSlot = {
		wepon:'',
		head:'',
		body:'',
		arm:'',
		belt:'',
		foot:'',
		stone:'',
	}
	for (let rare = 0; rare < weponData.length; rare++) {
		let html;
		html = `<li><span class="rarity">rare: ${rare + 1}</span><ul>`;
		for (let j = 0; j < weponData[rare].length; j++){
			html += `<li><span class="weponItem">${weponData[rare][j][0]}</span>`;
			html += '<ul class="itemStatus">';
			html += `<li class="Slot">${weponData[rare][j][1]}</li>`
			html += `<li class="Status">攻撃力:${weponData[rare][j][2]}</li>`
			html += `<li class="Status">会心:${weponData[rare][j][3]}%</li>`
			html += `<li class="Status">属性:${weponData[rare][j][4]}</li>`
			html += `<li class="Status">龍封力:${weponData[rare][j][5]}</li>`
			html += `<li class="Status2">防御力:${weponData[rare][j][6]}</li>`
			html += '</ul></li>';
		}
		html += '</ul></li>';
		$('#wepon').append(html);
	}
	function loadItemData(){
		for (let i = 0; i < itemData.length; i++) {
			let html;
			for (let j = 0; j < itemData[i].length; j++){
				html = `<ul><li><span class="${parts[i+1]}Item">${itemData[i][j][0]}</span>`;
				html += '<ul class="itemStatus">';
				html += `<li class="Slot">${itemData[i][j][1]}</li>`
				html += `<li class="Status2">防御力:${itemData[i][j][6]}</li>`
				html += `<li class="Status2">火耐性:${itemData[i][j][7]}</li>`
				html += `<li class="Status2">水耐性:${itemData[i][j][8]}</li>`
				html += `<li class="Status2">雷耐性:${itemData[i][j][9]}</li>`
				html += `<li class="Status2">氷耐性:${itemData[i][j][10]}</li>`
				html += `<li class="Status2">龍耐性:${itemData[i][j][11]}</li>`
				for(let k = 12; k < itemData[i][j].length;k++){
					html += `<li class="skill">${itemData[i][j][k]}</li>`
				}
				html += '</ul>';
				html += '</li></ul>';
				$(`#${parts[i+1]}`).append(html);
			}
		}
	}
	loadItemData();
	function loadStoneData(){
		const jpIndexArray = "あかさたなはまやらわ".split(""); 
		let html;
		for (let i = 0; i < stoneData.length; i++) {
			html = `<li><span id="${jpIndexArray[i]}" class="JapaneseIndex">${jpIndexArray[i]}行</span><ul>`;
			for (let j = 0; j < stoneData[i].length; j++){
			 	html += `<li><span class="stoneItem">${stoneData[i][j][0]}</span>`;
			 	html += '<ul class="itemStatus">';
				for(let k = 1; k < stoneData[i][j].length;k++){
					html += `<li class="skill">${stoneData[i][j][k]}</li>`
				}
				html += '</ul>';
				html += '</li>';
			}
			html += '</ul></li>';
			$(`#stone`).append(html);
		}
	}
	loadStoneData();
	function loadAcceData(){
		let html;
		for (let i = 0; i < acceData.length; i++) {
			html = `<li><span class="acceSlot"> スロット数${i+1}</span><ul>`;
			for (let j = 0; j < acceData[i].length; j++){
				html += `<li><span class="acceName">${acceData[i][j][0]}</span>`;
				html += '<ul class="itemStatus">';
				for(let k = 1; k < acceData[i][j].length;k++){
					html += `<li class="skill">${acceData[i][j][k]}</li>`
				}
				html += '</ul>';
				html += '</li>';
			}
			html += '</ul></li>';
			$(`#acce`).append(html);
		}
	}
	loadAcceData();
	let StatusList = {};
	function calcStatus(){
		StatusList = {};
		for(let i = 0;i < parts.length;i++){
			for(let j = 0;j < selectedItemStatus[parts[i]].length;j++){
				if(i == 0){
					//StatusList['防御力'] = 0;
					const statusArray = selectedItemStatus[parts[i]];
					for (let k = 0; k < statusArray.length; k++) {
						let [key, val] = statusArray[k].split(':');
						//if(key == '防御力') StatusList[key] += Number(val);
						/*else */StatusList[key] = val;
					}
				}
			}
		}
	}
	let StatusList2 = {};
	function calcStatus2(){
		StatusList2 = {};
		for(let i = 0;i < parts.length;i++){
			for(let j = 0;j < selectedItemStatus2[parts[i]].length;j++){
				const statusArray2 = selectedItemStatus2[parts[i]][j];
				let [key, val] = statusArray2.split(':');
				if(StatusList2[key] !== undefined){
					StatusList2[key] += Number(val);
				}else{
					StatusList2[key] = Number(val);
				}
			}
		}
	}
	function reflectStatus(){
		let inner = '<ul>';
		for(const [Status,Parameter] of Object.entries(StatusList)){
			inner += `<li>`;
			inner += `<div class="Status">${Status}</div>`;
			inner += `<div class="Parameter">${Parameter}</div>`;
			inner += `</li>`;
		}
		inner += '</ul>';
		$('#statusList').html(inner);
	}
	function reflectStatus2(){
		let inner = '<ul>';
		for(const [Status,Parameter] of Object.entries(StatusList2)){
			inner += `<li>`;
			inner += `<div class="Status">${Status}</div>`;
			inner += `<div class="Parameter">${Parameter}</div>`;
			inner += `</li>`;
		}
		inner += '</ul>';
		$('#statusList2').html(inner);
	}

	let SkillList = {};
	function initSkillList(){
		SkillList = {};
	}
	function calcSkill(){
		for(let i = 1;i < parts.length;i++){
			for(let j = 0;j < selectedItemSkill[parts[i]].length;j++){
				const skill = selectedItemSkill[parts[i]][j];
				const SName = skill.replace(/[0-9]/,"");
				const SLevel = skill.charAt(skill.length-1);
				if(SkillList[SName] !== undefined){
					SkillList[SName] += Number(SLevel);
				}else{
					SkillList[SName] = Number(SLevel);
				}
			}
		}
	}
	function calcAcceSkill(){
		const skill = $('.acceSelector').map(function(){
			return $(this).val();
		});
		for(let i = 0;i < skill.length;i++){
			const SName = skill[i].replace(/[0-9]/,"");
			const SLevel = skill[i].charAt(skill[i].length-1);
			if(SkillList[SName] !== undefined){
				SkillList[SName] += Number(SLevel);
			}else{
				SkillList[SName] = Number(SLevel);
			}
		}
	}
	function reflectSkill(){
		let inner = '<ul>';
		for(const [skillName, skillLevel] of Object.entries(SkillList)){
			//---
			if(skillName == '_') continue;
			//---
			inner += `<li>`;
			inner += `<div class="skill-name">${skillName}:Lv.${skillLevel}</div>`;
			//inner += `<div class="skill-level">Lv.${skillLevel}</div>`;
			inner += `</li>`;
		}
		inner += '</ul>';
		$('#skillList').html(inner);
	}
	function selectAcce(Slot,target){
		for (let i = 0; i < Slot.length; i++) {
			let html = `<select class="acceSelector" name="装飾品">`;
			html += `<option value="_0">-</option>`;
			for(let j = 0; j < Slot[i]; j++){
				for (let k = 0; k < acceData[j].length; k++) {
					html += `<option value="${acceData[j][k][1]}">${acceData[j][k][0]}</option>`;
				}
			}
			html += `</select>`;
			$(target).append(html);
		}
	}
	
	function calcSlot(slotStr){
		let rtn = [];
		for(i = 0;i < 3;i++){
			let char = slotStr.charAt(i);
			switch(char){
				case '①':
					rtn[i] = 1;
					break;
				case '②':
					rtn[i] = 2;
					break;
				case '③':
					rtn[i] = 3;
					break;
				default:
					rtn[i] = 0;
			}
		}
		return rtn;
	}
	function skillLevelLimiter(){
		for(const [skillName, skillLevel] of Object.entries(SkillList)){
			if(maxList[skillName] !== undefined) SkillList[skillName] = Math.min(maxList[skillName], skillLevel); 
		}
	}

    for(let i = 0;i < parts.length;i++){
	    $(`.${parts[i]}Item`).click(function (){
	    	$(`#${parts[i]}Sel`).html('').text($(this).text());
	    	selectedItemSkill[parts[i]] = $(this).parent().find(".skill").map(function(){
	    	 	return $(this).text()});
	    	selectedItemStatus[parts[i]]= $(this).parent().find(".Status").map(function(){
	    	 	return $(this).text()});
	    	selectedItemStatus2[parts[i]]= $(this).parent().find(".Status2").map(function(){
	    	 	return $(this).text()});
	    	selectedItemSlot[parts[i]]= $(this).parent().find(".Slot").text();
	    	calcStatus();
	    	reflectStatus();
	    	calcStatus2();
	    	reflectStatus2();
	    	initSkillList();
	    	calcSkill();
	    	if(i <= 5){
	    		selectAcce(calcSlot(selectedItemSlot[parts[i]]),`#${parts[i]}Sel`);
	    	}
			calcAcceSkill();
			skillLevelLimiter();
	    	reflectSkill();
	    });
	}

	$(document).on('change', '.acceSelector', function(){
		initSkillList();
	    calcSkill();
		calcAcceSkill();
		skillLevelLimiter();
		reflectSkill();
	})
    for(let i = 0;i < parts.length;i++){
	    $(`.${parts[i]}Item`).hover(function (){
	    	$('.itemStatus').hide();
	    	$(this).parent().find('.itemStatus').show();
	    },function(){
	    	$('.itemStatus').hide();
	    });
	}
});