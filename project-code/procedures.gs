// Write all the entities and its origins associated with a given tag
function write_tag_entities_and_origins(formObject) {
  const tag = formObject.tag;
  let tag_entities = get_tag_entities(tag, ['indicator', 'table', 'dataset']);
  let entities_origins = get_entities_origins(tag_entities);
  push_entities_origins_to_spreadsheet(entities_origins);
}

// Write all the unique origins of the entities associated with a given tag
function write_tag_unique_origins(formObject) {
  const tag = formObject.tag;
  let tag_entities = get_tag_entities(tag, ['indicator', 'table', 'dataset']);
  let origin_ids = get_unique_origins(tag_entities);
  push_unique_origins_to_spreadsheet(origin_ids);
}

// Write all the entities associated with a given tag
function write_tag_entities(formObject) {
  const tag = formObject.tag;
  let tag_entities = get_tag_entities(tag, ['indicator', 'table', 'dataset']);
  push_entities_to_spreadsheet(tag_entities);
}
