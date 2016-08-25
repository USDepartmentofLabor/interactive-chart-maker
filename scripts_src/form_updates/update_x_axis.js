var utils_main = require("../utils/utils_main.js");

/** when X-axis options are changed in the side area, these methods are called 
@namespace
*/

var update_x_axis = {



    /** update x-axis formatter **/
    /** update format when dollar / percent signs select is changed TODO!*/
    updateFormatter: function (only_numbers, add_commas, chart, all_chart_options) {

        var newXFormat = undefined;

        if (only_numbers) {
            newXFormat = function () {
                return this.value.replace(/[^0-9\.\-]+/g, '') //hide non-numbers if show only years box is checked//
            }
        }

        if (add_commas) {
            newXFormat = function () {
                return $(Number(this.value)).addCommas(); //hide non-numbers if show only years box is checked//
            }
        }


        if (!chart) { // called when this is used in y_axis_init
            return newXFormat;
        }

        chart.xAxis[0].update({
            labels: {
                formatter: newXFormat
            }
        });


        all_chart_options.xAxis.labels.formatter = newXFormat;


    },
    
    
     /** update x-axis max */
    updateMax: function (newMax, chart, all_chart_options) {
        newMax = utils_main.checkForUndefined(newMax);
        if (!chart) { // called when this is used in x_axis_init
            return newMax;
        }

        chart.xAxis[0].update({
            max: newMax
        });

        all_chart_options.xAxis.max = newMax;
    },



    /** update y-axis min */
    updateMin: function (newMin, chart, all_chart_options) {
        newMin = utils_main.checkForUndefined(newMin);
        if (!chart) { // called when this is used in x_axis_init
            return newMin;
        }

        chart.xAxis[0].update({
            min: newMin
        });

        all_chart_options.xAxis.min = newMin;
    },
    

    /**makes x-axis MLR or standard style **/
    toggleMLRStyle: function (is_checked, chart, all_chart_options) {

        //if using MLR styles
        if (is_checked) {
            all_chart_options.xAxis.tickPosition = "inside";
            all_chart_options.xAxis.tickColor = "#000";
        } else { //using standard styles
            all_chart_options.xAxis.tickPosition = "outside";
            all_chart_options.xAxis.tickColor = "#C0D0E0";
        }


        chart.xAxis[0].update({
            tickPosition: all_chart_options.xAxis.tickPosition,
            tickColor: all_chart_options.xAxis.tickColor
        });
    },


    /** update the x-axis title **/
    updateTitle: function (new_title, chart, all_chart_options) {
        chart.xAxis[0].setTitle({
            text: new_title
        });

        all_chart_options.xAxis.title.text = new_title;

    },
    
    
    /** update the x-axis title indent (bar charts only) **/
    updateTitleIndent: function(new_indent, chart, all_chart_options){
         chart.xAxis[0].setTitle({
            x: new_indent
        });

        all_chart_options.xAxis.title.x = new_indent;
        
    },
    

    /** update x axis tickmark interval **/
    updateTickmarkInterval: function (newInterval, chart, all_chart_options) {


        if (isNaN(newInterval) || newInterval === 0) {
            newInterval = undefined;
        };

        if (!chart) { // called when this is used in x_axis_init
            return newInterval;
        }

        if (newInterval > chart.xAxis[0].dataMax) {
            newInterval = chart.xAxis[0].dataMax;
        }

        chart.xAxis[0].update({
            tickInterval: newInterval
        });
        all_chart_options.xAxis.tickInterval = newInterval;

    }


}


module.exports = update_x_axis;