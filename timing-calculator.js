// timing-calculator.js

// Wait for the DOM to be fully loaded before running our code
document.addEventListener('DOMContentLoaded', function () {
    // Get references to all our HTML elements - we do this first to ensure
    // we have access to all the elements we need to work with
    const bpmInput = document.getElementById('bpm');
    const calculateButton = document.getElementById('calculateBtn');
    const resultsDiv = document.getElementById('timingResults');
    const rootNoteSelect = document.getElementById('rootNote');
    const frequencyResultsDiv = document.getElementById('frequencyResults');

    // Timing Calculation Functions
    function calculateTimings(bpm) {
        // First, calculate milliseconds per beat
        // We use 60000 because there are 60000 milliseconds in one minute
        const msPerBeat = 60000 / bpm;

        // Return an object containing all our timing calculations
        // We structure this as key-value pairs for easy access
        return {
            // Regular note values - each is a multiple or division of msPerBeat
            wholeName: msPerBeat * 4,    // Whole note = 4 beats
            halfNote: msPerBeat * 2,     // Half note = 2 beats
            quarterNote: msPerBeat,      // Quarter note = 1 beat
            eighthNote: msPerBeat / 2,   // Eighth note = 1/2 beat
            sixteenthNote: msPerBeat / 4, // Sixteenth note = 1/4 beat

            // Triplet calculations
            // For triplets, we take the normal duration and multiply by 2/3
            // This is because triplets fit 3 notes in the space normally taken by 2
            quarterTriplet: (msPerBeat * 2) / 3,     // Quarter note triplets
            eighthTriplet: (msPerBeat / 2 * 2) / 3,  // Eighth note triplets
            sixteenthTriplet: (msPerBeat / 4 * 2) / 3, // Sixteenth note triplets

            // Dotted note calculations
            // For dotted notes, we multiply the normal duration by 1.5
            // A dotted note is worth the original note plus half its value
            dottedHalf: msPerBeat * 2 * 1.5,      // Dotted half note
            dottedQuarter: msPerBeat * 1.5,       // Dotted quarter note
            dottedEighth: (msPerBeat / 2) * 1.5,  // Dotted eighth note
            dottedSixteenth: (msPerBeat / 4) * 1.5 // Dotted sixteenth note
        };
    }

    // Display Functions
    function formatTime(ms) {
        // Format time values to 2 decimal places and add 'ms' unit
        return ms.toFixed(2) + 'ms';
    }

    function updateTimingDisplay(timings) {
        // Create HTML string with all our timing results
        resultsDiv.innerHTML = `
            <div class="timing-result">
                <h3>Regular Notes</h3>
                <p>Whole Note/Semibreve: ${formatTime(timings.wholeName)}</p>
                <p>Half Note/Minim: ${formatTime(timings.halfNote)}</p>
                <p>Quarter Note/Crochet: ${formatTime(timings.quarterNote)}</p>
                <p>Eighth Note/Quaver: ${formatTime(timings.eighthNote)}</p>
                <p>Sixteenth Note/Semiquaver: ${formatTime(timings.sixteenthNote)}</p>
                
                <h3>Dotted Notes</h3>
                <p>Dotted Half/Dotted Minim: ${formatTime(timings.dottedHalf)}</p>
                <p>Dotted Quarter/Dotted Crochet: ${formatTime(timings.dottedQuarter)}</p>
                <p>Dotted Eighth/Dotted Quaver: ${formatTime(timings.dottedEighth)}</p>
                <p>Dotted Sixteenth/Dotted Semiquaver: ${formatTime(timings.dottedSixteenth)}</p>
                
                <h3>Triplets</h3>
                <p>Quarter Note Triplet/Crochet Triplet: ${formatTime(timings.quarterTriplet)}</p>
                <p>Eighth Note Triplet/Quaver Triplet: ${formatTime(timings.eighthTriplet)}</p>
                <p>Sixteenth Note Triplet/Semiquaver Triplet: ${formatTime(timings.sixteenthTriplet)}</p>
            </div>
        `;
    }

    function updateFrequencyDisplay(frequencies) {
        // Create HTML string showing frequencies for each octave
        // We use map to transform our frequency array into HTML strings
        frequencyResultsDiv.innerHTML = `
            <div class="frequency-result">
                ${frequencies.map((freq, index) => 
                    `<p>Octave ${index - 2}: ${freq.toFixed(2)} Hz</p>`
                ).join('')}
            </div>
        `;
    }

    // Event Handlers
    calculateButton.addEventListener('click', function () {
        // Parse and validate the BPM input
        const bpm = parseFloat(bpmInput.value);

        if (isNaN(bpm) || bpm < 20 || bpm > 300) {
            resultsDiv.innerHTML = '<p style="color: red;">Please enter a valid BPM between 20 and 300</p>';
            return;
        }

        // If BPM is valid, calculate and display timings
        const timings = calculateTimings(bpm);
        updateTimingDisplay(timings);
    });

    // Handle root note changes independently of BPM calculations
    rootNoteSelect.addEventListener('change', function() {
        const rootNote = rootNoteSelect.value;
        const frequencies = calculateOctaveFrequencies(rootNote);
        updateFrequencyDisplay(frequencies);
    });

    // Initialize frequency display when page loads
    const initialRootNote = rootNoteSelect.value;
    const initialFrequencies = calculateOctaveFrequencies(initialRootNote);
    updateFrequencyDisplay(initialFrequencies);
});