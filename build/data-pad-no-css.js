/*
 Copyright 2020 Liuzzi Stéphane
 Original sources are available at https://github.com/shaan1974/data-pad/ - 2.0

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/


var templateDataPad = decodeURIComponent("%3Cspan%20class%3D%22data-pad%22%3E%0D%0A%0D%0A%09%09%3Ctemplate%20v-if%3D%22cdebug%22%3E%0D%0A%09%09%09%3Cdiv%20style%3D%22background-color%3Apink%3B%22%3E%3C%2Fdiv%3E%0D%0A%09%09%3C%2Ftemplate%3E%0D%0A%0D%0A%09%09%3Cinput%20%0D%0A%09%09%09type%3D%22text%22%20%0D%0A%09%09%09v-on%3Ainput%3D%22this.%24emit('vchange'%2C%20%24event.target.value)%22%20%0D%0A%09%09%09v-bind%3Avalue%3D%22value%22%20%0D%0A%09%09%09v-on%3Aclick%3D%22this.showCalendar%3D!this.showCalendar%3B(this.showCalendar)%20%3F%20this.resetCalendar()%20%3A%20''%3B%22%20%0D%0A%09%09%09class%3D%22data-pad-input%22%20%0D%0A%09%09%09%3Aclass%3D%22zconfig.css.input%22%3E%0D%0A%09%09%0D%0A%09%09%3Ctransition%20%3Aname%3D%22computedTransition%22%3E%0D%0A%09%09%3Cdiv%20v-if%3D%22showCalendar%22%20class%3D%22data-pad-calendar%22%20%3Aclass%3D%22%5Bzconfig.css.table_container%5D%22%3E%0D%0A%09%09%09%0D%0A%09%09%09%3Ctable%20%3Aclass%3D%22zconfig.css.table%22%3E%0D%0A%09%09%09%09%0D%0A%09%09%09%09%3C!--%20HEAD%20--%3E%0D%0A%09%09%09%09%3Ctr%20class%3D%22date_navigator%22%20%3Aclass%3D%22zconfig.css.table_header.date_navigator%22%3E%0D%0A%0D%0A%09%09%09%09%09%3Cth%20%0D%0A%09%09%09%09%09%09v-on%3Aclick%3D%22(zconfig.css.table_header.left_arrow%2C%20rows%5B0%5D%5B0%5D.fd%3D%3D%3Dtrue%20)%20%3F%20''%3A%20this.month--%3Bthis.popoverYears%3Dfalse%3Bthis.popoverMonths%3Dfalse%3B%22%20%0D%0A%09%09%09%09%09%09%3Aclass%3D%22%5Bzconfig.css.table_header.left_arrow%2C%20rows%5B0%5D%5B0%5D.fd%3D%3D%3Dtrue%20%3F%20'disabled'%20%3A%20'month_left'%20%5D%22%3E%26%23160%3B%3C%2Fth%3E%0D%0A%09%09%09%09%09%0D%0A%09%09%09%09%09%3Cth%20colspan%3D%225%22%20class%3D%22month_year%22%20%3Aclass%3D%22zconfig.css.table_header.month_year.month_year%22%3E%0D%0A%0D%0A%09%09%09%09%09%09%3Cspan%20class%3D%22select_month%22%20%3Aclass%3D%22zconfig.css.table_header.month_year.month%22%3E%0D%0A%09%09%09%09%09%09%09%3Cspan%20v-on%3Aclick%3D%22popoverMonths%3D!popoverMonths%3BpopoverYears%3Dfalse%3B%22%3E%7B%7Bthis.labels.months%5Bmonth-1%5D%7D%7D%3C%2Fspan%3E%0D%0A%09%09%09%09%09%09%09%3Cdiv%20class%3D%22popover__content%22%20v-if%3D%22popoverMonths%22%20%3Aclass%3D%22zconfig.css.table_header.month_year.month_popover%22%3E%0D%0A%09%09%09%09%09%09%09%09%3Cp%20class%3D%22popover__message%22%3E%0D%0A%09%09%09%09%09%09%09%09%09%3Cul%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3Ctemplate%20v-for%3D%22(m%2Cindex)%20in%20this.labels.months%22%20%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%09%3Cli%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09%09%3Aclass%3D%22%5B%20this.month%20%3D%3D%3D%20index%2B1%20%3F%20'current'%20%3A%20''%5D%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09%09v-on%3Aclick%3D%22popupClick%3Dtrue%3Bthis.month%3Dindex%2B1%3BpopoverMonths%3Dfalse%3Bthis.buildCalendar(this.month%2C%20this.year)%3B%22%20v-if%3D%22this.isMonthInRange(this.year%2Cindex%2B1)%22%3E%7B%7Bm%7D%7D%3C%2Fli%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%09%09%09%09%09%09%09%09%09%3C%2Ful%3E%0D%0A%09%09%09%09%09%09%09%09%3C%2Fp%3E%0D%0A%09%09%09%09%09%09%09%3C%2Fdiv%3E%0D%0A%09%09%09%09%09%09%3C%2Fspan%3E%0D%0A%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%26mdash%3B%20%0D%0A%09%09%09%09%09%0D%0A%09%09%09%09%09%09%3Cspan%20class%3D%22select_year%22%20%3Aclass%3D%22zconfig.css.table_header.month_year.year%22%3E%0D%0A%09%09%09%09%09%09%09%3Cspan%20v-on%3Aclick%3D%22popoverYears%3D!popoverYears%3BpopoverMonths%3Dfalse%3B%22%3E%7B%7Byear%7D%7D%3C%2Fspan%3E%0D%0A%09%09%09%09%09%09%09%3Cdiv%20class%3D%22popover__content%22%20v-if%3D%22popoverYears%22%20%3Aclass%3D%22zconfig.css.table_header.month_year.year_popover%22%3E%0D%0A%09%09%09%09%09%09%09%09%3Cp%20class%3D%22popover__message%22%3E%0D%0A%09%09%09%09%09%09%09%09%09%3Cul%20%40wheel.prevent%3D%22scrollYears(%24event)%22%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%3Cli%20class%3D%22up%22%20v-on%3Aclick%3D%22this.isYearInRange(this.tmp_year-4-1)%20%3F%20this.tmp_year--%20%3A%20''%22%20%3Aclass%3D%22%5Bthis.isYearInRange(this.tmp_year-4-1)%20%3F%20''%20%3A%20'disabled'%5D%22%3E%3C%2Fli%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%3Ctemplate%20v-for%3D%22n%20in%204%22%20%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3Cli%20%09%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%09%3Aclass%3D%22%5B%20this.year%20%3D%3D%3D%20(this.tmp_year-4%2Bn-1)%20%3F%20'current'%20%3A%20''%5D%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09v-on%3Aclick%3D%22popupClick%3Dtrue%3Bthis.year%3Dthis.tmp_year-4%2Bn-1%3BpopoverYears%3Dfalse%3Bthis.buildCalendar(this.month%2C%20this.year)%3B%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09v-if%3D%22this.isYearInRange(this.tmp_year-4%2Bn-1)%22%3E%7B%7Bthis.tmp_year-4%2Bn-1%7D%7D%3C%2Fli%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%3Cli%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09%3Aclass%3D%22%5B%20this.year%20%3D%3D%3D%20this.tmp_year%20%3F%20'current'%20%3A%20''%5D%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09v-on%3Aclick%3D%22popupClick%3Dtrue%3Bthis.year%3Dthis.tmp_year%3BpopoverYears%3Dfalse%3Bthis.buildCalendar(this.month%2C%20this.year)%3B%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09%3Ar%3D%22this.isYearInRange(this.year)%22%3E%7B%7Bthis.tmp_year%7D%7D%3C%2Fli%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%3Ctemplate%20v-for%3D%22n%20in%204%22%20%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3Cli%20%09%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%09%3Aclass%3D%22%5B%20this.year%20%3D%3D%3D%20(this.tmp_year%2Bn)%20%3F%20'current'%20%3A%20''%5D%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09v-on%3Aclick%3D%22popupClick%3Dtrue%3Bthis.year%3Dthis.tmp_year%2Bn%3BpopoverYears%3Dfalse%3Bthis.buildCalendar(this.month%2C%20this.year)%3B%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09v-if%3D%22this.isYearInRange(this.tmp_year%2Bn)%22%3E%7B%7Bthis.tmp_year%2Bn%7D%7D%3C%2Fli%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%0D%0A%09%09%09%09%09%09%09%09%09%09%3Cli%20class%3D%22down%22%20v-on%3Aclick%3D%22this.isYearInRange(this.tmp_year%2B5)%20%3F%20this.tmp_year%2B%2B%20%3A%20''%22%20%3Aclass%3D%22%5Bthis.isYearInRange(this.tmp_year%2B5)%20%3F%20''%20%3A%20'disabled'%5D%22%3E%3C%2Fli%3E%0D%0A%0D%0A%09%09%09%09%09%09%09%09%09%3C%2Ful%3E%0D%0A%09%09%09%09%09%09%09%09%3C%2Fp%3E%0D%0A%09%09%09%09%09%09%3C%2Fdiv%3E%0D%0A%09%09%09%09%09%09%3C%2Fspan%3E%0D%0A%0D%0A%09%09%09%09%09%3C%2Fth%3E%0D%0A%0D%0A%09%09%09%09%09%3Cth%20%0D%0A%09%09%09%09%09%09v-on%3Aclick%3D%22(rows%5Brows.length-1%5D%5Brows%5Brows.length-1%5D.length-1%5D.fd%3D%3D%3Dtrue)%20%3F%20''%20%3A%20this.month%2B%2B%3Bthis.popoverYears%3Dfalse%3Bthis.popoverMonths%3Dfalse%3B%22%20%0D%0A%09%09%09%09%09%09%3Aclass%3D%22%5Bzconfig.css.table_header.right_arrow%20%2C%20rows%5Brows.length-1%5D%5Brows%5Brows.length-1%5D.length-1%5D.fd%3D%3D%3Dtrue%20%3F%20'disabled'%20%3A%20'month_right'%5D%22%3E%26%23160%3B%3C%2Fth%3E%0D%0A%0D%0A%09%09%09%09%3C%2Ftr%3E%0D%0A%09%09%09%09%3C!--%20%2FHEAD%20--%3E%0D%0A%0D%0A%09%09%09%09%3C!--%20DAYS%20NAMES%20--%3E%0D%0A%09%09%09%09%3Ctr%20class%3D%22days_names%22%20%3Aclass%3D%22zconfig.css.table_days_names.row%22%3E%0D%0A%09%09%09%09%09%3Ctemplate%20v-if%3D%22zconfig.firstDayOfTheWeekMonday%22%3E%09%09%09%09%0D%0A%09%09%09%09%09%09%3Ctemplate%20v-for%3D%22n%20in%206%22%3E%0D%0A%09%09%09%09%09%09%09%3Cth%20%3Aclass%3D%22zconfig.css.table_days_names.columns%22%3E%7B%7Bthis.labels.days%5Bn%5D%7D%7D%3C%2Fth%3E%0D%0A%09%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%09%09%09%09%09%09%3Cth%20%3Aclass%3D%22zconfig.css.table_days_names.columns%22%3E%7B%7Bthis.labels.days%5B0%5D%7D%7D%3C%2Fth%3E%0D%0A%09%09%09%09%09%3C%2Ftemplate%3E%09%09%09%09%0D%0A%09%09%09%09%09%3Ctemplate%20v-else%3E%0D%0A%09%09%09%09%09%09%3Cth%20v-for%3D%22dn%20in%20this.labels.days%22%20v-html%3D%22dn%22%20%3Aclass%3D%22zconfig.css.table_days_names.columns%22%3E%3C%2Fth%3E%0D%0A%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%09%09%09%09%3C%2Ftr%3E%0D%0A%09%09%09%09%3C!--%20%2FDAYS%20NAMES%20--%3E%0D%0A%0D%0A%09%09%09%09%3C!--%20CALENDAR%20DAYS%20--%3E%0D%0A%09%09%09%09%3Ctemplate%20v-for%3D%22(tr%2Cindex_tr)%20in%20rows%22%20%3E%0D%0A%09%09%09%09%3Ctr%20class%3D%22calendar_days%22%3E%0D%0A%09%09%09%09%09%0D%0A%09%09%09%09%09%3Ctemplate%20v-for%3D%22td%20in%20tr%22%3E%0D%0A%09%09%09%09%09%09%3Ctd%20%0D%0A%09%09%09%09%09%09%09%3Aclass%3D%22%5B%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09td.t%20%2C%20%0D%0A%09%09%09%09%09%09%09%09this.checkDay(td.d%2Ctd.t%2C'special_days')%20%3F%20'sd%20'%2Bzconfig.css.table_days.spd%20%3A%20''%2C%0D%0A%09%09%09%09%09%09%09%09this.checkDay(td.d%2Ctd.t%2C'disabled_days')%20%3F%20'cbs%20'%2Bzconfig.css.table_days.nsd%20%3A%20''%2C%0D%0A%09%09%09%09%09%09%09%09this.checkDay(td.d%2Ctd.t%2C'disabledWeekend')%20%3F%20'cbs%20'%2Bzconfig.css.table_days.diw%20%3A%20''%2C%0D%0A%09%09%09%09%09%09%09%09td.fd%20%3F%20'cbs'%20%3A%20''%2C%0D%0A%09%09%09%09%09%09%09%09(typeof%20td.cd%20!%3D%3D'undefined'%20)%20%3F%20'cd%20'%2Bzconfig.css.table_days.today%20%3A%20''%20%2C%20%20%0D%0A%09%09%09%09%09%09%09%09(typeof%20td.sel%20!%3D%3D'undefined'%20)%20%3F%20'selected%20'%2Bzconfig.css.table_days.current_day%20%3A%20''%20%2C%20%0D%0A%09%09%09%09%09%09%09%09td.t%3D%3D%3D'pm'%20%3F%20''%2Bzconfig.css.table_days.previous_month%2B''%20%3A%20''%20%2C%20%0D%0A%09%09%09%09%09%09%09%09td.t%3D%3D%3D'cm'%20%3F%20''%2Bzconfig.css.table_days.current_month%2B''%20%3A%20''%20%2C%20%0D%0A%09%09%09%09%09%09%09%09td.t%3D%3D%3D'nm'%20%3F%20''%2Bzconfig.css.table_days.next_month%2B''%20%3A%20''%20%5D%22%20%0D%0A%09%09%09%09%09%09%09v-on%3Aclick%3D%22setDate(td)%22%3E%3Cdiv%20class%3D%22blk%22%3E%7B%7Btd.d%7D%7D%3C%2Fdiv%3E%0D%0A%09%09%09%09%09%09%3C%2Ftd%3E%0D%0A%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%0D%0A%09%09%09%09%3C%2Ftr%3E%0D%0A%09%09%09%09%3C%2Ftemplate%3E%0D%0A%09%09%09%09%3C!--%20%2FCALENDAR%20DAYS%20--%3E%0D%0A%0D%0A%09%09%09%3C%2Ftable%3E%0D%0A%0D%0A%09%09%3C%2Fdiv%3E%0D%0A%09%09%3C%2Ftransition%3E%0D%0A%0D%0A%09%3C%2Fspan%3E");

 function initDataPad(vapp) { vapp.component( 'data-pad', { data: function() { return { "month": 0, "year": 0, "rows": [], "showCalendar": false, "tmp_year": 0, "popoverYears": false, "popoverMonths": false, "labels": { "months_long": moment.localeData()._months, "months": moment.localeData()._monthsShort, "days": moment.localeData()._weekdaysMin }, "popupClick": false, "minYear": "", "maxYear": "", "today_day": moment().date(), "today_month": moment().month(), "today_year": moment().year(), "cdebug": false, "zconfig": { "firstDayOfTheWeekMonday": true, "showCurrentDay": true, "closeWhenDayAsBeenSelected": true, "minDate": "", "maxDate": "", "closeOnResizeEvent": true, "closeOnScrollEvent": true, "css": { "input": "", "table_container": "", "table": "", "table_header": { "date_navigator": "", "right_arrow": "", "left_arrow": "", "month_year": { "month_year": "", "month": "", "month_popover": "", "year": "", "year_popover": "" } }, "table_days_names": { "row": "", "columns": "" }, "table_days": { "previous_month": "", "current_month": "", "next_month": "", "current_day": "", "today": "", "spd": "", "nsd": "", "diw": "" } }, "format": "DD-MM-YYYY", "special_days": [], "disabled_days": [], "disabledWeekendEnds": false, "position": "auto", "fadesAnimation": true } }; }, emits: ['vchange'], props: ['config', 'value'], template: '' + templateDataPad.replace(/<!--.*?-->/gm, '') + '', mounted: function() { var merge = (...arguments) => { let target = {}; let merger = (obj) => { for (let prop in obj) { if (obj.hasOwnProperty(prop)) { if (Object.prototype.toString.call(obj[prop]) === '[object Object]') { target[prop] = merge(target[prop], obj[prop]); } else { target[prop] = obj[prop]; } } } }; for (let i = 0; i < arguments.length; i++) { merger(arguments[i]); } return target; }; this.zconfig = merge(JSON.parse(JSON.stringify(this.zconfig)), JSON.parse(JSON.stringify(this.config))); this.zconfig.minDate = (this.zconfig.minDate === "") ? moment("01-01-0001", "MM-DD-YYYY").format(this.zconfig.format) : this.zconfig.minDate; this.zconfig.maxDate = (this.zconfig.maxDate === "") ? moment("01-01-9999", "MM-DD-YYYY").format(this.zconfig.format) : this.zconfig.maxDate; this.minYear = moment(this.zconfig.minDate, this.zconfig.format).year(); this.maxYear = moment(this.zconfig.maxDate, this.zconfig.format).year(); this.year = moment((this.value === "") ? new Date() : moment(this.value, this.zconfig.format)).year(); this.month = moment((this.value === "") ? new Date() : moment(this.value, this.zconfig.format)).month() + 1; var cb = function(t, e) { if (t.$el.isSameNode(e.target.closest(".data-pad"))) { return true; } if (t.popupClick === true) { t.popupClick = false; } else { t.showCalendar = false; } }; document.querySelector("body").addEventListener("click", cb.bind(null, this), false); var fct_hide_calendar = function(t, e) { t.showCalendar = false; }; if (this.zconfig.closeOnScrollEvent) { window.addEventListener("scroll", fct_hide_calendar.bind(null, this), false); } if (this.zconfig.closeOnResizeEvent) { window.addEventListener("resize", fct_hide_calendar.bind(null, this), false); } }, watch: { ["month"]: function(v, ov) { if (v < 1) { this.month = 12; this.year = this.year - 1; } else if (v > 12) { this.month = 1; this.year = this.year + 1; } this.buildCalendar(this.month, this.year); }, ["showCalendar"]: function(v, ov) { this.popoverYears = this.popoverMonths = false; if (v ) { this.labels.months_long = moment.localeData()._months; this.labels.months = moment.localeData()._monthsShort; this.labels.days = moment.localeData()._weekdaysMin; this.$nextTick(() => { if (this.zconfig.position !== "auto") { this.setCalendarPosition(this.zconfig.position.toUpperCase()); } else { var p = ["DOWN", "DOWN-RIGHT", "RIGHT", "UP", "UP-RIGHT", "DOWN"]; for (var c = 0; c < p.length; c++) { this.setCalendarPosition("" + p[c] + ""); if (this.isInViewport(this.$el.querySelector(".data-pad-calendar")) === true) { break; } } } this.resetCalendar(); }); } } }, computed: { "computedTransition": function() { return (this.zconfig.fadesAnimation) ? "fade" : "no-fade"; } }, methods: { setCalendarPosition: function(p) { var r1 = this.$el.querySelector("input").getBoundingClientRect(); var r2 = this.$el.querySelector(".data-pad-calendar").getBoundingClientRect(); var c = { "DOWN": { x: 0, y: 0 }, "UP": { x: 0, y: ((r1.height + r2.height) * -1) }, "RIGHT": { x: r1.width, y: (r1.height * -1) }, "DOWN-RIGHT": { x: (r1.width - r2.width), y: 0 }, "UP-RIGHT": { x: (r1.width - r2.width), y: ((r1.height + r2.height) * -1) } }; this.$el.querySelector(".data-pad-calendar").style.transform = "translate(" + c[p].x + "px, " + c[p].y + "px)"; }, resetCalendar: function() { if (this.value === "") { this.year = moment().year(); this.month = moment().month() + 1; } else { this.year = moment(this.value, this.zconfig.format).year(); this.month = moment(this.value, this.zconfig.format).month() + 1; } this.buildCalendar(this.month, this.year); }, buildCalendar: function(month, year) { month--; var firstDay = (new Date(year, month)).getDay(); var co = 0; var c_year = moment(this.value, this.zconfig.format).year(); var c_month = moment(this.value, this.zconfig.format).month(); var c_day; if (this.zconfig.firstDayOfTheWeekMonday) { if (firstDay === 0) { firstDay = 7; } co = 1; } var dayInPreviousMmonth = moment((new Date(year, month))).subtract(1, 'months').daysInMonth(); var rows = []; var d = 1; var o; var dicm = moment((new Date(year, month))).daysInMonth(); for (i = (0 + co); i < (6 + co); i++) { row = []; for (j = (0 + co); j < (7 + co); j++) { o = {}; if (i === co && j < firstDay) { o.d = (dayInPreviousMmonth - (firstDay - j) + 1); o.t = "pm"; } else if (d > dicm) { o.d = (d - dicm); o.t = "nm"; d++; } else { o.d = d; o.t = "cm"; if (d === this.today_day && year === this.today_year && month === this.today_month && this.zconfig.showCurrentDay === true) { o.cd = true; } c_day = moment(this.value, this.zconfig.format).date(); if (d === c_day && year === c_year && month === c_month) { o.sel = true; } d++; } o.fd = (this.isMinDateBefore(o) || this.isMaxDateAfter(o)); row.push(o); } rows.push(row); } var l = rows[rows.length - 1].filter(function(o) { if (o.t === "nm") return o; }).length; if (l === 7) { rows.pop(); } this.rows = rows; this.tmp_year = this.year; }, setDate: function(td) { if (td.t === 'pm' || td.t === 'nm' || this.isMinDateBefore(td) || this.isMaxDateAfter(td) || this.checkDay(td.d, td.t, 'disabled_days')) { return false; } this.$emit('vchange', moment("" + this.year + "-" + this.month + "-" + td.d, "YYYY-MM-DD").format(this.zconfig.format)); if (this.zconfig.closeWhenDayAsBeenSelected === true) { this.showCalendar = false; } else { this.$nextTick(() => { this.buildCalendar(this.month, this.year); }); } }, scrollYears: function(e) { if (e.deltaY > 0) { if (this.isYearInRange(this.tmp_year + 5)) { this.tmp_year++; } } else { if (this.isYearInRange(this.tmp_year - 5)) { this.tmp_year--; } } }, isMinDateBefore: function(td) { var current_d = moment("" + this.year + "-" + this.month + "-01", "YYYY-MM-DD"); var f = ["pm", "cm", "nm"].indexOf(td.t); current_d.add((f - 1), 'months').date(td.d); var minDate = moment(this.zconfig.minDate, this.zconfig.format); return current_d.isSameOrBefore(minDate); }, isMaxDateAfter: function(td) { var current_d = moment("" + this.year + "-" + this.month + "-01", "YYYY-MM-DD"); var f = ["pm", "cm", "nm"].indexOf(td.t); current_d.add((f - 1), 'months').date(td.d); var maxDate = moment(this.zconfig.maxDate, this.zconfig.format); return current_d.isSameOrAfter(maxDate); }, isMonthInRange: function(year, month) { var m_date = moment("" + year + "-" + month + "-01", "YYYY-MM-DD"); var minD = moment(this.zconfig.minDate, "" + this.zconfig.format + ""); var maxD = moment(this.zconfig.maxDate, "" + this.zconfig.format + ""); if (minD.date() !== minD.daysInMonth()) { minD.subtract(1, "months"); } return m_date.isBetween(minD, maxD); }, isYearInRange: function(year) { if (this.minYear === year && this.maxYear === year) { return true; } else if (year >= this.minYear && year <= this.maxYear) { return true; } return false; }, checkDay: function(d, t, m) { var comp = this.zconfig["" + m + ""]; var current_d, f; if (typeof comp !== "undefined") { current_d = moment("" + this.year + "-" + this.month + "-01", "YYYY-MM-DD"); f = ["pm", "cm", "nm"].indexOf(t); current_d.add((f - 1), 'months').date(d); for (var i = 0; i < comp.length; i++) { if (comp[i].length === current_d.format(this.zconfig.format).length) { if (comp[i] === current_d.format(this.zconfig.format)) { return true; } } else { v = comp[i].split(","); v[0] = moment(v[0], this.zconfig.format); v[1] = moment(v[1], this.zconfig.format); if (current_d.isSameOrAfter(v[0]) && current_d.isSameOrBefore(v[1])) { return true; } } } } else { if (m === "disabledWeekend" && this.zconfig.disabledWeekendEnds === true) { current_d = moment("" + this.year + "-" + this.month + "-01", "YYYY-MM-DD"); f = ["pm", "cm", "nm"].indexOf(t); var dofw = current_d.add((f - 1), 'months').date(d).day(); if (dofw === 0 || dofw === 6) { return true; } return false; } } return false; }, isInViewport: function(element) { var rect = element.getBoundingClientRect(); return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)); } } } ); }