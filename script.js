const SEMITONES_PER_OCTAVE = 12;

function transpose(music, semitones) {
  // split the music into an array of notes
  let notes = music.replace(/\n/g, " \n").split(' ');

  // transpose each note by the given number of semitones
  let transposedNotes = notes.map(note => {
    let pitch = note.replace(/[^A-Za-z#]/g, '');
    let octave = parseInt(note.replace(/[^0-9]/g, ''));
    if (!pitch && !octave)
      return note;
    let transposedPitch = (SEMITONES_PER_OCTAVE + pitchToNumber(pitch) + semitones) % SEMITONES_PER_OCTAVE;
    let transposedOctave = octave + Math.floor((pitchToNumber(pitch) + semitones) / SEMITONES_PER_OCTAVE);
    if (!transposedOctave)
      transposedOctave = '';
    let result = ''
    if (note.indexOf('\n') == note.length - 1)
      result = numberToPitch(transposedPitch) + transposedOctave + '\n';
    else if (note.indexOf('\n') == 0)
      result = '\n' + numberToPitch(transposedPitch) + transposedOctave;
    else
      result = numberToPitch(transposedPitch) + transposedOctave;
    return result;
  });

  // join the transposed notes into a single string
  return transposedNotes.join(' ');
}

function pitchToNumber(pitch) {
  switch (pitch.toUpperCase()) {
    case 'C': return 0;
    case 'C#': case 'Db': return 1;
    case 'D': return 2;
    case 'D#': case 'Eb': return 3;
    case 'E': return 4;
    case 'F': return 5;
    case 'F#': case 'Gb': return 6;
    case 'G': return 7;
    case 'G#': case 'Ab': return 8;
    case 'A': return 9;
    case 'A#': case 'Bb': return 10;
    case 'B': return 11;
  }
}

function numberToPitch(number) {
  switch (number) {
    case 0: return 'C';
    case 1: return 'C#';
    case 2: return 'D';
    case 3: return 'D#';
    case 4: return 'E';
    case 5: return 'F';
    case 6: return 'F#';
    case 7: return 'G';
    case 8: return 'G#';
    case 9: return 'A';
    case 10: return 'A#';
    case 11: return 'B';
  }
}

let form = document.getElementById('transpose-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  let music = document.getElementById('music').value;
  let semitones = parseInt(document.getElementById('semitones').value);
  let output = document.getElementById('output');
  output.innerHTML = transpose(music, semitones);
});

// music conversion functions
function westernToIndian(note) {
  switch (note.toUpperCase()) {
    case 'C': return 'Sa';
    case 'C#': case 'Db': return 're';
    case 'D': return 'Re';
    case 'D#': case 'Eb': return 'ga';
    case 'E': return 'Ga';
    case 'F': return 'ma';
    case 'F#': case 'Gb': return 'Ma';
    case 'G': return 'Pa';
    case 'G#': case 'Ab': return 'dha';
    case 'A': return 'Dha';
    case 'A#': case 'Bb': return 'ni';
    case 'B': return 'Ni';
  }
}

function indianToWestern(note) {
  switch (note) {
    case 'Sa': case 'S': return 'C';
    case 're': case 'r': return 'C#';
    case 'Re': case 'R': return 'D';
    case 'ga': case 'g': return 'D#';
    case 'Ga': case 'G': return 'E';
    case 'ma': case 'm': return 'F';
    case 'Ma': case 'M': return 'F#';
    case 'Pa': case 'P': return 'G';
    case 'dha': case 'd': return 'G#';
    case 'Dha': case 'D': return 'A';
    case 'ni': case 'n': return 'A#';
    case 'Ni': case 'N': return 'B';
  }
}

function convert() {
  // get the input music and conversion direction
  let input = document.getElementById('music-convert').value;
  let direction = document.getElementById('direction').value;

  // split the input into an array of individual notes
  let notes = input.replace(/\n/g, " \n").split(' ');

  // convert each note
  let output = '';
  if (direction === 'western-to-indian') {
    // convert each note
    let convertedNotes = notes.map(note => {
      // let pitch = note.substring(0, note.length - 1);
      let pitch = note.replace(/[^A-Za-z#]/g, '');
      // let octave = note.substring(note.length - 1);
      let octave = note.replace(/[^0-9]/g, '');

      if (!pitch && !octave)
        return note;
      let result = ''
      if (note.indexOf('\n') == note.length - 1)
        result = westernToIndian(pitch) + octave + '\n';
      else if (note.indexOf('\n') == 0)
        result = '\n' + westernToIndian(pitch) + octave;
      else
        result = westernToIndian(pitch) + octave;
      return result;
    });
    output = convertedNotes.join(' ');
  } else {
    let convertedNotes = notes.map(note => {
      // let pitch = note.substring(0, note.length - 1);
      let pitch = note.replace(/[^A-Za-z]/g, '');
      // let octave = note.substring(note.length - 1);
      let octave = note.replace(/[^0-9]/g, '');
      if (!pitch && !octave)
        return note;
      let result = ''
      if (note.indexOf('\n') == note.length - 1)
        result = indianToWestern(pitch) + octave + '\n';
      else if (note.indexOf('\n') == 0)
        result = '\n' + indianToWestern(pitch) + octave;
      else
        result = indianToWestern(pitch) + octave;
      return result;
    });
    output = convertedNotes.join(' ');
  }
  // display the output
  document.getElementById('output-conv').innerHTML = output;
}

function copyToClipboard(e){
  const text = e.target.innerText;
  if(text) navigator.clipboard.writeText(text);
}

document.querySelectorAll(".output").forEach(elem => {
  elem.addEventListener('click', copyToClipboard);
})


// register the form submit handler
let form2 = document.getElementById('convert-form');
form2.addEventListener('submit', event => {
  event.preventDefault();
  convert();
});
