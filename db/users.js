var records = [
    { id: 1, username: 'mki', password: 'ccs', displayName: 'MKI CCS', emails: [ { value: 'mki.ccs@example.com' } ] }
  , { id: 2, username: 'webrtc', password: 'ccs', displayName: 'WebRTC', emails: [ { value: 'WebRTC@example.com' } ] }
];

exports.findByUsername = function(username, callback) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return callback(null, record);
      }
    }
    return callback(null, null);
  });
}
