import Schedule from '../models/Schedule.js';

export const createSchedule = async (req, res) => {
	try {
		const { customerId, schedules } = req.body;

		if (!Array.isArray(schedules) || schedules.length === 0) {
			return res
				.status(400)
				.json({ message: 'Schedules must be a non-empty array' });
		}

		const entries = [];

		schedules.forEach(item => {
			const { posterId, categories, dates } = item;

			categories.forEach(category => {
				dates.forEach(date => {
					entries.push({
						customerId,
						posterId,
						category,
						date,
					});
				});
			});
		});

		const createdSchedules = await Schedule.insertMany(entries);

		res.status(201).json({
			message: 'Posters scheduled successfully',
			schedules: createdSchedules,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getScheduleByCustomer = async (req, res) => {
	try {
		const schedules = await Schedule.find({
			customerId: req.params.customerId,
		}).populate('posterId');
		res.json(schedules);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
