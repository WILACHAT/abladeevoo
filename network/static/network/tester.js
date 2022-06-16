import _regeneratorRuntime from 'babel-runtime/regenerator';

var pollAudioLevel = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(track, onLevelChanged) {
    var analyser, stream, source, samples, level;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (audioContext) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return');

          case 2:
            _context.next = 4;
            return audioContext.resume();

          case 4:

            // Create an analyser to access the raw audio samples from the microphone.
            analyser = audioContext.createAnalyser();

            analyser.fftSize = 1024;
            analyser.smoothingTimeConstant = 0.5;

            // Connect the LocalAudioTrack's media source to the analyser.
            stream = new MediaStream([track.mediaStreamTrack]);
            source = audioContext.createMediaStreamSource(stream);

            source.connect(analyser);

            samples = new Uint8Array(analyser.frequencyBinCount);
            level = null;

            // Periodically calculate the audio level from the captured samples,
            // and if changed, call the callback with the new audio level.

            requestAnimationFrame(function checkLevel() {
              analyser.getByteFrequencyData(samples);
              var rms = rootMeanSquare(samples);
              var log2Rms = rms && Math.log2(rms);

              // Audio level ranges from 0 (silence) to 10 (loudest).
              var newLevel = Math.ceil(10 * log2Rms / 8);
              if (level !== newLevel) {
                level = newLevel;
                onLevelChanged(level);
              }

              // Continue calculating the level only if the audio track is live.
              if (track.mediaStreamTrack.readyState === 'live') {
                requestAnimationFrame(checkLevel);
              } else {
                requestAnimationFrame(function () {
                  return onLevelChanged(0);
                });
              }
            });

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function pollAudioLevel(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = AudioContext ? new AudioContext() : null;

function rootMeanSquare(samples) {
  var sumSq = samples.reduce(function (sumSq, sample) {
    return sumSq + sample * sample;
  }, 0);
  return Math.sqrt(sumSq / samples.length);
}

module.exports = pollAudioLevel;