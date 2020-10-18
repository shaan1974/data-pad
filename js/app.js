// App._context.app._component.data()
// https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d
//
var App;

var DataPad = {
    data: function()
    {
        return {
            "PadConfig":
            {
                "firstDayOfTheWeekMonday": true,
                "showCurrentDay": true,
                "closeWhenDayAsBeenSelected": false,
                "minDate": "10-07-2020",
                "maxDate": "04-11-2020",
                "css":
                {
                    "input": "waza_input",
                    "table_container": "waza_table_container",
                    "table": "waza_table",
                    "table_header":
                    {
                        "date_navigator": "waza_data_navigator",
                        "right_arrow": "waza_right_arrow",
                        "left_arrow": "waza_left_arrow",
                        "month_year":
                        {
                            "month_year": "waza_my",
                            "month": "waza_my_month",
                            "month_popover": "waza_my_month_popover",
                            "year": "waza_my_year",
                            "year_popover": "waza_my_year_popover"
                        }
                    },
                    "table_days_names":
                    {
                        "row": "waza_row",
                        "columns": "waza_cols"
                    },
                    "table_days":
                    {
                        "previous_month": "waza_pm",
                        "current_month": "waza_cm",
                        "next_month": "waza_nm",
                        "current_day": "waza_cd",
                        "today": "waza_td"
                    }
                },
                "format": "DD-MM-YYYY"
            },
            "value": "16-09-2020",
            "value_": ""
        };
    },
    computed:
    {},
    watch:
    {},
    mounted: function() {}
};

App = Vue.createApp(DataPad);

initDataPad(App);
App.mount('#app');