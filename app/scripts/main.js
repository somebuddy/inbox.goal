
$(function () {
  (function () {
    // Prepare history of day statistics (random)
    var statistics = [];
    var currentDay = new Date();
    var activeDate = moment(currentDay);

    for (var i=10; i>=0; i--) {
      statistics.push({
        day: moment(currentDay).subtract(i, "days"),
        value: Math.floor(Math.random() * 101),
      });

    }

    function buildPlot() {
      // creating the history plot
      $(".history.barplot" ).html('');

      for (s in statistics) {
        var el = $('<div></div>').addClass('plot-bar').css('height', statistics[s].value + '%');
        el.attr('data-toggle', "tooltip");
        el.attr('title', statistics[s].day.format('LL') + ': ' + statistics[s].value + '%');
        if (moment(statistics[s].day).isSame(activeDate)) {
          el.addClass('active');
          $('.goal-list .column.statistics .dial').val(statistics[s].value);
          $("input.dial").trigger('change');
        }
        $(".history.barplot" ).append(el);
      }
    }

    function buildDateElement() {
      $('.goal-list .column.date .weekday').html(moment(activeDate).format('dddd'));
      $('.goal-list .column.date .day').html(moment(activeDate).format('D'));
      $('.goal-list .column.date .month').html(moment(activeDate).format('MMM, YYYY'));
    }

    buildPlot();
    buildDateElement();

    $('.goal-list .column.date .prev-day').click(function () {
      activeDate.subtract(1, "days");
      if (moment(statistics[0].day).isAfter(activeDate)) {
        activeDate.add(1, "days");
      }
      buildPlot();
      buildDateElement();
    });

    $('.goal-list .column.date .next-day').click(function () {
      activeDate.add(1, "days");
      if (moment(statistics[statistics.length - 1].day).isBefore(activeDate)) {
        activeDate.subtract(1, "days");
      }
      buildPlot();
      buildDateElement();
    });
  })();
});
