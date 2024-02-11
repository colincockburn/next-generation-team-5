const OpenAI = require("openai");

const openai = new OpenAI({apiKey: "", dangerouslyAllowBrowser: true});

// Export the functions you want to reuse
module.exports = {
    createAssistant,
    createThread,
    createMessage,
    createRun,
    retrieveRun,
    listMessages,
    getChatResponse,
};

async function createAssistant(instructions="", model="gpt-3.5-turbo", name="john doe") {
    return await openai.beta.assistants.create({
        name: name,
        instructions: instructions,
        model: model
    });
}

async function createThread() {
    return await openai.beta.threads.create();
}


async function createMessage(threadId, content) {
    return await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: content
    });
}


async function createRun(threadId, assistantId) {
    return await openai.beta.threads.runs.create(threadId, { assistant_id: assistantId });
}


async function retrieveRun(threadId, runId) {
    let response = await openai.beta.threads.runs.retrieve(threadId, runId);

    while (response.status === "in_progress" || response.status === "queued") {
        console.log("waiting...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        response = await openai.beta.threads.runs.retrieve(threadId, runId);
    }

    return response;
}


async function listMessages(threadId) {
    const messages = await openai.beta.threads.messages.list(threadId);
    return messages;
}


async function getChatResponse(assistant, thread, prompt) {
    const message = await createMessage(thread.id, prompt);
    const run = await createRun(thread.id, assistant.id);
    const response = await retrieveRun(thread.id, run.id);
    const messageList = await listMessages(thread.id);

    return messageList.data[0].content[0]["text"]["value"];
}

async function main() {

}
