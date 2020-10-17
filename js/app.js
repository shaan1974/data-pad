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
                "css":
                {
                    "right_arrow": "",
                    "left_arrow": ""
                },
                "format": "DD-MM-YYYY"
            },
            "value": "16-09-2020"
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