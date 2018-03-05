let errorCode = {

mapping: ['gmapping', 'in error mode', 'already in mapping mode', 'busy', 'rosnode kill error', 'launch mapping error'],
saveMap: ['save_map', 'in error mode', 'not in mapping mode', 'cannot get robot pose', 'map_saver error', 'save map_edit error'],
saveMapEdit: ['save_map_edit', 'save map_edit error'],
navigation: ['navigation', 'busy', 'rosnode kill error', 'launch navigation error']

};

module.exports = errorCode;