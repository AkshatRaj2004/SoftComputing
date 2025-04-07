document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const results = document.getElementById('results');
    const positiveResult = document.getElementById('positive-result');
    const negativeResult = document.getElementById('negative-result');

    let isAnalyzing = false;

    const analyzeSentiment = () => {
        if (isAnalyzing || !textInput.value.trim()) return;

        isAnalyzing = true;
        analyzeBtn.disabled = true;
        analyzeBtn.classList.add('loading');
        analyzeBtn.textContent = 'Analyzing...';

        // Hide previous results during analysis
        results.classList.add('hidden');
        positiveResult.classList.add('hidden');
        negativeResult.classList.add('hidden');

        // Simulate API call
        setTimeout(() => {
            const text = textInput.value.toLowerCase();
            const words = text.split(' ');
            const positiveWords = ['good', 'great', 'awesome', 'excellent', 'happy', 'love','positive','fantastic','superb','outstanding','admirable','satisfactory','acceptable','alright','ethical','kind','noble','lovely','pleasant'];
            const negativeWords = ['bad', 'terrible', 'awful', 'sad', 'hate', 'poor','horrible','evil','corrupt','malicious','unethical','harmful','injurious','unpleasant','offensive','unlucky','unfortunate','rubbish','lame','sucks'];

            
            let score = 0;
            words.forEach(word => {
                if (positiveWords.includes(word)) score++;
                if (negativeWords.includes(word)) score--;
            });

            // Show results
            results.classList.remove('hidden');
            results.classList.add('fade-in');

            if (score >= 0) {
                positiveResult.classList.remove('hidden');
                negativeResult.classList.add('hidden');
            } else {
                positiveResult.classList.add('hidden');
                negativeResult.classList.remove('hidden');
            }

            // Reset button state
            isAnalyzing = false;
            analyzeBtn.disabled = false;
            analyzeBtn.classList.remove('loading');
            analyzeBtn.textContent = 'Analyze Sentiment';
        }, 1000);
    };

    // Event Listeners
    analyzeBtn.addEventListener('click', analyzeSentiment);

    textInput.addEventListener('input', () => {
        analyzeBtn.disabled = !textInput.value.trim() || isAnalyzing;
    });
});