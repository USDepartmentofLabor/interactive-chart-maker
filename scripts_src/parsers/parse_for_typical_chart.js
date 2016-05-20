/** 
 * Parsing function for typical chart types (line, bar, column) 
 * @module
 * @param input {element} input jquery table element retrieved from textarea
 * @param load_series_from {string} column_heads or column_rows
 * @param chart_type {string} type of chart (line, bar etc.)
 * @returns {object} Object with chart title, X-axis categories and series array of objects
 */


var parseForTypicalChart = function (input, load_series_from, chart_type, legend_toggle_enabled, colors, all_chart_options) {

    var type = chart_type.replace("stacked_", "");

    var output = {};
    output.series = [];

    /** If loading series names from column heads is selected*/
    if (load_series_from === "column_heads") {
        //load x-axis categories from row heads
        output.x_axis_categories = [];
        $("tbody th", input).each(function () {
            output.x_axis_categories.push($.trim($(this).text()));
        });

        //load series object names from column heads, and data from each column tds

        $("thead tr:last th:gt(0)", input).each(function (i) {
            var seriesObj = {
                name: $.trim($.trim($(this).text())),
                data: [],
//                dataLabels: {
//                    enabled: all_chart_options ? all_chart_options.plotOptions.series.dataLabels.enabled : false
//                },
                type: type,
                color: colors[i],
                _symbolIndex: i,
                stacking: ["area", "stacked_bar", "stacked_column"].indexOf(chart_type) > -1 ? "stacked" : null,
                visible: i > 0 && legend_toggle_enabled === true ? false : true

            };

            //data from each column's tds
            $("tbody tr", input).each(function () {
                var this_row = $(this);
                $("td:eq(" + i + ")", this_row).each(function () {
                    seriesObj.data.push($(this).getNumber());
                });
            });

            output.series.push(seriesObj);

        });



        /** Else if loading series names from row heads is selected*/
    } else {

        //load x-axis categories from column heads
        output.x_axis_categories = [];
        $("thead th:gt(0)", input).each(function () {
            output.x_axis_categories.push($.trim($(this).text()));
        });

        //load series object names from row heads, and data from row tds
        $("tbody tr", input).each(function (i) {

            var this_row = $(this);

            var seriesObj = {
                name: $.trim($("th:eq(0)", this_row).text()),
                data: [],
//                dataLabels: {
//                    enabled: all_chart_options ? all_chart_options.plotOptions.series.dataLabels.enabled : false
//                },
                type: type,
                color: colors[i],
                _symbolIndex: i,
                stacking: ["area", "stacked_bar", "stacked_column"].indexOf(chart_type) > -1 ? "stacked" : null,
                visible: i > 0 && legend_toggle_enabled === true ? false : true
            };

            //get data values from each row's td cells
            $("td", this_row).each(function () {
                seriesObj.data.push($(this).getNumber());
            });

            output.series.push(seriesObj);

        });
    }

    return output;

};


module.exports = parseForTypicalChart;