import Customer from "../models/Customer.js";

export const loadCustomer = async (req, res, next) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    req.customer = customer;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};