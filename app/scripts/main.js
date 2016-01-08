/*global $:false, moment:false */
'use strict';

$(function () {
  (function () {
    // Prepare history of day statistics (random)
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
          $('.goal-list .column.statistics .dial').val(statistics[s].value);
          $('input.dial').trigger('change');
        }

        $(el).tooltip();
        $(el).click(function (ev) {
          var d = $(ev.currentTarget).attr('data-date');
          activeDate = moment(new Date(d));
          updateStatisticsBoard();
        });
        $('.history.barplot' ).append(el);
      }
    }

    function buildDateElement() {
      $('.goal-list .column.date .weekday').html(moment(activeDate).format('dddd'));
      $('.goal-list .column.date .day').html(moment(activeDate).format('D'));
      $('.goal-list .column.date .month').html(moment(activeDate).format('MMM, YYYY'));
    }

    function updateStatisticsBoard () {
      if (moment(activeDate).isSameOrBefore(statistics[0].day, 'day')) {
        $('.goal-list .column.date .prev-day').hide();
      } else {
        $('.goal-list .column.date .prev-day').show();
      }
      if (moment(activeDate).isSameOrAfter(statistics[statistics.length - 1].day, 'day')) {
        $('.goal-list .column.date .next-day').hide();
      } else {
        $('.goal-list .column.date .next-day').show();
      }
      buildPlot();
      buildDateElement();
    }

    function shiftDay (shift) {
      activeDate.add(shift, 'days');
      updateStatisticsBoard();
    }

    var statistics = getRandomStatistics(10);
    var currentDay = new Date();
    var activeDate = moment(currentDay);
    shiftDay(0);

    $('.goal-list .column.date .prev-day').click(function () { shiftDay(-1); });
    $('.goal-list .column.date .next-day').click(function () { shiftDay(1); });
  })();

  (function () {
    // prepare random goals
    var verb = ['do', 'make'];
    var noun = ['stuff', 'things'];
    var adj = ['cool', 'awesome', 'excellent', 'jaw-dropping', 'wonderful', 'impressive', 'mind-boggling', 'mind-blowing'];
    var tags = ['study', 'work', 'health', 'sport', 'soft dev', 'reading', 'traveling'];

    function sample(arr) {
      // Get random element from array
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function randInt(max) {
      return Math.floor(Math.random() * (max + 1));
    }

    function getTags() {
      var n = randInt(2) + 1;
      var t = [];
      for (var i=0; i < n; i++) {
        t.push(sample(tags));
      }
      return t;
    }

    function calcGoalStat (goal) {
      goal.timeProgress = Math.floor(moment().diff(goal.dateFrom) * 100 / goal.dateTo.diff(goal.dateFrom));
    }

    function getRandomGoal () {
      var dateFrom = moment(new Date());
      var dateTo = moment(new Date());
      dateFrom.subtract(7);
      dateTo.add(7)
      var goal = {
        title: sample(verb) + ' ' + sample(adj) + ' ' + sample(noun),
        dateFrom: moment(new Date()).subtract(randInt(30), 'days'),
        dateTo: moment(new Date()).add(randInt(30), 'days'),
        tags: getTags()
      }
      calcGoalStat(goal);
      goal.valueProgress = randInt(100);
      return goal;
    }

    function buildTagsElem(tags) {
      var el = $('<div class="tags"></div>');
      for (var t in tags) {
        var tag = $('<div class="tag"></div>').html(tags[t]);
        el.append(tag);
      }
      return el;
    }

    function buildProgressLine(value, cls) {
      var el = $('<div class="line"></div>').css('width', value + '%');
      el.addClass(cls);
      return el;
    }

    function buildGoalWidget (goal) {
      var el = $('<article><div class="main"></div><div class="secondary"></div><div class="goal-progress"></div></article>').addClass('box goal');
      $(el).find('.main').html(goal.title);
      var sec = $('<div class="value date-from"></div>').html(goal.dateFrom.format('ll'));
      $(el).find('.secondary').append(sec);
      sec = $('<div class="value date-to"></div>').html(goal.dateTo.format('ll'));
      $(el).find('.secondary').append(sec);
      $(el).find('.secondary').append(buildTagsElem(goal.tags));
      var pl = buildProgressLine(goal.timeProgress, 'time');
      $(el).find('.goal-progress').append(pl);
      pl = buildProgressLine(goal.valueProgress, 'value');
      $(el).find('.goal-progress').append(pl);

      $('.board.goal-list' ).append(el);
    }

    // Some predefined goals
    var goals = [{
      title: 'Coursera: Responsive Website Basics: Code with HTML, CSS, and JavaScript',
      dateFrom: moment('21.12.2015', 'DD.MM.YYYY'),
      dateTo: moment('25.01.2016', 'DD.MM.YYYY'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      valueProgress: 5/6 * 100
    }, {
      title: 'Coursera: Responsive Web Design',
      dateFrom: moment('28.12.2015', 'DD.MM.YYYY'),
      dateTo: moment('01.02.2016', 'DD.MM.YYYY'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      valueProgress: 4/6 * 100
    }, {
      title: 'Coursera: Introduction to Meteor.js Development',
      dateFrom: moment('14.12.2015', 'DD.MM.YYYY'),
      dateTo: moment('18.01.2016', 'DD.MM.YYYY'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      valueProgress: 5/6 * 100
    }, {
      title: 'Web Application Development with JavaScript and MongoDB',
      dateFrom: moment('04.01.2016', 'DD.MM.YYYY'),
      dateTo: moment('08.02.2016', 'DD.MM.YYYY'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      valueProgress: 1/6 * 100
    }];

    for (var g in goals) {
      console.log(goals[g]);
      calcGoalStat(goals[g]);
      buildGoalWidget(goals[g]);
    }

    $('.add-goal-button').click(function () {
      buildGoalWidget(getRandomGoal());
    });

  })();
});
