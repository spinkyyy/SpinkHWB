async function processQuestion() {
  const fileInput = document.getElementById('imageUpload');
  const textArea = document.getElementById('questionInput');
  const answerText = document.getElementById('answerText');

  let question = textArea.value;

  if (!question && fileInput.files[0]) {
    // Use OCR to extract text from image
    const { data: { text } } = await Tesseract.recognize(
      fileInput.files[0],
      'eng',
      { logger: m => console.log(m) }
    );
    question = text.trim();
    textArea.value = question;
  }

  if (!question) {
    answerText.innerText = "Please enter or upload a question!";
    return;
  }

  // Replace this with real AI API call
  answerText.innerText = "Thinking... 🤔";

  setTimeout(() => {
    answerText.innerText = "This is a sample AI-generated answer for: \n" + question;
    // Replace above with real call to OpenAI or backend
  }, 2000);
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('Service Worker registered:', reg.scope));
}
