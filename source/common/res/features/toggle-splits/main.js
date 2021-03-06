(function poll() {
  // Waits until an external function gives us the all clear that we can run (at /shared/main.js)
  if (typeof ynabToolKit !== 'undefined'  && ynabToolKit.actOnChangeInit === true) {

    ynabToolKit.toggleSplits = (function () {

      // Supporting functions,
      // or variables, etc

      return {
        setting: 'init',
        invoke: function () {
          if (!$('#toggleSplits').length) {
            var buttonText = (ynabToolKit.l10nData && ynabToolKit.l10nData['toolkit.toggleSplits']) || 'Toggle Splits';

            $('<button>', { id: 'toggleSplits', class: 'ember-view button' }).append(
              $('<i>', { class: 'ember-view flaticon stroke right' })
            ).append(
              $('<i>', { class: 'ember-view flaticon stroke down' })
            ).append(
              ' ' + buttonText
            ).insertAfter('.accounts-toolbar .undo-redo-container');

            $('.accounts-toolbar-left').find('#toggleSplits').click(function () {
              if (ynabToolKit.toggleSplits.setting === 'hide') {
                ynabToolKit.toggleSplits.setting = 'show'; // invert setting
                $('.ynab-grid-body-sub').show();
              } else {
                ynabToolKit.toggleSplits.setting = 'hide';
                $('.ynab-grid-body-sub').hide();
              }

              $('#toggleSplits > i').toggle();
            });
          }

          // default the right arrow to hidden
          if (ynabToolKit.toggleSplits.setting === 'init' || ynabToolKit.toggleSplits.setting === 'hide') {
            $('#toggleSplits > .down').hide();
            $('.ynab-grid-body-sub').hide();
            ynabToolKit.toggleSplits.setting = 'hide';
          } else {
            $('.ynab-grid-body-sub').show();
          }

          $(".ynab-grid-cell-subCategoryName[title^='Split']").each(function () {
            $(this).html(
              $(this).html().replace(/Split/g, '<span class="split-transaction">Split</span>')
            );
          });
        },

        observe: function (changedNodes) {
          if (changedNodes.has('ynab-grid-body')) {
            // We found Account transactions rows
            ynabToolKit.toggleSplits.invoke();
          }
        },
      };
    })(); // Keep feature functions contained within this object

  } else {
    setTimeout(poll, 250);
  }
})();
