const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace this with your real API key

async function processQuestion() {
  const fileInput = document.getElementById('imageUpload');
  const textArea = document.getElementById('questionInput');
  const answerText = document.getElementById('answerText');

  let question = textArea.value.trim();

  // If there's an image but no text, extract from image
  if (!question && fileInput.files[0]) {
    answerText.innerText = "Scanning image...";
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

  answerText.innerText = "Thinking... 🤖";

  try {
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        temperature: 0.7
      })
    });

    const result = await aiResponse.json();
    const aiAnswer = result.choices?.[0]?.message?.content || "AI couldn't generate an answer.";
    answerText.innerText = aiAnswer;

  } catch (err) {
    console.error(err);
    answerText.innerText = "Error contacting AI. Please try again.";
  }
}
