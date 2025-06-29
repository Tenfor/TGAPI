const Scores = require("../schemas/Scores");
const postScores = async (req, res) => {
    try {
        let { playerName, scores } = req.body;
        if (!playerName) throw new Error("playerName field is missing from body");
        if (!scores) throw new Error("scores field is missing from body");

        const existing = await Scores.findOne({ playerName });

        if (existing) {
            if (scores > existing.scores) {
                existing.scores = scores;
                existing.date = Date.now();
                const updated = await existing.save();
                return res.status(200).json(updated);
            } else {
                return res.status(409).json({ message: "Score not high enough to update.", current: existing });
            }
        } else {
            // Új rekord létrehozása
            const newEntry = new Scores({
                playerName,
                scores,
                date: Date.now(),
            });
            const saved = await newEntry.save();
            return res.status(200).json(saved);
        }
        return;
    } catch (error) {
        console.log(error, req.body);
        res.status(400).json({ error: error.message });
    }
}

const getScores = async (req, res) => {
    try {
        // Adatok lekérése, legújabb először
        const scores = await Scores.find().sort({ scores: -1 }).limit(50);

        // Ha nincs adat, visszaküldünk egy üres tömböt
        // if (!scores || scores.length === 0) {
        //     return res.status(404).json({ message: "No scores found" });
        // }

        return res.status(200).json(scores);
    } catch (error) {
        console.error("Error fetching scores:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const clearScores = async (req, res) => {
    try {
        await Scores.deleteMany({})
        return res.status(200).json({ message: "scores cleared" });
    } catch (error) {
        console.error("Error clearing scores:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const ping = async (req, res) => {
    try {
        return res.status(200).json({ message: "PING SUCCESS" });
    } catch (error) {
        return res.status(500).json({ message: "PING FAILED" });
    }
}



module.exports = { getScores, postScores, clearScores, ping };