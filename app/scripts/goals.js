/*global $:false, moment:false */
'use strict';

$(function () {
  (function () {
    /* =================================
        Common function for box widgets
    ==================================== */
    // TODO Move into common class widget builder

    function getElementByTemplate(id) {
      var tmplt = $('#' + id).html();
      return $(tmplt);
    }

    // Box Widget Builders
    function buildTagsElem(el, lst) {
      for (var t in lst) {
        var tag = $('<div class="tag"></div>').html(lst[t]);
        el.append(tag);
      }
    }

    function buildParentsElement(el, box) {

    }

    function addBoxWidget(board, box) {
      var el = getElementByTemplate('box-widget-template');

      $(el).find('.main .title').html(box.title);
      buildTagsElem($(el).find('.secondary.tags'), box.tags);
      buildParentsElement($(el).find('.secondary.parents'), box);

      $(board).append(el);
      return el;
    }

    // Random functions (for prototyping)
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
      for (var i = 0; i < n; i++) {
        t.push(sample(tags));
      }
      return t;
    }

    function getRandomBox () {
      var box = {
        title: sample(verb) + ' ' + sample(adj) + ' ' + sample(noun),
        dateTo: moment(new Date()).add(randInt(43200) - 20000, 'minutes'),
        tags: getTags(),
        value: {}
      }
      return box;
    }

    /* =================================
        Goal specific functions
    ==================================== */

    function calcGoalStat (goal) {
      goal.value.current = goal.value.current || goal.value.start;
      goal.value.total = (goal.value.end - goal.value.start) || 1;
      goal.timeProgress = moment().diff(goal.dateFrom) / goal.dateTo.diff(goal.dateFrom);
      goal.valueProgress = goal.value ? (goal.value.current - goal.value.start) / (goal.value.end - goal.value.start) : 0;
    }

    function getRandomGoal () {
      var goal = getRandomBox();
      goal.dateFrom = moment(goal.dateTo).subtract(randInt(30), 'days');
      goal.value.start = 0;
      goal.value.end = randInt(100) + 1;
      goal.value.current = randInt(goal.value.end);

      calcGoalStat(goal);
      return goal;
    }

    function buildProgressLine(value, cls) {
      var el = $('<div class="line"></div>').css('width', value * 100 + '%');
      el.addClass(cls);
      return el;
    }

    function addGoalStateWidget(widget, goal) {
      calcGoalStat(goal);
      var el = getElementByTemplate('goal-state-template');

      $(el).find('.value .total').html(goal.value.end);
      $(el).find('.value .done').html(goal.value.current + ' / ' + goal.value.total);

      $(el).find('.date-from').html(goal.dateFrom.format('ll'));
      $(el).find('.date-to').html(goal.dateTo.format('ll'));

      var pl = buildProgressLine(goal.timeProgress, 'time');
      $(el).find('.goal-progress').append(pl);
      pl = buildProgressLine(goal.valueProgress, 'value');
      $(el).find('.goal-progress').append(pl);

      $(widget).html(el.html());
    }

    function buildGoalWidget (goal) {
      var el = addBoxWidget('.board.goal-list', goal);
      el.addClass('goal');

      // $(el).find('.state .value .init').html(goal.value.start);
      addGoalStateWidget(el.find('.state'), goal);
    }

    $('.add-goal-button').click(function () {
      buildGoalWidget(getRandomGoal());
    });

    /* =================================
        Initial data (for prototyping)
    ==================================== */

    var goals = [{
      title: 'Coursera: Responsive Website Basics: Code with HTML, CSS, and JavaScript',
      dateFrom: moment('21.12.2015', 'DD.MM.YYYY'),
      dateTo: moment('25.01.2016', 'DD.MM.YYYY'),
      value: {
        start: 0,
        end: 6,
        current: 5
      },
      tags: ['Delevopment', 'Study', 'Coursera'],
    }, {
      title: 'Coursera: Responsive Web Design',
      dateFrom: moment('28.12.2015', 'DD.MM.YYYY'),
      dateTo: moment('01.02.2016', 'DD.MM.YYYY'),
      value: {
        start: 0,
        end: 6,
        current: 4
      },
      tags: ['Delevopment', 'Study', 'Coursera'],
    }, {
      title: 'Coursera: Introduction to Meteor.js Development',
      dateFrom: moment('14.12.2015', 'DD.MM.YYYY'),
      dateTo: moment('18.01.2016', 'DD.MM.YYYY'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      value: {
        start: 0,
        end: 6,
        current: 5
      },
    }, {
      title: 'Web Application Development with JavaScript and MongoDB',
      dateFrom: moment('04.01.2016', 'DD.MM.YYYY'),
      dateTo: moment('08.02.2016', 'DD.MM.YYYY'),
      value: {
        start: 0,
        end: 6,
        current: 1
      },
      tags: ['Delevopment', 'Study', 'Coursera'],
    }];

    goals.push(getRandomGoal()); // add some random goal

    for (var g in goals) {
      buildGoalWidget(goals[g]);
    }

  })();
});
