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
                    "cdebug": false,
                    "labels":
                    {
                        "months_long": moment.localeData()._months,
                        "months": moment.localeData()._monthsShort,
                        "days": moment.localeData()._weekdaysMin
                    }

                };
            },
            emits: ['vchange'],
            props: ['config', 'value'],
            template: '' + templateDataPad.replace(/<!--.*?-->/gm, '') + '',
            mounted: function()
            {
                this.swm = this.config.firstDayOfTheWeekMonday;
                console.log("VALUE: " + this.value);

                this.year = moment(this.value, this.config.format).year();
                this.month = moment(this.value, this.config.format).month() + 1;
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
                            row.push(o);
                        }
                        rows.push(row);
                    }

                    this.rows = rows;
                    // console.log(rows);

                    this.tmp_year = this.year;
                },
                /*

                */
                setDate: function(d)
                {
                    this.$emit('vchange', moment("" + this.year + "-" + this.month + "-" + d, "YYYY-MM-DD").format(this.config.format));

                    this.$nextTick(() =>
                    {
                        this.buildCalendar(this.month, this.year);
                    });
                },
                /*

                */
                log: function(e)
                {
                    if (e.deltaY > 0)
                    {
                        this.tmp_year++;
                    }
                    else
                    {
                        this.tmp_year--;
                    }
                }
            }
        }
    );
}