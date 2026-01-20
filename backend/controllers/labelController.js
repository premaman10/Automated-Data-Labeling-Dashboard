const DataItem = require("../models/DataItem");
const axios = require("axios");

const useOpenAI = process.env.USE_OPENAI === "true";

async function openAILabel(text) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Classify sentiment as Positive, Negative, or Neutral. Reply with one word only."
        },
        { role: "user", content: text }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content.trim();
}

function mockLabel(text) {
  const t = text.toLowerCase();
  if (t.includes("good") || t.includes("love") || t.includes("excellent"))
    return "Positive";
  if (t.includes("bad") || t.includes("worst") || t.includes("poor"))
    return "Negative";
  return "Neutral";
}

exports.autoLabelData = async (req, res) => {
  try {
    const items = await DataItem.find({ status: "PENDING" });

    for (let item of items) {
      const text = item.rawData.text || JSON.stringify(item.rawData);

      let label;
      if (useOpenAI) {
        label = await openAILabel(text);
      } else {
        label = mockLabel(text);
      }

      item.aiLabel = label;
      item.status = "LABELED";
      await item.save();
    }

    res.json({
      message: "Auto-labeling completed",
      labeledCount: items.length,
      mode: useOpenAI ? "openai" : "mock"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Auto-labeling failed" });
  }
};

exports.approveLabel = async (req, res) => {
  try {
    const item = await DataItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Data item not found" });
    }

    item.finalLabel = item.aiLabel;
    item.status = "APPROVED";
    await item.save();

    res.json({ message: "Label approved", item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to approve label" });
  }
};

exports.overrideLabel = async (req, res) => {
  try {
    const { newLabel } = req.body;
    const item = await DataItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: "Data item not found" });
    }

    item.finalLabel = newLabel;
    item.status = "APPROVED";
    await item.save();

    res.json({ message: "Label overridden", item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to override label" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const total = await DataItem.countDocuments();
    const labeled = await DataItem.countDocuments({ status: "LABELED" });
    const pending = await DataItem.countDocuments({ status: "PENDING" });
    const approved = await DataItem.countDocuments({ status: "APPROVED" });

    res.json({
      total,
      labeled,
      pending,
      approved
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get stats" });
  }
};
