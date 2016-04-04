var utils_main = require("../utils/utils_main.js");
var utils_forms = require("../utils/utils_forms");


/** when tooltip options are changed in the side area, these methods are called 
@namespace
*/
var update_tooltip = {









    /** gets a tooltip for bubble charts. Called from updateToolTip **/
    getBubbleTooltip: function (chart, decimals, signs_arr, multiplier, chart_type, z_title) {

        var newTooltip = function () {
            var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
            var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";

            var s = "<b>" + this.series.name + "</b><br>" + y_axis_title + ": <b>" + signs_arr[0] +
                Highcharts.numberFormat((this.y * multiplier), decimals) + signs_arr[1] + "</b><br/>" +
                x_axis_title + ": <b>" + signs_arr[0] + Highcharts.numberFormat((this.x * multiplier), decimals) + signs_arr[1] + "</b><br/>" +
                z_title + ": <b>" + signs_arr[0] + Highcharts.numberFormat((this.x * multiplier), decimals) + signs_arr[1] + "</b>";

            return s.replace(/\$-/g, "-$");
        };

        return newTooltip;

    },



    /** gets a tooltip for scatter charts. Called from updateToolTip**/
    getScatterTooltip: function (chart, decimals, signs_arr, multiplier, chart_type) {

        var newTooltip = function () {
            var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
            var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";

            var s = "<b>" + this.series.name + "</b><br>" + y_axis_title + ": <b>" + signs_arr[0] +
                Highcharts.numberFormat((this.y * multiplier), decimals) + signs_arr[1] + "</b><br/>" +
                x_axis_title + ": <b>" + signs_arr[0] + Highcharts.numberFormat((this.x * multiplier), decimals) + signs_arr[1] + "<br/>";

            return s.replace(/\$-/g, "-$");
        };

        return newTooltip;
    },



    /** gets a tooltip for typical charts (line, area, bar etc). Called from updateToolTip**/
    getTypicalTooltip: function (chart, is_shared, decimals, signs_arr, multiplier, chart_type) {

        var newTooltip;

        if (is_shared) { //SHARED TOOLTIP

            if (decimals > 0) { //use decimal formatter

                newTooltip = function () {

                    var shared_tooltip_arr = [];
                    var point = this.point;

                    $.each(chart.series, function () {
                        shared_tooltip_arr.push("<b>" + this.name + "</b> <br>" + this.points[point.x].x + ": " + signs_arr[0] + Highcharts.numberFormat((this.points[point.x].y * multiplier), decimals) + signs_arr[1]);
                    });
                    return shared_tooltip_arr.join('<br/>').replace(/\$-/g, "-$");
                }

            } else { //don't use decimal formatter

                newTooltip = function () {

                    var shared_tooltip_arr = ["<b>" + this.key + "</b>"];
                    var point = this.point;

                    $.each(chart.series, function () {
                        shared_tooltip_arr.push(this.name + ": " + signs_arr[0] + $(this.points[point.x].y * multiplier).addCommas() + signs_arr[1]);
                    });
                    return shared_tooltip_arr.join('<br/>').replace(/\$-/g, "-$");
                }
            }


        } else { //NOT SHARED TOOLTIP

            if (decimals > 0) { //use decimal formatter
                newTooltip = function () {
                    var s = "<b>" + this.series.name + "</b><br>" + this.x + ": " + signs_arr[0] +
                        Highcharts.numberFormat((this.y * multiplier), decimals) + signs_arr[1];
                    return s.replace(/\$-/g, "-$");
                }
            } else { //don't use decimal formatter
                newTooltip = function () {
                    var s = "<b>" + this.series.name + "</b><br>" + this.x + ": " + signs_arr[0] +
                        $(this.y * multiplier).addCommas() + signs_arr[1];
                    return s.replace(/\$-/g, "-$");
                }
            }
        }

        return newTooltip;
    },





    /** update tooltip - decide which kind of chart and call that get tooltip function **/
    updateToolTip: function (chart, all_chart_options, tt_options) {

        var newTooltip; //will be the returned function

        var is_shared = tt_options.is_shared;
        var decimals = tt_options.decimals;
        var signs = tt_options.signs;
        var multiplier = tt_options.multiplier;
        var chart_type = all_chart_options.chart.type;

        var signs_arr = [signs === "$" ? "$" : "", signs === "%" ? "%" : ""];
        var z_title = "Test Z title";


        //IF A TYPICAL CHART
        if (["area", "line", "bar", "stacked_bar", "column", "stacked_column"].indexOf(chart_type) > -1) {
            newTooltip = update_tooltip.getTypicalTooltip(chart, is_shared, decimals, signs_arr, multiplier, chart_type);
        }

        //IF A SCATTER CHART
        else if (chart_type === "scatter") {
            newTooltip = update_tooltip.getScatterTooltip(chart, decimals, signs_arr, multiplier, chart_type);
        }

        //IF A BUBBLE CHART
        else if (chart_type === "bubble") {
            newTooltip = update_tooltip.getBubbleTooltip(chart, decimals, signs_arr, multiplier, chart_type, z_title);
        }



        if (!chart) { //for use in tooltip_init
            return newTooltip;
        }

        chart.tooltip.options.formatter = newTooltip;

        update_tooltip.replacement_obj = {
            decimals: decimals,
            multiplier: multiplier,
            signs_arr: signs_arr,
            z_title: z_title
        };

        //   all_chart_options.tooltip.formatter = utils_main.stringifyFormatter(newTooltip, replacement_obj);

        all_chart_options.tooltip.formatter = newTooltip;
    }

}


module.exports = update_tooltip;