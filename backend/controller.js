const Lead = require("./model");

const getLeads = async (req, res) => {
  try {
    // fetch all leads and sort by newest first
    const leads = await Lead.find({}).sort({ createdAt: -1 });

    const payload = leads.map((l) => ({
      name: l.name,
      email: l.email,
      status: l.status,
      date: l.createdAt,
    }));

    return res.status(200).json({ success: true, data: payload });
  } catch (err) {
    console.error("Error fetching leads:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch leads" });
  }
};

const addLead = async (req, res) => {
  try {
    const { name, email, status } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "name and email are required" });
    }

    const lead = new Lead({ name, email, status });
    const saved = await lead.save();

    return res.status(201).json({
      success: true,
      data: {
        name: saved.name,
        email: saved.email,
        status: saved.status,
        date: saved.createdAt,
      },
    });
  } catch (err) {
    console.error("addLead error:", err);
    // duplicate email error
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Failed to create lead" });
  }
};

module.exports = {
  getLeads,
  addLead,
};
