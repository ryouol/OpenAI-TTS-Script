require("dotenv").config();
const fs = require("fs");
const OpenAI = require("openai");
const path = require("path");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const _input = fs.readFileSync(path.resolve("./input.txt"), "utf8"); // PASS STRING FUNCTION HERE
console.log(_input);


// Example string input from another function
/*
function getInputFromOtherFunction() {
  return "Your string input here.";
}
*/

const _output = path.resolve("./output.mp3"); // OUTPUT FILE
console.log(_output);


async function TTS() {
	try {
		console.log("Speech synthesis initializing.");
		const mp3 = await openai.audio.speech.create({
			model: "tts-1",
			voice: "nova",
			input: _input,
		});

		if (fs.existsSync(_output)) {
			fs.unlinkSync(_output);
		}

		const buffer = Buffer.from(await mp3.arrayBuffer());
		await fs.promises.writeFile(_output, buffer);
		console.log("Speech synthesis complete.");
	} catch (error) {
		console.log("Speech synthesis failed.");
		console.error(error);
	}
}
TTS();
