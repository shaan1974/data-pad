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
                    /*"swm": false,*/
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
                    "today_day": moment().date(),
                    "today_month": moment().month(),
                    "today_year": moment().year(),

                    "cdebug": false,

                    "zconfig":
                    {
                        "firstDayOfTheWeekMonday": true,
                        "showCurrentDay": true,
                        "closeWhenDayAsBeenSelected": true,
                        "minDate": "",
                        "maxDate": "",
                        "closeOnResizeEvent": true,
                        "closeOnScrollEvent": true,
                        "css":
                        {
                            "input": "",
                            "table_container": "",
                            "table": "",
                            "table_header":
                            {
                                "date_navigator": "",
                                "right_arrow": "",
                                "left_arrow": "",
                                "month_year":
                                {
                                    "month_year": "",
                                    "month": "",
                                    "month_popover": "",
                                    "year": "",
                                    "year_popover": ""
                                }
                            },
                            "table_days_names":
                            {
                                "row": "",
                                "columns": ""
                            },
                            "table_days":
                            {
                                "previous_month": "",
                                "current_month": "",
                                "next_month": "",
                                "current_day": "",
                                "today": "",
                                "spd": "",
                                "nsd": "",
                                "diw": ""
                            }
                        },
                        "format": "DD-MM-YYYY",
                        "special_days": [],
                        "disabled_days": [],
                        "disabledWeekendEnds": false,
                        "position": "auto",
                        "fadesAnimation": true
                    }
                };
            },
            emits: ['vchange'],
            props: ['config', 'value'],
            template: '' + templateDataPad.replace(/<!--.*?-->/gm, '') + '',
            mounted: function()
            {
                //  BUILD INTERNAL CONFIGURATION
                //
                //  https://medium.com/javascript-in-plain-english/how-to-merge-objects-in-javascript-98f2209710e3
                //
                var merge = (...arguments) =>
                {
                    let target = {};
                    // Merge the object into the target object
                    let merger = (obj) =>
                    {
                        for (let prop in obj)
                        {
                            if (obj.hasOwnProperty(prop))
                            {
                                if (Object.prototype.toString.call(obj[prop]) === '[object Object]')
                                {
                                    // If we're doing a deep merge
                                    // and the property is an object
                                    target[prop] = merge(target[prop], obj[prop]);
                                }
                                else
                                {
                                    // Otherwise, do a regular merge
                                    target[prop] = obj[prop];
                                }
                            }
                        }
                    };
                    //Loop through each object and conduct a merge
                    for (let i = 0; i < arguments.length; i++)
                    {
                        merger(arguments[i]);
                    }
                    return target;
                };

                this.zconfig = merge(JSON.parse(JSON.stringify(this.zconfig)), JSON.parse(JSON.stringify(this.config)));

                // console.log(this.zconfig);

                //  SET FIRST DAY OF THE WEEK
                //
                //  this.swm = this.zconfig.firstDayOfTheWeekMonday;

                //  CHECK IF MIN-MAX HAS BEEN DEFINED OR NOT
                //
                this.zconfig.minDate = (this.zconfig.minDate === "") ? moment("01-01-0001", "MM-DD-YYYY").format(this.zconfig.format) : this.zconfig.minDate;
                this.zconfig.maxDate = (this.zconfig.maxDate === "") ? moment("01-01-9999", "MM-DD-YYYY").format(this.zconfig.format) : this.zconfig.maxDate;

                //  DEFINE MIN-MAX YEARS
                //
                this.minYear = moment(this.zconfig.minDate, this.zconfig.format).year();
                this.maxYear = moment(this.zconfig.maxDate, this.zconfig.format).year();

                //  DEFINE YEAR AND MONTH FOR CALENDAR
                //
                this.year = moment((this.value === "") ? new Date() : moment(this.value, this.zconfig.format)).year();
                this.month = moment((this.value === "") ? new Date() : moment(this.value, this.zconfig.format)).month() + 1;

                //  EXTERNAL EVENTS
                //

                //  A - IF A CLICK IS DONE OUTSITE THE CALENDAR, IT CLOSE IT
                //
                var cb = function(t, e)
                {
                    if (t.$el.isSameNode(e.target.closest(".data-pad")))
                    {
                        return true;
                    }

                    if (t.popupClick === true)
                    {
                        t.popupClick = false;
                    }
                    else
                    {
                        t.showCalendar = false;
                    }
                };

                document.querySelector("body").addEventListener("click", cb.bind(null, this), false);

                //  B - IF SCROLL/RESIZE WINDOW
                //
                var fct_hide_calendar = function(t, e)
                {
                    t.showCalendar = false;
                };

                if (this.zconfig.closeOnScrollEvent)
                {
                    window.addEventListener("scroll", fct_hide_calendar.bind(null, this), false);
                }

                if (this.zconfig.closeOnResizeEvent)
                {
                    window.addEventListener("resize", fct_hide_calendar.bind(null, this), false);
                }
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
                ["showCalendar"]: function(v, ov)
                {
                    this.popoverYears = this.popoverMonths = false;

                    if (v /* === true*/ )
                    {
                        this.$nextTick(() =>
                        {
                            if (this.zconfig.position !== "auto")
                            {
                                this.setCalendarPosition(this.zconfig.position.toUpperCase());
                            }
                            else
                            {
                                var cal = this.$el.querySelector(".data-pad-calendar");

                                if (this.isInViewport(cal) === false)
                                {
                                    //  TRY RIGHT
                                    this.setCalendarPosition("RIGHT");

                                    if (this.isInViewport(cal) === false)
                                    {
                                        // SET UP
                                        this.setCalendarPosition("UP");

                                        if (this.isInViewport(cal) === false)
                                        {
                                            this.setCalendarPosition("DOWN");
                                        }
                                    }
                                }
                            }

                            this.resetCalendar();
                        });
                    }
                }
            },
            computed:
            {
                "computedTransition": function()
                {
                    return (this.zconfig.fadesAnimation) ? "fade" : "no-fade";
                }
            },
            methods:
            {
                /*
                    SET CALENDAR POSTION
                */
                setCalendarPosition: function(p)
                {
                    var r1 = this.$el.querySelector("input").getBoundingClientRect();
                    var r2 = this.$el.querySelector(".data-pad-calendar").getBoundingClientRect();

                    switch (p)
                    {
                        case "DOWN":
                            this.$el.querySelector(".data-pad-calendar").style.transform = "translate(0px 0px)";
                            break;
                        case "UP":
                            this.$el.querySelector(".data-pad-calendar").style.transform = "translateY(-" + (r1.height + r2.height) + "px)";
                            break;
                        case "RIGHT":
                            this.$el.querySelector(".data-pad-calendar").style.transform = "translate(" + (r1.width) + "px,-" + (r1.height) + "px)";
                            break;
                        case "DOWN-RIGHT":
                            this.$el.querySelector(".data-pad-calendar").style.transform = "translate(" + (r1.width - r2.width) + "px, 0px)";
                            break;
                        case "UP-RIGHT":
                            this.$el.querySelector(".data-pad-calendar").style.transform = "translate(" + (r1.width - r2.width) + "px, -" + (r1.height + r2.height) + "px)";
                            break;
                    }
                },
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
                        year = moment(this.value, this.zconfig.format).year();
                        month = moment(this.value, this.zconfig.format).month() + 1;
                    }

                    this.month = month;
                    this.year = year;

                    this.buildCalendar(month, year);
                },
                /*
                    BUILD CALENDAR
                */
                buildCalendar: function(month, year)
                {
                    // var swm = this.zconfig.firstDayOfTheWeekMonday;
                    month--;

                    var firstDay = (new Date(year, month)).getDay();
                    var co = 0;
                    var c_year = moment(this.value, this.zconfig.format).year();
                    var c_month = moment(this.value, this.zconfig.format).month();
                    var c_day;

                    // if (swm)
                    if (this.zconfig.firstDayOfTheWeekMonday)
                    {
                        if (firstDay === 0)
                        {
                            firstDay = 7;
                        }

                        co = 1;
                    }

                    var dayInPreviousMmonth = moment((new Date(year, month))).subtract(1, 'months').daysInMonth();
                    var rows = [];
                    var d = 1;
                    var o;
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

                                if (d === this.today_day && year === this.today_year && month === this.today_month && this.zconfig.showCurrentDay === true)
                                {
                                    o.cd = true;
                                }

                                c_day = moment(this.value, this.zconfig.format).date();

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
                    if (td.t === 'pm' || td.t === 'nm' || this.isMinDateBefore(td) || this.isMaxDateAfter(td) || this.checkDay(td.d, td.t, 'disabled_days'))
                    {
                        return false;
                    }

                    this.$emit('vchange', moment("" + this.year + "-" + this.month + "-" + td.d, "YYYY-MM-DD").format(this.zconfig.format));

                    if (this.zconfig.closeWhenDayAsBeenSelected === true)
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
                    var current_d = moment("" + this.year + "-" + this.month + "-01", "YYYY-MM-DD");
                    var f = ["pm", "cm", "nm"].indexOf(td.t);

                    current_d.add((f - 1), 'months').date(td.d);

                    var minDate = moment(this.zconfig.minDate, this.zconfig.format);

                    return current_d.isSameOrBefore(minDate);
                },
                /*
                    TO KNOW IF CURRENT DATE IF AFTER MAx DATE
                */
                isMaxDateAfter: function(td)
                {
                    var current_d = moment("" + this.year + "-" + this.month + "-01", "YYYY-MM-DD");
                    var f = ["pm", "cm", "nm"].indexOf(td.t);

                    current_d.add((f - 1), 'months').date(td.d);

                    var maxDate = moment(this.zconfig.maxDate, this.zconfig.format);

                    return current_d.isSameOrAfter(maxDate);
                },
                /*
                    CHECK IF DATE IS IS RANGE FOR MONTH POPOVER
                */
                isMonthInRange: function(year, month)
                {
                    var m_date = moment("" + year + "-" + month + "-01", "YYYY-MM-DD");
                    var minD = moment(this.zconfig.minDate, "" + this.zconfig.format + "");
                    var maxD = moment(this.zconfig.maxDate, "" + this.zconfig.format + "");

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
                },
                /*

                */
                checkDay: function(d, t, m)
                {
                    // var comp = this.zconfig["special_days"];
                    var comp = this.zconfig["" + m + ""];
                    var current_d, f;

                    if (typeof comp !== "undefined")
                    {
                        current_d = moment("" + this.year + "-" + this.month + "-01", "YYYY-MM-DD");
                        //  RECALCULATE DATE DEPENDING OF THE TYPE, "PM","CM","NM"
                        //
                        f = ["pm", "cm", "nm"].indexOf(t);

                        current_d.add((f - 1), 'months').date(d);

                        // return (this.zconfig.special_days.indexOf("" + current_d.format(this.zconfig.format) + "") !== -1) ? true : false;
                        for (var i = 0; i < comp.length; i++)
                        {
                            if (comp[i].length === current_d.format(this.zconfig.format).length)
                            {
                                if (comp[i] === current_d.format(this.zconfig.format))
                                {
                                    return true;
                                }
                            }
                            else
                            {
                                v = comp[i].split(",");
                                v[0] = moment(v[0], this.zconfig.format);
                                v[1] = moment(v[1], this.zconfig.format);

                                if (current_d.isSameOrAfter(v[0]) && current_d.isSameOrBefore(v[1]))
                                {
                                    return true;
                                }
                            }
                        }
                    }
                    else
                    {
                        if (m === "disabledWeekend" && this.zconfig.disabledWeekendEnds === true)
                        {
                            // console.log("IS WEEKEND");

                            current_d = moment("" + this.year + "-" + this.month + "-01", "YYYY-MM-DD");
                            f = ["pm", "cm", "nm"].indexOf(t);

                            var dofw = current_d.add((f - 1), 'months').date(d).day();

                            if (dofw === 0 || dofw === 6)
                            {
                                return true;
                            }

                            return false;
                        }
                    }

                    return false;
                },
                /*
                    IS IN VIEW PORT
                */
                isInViewport: function(element)
                {
                    var rect = element.getBoundingClientRect();
                    return (
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                    );
                }
            }
        }
    );
}