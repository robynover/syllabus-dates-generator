/* ---------------------
	syllabus generator

	generates class dates

	input: start date, days of week, number of weeks
	
	output: array of dates

------------------------ */
var moment = require('moment');

function outputDates (startDateText,daysOfWeek,numWeeks) {
	var output = {};
	var startDate = moment(startDateText,"YYYY/MM/DD");
	var weekOfYear = startDate.week();
	var fillWeek = function(weekOfYear,dayNum,weekArr){
		var myDay= moment().week(weekOfYear).day(dayNum);
		weekArr.push(myDay.format("ddd MMM D, YYYY"));
	};

	for (var i=0; i < numWeeks; i++){
		// if there is more than one day ...
		var week = [];
		if (typeof daysOfWeek === "object"){	
			daysOfWeek.forEach(function(dayNum){
				//var myDay= moment().week(weekOfYear+i).day(dayNum);
				//week.push(myDay.format("ddd MMM D, YYYY"));
				fillWeek(weekOfYear+i,dayNum,week);
			});
		} else {
			//var myDay= moment().week(weekOfYear+i).day(daysOfWeek);
			//week.push(myDay.format("ddd MMM D, YYYY"));
			fillWeek(weekOfYear+i,daysOfWeek,week);
		}
		
		//output.push(week);
		output[(i+1)] = week;
	}	
	return output;
}

//console.log(outputDates("2016-02-17", [2,4], 12));

module.exports = outputDates;