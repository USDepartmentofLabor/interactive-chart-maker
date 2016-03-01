var update_template = {
    resize: function (val, dimension, chart) {
        val = Number(val);
        if (!isNaN(val)) {
            $(".chart_display_area").css(dimension, val + "px");
        }
        chart.reflow();
    },

    margin: function (margins_arr, chart, all_chart_options) {

        $.each(chart.axes, function (i, e) {
            e.isDirty = true; //to tell axes to refresh
        });
        chart.margin = margins_arr;
        chart.redraw(false);
        
        all_chart_options.chart.margin = margins_arr;

    }
}



module.exports = update_template;