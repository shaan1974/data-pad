/*jshint esversion: 6 */

var templateDataPad = `
	
	<span class="data-pad">

		<template v-if="cdebug">
			<div style="background-color:pink;"></div>
		</template>

		<input 
			type="text" 
			v-on:input="this.$emit('vchange', $event.target.value)" 
			v-bind:value="value" 
			v-on:click="this.showCalendar=!this.showCalendar;(this.showCalendar) ? this.resetCalendar() : '';" 
			class="data-pad-input" 
			:class="zconfig.css.input">
		
		<transition :name="computedTransition">
		<div v-if="showCalendar" class="data-pad-calendar" :class="[zconfig.css.table_container]">
			
			<table :class="zconfig.css.table">
				
				<!-- HEAD -->
				<tr class="date_navigator" :class="zconfig.css.table_header.date_navigator">

					<th 
						v-on:click="(zconfig.css.table_header.left_arrow, rows[0][0].fd===true ) ? '': this.month--;this.popoverYears=false;this.popoverMonths=false;" 
						:class="[zconfig.css.table_header.left_arrow, rows[0][0].fd===true ? 'disabled' : 'month_left' ]">&#160;</th>
					
					<th colspan="5" class="month_year" :class="zconfig.css.table_header.month_year.month_year">

						<span class="select_month" :class="zconfig.css.table_header.month_year.month">
							<span v-on:click="popoverMonths=!popoverMonths;popoverYears=false;">{{this.labels.months[month-1]}}</span>
							<div class="popover__content" v-if="popoverMonths" :class="zconfig.css.table_header.month_year.month_popover">
								<p class="popover__message">
									<ul>
										<template v-for="(m,index) in this.labels.months" >
											<li 
												:class="[ this.month === index+1 ? 'current' : '']" 
												v-on:click="popupClick=true;this.month=index+1;popoverMonths=false;this.buildCalendar(this.month, this.year);" v-if="this.isMonthInRange(this.year,index+1)">{{m}}</li>
										</template>
									</ul>
								</p>
							</div>
						</span>
						
						&mdash; 
					
						<span class="select_year" :class="zconfig.css.table_header.month_year.year">
							<span v-on:click="popoverYears=!popoverYears;popoverMonths=false;">{{year}}</span>
							<div class="popover__content" v-if="popoverYears" :class="zconfig.css.table_header.month_year.year_popover">
								<p class="popover__message">
									<ul @wheel.prevent="scrollYears($event)">
										
										<li class="up" v-on:click="this.isYearInRange(this.tmp_year-4-1) ? this.tmp_year-- : ''" :class="[this.isYearInRange(this.tmp_year-4-1) ? '' : 'disabled']"></li>
										
										<template v-for="n in 4" >
										<li 											
											:class="[ this.year === (this.tmp_year-4+n-1) ? 'current' : '']" 
											v-on:click="popupClick=true;this.year=this.tmp_year-4+n-1;popoverYears=false;this.buildCalendar(this.month, this.year);" 
											v-if="this.isYearInRange(this.tmp_year-4+n-1)">{{this.tmp_year-4+n-1}}</li>
										</template>
										
										<li 
											:class="[ this.year === this.tmp_year ? 'current' : '']" 
											v-on:click="popupClick=true;this.year=this.tmp_year;popoverYears=false;this.buildCalendar(this.month, this.year);" 
											:r="this.isYearInRange(this.year)">{{this.tmp_year}}</li>
										
										<template v-for="n in 4" >
										<li 											
											:class="[ this.year === (this.tmp_year+n) ? 'current' : '']" 
											v-on:click="popupClick=true;this.year=this.tmp_year+n;popoverYears=false;this.buildCalendar(this.month, this.year);" 
											v-if="this.isYearInRange(this.tmp_year+n)">{{this.tmp_year+n}}</li>
										</template>

										<li class="down" v-on:click="this.isYearInRange(this.tmp_year+5) ? this.tmp_year++ : ''" :class="[this.isYearInRange(this.tmp_year+5) ? '' : 'disabled']"></li>

									</ul>
								</p>
						</div>
						</span>

					</th>

					<th 
						v-on:click="(rows[rows.length-1][rows[rows.length-1].length-1].fd===true) ? '' : this.month++;this.popoverYears=false;this.popoverMonths=false;" 
						:class="[zconfig.css.table_header.right_arrow , rows[rows.length-1][rows[rows.length-1].length-1].fd===true ? 'disabled' : 'month_right']">&#160;</th>

				</tr>
				<!-- /HEAD -->

				<!-- DAYS NAMES -->
				<tr class="days_names" :class="zconfig.css.table_days_names.row">
					<template v-if="zconfig.firstDayOfTheWeekMonday">				
						<template v-for="n in 6">
							<th :class="zconfig.css.table_days_names.columns">{{this.labels.days[n]}}</th>
						</template>
						<th :class="zconfig.css.table_days_names.columns">{{this.labels.days[0]}}</th>
					</template>				
					<template v-else>
						<th v-for="dn in this.labels.days" v-html="dn" :class="zconfig.css.table_days_names.columns"></th>
					</template>
				</tr>
				<!-- /DAYS NAMES -->

				<!-- CALENDAR DAYS -->
				<template v-for="(tr,index_tr) in rows" >
				<tr class="calendar_days">
					
					<template v-for="td in tr">
						<td 
							:class="[								
								td.t , 
								this.checkDay(td.d,td.t,'special_days') ? 'sd '+zconfig.css.table_days.spd : '',
								this.checkDay(td.d,td.t,'disabled_days') ? 'cbs '+zconfig.css.table_days.nsd : '',
								this.checkDay(td.d,td.t,'disabledWeekend') ? 'cbs '+zconfig.css.table_days.diw : '',
								td.fd ? 'cbs' : '',
								(typeof td.cd !=='undefined' ) ? 'cd '+zconfig.css.table_days.today : '' ,  
								(typeof td.sel !=='undefined' ) ? 'selected '+zconfig.css.table_days.current_day : '' , 
								td.t==='pm' ? ''+zconfig.css.table_days.previous_month+'' : '' , 
								td.t==='cm' ? ''+zconfig.css.table_days.current_month+'' : '' , 
								td.t==='nm' ? ''+zconfig.css.table_days.next_month+'' : '' ]" 
							v-on:click="setDate(td)"><div class="blk">{{td.d}}</div>
						</td>
					</template>

				</tr>
				</template>
				<!-- /CALENDAR DAYS -->

			</table>

		</div>
		</transition>

	</span>
`;