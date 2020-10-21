# VueJS Data-Pad

**Purpose :**

As i need a date picker to replace the input type date into the filter component of Data-greep, i'v build this one.

Still consider as in Developpement.

**Dependecies :**

Only moment.js.

**Demo :**

[Fully working demo](https://codepen.io/shaan1974/pen/LYZZjPw)

**Options: **

```
    {
        "firstDayOfTheWeekMonday": true,
        "showCurrentDay": true,
        "closeWhenDayAsBeenSelected": false,
        "minDate": "10-07-2020",
        "maxDate": "04-11-2021",
        "closeOnResizeEvent": true,
        "closeOnScrollEvent": true,
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
                "today": "waza_td",
                "spd": "waza_sp",
                "nsd": "waza_cbs"
            }
        },
        "format": "DD-MM-YYYY",
        "special_days": ["09-11-2020,13-11-2020", "25-12-2020", "01-01-2021"],
        "disabled_days": ["07-12-2020", "23-11-2020,27-11-2020"]
    }
```

```
<data-pad ref="main-data-pick-a-date" v-bind:config="PadConfig" v-on:vchange="value = $event" v-bind:value="value"></data-pad>
```

**To do: **

- New feature - Add Time ( Am/Pm, 24 ) ?
- Positionning of calendar on Top if Bottom has not enough spaces
- Options - Allow selecting weekend days

**Versions: **

1.5 ( Abba - Voulez-vous ? )

- Remove commented codes.
- Introduce range date into specials days ( like holidays).
- Introduce simple date or range for unselectable days.

1.4

- Code refactoring.
- Introduce special days ( Like holidays )
- Bug with min/max date if not in the same year.
- Bug of visibility since all td are put as position relative for popover Months and Dates.

1.3 ( Waza )

- Add 2 options in config to hide calendar on window scroll or resize


1.2 - ( Cosmos 1999 )

- First version with a Build and an example.

1.1a

- Create Build. Full and with no css.

1.1 - ( Beat It )

- Correct fact that send data to component could be empty :)
- Min, Max Dates
- Popover Months, Years related to Min, Max.

1.0 - ( Stargate ) - First release.