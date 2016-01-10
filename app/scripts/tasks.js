'use strict';

$(function () {
  (function () {
    // prepare random tasks
    var verb = ['do', 'make'];
    var noun = ['stuff', 'things'];
    var adj = ['cool', 'awesome', 'excellent', 'jaw-dropping', 'wonderful', 'impressive', 'mind-boggling', 'mind-blowing'];
    var tags = ['study', 'work', 'health', 'sport', 'soft dev', 'reading', 'traveling'];
    var states = ['active', 'done'];

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

    function getRandomTask () {
      var task = {
        title: sample(verb) + ' ' + sample(adj) + ' ' + sample(noun),
        dateTo: moment(new Date()).add(randInt(43200), 'minutes'),
        tags: getTags(),
        state: sample(states)
      };
      return task;
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

    function buildTaskWidget (task) {
      var el = $('<article><div class="main"></div><div class="secondary"></div><div class="task-progress"></div></article>').addClass('box task');
      $(el).find('.main').html(task.title);
      var sec = $('<div class="value date-to"></div>').html(task.dateTo.format('llll'));
      $(el).find('.secondary').append(sec);
      $(el).find('.secondary').append(buildTagsElem(task.tags));
      if (task.value && task.value.total) {
        var pl = buildProgressLine(task.value, 'value');
        $(el).find('.task-progress').append(pl);
      }
      $('.board.task-list' ).append(el);
    }

    // Some predefined tasks
    var tasks = [{
      title: 'Coursera "Responsive Web Design". Quiz: Realising design principles in code summary quiz',
      dateTo: moment('10.01.2016 11:59 PM -0800', 'DD.MM.YYYY HH:mm A Z'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      state: 'done',
      value: {
        current: 1,
        total: 1
      }
    }, {
      title: 'Coursera "Responsive Web Design". Assignment: Design A Website',
      dateTo: moment('10.01.2016 11:59 PM -0800', 'DD.MM.YYYY HH:mm A Z'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      state: 'active',
      value: {
        current: 0,
        total: 1
      }
    }, {
      title: 'Coursera "Responsive Web Design". Assignment: Design A Website. Review Classmates',
      dateTo: moment('13.01.2016 11:59 PM -0800', 'DD.MM.YYYY HH:mm A Z'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      state: 'active',
      value: {
        current: 0,
        total: 1
      }
    }, {
      title: 'Coursera "Responsive Web Design". Quiz: Adding content to websites summary quiz',
      dateTo: moment('17.01.2016 11:59 PM -0800', 'DD.MM.YYYY HH:mm A Z'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      state: 'done',
      value: {
        current: 1,
        total: 1
      }
    }, {
      title: 'Coursera "Responsive Web Design". Quiz: Building a full gallery app summary quiz',
      dateTo: moment('24.01.2016 11:59 PM -0800', 'DD.MM.YYYY HH:mm A Z'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      state: 'done',
      value: {
        current: 1,
        total: 1
      }
    }, {
      title: 'Coursera "Responsive Web Design". Assignment: Data Driven Website',
      dateTo: moment('24.01.2016 11:59 PM -0800', 'DD.MM.YYYY HH:mm A Z'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      state: 'active',
      value: {
        current: 0,
        total: 1
      }
    }, {
      title: 'Coursera "Responsive Web Design". Assignment: Data Driven Website. Review Classmates',
      dateTo: moment('27.01.2016 11:59 PM -0800', 'DD.MM.YYYY HH:mm A Z'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      state: 'active',
      value: {
        current: 0,
        total: 1
      }
    }
  ];

    tasks.push(getRandomTask()); // add some random goal

    for (var g in tasks) {
      buildTaskWidget(tasks[g]);
    }

    $('.add-task-button').click(function () {
      buildTaskWidget(getRandomTask());
    });

  })();
});
