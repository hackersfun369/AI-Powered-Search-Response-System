var resArray = [];

document.getElementById("queryForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = document.getElementById("query").value;

    // Create and display the user's query
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `${query}`;
    document.getElementById("responseText").appendChild(questionDiv);
    document.getElementById("query").value = "";
    document.getElementById("preSubmit").style.display = "none";

    const loader = document.createElement("div");
    loader.classList.add("loader");
    loader.innerHTML = `<img src='/images/three-11928_512.gif' alt='Loading...' />
                        <p>Generating response...</p>`;
    document.getElementById("responseText").appendChild(loader);
    window.scrollTo(0, document.body.scrollHeight);
    try {
        // Step 1: Send the query to the Python Flask backend to scrape and merge text
        const searchResponse = await fetch("http://127.0.0.1:5000/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        if (!searchResponse.ok) {
            throw new Error("Failed to fetch from Flask server");
        }

        const searchData = await searchResponse.json();
        const mergedText = searchData.merged_text;

        console.log("Merged Text:", mergedText);

        // Step 2: Add the latest query to the conversation history
        resArray.push({ role: "user", content: query });

        // Step 3: Send the conversation history along with the new question to the Express server for Mistral AI processing
        const mistralResponse = await fetch("https://invincible-successful-becklespinax.glitch.me/mistral", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ conversation: resArray, text: mergedText, question: query }),
        });

        if (!mistralResponse.ok) {
            throw new Error("Failed to fetch from Mistral API server");
        }

        const mistralData = await mistralResponse.json();
        console.log("Mistral Response:", mistralData.response);

        // Step 4: Store the AI response in the conversation history
        resArray.push({ role: "assistant", content: mistralData.response });
        // Create and display the AI response
        const responseDiv = document.createElement("div");
        responseDiv.classList.add("response");
        responseDiv.innerHTML = `${mistralData.response}`;
        loader.remove();
        document.getElementById("responseText").appendChild(responseDiv);
        const endconvo = document.createElement("div");
        endconvo.classList.add("endconvo");
        document.getElementById("responseText").appendChild(responseDiv);
    } catch (error) {
        console.error("Error:", error.message);
        document.getElementById("responseText").textContent = "An error occurred. Please try again.";
    }
});
