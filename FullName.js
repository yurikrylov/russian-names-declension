/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */

/**
 * @param {String} fullName Строка вида "Иванов Иван Иванович" или "Иван Иванович Иванов"
 * @param {String} sex СТрока вида 'm' или 'f'
 * @returns {String} Просклоненные Фамилия Имя Отчество
 */
 export default class FullName {
	constructor(fullName, sex) {
	  this.fullName = fullName;
	  this.lastName = '';
	  this.firstName = '';
	  this.middleName = '';
	  this.initialized = false;
	  this.sex = sex;

	  this.rules = {
		lastName: {
		  exceptions: [
			'	дюма,тома,дега,люка,ферма,гамарра,петипа,шандра . . . . .',
			'	гусь,ремень,камень,онук,богода,нечипас,долгопалец,маненок,рева,кива . . . . .',
			'	вий,сой,цой,хой -я -ю -я -ем -е',
		  ],
		  suffixes: [
			'f	б,в,г,д,ж,з,й,к,л,м,н,п,р,с,т,ф,х,ц,ч,ш,щ,ъ,ь . . . . .',
			'f	ска,цка  -ой -ой -ую -ой -ой',
			'f	ая       --ой --ой --ую --ой --ой',
			'	ская     --ой --ой --ую --ой --ой',
			'f	на       -ой -ой -у -ой -ой',
  
			'	иной -я -ю -я -ем -е',
			'	уй   -я -ю -я -ем -е',
			'	ца   -ы -е -у -ей -е',
  
			'	рих  а у а ом е',
  
			'	ия                      . . . . .',
			'	иа,аа,оа,уа,ыа,еа,юа,эа . . . . .',
			'	их,ых                   . . . . .',
			'	о,е,э,и,ы,у,ю           . . . . .',
  
			'	ова,ева            -ой -ой -у -ой -ой',
			'	га,ка,ха,ча,ща,жа  -и -е -у -ой -е',
			'	ца  -и -е -у -ей -е',
			'	а   -ы -е -у -ой -е',
  
			'	ь   -я -ю -я -ем -е',
  
			'	ия  -и -и -ю -ей -и',
			'	я   -и -е -ю -ей -е',
			'	ей  -я -ю -я -ем -е',
  
			'	ян,ан,йн   а у а ом е',
  
			'	ынец,обец  --ца --цу --ца --цем --це',
			'	онец,овец  --ца --цу --ца --цом --це',
  
			'	ц,ч,ш,щ   а у а ем е',
  
			'	ай  -я -ю -я -ем -е',
			'	гой,кой  -го -му -го --им -м',
			'	ой  -го -му -го --ым -м',
			'	ах,ив   а у а ом е',
  
			'	ший,щий,жий,ний  --его --ему --его -м --ем',
			'	кий,ый   --ого --ому --ого -м --ом',
			'	ий       -я -ю -я -ем -и',
  
			'	ок  --ка --ку --ка --ком --ке',
			'	ец  --ца --цу --ца --цом --це',
  
			'	в,н а у а ым е',
			'	б,г,д,ж,з,к,л,м,п,р,с,т,ф,х   а у а ом е',
		  ],
		},
		firstName: {
		  exceptions: [
			'	лев    --ьва --ьву --ьва --ьвом --ьве',
			'	павел  --ла  --лу  --ла  --лом  --ле',
			'm	шота   . . . . .',
			'm	пётр   ---етра ---етру ---етра ---етром ---етре',
			'f	рашель,нинель,николь,габриэль,даниэль   . . . . .',
		  ],
		  suffixes: [
			'	е,ё,и,о,у,ы,э,ю   . . . . .',
			'f	б,в,г,д,ж,з,й,к,л,м,н,п,р,с,т,ф,х,ц,ч,ш,щ,ъ   . . . . .',
  
			'f	ь   -и -и . ю -и',
			'm	ь   -я -ю -я -ем -е',
  
			'	га,ка,ха,ча,ща,жа  -и -е -у -ой -е',
			'	ша  -и -е -у -ей -е',
			'	а   -ы -е -у -ой -е',
			'	ия  -и -и -ю -ей -и',
			'	я   -и -е -ю -ей -е',
			'	ей  -я -ю -я -ем -е',
			'	ий  -я -ю -я -ем -и',
			'	й   -я -ю -я -ем -е',
			'	б,в,г,д,ж,з,к,л,м,н,п,р,с,т,ф,х,ц,ч	 а у а ом е',
		  ],
		},
		middleName: {
		  suffixes: ['	ич   а  у  а  ем  е', '	на  -ы -е -у -ой -е'],
		},
	  };

	  this.init();
	}
  
	getSex() {
	  if (this.sex) {return this.sex};
	  if ((this.middleName || '').length > 2) {
		switch (this.middleName.substr(this.middleName.length - 2)) {
		  case 'ич':
			return 'm';
		  case 'на':
			return 'f';
		  default:
			return 'm';
		}
	  }
	  return '';
	}
  
	prepareRules() {
	  for (const type in this.rules) {
		for (const key in this.rules[type]) {
		  if (this.rules[type].hasOwnProperty(key))
		  for (let i = 0, n = this.rules[type][key].length; i < n; i++) {
			this.rules[type][key][i] = this.rule(this.rules[type][key][i]);
		  }
		}
	  }
	}
  
	init() {
	  if (this.initialized) return;
	  this.prepareRules();

	  this.initialized = true;
	  if (!this.fullName) {
		return;
	  }
	  let m = this.fullName.match(/^\s*(\S+)(\s+(\S+)(\s+(\S+))?)?\s*$/);
	  if (!m) throw [this.fullName, 'Невозможно разобрать ФИО'];
	  if (m[5] && m[3].match(/(ич|на)$/) && !m[5].match(/(ич|на)$/)) {
		// Иван Петрович Сидоров
		this.lastName = m[5];
		this.firstName = m[1];
		this.middleName = m[3];
	  } else {
		// Сидоров Иван Петрович
		this.lastName = m[1];
		this.firstName = m[3];
		this.middleName = m[5];
	  }
	  this.sex = this.sex || this.getSex();
	  }
	
  
	rule(rule) {
	  let m = rule.match(/^\s*([fm]?)\s*(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s*$/);
	  if (m) {
		return {
		  sex: m[1],
		  test: m[2].split(','),
		  mods: [m[3], m[4], m[5], m[6], m[7]],
		};
	  }
	  return false;
	}
  
	word(wordType, gcase, word = '') {
	  if (!word) {
		switch (wordType) {
		  case 'lastName':
			word = this.lastName;
			break;
		  case 'firstName':
			word = this.firstName;
			break;
		  case 'middleName':
			word = this.middleName;
			break;
		  default:
			word = '';
		}
	  }
	  if (!word) return '';
	  if (gcase === 'nominative') return word;
  
	  // составные слова
	  if (word.includes('-')) {
		const list = word.split('-');
		for (let i = 0, n = list.length; i < n; i++) {
		  list[i] = word(wordType, gcase, list[i]);
		}
		return list.join('-');
	  }
	  if (word.match(/^[А-ЯЁ]\.?$/i)) return word;
	  let wordTypeRules = this.rules[wordType];
	  let pickRule;
	  if (wordTypeRules.exceptions) {
		pickRule = this.pick(word, gcase, wordTypeRules.exceptions, true);
		if (pickRule) return pickRule;
	  }
	  pickRule = this.pick(word, gcase, wordTypeRules.suffixes, false);
	  return pickRule || word;
	}
  
	pick(word, gcase, rules, matchWholeWord) {
	  let wordLower = word.toLowerCase();
	  for (let i = 0, n = rules.length; i < n; i++) {
		if (this.ruleMatch(wordLower, rules[i], matchWholeWord)) {
		  return this.applyMod(word, gcase, rules[i]);
		}
	  }
	  return false;
	}
  
	ruleMatch(word, rule, matchWholeWord) {
	  if (rule.sex === 'm' && this.sex === 'f') return false;
	  if (rule.sex === 'f' && this.sex !== 'f') return false;
	  for (let i = 0, n = rule.test.length; i < n; i++) {
		let test = matchWholeWord ? word : word.substring(Math.max(word.length - rule.test[i].length, 0));
		if (test === rule.test[i]) return true;
	  }
	  return false;
	}
  
	applyMod(word, gcase, rule) {
	  let mod = '';
	  switch (gcase) {
		case 'nominative':
		  mod = '.';
		  break;
		case 'genitive':
		  mod = rule.mods[0];
		  break;
		case 'dative':
		  mod = rule.mods[1];
		  break;
		case 'accusative':
		  mod = rule.mods[2];
		  break;
		case 'instrumentative':
		  mod = rule.mods[3];
		  break;
		case 'prepositional':
		  mod = rule.mods[4];
		  break;
		default:
		  throw [this.gcase, 'Неизвестный падеж'];
	  }
	  for (let i = 0, n = mod.length; i < n; i++) {
		let c = mod.substring(i, i + 1);
		switch (c) {
		  case '.':
			break;
		  case '-':
			word = word.substr(0, word.length - 1);
			break;
		  default:
			word += c;
		}
	  }
	  return word;
	}
  
	declineLastName(gcase) {
	  return this.word('lastName', gcase);
	}
  
	declineFirstName(gcase) {
	  return this.word('firstName', gcase);
	}
  
	declineMiddleName(gcase) {
	  return this.word('middleName', gcase);
	}
  
	declineFullName(gcase) {
	  return `${this.declineLastName(gcase)} ${this.declineFirstName(gcase)} ${this.declineMiddleName(gcase)}`;
	}
  
	GetGenetiveFromFIO() {
	  return `${this.lastName} ${this.firstName[0]}.`;
	}
  
	ReduceToInitials(familyNameFirst) {
	  let res = this.lastName;
	  if (familyNameFirst) {
		if (this.firstName !== undefined) {
		  res += ` ${this.firstName[0]}.`;
		}
		if (this.middleName !== undefined) {
		  res += ` ${this.middleName[0]}.`;
		}
	  } else {
		if (this.middleName !== undefined) {
		  res = `${this.middleName[0]}. ${res}`;
		}
		if (this.firstName !== undefined) {
		  res = `${this.firstName[0]}. ${res}`;
		}
	  }
	  return res;
	}
  }