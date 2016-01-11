/*global $:false, moment:false */
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
        // state: sample(states),
        value: {
          total: randInt(10) + 1,
        }
      };
      task.value.current = randInt(task.value.total);
      console.log(task);
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

    function buildToolsBar() {
      // Actions element
      var toolsElem = $('<div class="toolbar"><div class="button check"></div><div class="button timer"></div></div>');
      return toolsElem;
    }

    function buildTaskProgressBar (task) {
      var el = $('<div class="task-state"></div>');

      if (task.value && task.value.total > 1) {
        el.addClass('has-child');
      }

      if (task == 'done' || (task.value && task.value.total == task.value.current)) {
        el.addClass('done');
      }

      // State and date element
      var valElem = $('<div class="due-date"></div>');
      var val = task.state == 'done' ? '<strong>Done</strong>' : '<strong>due</strong> <date>' + task.dateTo.format('llll') + '</date>';
      valElem.html(val);
      el.append(valElem);

      if (task.value && task.value.total) {
        var progress = (task.value.current || 0) * 100 / task.value.total;

        if (task.value.total > 1) {
          valElem = $('<div class="done-value"></div>');
          valElem.html(task.value.current + ' / ' + task.value.total);
          el.append(valElem);
        }

        var line = $('<div class="line"></div>').css('width', progress + '%');
        if (task.value.current == task.value.total) {
          valElem = $('<div class="done-message"></div>');
          valElem.html('<strong>Done</strong>')
          el.append(valElem);
        }
        el.append(line);
      }

      if (task != 'done' && (!task.value || task.value.total <= 1)) {
        $(el).append(buildToolsBar());
      }
      return el;
    }

    function buildTaskWidget (task) {
      var tmplt = $('#task-widget-template > article').clone();
      $(tmplt).find('.main').html(task.title);
      $(tmplt).find('.secondary.tags').append(buildTagsElem(task.tags));
      $(tmplt).find('.task-state').html(buildTaskProgressBar(task));
      $('.board.task-list' ).append(tmplt);
    }

    // Some predefined tasks
    var tasks = [{
      title: 'Coursera "Responsive Web Design". Quiz: Realising design principles in code summary quiz',
      dateTo: moment('10.01.2016 11:59 PM -0800', 'DD.MM.YYYY HH:mm A Z'),
      tags: ['Delevopment', 'Study', 'Coursera'],
      state: 'done'
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
