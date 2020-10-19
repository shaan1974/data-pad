/*jshint esversion: 6 */
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
                    "cdebug": true
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
                /*
                    WHEN MONTH VALUE IS CHANGE SO THE CALENDAR IS AUTOMATICLY RECALCULATED
                */
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
                /*
                    WHEN THE CALENDAR IS SHOWN, POPOVERS ARE HIDDEN ( MONTHS, YEARS )
                */
                ["showCalendar"]: function()
                {
                    this.popoverYears = false;
                    this.popoverMonths = false;
                }
            },
            methods:
            {
                /*
                    RESET CALENDAR TO REVERT TO CURRENT DAY OR CURRENT MONTH/YEAR WHEN ENTER INTO THE CALENDAR
                */
                resetCalendar: function()
                {
                    var year, month;
                    if (this.value === "")
                    {
                        year = moment().year();
                        month = moment().month() + 1;
                    }
                    else
                    {
                        year = moment(this.value, this.config.format).year();
                        month = moment(this.value, this.config.format).month() + 1;
                    }

                    this.buildCalendar(month, year);
                },
                /*
                    BUILD CALENDAR
                */
                buildCalendar: function(month, year)
                {
                    // console.log(month, year);
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

                    //  CHECK IF LAST LINE IS WITH t="NM" FOR ALL CELLS
                    //
                    var l = rows[rows.length - 1].filter(function(o)
                    {
                        if (o.t === "nm") return o;
                    }).length;

                    if (l === 7)
                    {
                        rows.pop();
                    }

                    //  SET ROW TO MODEL
                    //
                    this.rows = rows;
                    this.tmp_year = this.year;
                },
                /*
                    SET NEW DATE TO MODEL WHEN A CELL IS CLICK
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
                    WHEN MOUSEWHEEL IS USE IN YEARS POPOVERS
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

                    /*var t = {
                        "pm": -1,
                        "cm": 0,
                        "nm": 1
                    };

                    m = t[td.t];*/

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