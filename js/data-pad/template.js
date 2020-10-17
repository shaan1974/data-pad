/*jshint esversion: 6 */

var templateDataPad = `
		
	<input type="text" v-on:input="this.$emit('vchange', $event.target.value)" v-bind:value="value" v-on:click="this.showCalendar=!this.showCalendar;">
	
	<div v-if="showCalendar" class="data-pad-calendar">
		
		<template v-if="cdebug">{{this.month}}-{{this.year}}</template>
		<table>
			
			<tr class="date_navigator">
				<th class="month_left" v-on:click="this.month--">&#160;</th>
				
				<th colspan="5" class="month_year">

					<span class="select_month">
						<span v-on:click="popoverMonths=!popoverMonths;popoverYears=false;">{{this.labels.months[month-1]}}</span>
						<div class="popover__content" v-if="popoverMonths">
							<p class="popover__message">
								<ul>
									<li v-for="(m,index) in this.labels.months" :class="[ this.month === index+1 ? 'current' : '']" v-on:click="this.month=index+1;popoverMonths=false;this.buildCalendar(this.month, this.year);">{{m}}</li>
								</ul>
							</p>
						</div>
					</span>
					
					- 
				
					<span class="select_year">
						<span v-on:click="popoverYears=!popoverYears;popoverMonths=false;">{{year}}</span>
						<div class="popover__content" v-if="popoverYears">
							<p class="popover__message">
								<ul @wheel.prevent="log($event)">
									<li class="up" v-on:click="this.tmp_year--"></li>
									<li v-for="n in 4" :class="[ this.year === (this.tmp_year-4+n-1) ? 'current' : '']" v-on:click="this.year=this.tmp_year-4+n-1;popoverYears=false;this.buildCalendar(this.month, this.year);">{{this.tmp_year-4+n-1}}</li>
									<li :class="[ this.year === this.tmp_year ? 'current' : '']" v-on:click="this.year=this.tmp_year;popoverYears=false;this.buildCalendar(this.month, this.year);">{{this.tmp_year}}</li>
									<li v-for="n in 4" :class="[ this.year === (this.tmp_year+n) ? 'current' : '']" v-on:click="this.year=this.tmp_year+n;popoverYears=false;this.buildCalendar(this.month, this.year);">{{this.tmp_year+n}}</li>
									<li class="down" v-on:click="this.tmp_year++"></li>
								</ul>
							</p>
					</div>
					</span>

				</th>

				<th class="month_right" v-on:click="this.month++">&#160;</th>
			</tr>
			<!-- DAYS NAMES -->
			<tr class="days_names" >
				<template v-if="config.firstDayOfTheWeekMonday">				
					<template v-for="n in 6">
						<th>{{this.labels.days[n]}}</th>
					</template>
					<th>{{this.labels.days[0]}}</th>
				</template>				
				<template v-else>
					<th v-for="dn in this.labels.days" v-html="dn"></th>
				</template>
			</tr>
			<!-- /DAYS NAMES -->

			<template v-for="(tr,index_tr) in rows" >
			<tr class="calendar_days" v-if="displayLine(tr)">
				
				<template v-for="td in tr">
					<td :class="[td.t , (typeof td.cd !=='undefined' ) ? 'cd' : '' ,  (typeof td.sel !=='undefined' ) ? 'selected' : '' ]" v-on:click="setDate(td.d)"><div class="blk">{{td.d}}</div></td>
				</template>

			</tr>
			</template>

		</table>

	</div>

	<hr/>
	111
	<br/>
	ZAZ
    
`;