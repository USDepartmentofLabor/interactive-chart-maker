var utils_main = require("../utils/utils_main.js");


/** when Y-axis options are changed in the side area, these methods are called 
@namespace
*/
var update_y_axis = {

    /**makes y-axis MLR or standard style **/
    toggleMLRStyle: function (is_checked, chart, all_chart_options) {

        //if using MLR styles
        if (is_checked) {
            all_chart_options.yAxis.tickWidth = 0;
            all_chart_options.yAxis.gridLineDashStyle = 'Solid';
        } else { //using standard styles
            all_chart_options.yAxis.tickWidth = 1;
            all_chart_options.yAxis.gridLineDashStyle = 'Dot';

        }

        chart.yAxis[0].update({
            tickWidth: all_chart_options.yAxis.tickWidth,
            gridLineDashStyle: all_chart_options.yAxis.gridLineDashStyle
        });

    },


    /** update format when dollar / percent signs select is changed */
    updateFormatter: function (sign, decimals, dividend, chart, all_chart_options) {

        if (sign === "$") {
            var newFormat = function () {
                var s = "$" + Highcharts.numberFormat(this.value / dividend, decimals);
                return s.replace(/\$-/g, "-$");
            }
        } else if (sign === "%") {
            var newFormat = function () {
                return Highcharts.numberFormat(this.value / dividend, decimals) + "%";
            }
        } else {
            var newFormat = function () {
                return Highcharts.numberFormat(this.value / dividend, decimals);
            }
        }


        if (!chart) { // called when this is used in y_axis_init
            return newFormat;
        }

        chart.yAxis[0].update({
            labels: {
                formatter: newFormat
            }
        });


        var replacement_obj ={
            decimals: decimals,
            dividend: dividend  
        };
        
        all_chart_options.yAxis.formatter = utils_main.stringifyFormatter(newFormat, replacement_obj); ///////TODO FIXX


    },





    /** update if y-axis is log */
    updateIsLog: function (val, chart, all_chart_options) {

        var type = val === true ? "logarithmic" : "linear";
        if (!chart) { // called when this is used in y_axis_init
            return type;
        }

        chart.yAxis[0].update({
            type: type
        });
        all_chart_options.yAxis.type = type;

    },


    /** update if y axis labels are on opposite side */
    updateIsOpposite: function (val, chart, all_chart_options) {
        chart.yAxis[0].update({
            opposite: val
        });
        all_chart_options.yAxis.opposite = val;

    },

    /** update y-axis max */
    updateMax: function (newMax, chart, all_chart_options) {
        newMax = utils_main.checkforUndefined(newMax);
        if (!chart) { // called when this is used in y_axis_init
            return newMax;
        }

        chart.yAxis[0].update({
            max: newMax
        });

        all_chart_options.yAxis.max = newMax;
    },

    /** update y-axis min */
    updateMin: function (newMin, chart, all_chart_options) {
        newMin = utils_main.checkforUndefined(newMin);
        if (!chart) { // called when this is used in y_axis_init
            return newMin;
        }

        chart.yAxis[0].update({
            min: newMin
        });

        all_chart_options.yAxis.min = newMin;
    },

    /** update the y axis title */
    updateTitle: function (newTitle, chart, all_chart_options) {
        chart.yAxis[0].setTitle({
            text: newTitle
        });

        all_chart_options.yAxis.title.text = newTitle;

    },

    /** update y axis x-position (title.x) */


    updateXPosition: function (newXPosition, chart, all_chart_options) {

        newXPosition = utils_main.checkforUndefined(newXPosition);

        chart.yAxis[0].setTitle({
            x: newXPosition
        });

        all_chart_options.yAxis.title.x = newXPosition;

    },

    /** update y axis tickmark interval */
    updateTickmarkInterval: function (newInterval, chart, all_chart_options) {


        newInterval = utils_main.checkforUndefined(newInterval);

        if (!chart) { // called when this is used in y_axis_init
            return newInterval;
        }

        if (newInterval > chart.yAxis[0].dataMax) {
            newInterval = chart.yAxis[0].dataMax;
        }

        chart.yAxis[0].update({
            tickInterval: newInterval

        });
        all_chart_options.yAxis.tickInterval = newInterval;

    }



}


module.exports = update_y_axis;