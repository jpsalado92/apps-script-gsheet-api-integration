// Given a tag, retrieves all the entity objects associated to it, which are under the defined scope.
function get_tag_entities(tag, scope) {
  r = UrlFetchApp.fetch(`https://company.org/data-service/api/tag/filter?tag=${tag}`);
  let json_response = JSON.parse(r.getContentText());
  let entity_dict = [];
  for (let i = 0; i < json_response.items.length; i++) {
    let item = json_response.items[i];
    if (scope.includes(item.entity_type)) entity_dict.push(item);
  }
  return entity_dict;
}

// Given a list of entities, retrieves the origin objects associated to them.
function get_entities_origins(entities) {
  let origins_dict = [];
  for (let i = 0; i < entities.length; i++) {
    let item = entities[i];
    if (item.entity_type == 'dataset') {
      origins_dict.push(item);
      continue;
    } else if (item.entity_type == 'indicator') {
      r = UrlFetchApp.fetch(`https://company.org/data-service/api/indicator/${item.entity_id}/origins?leaf=true`);
    } else if (item.entity_type == 'table') {
      r = UrlFetchApp.fetch(`https://company.org/data-service/api/table/${item.entity_id}/origins?leaf=true`);
    } else {
      continue;
    }
    let json_response = JSON.parse(r.getContentText());
    item.origins = json_response.origins
    origins_dict.push(item);
  }
  return origins_dict
}


// Given a list of entities, retrieves a list of unique origin identifiers associated to them.
function get_unique_origins(entities) {
  let origins_list = [];

  for (let i = 0; i < entities.length; i++) {
    let item = entities[i];

    if (item.entity_type == 'dataset') {
      if (!origins_list.includes(item.entity_id)) origins_list.push(item.entity_id);
    } else {
      if (item.entity_type == 'indicator') {
        r = UrlFetchApp.fetch(`https://company.org/data-service/api/indicator/${item.entity_id}/origins?leaf=true`);
      } else if (item.entity_type == 'table') {
        r = UrlFetchApp.fetch(`https://company.org/data-service/api/table/${item.entity_id}/origins?leaf=true`);
      } else {
        continue;
      }
      let json_response = JSON.parse(r.getContentText());
      item.origins = json_response.origins

      for (let j = 0; j < item.origins.length; j++) {
        let origin = item.origins[j];
        if (!origins_list.includes(origin.id)) origins_list.push(origin.id);
      }
    }
  }
  return origins_list.sort(function (a, b) { return a - b });
}

// Display the origins associated with each entity in the current spreadsheet
function push_entities_origins_to_spreadsheet(entities) {
  let sheet = SpreadsheetApp.getActiveSheet();
  const header_row = [
    "origin.entity.id",
    "origin.entity.name",
    "origin.entity.type",
    "origin.entity.datasource",
    "entity.entity_id",
    "entity.entity_name",
    "entity.entity_type",
    "entity.last_updated_on",
  ];
  sheet.appendRow(header_row);

  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];
    if ("origins" in entity) {
      for (let j = 0; j < entity.origins.length; j++) {
        let origin = entity.origins[j];
        let row = [
          origin.entity.id,
          origin.entity.name,
          origin.entity.type,
          origin.entity.datasource,
          entity.entity_id,
          entity.entity_name,
          entity.entity_type,
          entity.last_updated_on,
        ];
        sheet.appendRow(row);
      }
    } else {
      let row = [
        entity.entity_id,
        entity.entity_name,
        entity.entity_type,
        '-',
        entity.entity_id,
        entity.entity_name,
        entity.entity_type,
        entity.last_updated_on,
      ];
      sheet.appendRow(row);
    }
  }
}

// Display details about the origins passed 
function push_unique_origins_to_spreadsheet(origin_ids) {
  let sheet = SpreadsheetApp.getActiveSheet();

  const header_row = [
    "id",
    "name",
    "connector",
    "created_by",
    "created_on",
    "last_refreshed_on",
    "datasource",
    "tags",
  ];
  sheet.appendRow(header_row);

  for (let i = 0; i < origin_ids.length; i++) {
    let origin_id = origin_ids[i];
    r = UrlFetchApp.fetch(`https://company.org/data-service/api/dataset/${origin_id}`);
    origin = JSON.parse(r.getContentText());
    console.log(origin)
    if (origin.type != 'standarized') {
      let row = [
        origin.id,
        origin.name,
        origin.connector.type,
        origin.created_by,
        origin.created_on,
        origin.last_refreshed_on,
        origin.datasource,
        JSON.stringify(origin.tags),
      ]
      sheet.appendRow(row);
    }
  }
}

// Display details about the current entities
function push_entities_to_spreadsheet(entities) {
  let sheet = SpreadsheetApp.getActiveSheet();
  const header_row = [
    "entity.entity_id",
    "entity.entity_name",
    "entity.entity_type",
    "entity.last_updated_on",
  ];
  sheet.appendRow(header_row);

  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];
    let row = [
      entity.entity_id,
      entity.entity_name,
      entity.entity_type,
      entity.last_updated_on,
    ];
    sheet.appendRow(row);
  }
}