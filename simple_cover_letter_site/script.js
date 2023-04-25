document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pdf-merger-form');
    const outputText = document.getElementById('output-text');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get the PDF and text input values
        const pdf1 = document.getElementById('pdf1').files[0];
        const pdf2 = document.getElementById('pdf2').files[0];
        const text1 = document.getElementById('text1').value;
        const text2 = document.getElementById('text2').value;

        // In this simple example, we just concatenate the input values
        const mergedText = `PDF 1: ${pdf1.name}, PDF 2: ${pdf2.name}, Text 1: ${text1}, Text 2: ${text2}`;

        // Set the output div text
        outputText.textContent = mergedText;
    });
});
