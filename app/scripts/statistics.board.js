/*global $:false, moment:false */

'use strict';

$(function () {
  (function () {
    // Prepare history of day statistics (random)

    var currentDay = new Date();
    var activeDate = moment(currentDay);

    function getRandomStatistics (days) {
      var result = [];
      for (var i = days; i >= 0; i--) {
        result.push({
          day: moment(currentDay).subtract(i, 'days'),
          value: Math.floor(Math.random() * 81 + 20)
        });
      }
      return result;
    }

    var statistics = getRandomStatistics(10);

    var barClickHandler;

    function buildPlot() {
      // creating the history plot
      $('.history.barplot' ).html('');

      for (var s in statistics) {
        var el = $('<div></div>').addClass('plot-bar').css('height', statistics[s].value + '%');
        el.attr('data-toggle', 'tooltip');
        el.attr('data-date', statistics[s].day.format());
        el.attr('title', statistics[s].day.format('LL') + ': ' + statistics[s].value + '%');

        if (moment(statistics[s].day).isSame(activeDate, 'day')) {
          el.addClass('active');
          $('.board .column.statistics .dial').val(statistics[s].value);
          $('input.dial').trigger('change');
        }

        $(el).tooltip();
        $(el).click(barClickHandler);
        $('.history.barplot' ).append(el);
      }
    }

    function buildDateElement() {
      $('.date-widget .weekday').html(moment(activeDate).format('dddd'));
      $('.date-widget .day').html(moment(activeDate).format('D'));
      $('.date-widget .month').html(moment(activeDate).format('MMM, YYYY'));
    }

    function updateStatisticsBoard () {
      if (moment(activeDate).isSameOrBefore(statistics[0].day, 'day')) {
        $('.date-widget .prev-day').hide();
      } else {
        $('.date-widget .prev-day').show();
      }
      if (moment(activeDate).isSameOrAfter(statistics[statistics.length - 1].day, 'day')) {
        $('.date-widget .next-day').hide();
      } else {
        $('.date-widget .next-day').show();
      }
      buildPlot();
      buildDateElement();
    }

    barClickHandler = function (ev) {
      var d = $(ev.currentTarget).attr('data-date');
      activeDate = moment(new Date(d));
      updateStatisticsBoard();
    };

    function shiftDay (shift) {
      activeDate.add(shift, 'days');
      updateStatisticsBoard();
    }

    shiftDay(0);

    $('.date-widget .prev-day').click(function () { shiftDay(-1); });
    $('.date-widget .next-day').click(function () { shiftDay(1); });
  })();
});
