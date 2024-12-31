// frequency-calculator.js
const NOTE_FREQUENCIES = {
    'A': 440,    // A4 (concert pitch)
    'A#': 466.16,
    'B': 493.88,
    'C': 261.63, // C4
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30
};

function calculateOctaveFrequencies(rootNote) {
    const baseFreq = NOTE_FREQUENCIES[rootNote];
    const frequencies = [];
    
    // Calculate frequencies for 6 octaves
    for (let i = -2; i <= 3; i++) {
        frequencies.push(baseFreq * Math.pow(2, i));
    }
    
    return frequencies;
}

// Export for use in timing-calculator.js
window.calculateOctaveFrequencies = calculateOctaveFrequencies;