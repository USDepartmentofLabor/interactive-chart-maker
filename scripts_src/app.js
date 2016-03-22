$(document).ready(function () {

    //utils
    var jq_extensions = require("./utils/jq_extensions.js");
    var utils_main = require("./utils/utils_main");



    //initial all chart options init
    var allChartOptionsInit = require("./initializers/all_chart_options_init.js");
    var all_chart_options = allChartOptionsInit();

    //draw chart
    var draw_chart = require("./draw_chart.js");
    var chart = draw_chart.init(all_chart_options);

    //page init (navigation and keyboard entries)
    var navigation_setup = require("./navigation_setup.js");
    navigation_setup.initAllNavigation(all_chart_options);

    var keyboard_inputs = require("./keyboard_inputs");
    //first init
    keyboard_inputs.sideNavTabShortcuts(chart, all_chart_options);
    keyboard_inputs.initListeners(chart, all_chart_options);


    //all form updates - when updates are made, update the chart
    var allFormUpdates = require("./form_updates/all_form_updates.js");
    allFormUpdates(chart, all_chart_options);
        
    
});