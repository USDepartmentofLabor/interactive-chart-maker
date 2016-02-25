/** Chart options constructor. Info at http://api.highcharts.com/highcharts#chart */
var utils_main = require("../../utils/utils_main.js");


var ChartOptions = function (o) {

    this.renderTo = o.renderTo || "chart0";
    this.margin = [o.marginTop || 90, o.marginRight || 40, o.marginBottom || 80, o.marginLeft || 75]; //[top,right,bottom,left]
    this.borderColor = o.borderColor || 'white';
    this.borderWidth = o.borderWidth || 0;
    this.plotBorderColor = o.plotBorderColor || '#fff';
    this.plotBorderWidth = o.plotBorderWidth || 0;
    this.type = o.type || 'bar';
    this.zoomType = o.zoomType || null;
    this.alignTicks = o.alignTicks || false;
    this.inverted = o.inverted || false;
    this.ignoreHiddenSeries = o.ignoreHiddenSeries || true; //false for bubble charts so bubbles won't resize
}

ChartOptions.prototype.setOption = utils_main.setOption;


module.exports = ChartOptions;