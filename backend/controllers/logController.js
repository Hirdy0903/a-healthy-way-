import Log from '../models/Log.js';

// @desc    Create a new log entry
// @route   POST /api/logs
// @access  Private
export const createLog = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ message: 'Type and data are required' });
    }

    const log = await Log.create({
      user: req.user._id,
      type,
      data,
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all logs for a user
// @route   GET /api/logs
// @access  Private
export const getLogs = async (req, res) => {
  try {
    const { type } = req.query;
    
    let query = { user: req.user._id };
    if (type) {
      query.type = type;
    }

    const logs = await Log.find(query).sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
