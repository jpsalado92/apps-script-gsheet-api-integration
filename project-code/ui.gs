function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Hontza Toolbox')
    .addSubMenu(SpreadsheetApp.getUi().createMenu('Listar por tag')
      .addItem('Entidades', 'tag_entities_dialog')
      .addItem('Orígenes únicos', 'tag_entities_origins_dialog')
      .addItem('Orígenes por entidad', 'tag_unique_origins_dialog'))
    .addToUi();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function tag_entities_origins_dialog() {
  var html = HtmlService.createTemplateFromFile('tag_entities_origins_form').evaluate()
    .setWidth(320)
    .setHeight(160);
  SpreadsheetApp.getUi()
    .showModalDialog(html, 'Listar orígenes por entidad');
}

function tag_unique_origins_dialog() {
  var html = HtmlService.createTemplateFromFile('tag_unique_origins_form').evaluate()
    .setWidth(320)
    .setHeight(160);
  SpreadsheetApp.getUi()
    .showModalDialog(html, 'Listar orígenes únicos');
}

function tag_entities_dialog() {
  var html = HtmlService.createTemplateFromFile('tag_entities_form').evaluate()
    .setWidth(320)
    .setHeight(160);
  SpreadsheetApp.getUi()
    .showModalDialog(html, 'Listar entidades');
}