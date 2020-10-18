/*
 Copyright 2020 Liuzzi Stéphane
 Original sources are available at https://github.com/shaan1974/data-pad/

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


var templateDataPad = decodeURIComponent("%3Cspan%20class%3D%22data-pad%22%3E%0D%0A%0D%0A%09%3Ctemplate%20v-if%3D%22cdebug%22%3E%0D%0A%09%3Cdiv%20style%3D%22background-color%3Apink%3B%22%3E%0D%0A%09%7B%7Bthis.month%7D%7D-%7B%7Bthis.year%7D%7D%0D%0A%09%7B%7Bthis.config%7D%7D%0D%0A%09%3Chr%2F%3E%0D%0A%09%7B%7Bthis.tmp_year%7D%7D%0D%0A%09%3C%2Fdiv%3E%0D%0A%3C%2Ftemplate%3E%0D%0A%0D%0A%09%09%3Cinput%20type%3D%22text%22%20v-on%3Ainput%3D%22this.%24emit('vchange'%2C%20%24event.target.value)%22%20v-bind%3Avalue%3D%22value%22%20v-on%3Aclick%3D%22this.showCalendar%3D!this.showCalendar%3B%22%20class%3D%22data-pad-input%22%20%3Aclass%3D%22config.css.input%22%3E%0D%0A%09%09%0D%0A%09%09%3Cdiv%20v-if%3D%22showCalendar%22%20class%3D%22data-pad-calendar%22%20%3Aclass%3D%22config.css.table_container%22%3E%0D%0A%09%09%09%0D%0A%09%09%09%3Ctable%20%3Aclass%3D%22config.css.table%22%3E%0D%0A%09%09%09%09%0D%0A%09%09%09%09%3C!--%20HEAD%20--%3E%0D%0A%09%09%09%09%3Ctr%20class%3D%22date_navigator%22%20%3Aclass%3D%22config.css.table_header.date_navigator%22%3E%0D%0A%0D%0A%09%09%09%09%09%3Cth%20v-on%3Aclick%3D%22this.month--%22%20%3Aclass%3D%22%5Bconfig.css.table_header.left_arrow%2C%20rows%5B0%5D%5B0%5D.fd%3D%3D%3Dtrue%20%3F%20'disabled'%20%3A%20'month_left'%20%5D%22%3E%26%23160%3B%3C%2Fth%3E%0D%0A%09%09%09%09%09%0D%0A%09%09%09%09%09%3Cth%20colspan%3D%225%22%20class%3D%22month_year%22%20%3Aclass%3D%22config.css.table_header.month_year.month_year%22%3E%0D%0A%0D%0A%09%09%09%09%09%09%3Cspan%20class%3D%22select_month%22%20%3Aclass%3D%22config.css.table_header.month_year.month%22%3E%0D%0A%09%09%09%09%09%09%09%3Cspan%20v-on%3Aclick%3D%22popoverMonths%3D!popoverMonths%3BpopoverYears%3Dfalse%3B%22%3E%7B%7Bthis.labels.months%5Bmonth-1%5D%7D%7D%3C%2Fspan%3E%0D%0A%09%09%09%09%09%09%09%3Cdiv%20class%3D%22popover__content%22%20v-if%3D%22popoverMonths%22%20%3Aclass%3D%22config.css.table_header.month_year.month_popover%22%3E%0D%0A%09%09%09%09%09%09%09%09%3Cp%20class%3D%22popover__message%22%3E%0D%0A%09%09%09%09%09%09%09%09%09%3Cul%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3Ctemplate%20v-for%3D%22(m%2Cindex)%20in%20this.labels.months%22%20%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%09%3Cli%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09%09%3Aclass%3D%22%5B%20this.month%20%3D%3D%3D%20index%2B1%20%3F%20'current'%20%3A%20''%5D%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09%09v-on%3Aclick%3D%22popupClick%3Dtrue%3Bthis.month%3Dindex%2B1%3BpopoverMonths%3Dfalse%3Bthis.buildCalendar(this.month%2C%20this.year)%3B%22%20v-if%3D%22this.isMonthInRange(this.year%2Cindex%2B1)%22%3E%7B%7Bm%7D%7D%3C%2Fli%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%09%09%09%09%09%09%09%09%09%3C%2Ful%3E%0D%0A%09%09%09%09%09%09%09%09%3C%2Fp%3E%0D%0A%09%09%09%09%09%09%09%3C%2Fdiv%3E%0D%0A%09%09%09%09%09%09%3C%2Fspan%3E%0D%0A%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09-%20%0D%0A%09%09%09%09%09%0D%0A%09%09%09%09%09%09%3Cspan%20class%3D%22select_year%22%20%3Aclass%3D%22config.css.table_header.month_year.year%22%3E%0D%0A%09%09%09%09%09%09%09%3Cspan%20v-on%3Aclick%3D%22popoverYears%3D!popoverYears%3BpopoverMonths%3Dfalse%3B%22%3E%7B%7Byear%7D%7D%3C%2Fspan%3E%0D%0A%09%09%09%09%09%09%09%3Cdiv%20class%3D%22popover__content%22%20v-if%3D%22popoverYears%22%20%3Aclass%3D%22config.css.table_header.month_year.year_popover%22%3E%0D%0A%09%09%09%09%09%09%09%09%3Cp%20class%3D%22popover__message%22%3E%0D%0A%09%09%09%09%09%09%09%09%09%3Cul%20%40wheel.prevent%3D%22scrollYears(%24event)%22%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%3Cli%20class%3D%22up%22%20v-on%3Aclick%3D%22this.isYearInRange(this.tmp_year-4-1)%20%3F%20this.tmp_year--%20%3A%20''%22%20%3Aclass%3D%22%5Bthis.isYearInRange(this.tmp_year-4-1)%20%3F%20''%20%3A%20'disabled'%5D%22%3E%3C%2Fli%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%3Ctemplate%20v-for%3D%22n%20in%204%22%20%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3Cli%20%09%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%09%3Aclass%3D%22%5B%20this.year%20%3D%3D%3D%20(this.tmp_year-4%2Bn-1)%20%3F%20'current'%20%3A%20''%5D%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09v-on%3Aclick%3D%22popupClick%3Dtrue%3Bthis.year%3Dthis.tmp_year-4%2Bn-1%3BpopoverYears%3Dfalse%3Bthis.buildCalendar(this.month%2C%20this.year)%3B%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09v-if%3D%22this.isYearInRange(this.tmp_year-4%2Bn-1)%22%3E%7B%7Bthis.tmp_year-4%2Bn-1%7D%7D%3C%2Fli%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%3Cli%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09%3Aclass%3D%22%5B%20this.year%20%3D%3D%3D%20this.tmp_year%20%3F%20'current'%20%3A%20''%5D%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09v-on%3Aclick%3D%22popupClick%3Dtrue%3Bthis.year%3Dthis.tmp_year%3BpopoverYears%3Dfalse%3Bthis.buildCalendar(this.month%2C%20this.year)%3B%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09%3Ar%3D%22this.isYearInRange(this.year)%22%3E%7B%7Bthis.tmp_year%7D%7D%3C%2Fli%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%3Ctemplate%20v-for%3D%22n%20in%204%22%20%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3Cli%20%09%09%09%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09%09%09%09%3Aclass%3D%22%5B%20this.year%20%3D%3D%3D%20(this.tmp_year%2Bn)%20%3F%20'current'%20%3A%20''%5D%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09v-on%3Aclick%3D%22popupClick%3Dtrue%3Bthis.year%3Dthis.tmp_year%2Bn%3BpopoverYears%3Dfalse%3Bthis.buildCalendar(this.month%2C%20this.year)%3B%22%20%0D%0A%09%09%09%09%09%09%09%09%09%09%09v-if%3D%22this.isYearInRange(this.tmp_year%2Bn)%22%3E%7B%7Bthis.tmp_year%2Bn%7D%7D%3C%2Fli%3E%0D%0A%09%09%09%09%09%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%0D%0A%09%09%09%09%09%09%09%09%09%09%3Cli%20class%3D%22down%22%20v-on%3Aclick%3D%22this.isYearInRange(this.tmp_year%2B5)%20%3F%20this.tmp_year%2B%2B%20%3A%20''%22%20%3Aclass%3D%22%5Bthis.isYearInRange(this.tmp_year%2B5)%20%3F%20''%20%3A%20'disabled'%5D%22%3E%3C%2Fli%3E%0D%0A%0D%0A%09%09%09%09%09%09%09%09%09%3C%2Ful%3E%0D%0A%09%09%09%09%09%09%09%09%3C%2Fp%3E%0D%0A%09%09%09%09%09%09%3C%2Fdiv%3E%0D%0A%09%09%09%09%09%09%3C%2Fspan%3E%0D%0A%0D%0A%09%09%09%09%09%3C%2Fth%3E%0D%0A%0D%0A%09%09%09%09%09%3Cth%20v-on%3Aclick%3D%22this.month%2B%2B%22%20%3Aclass%3D%22%5Bconfig.css.table_header.right_arrow%20%2C%20rows%5Brows.length-1%5D%5Brows%5Brows.length-1%5D.length-1%5D.fd%3D%3D%3Dtrue%20%3F%20'disabled'%20%3A%20'month_right'%5D%22%3E%26%23160%3B%3C%2Fth%3E%0D%0A%0D%0A%09%09%09%09%3C%2Ftr%3E%0D%0A%09%09%09%09%3C!--%20%2FHEAD%20--%3E%0D%0A%0D%0A%09%09%09%09%3C!--%20DAYS%20NAMES%20--%3E%0D%0A%09%09%09%09%3Ctr%20class%3D%22days_names%22%20%3Aclass%3D%22config.css.table_days_names.row%22%3E%0D%0A%09%09%09%09%09%3Ctemplate%20v-if%3D%22config.firstDayOfTheWeekMonday%22%3E%09%09%09%09%0D%0A%09%09%09%09%09%09%3Ctemplate%20v-for%3D%22n%20in%206%22%3E%0D%0A%09%09%09%09%09%09%09%3Cth%20%3Aclass%3D%22config.css.table_days_names.columns%22%3E%7B%7Bthis.labels.days%5Bn%5D%7D%7D%3C%2Fth%3E%0D%0A%09%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%09%09%09%09%09%09%3Cth%20%3Aclass%3D%22config.css.table_days_names.columns%22%3E%7B%7Bthis.labels.days%5B0%5D%7D%7D%3C%2Fth%3E%0D%0A%09%09%09%09%09%3C%2Ftemplate%3E%09%09%09%09%0D%0A%09%09%09%09%09%3Ctemplate%20v-else%3E%0D%0A%09%09%09%09%09%09%3Cth%20v-for%3D%22dn%20in%20this.labels.days%22%20v-html%3D%22dn%22%20%3Aclass%3D%22config.css.table_days_names.columns%22%3E%3C%2Fth%3E%0D%0A%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%09%09%09%09%3C%2Ftr%3E%0D%0A%09%09%09%09%3C!--%20%2FDAYS%20NAMES%20--%3E%0D%0A%0D%0A%09%09%09%09%3C!--%20CALENDAR%20DAYS%20--%3E%0D%0A%09%09%09%09%3Ctemplate%20v-for%3D%22(tr%2Cindex_tr)%20in%20rows%22%20%3E%0D%0A%09%09%09%09%3Ctr%20class%3D%22calendar_days%22%20v-if%3D%22displayLine(tr)%22%3E%0D%0A%09%09%09%09%09%0D%0A%09%09%09%09%09%3Ctemplate%20v-for%3D%22td%20in%20tr%22%3E%0D%0A%09%09%09%09%09%09%3Ctd%20%0D%0A%09%09%09%09%09%09%09%3Aclass%3D%22%5B%09%09%09%09%09%09%09%09%0D%0A%09%09%09%09%09%09%09%09td.t%20%2C%20%0D%0A%09%09%09%09%09%09%09%09td.fd%20%3F%20'cbs'%20%3A%20''%2C%0D%0A%09%09%09%09%09%09%09%09(typeof%20td.cd%20!%3D%3D'undefined'%20)%20%3F%20'cd%20'%2Bconfig.css.table_days.today%20%3A%20''%20%2C%20%20%0D%0A%09%09%09%09%09%09%09%09(typeof%20td.sel%20!%3D%3D'undefined'%20)%20%3F%20'selected%20'%2Bconfig.css.table_days.current_day%20%3A%20''%20%2C%20%0D%0A%09%09%09%09%09%09%09%09td.t%3D%3D%3D'pm'%20%3F%20''%2Bconfig.css.table_days.previous_month%2B''%20%3A%20''%20%2C%20%0D%0A%09%09%09%09%09%09%09%09td.t%3D%3D%3D'cm'%20%3F%20''%2Bconfig.css.table_days.current_month%2B''%20%3A%20''%20%2C%20%0D%0A%09%09%09%09%09%09%09%09td.t%3D%3D%3D'nm'%20%3F%20''%2Bconfig.css.table_days.next_month%2B''%20%3A%20''%20%5D%22%20%0D%0A%09%09%09%09%09%09%09v-on%3Aclick%3D%22setDate(td)%22%3E%3Cdiv%20class%3D%22blk%22%3E%7B%7Btd.d%7D%7D%3C%2Fdiv%3E%0D%0A%09%09%09%09%09%09%3C%2Ftd%3E%0D%0A%09%09%09%09%09%3C%2Ftemplate%3E%0D%0A%0D%0A%09%09%09%09%3C%2Ftr%3E%0D%0A%09%09%09%09%3C%2Ftemplate%3E%0D%0A%09%09%09%09%3C!--%20%2FCALENDAR%20DAYS%20--%3E%0D%0A%0D%0A%09%09%09%3C%2Ftable%3E%0D%0A%0D%0A%09%09%3C%2Fdiv%3E%0D%0A%0D%0A%09%3C%2Fspan%3E");


/*jshint sub:true*/
function initDataPad(vapp)
{
    //  COMPONENT
    //
    vapp.component(
        'data-pad',
        {
            data: function()
            {
                return {
                    "month": 0,
                    "year": 0,
                    "rows": [],
                    "swm": false,
                    "showCalendar": false,
                    "tmp_year": 0,
                    "popoverYears": false,
                    "popoverMonths": false,
                    "labels":
                    {
                        "months_long": moment.localeData()._months,
                        "months": moment.localeData()._monthsShort,
                        "days": moment.localeData()._weekdaysMin
                    },
                    "popupClick": false,
                    "minYear": "",
                    "maxYear": "",
                    "cdebug": false
                };
            },
            emits: ['vchange'],
            props: ['config', 'value'],
            template: '' + templateDataPad.replace(/<!--.*?-->/gm, '') + '',
            mounted: function()
            {
                this.swm = this.config.firstDayOfTheWeekMonday;
                // console.log("VALUE: " + this.value);

                //  CHECK IF MIN-MAX HAS BEEN DEFINED OR NOT
                //
                if (this.config.minDate === "")
                {
                    this.config.minDate = moment("01-01-0001", "MM-DD-YYYY").format(this.config.format);
                }

                if (this.config.maxDate === "")
                {
                    this.config.maxDate = moment("01-01-9999", "MM-DD-YYYY").format(this.config.format);
                }

                this.minYear = moment(this.config.minDate, this.config.format).year();
                this.maxYear = moment(this.config.maxDate, this.config.format).year();

                //  IF NO VALUE DEFINED FROM THE BNINDING
                //
                if (this.value === "")
                {
                    this.year = moment().year();
                    this.month = moment().month() + 1;
                }
                else
                {
                    this.year = moment(this.value, this.config.format).year();
                    this.month = moment(this.value, this.config.format).month() + 1;
                }

                //  IF A CLICK IS DONE OUTSITE THE CALENDAR, IT CLOSE IT
                //
                var cb = function(t, e)
                {
                    if (t.$el.isSameNode(e.target.closest(".data-pad")))
                    {
                        // console.log("Same node");
                    }
                    else if (t.popupClick === true)
                    {
                        t.popupClick = false;
                    }
                    else
                    {
                        t.showCalendar = false;
                    }
                };
                document.querySelector("body").addEventListener("click", cb.bind(null, this), false);
            },
            watch:
            {
                ["month"]: function(v, ov)
                {
                    if (v < 1)
                    {
                        this.month = 12;
                        this.year = this.year - 1;
                    }
                    else if (v > 12)
                    {
                        this.month = 1;
                        this.year = this.year + 1;
                    }

                    this.buildCalendar(this.month, this.year);
                },
                ["showCalendar"]: function()
                {
                    this.popoverYears = false;
                    this.popoverMonths = false;
                }
            },
            methods:
            {
                /*
                    WHEN A LINE A BOTTOM IS TOTALY FOR THE NEXT MONTH WE DON'T DISPLAY IT ON SCREEN
                */
                displayLine: function(tr)
                {
                    return tr.filter(function(o)
                    {
                        if (o.t === "nm") return o;
                    }).length !== 7;
                },
                /*
                    BUILD CALENDAR
                */
                buildCalendar: function(month, year)
                {
                    var swm = this.config.firstDayOfTheWeekMonday;
                    month = month - 1;

                    var today = new Date();
                    var today_day = today.getDate();
                    var today_month = today.getMonth();
                    var today_year = today.getFullYear();
                    var firstDay = (new Date(year, month)).getDay();
                    var co = 0;

                    if (swm === true)
                    {
                        if (firstDay === 0)
                        {
                            firstDay = 7;
                        }

                        co = 1;
                    }

                    // var dayInPreviousMmonth = this.daysInMonth((month !== 0) ? month - 1 : 11, (month !== 0) ? year : year - 1);
                    var dayInPreviousMmonth = moment((new Date(year, month))).subtract(1, 'months').daysInMonth();
                    var rows = [];
                    var d = 1;
                    var o;
                    // var dicm = this.daysInMonth(month, year);
                    var dicm = moment((new Date(year, month))).daysInMonth();

                    for (i = (0 + co); i < (6 + co); i++)
                    {
                        row = [];
                        for (j = (0 + co); j < (7 + co); j++)
                        {
                            o = {};

                            if (i === co && j < firstDay)
                            {
                                o.d = (dayInPreviousMmonth - (firstDay - j) + 1);
                                o.t = "pm";
                            }
                            else if (d > dicm)
                            {
                                o.d = (d - dicm);
                                o.t = "nm";
                                d++;
                            }
                            else
                            {
                                o.d = d;
                                o.t = "cm";

                                if (d === today_day && year === today_year && month === today_month && this.config.showCurrentDay === true)
                                {
                                    o.cd = true;
                                }

                                c_year = moment(this.value, this.config.format).year();
                                c_month = moment(this.value, this.config.format).month();
                                c_day = moment(this.value, this.config.format).date();

                                if (d === c_day && year === c_year && month === c_month)
                                {
                                    o.sel = true;
                                }

                                d++;
                            }

                            o.fd = (this.isMinDateBefore(o) || this.isMaxDateAfter(o));

                            row.push(o);
                        }
                        rows.push(row);
                    }

                    // console.log(rows);
                    this.rows = rows;
                    this.tmp_year = this.year;
                },
                /*
                    setDate
                */
                setDate: function(td)
                {
                    //  DATE COULD NOT BE VALIDATED IF PREVIOUS MONTH, NEXT MONTH OR IN MIN RANGE
                    //
                    if (td.t === 'pm' || td.t === 'nm' || this.isMinDateBefore(td) || this.isMaxDateAfter(td))
                    {
                        return false;
                    }

                    this.$emit('vchange', moment("" + this.year + "-" + this.month + "-" + td.d, "YYYY-MM-DD").format(this.config.format));

                    if (this.config.closeWhenDayAsBeenSelected === true)
                    {
                        this.showCalendar = false;
                    }
                    else
                    {
                        this.$nextTick(() =>
                        {
                            this.buildCalendar(this.month, this.year);
                        });
                    }
                },
                /*

                */
                scrollYears: function(e)
                {
                    if (e.deltaY > 0)
                    {
                        if (this.isYearInRange(this.tmp_year + 5))
                        {
                            this.tmp_year++;
                        }
                    }
                    else
                    {
                        if (this.isYearInRange(this.tmp_year - 5))
                        {
                            this.tmp_year--;
                        }
                    }
                },
                /*
                    TO KNOW IF CURRENT DATE IF BEFORE MIN DATE
                */
                isMinDateBefore: function(td)
                {
                    if (this.config.minDate === "") return false;

                    var m = 0;

                    if (td.t === 'pm')
                    {
                        m = -1;
                    }
                    else if (td.t === 'cm')
                    {
                        m = 0;
                    }
                    else if (td.t === 'nm')
                    {
                        m = 1;
                    }
                    var current_d = moment("" + this.year + "-" + (this.month + m) + "-01", "YYYY-MM-DD").date(td.d);
                    var minDate = moment(this.config.minDate, this.config.format);

                    return minDate.format("DD-MM-YYYY"), current_d.isSameOrBefore(minDate);
                },
                /*
                    TO KNOW IF CURRENT DATE IF AFTER MAx DATE
                */
                isMaxDateAfter: function(td)
                {
                    if (this.config.maxDate === "") return false;

                    var m = 0;

                    if (td.t === 'pm')
                    {
                        m = -1;
                    }
                    else if (td.t === 'cm')
                    {
                        m = 0;
                    }
                    else if (td.t === 'nm')
                    {
                        m = 1;
                    }
                    var current_d = moment("" + this.year + "-" + (this.month + m) + "-01", "YYYY-MM-DD").date(td.d);
                    var maxDate = moment(this.config.maxDate, this.config.format);

                    return maxDate.format("DD-MM-YYYY"), current_d.isSameOrAfter(maxDate);
                },
                /*
                    CHECK IF DATE IS IS RANGE FOR MONTH POPOVER
                */
                isMonthInRange: function(year, month)
                {
                    var m_date = moment("" + year + "-" + month + "-01", "YYYY-MM-DD");
                    var minD = moment(this.config.minDate, "" + this.config.format + "");
                    var maxD = moment(this.config.maxDate, "" + this.config.format + "");

                    //  IF THE LAST DAY IN MIN MONTH IS NOT THE LAST DAY OF THIS MONTH WE REMOVE THE RANGE OF MONTH -1
                    //
                    if (minD.date() !== minD.daysInMonth())
                    {
                        minD.subtract(1, "months");
                    }

                    return m_date.isBetween(minD, maxD);
                },
                /*
                    TO DISPLAY CORRECT YEAR RANGE DEPENDING OF MIN AND MAX IN YEAR POPOVER
                */
                isYearInRange: function(year)
                {
                    if (this.minYear === year && this.maxYear === year)
                    {
                        return true;
                    }
                    else if (year >= this.minYear && year <= this.maxYear)
                    {
                        return true;
                    }

                    return false;
                }
            }
        }
    );
}