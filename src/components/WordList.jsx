const handleWordClick = async (word) => {
    try {
        const response = await fetch("http://localhost:5000/api/word/click", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: 1, word })
        });

        const data = await response.json();
        console.log(`✅ Clicked ${word}, New Familiarity: ${data.Familiarity}`);
    } catch (error) {
        console.error("Error recording click:", error);
    }
};
