'use strict';

$(function () {
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
      for (var i = 0; i < n; i++) {
        t.push(sample(tags));
      }
      return t;
    }

    function calcGoalStat (goal) {
      goal.timeProgress = Math.floor(moment().diff(goal.dateFrom) * 100 / goal.dateTo.diff(goal.dateFrom));
    }

    function getRandomGoal () {
      var goal = {
        title: sample(verb) + ' ' + sample(adj) + ' ' + sample(noun),
        dateFrom: moment(new Date()).subtract(randInt(30), 'days'),
        dateTo: moment(new Date()).add(randInt(30), 'days'),
        tags: getTags()
      };
      calcGoalStat(goal);
      goal.valueProgress = randInt(100);
      return goal;
    }

    function buildTagsElem(lst) {
      var el = $('<div class="tags"></div>');
      for (var t in lst) {
        var tag = $('<div class="tag"></div>').html(lst[t]);
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
      valueProgress: 5 / 6 * 100
    }, {
      title: 'Coursera: Responsive Web Design',
      dateFrom: moment('28.12.2015', 'DD.MM.YYYY'),
      dateTo: moment('01.02.2016', 'DD.MM.YYYY'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      valueProgress: 4 / 6 * 100
    }, {
      title: 'Coursera: Introduction to Meteor.js Development',
      dateFrom: moment('14.12.2015', 'DD.MM.YYYY'),
      dateTo: moment('18.01.2016', 'DD.MM.YYYY'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      valueProgress: 5 / 6 * 100
    }, {
      title: 'Web Application Development with JavaScript and MongoDB',
      dateFrom: moment('04.01.2016', 'DD.MM.YYYY'),
      dateTo: moment('08.02.2016', 'DD.MM.YYYY'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      valueProgress: 1 / 6 * 100
    }];

    goals.push(getRandomGoal()); // add some random goal

    for (var g in goals) {
      calcGoalStat(goals[g]);
      buildGoalWidget(goals[g]);
    }

    $('.add-goal-button').click(function () {
      buildGoalWidget(getRandomGoal());
    });

  })();
});
