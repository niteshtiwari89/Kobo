// import User from '../models/user.model.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import Admin from '../models/admin.model.js';
// // Create a new admin account
// export const createAccountAdmin = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const existingAdmin = await Admin.findOne({ username });
//         if (existingAdmin) {
//             return res.status(400).json({ error: 'Username already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newAdmin = new Admin({ username, password: hashedPassword });
//         await newAdmin.save();

//         res.status(201).json({ message: 'Admin account created successfully' });
//     } catch (error) {
//         console.error('Error creating admin account:', error); // Log the error
//         res.status(500).json({ error: 'Error creating admin account' });
//     }
// };

// // Login admin
// export const loginAdmin = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Find the admin by username
//         const admin = await Admin.findOne({ username });
//         if (!admin) {
//             return res.status(404).json({ error: 'Admin not found' });
//         }

//         // Compare the password
//         const isPasswordValid = await bcrypt.compare(password, admin.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         // Generate a JWT token
//         const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//         res.status(500).json({ error: 'Error logging in' });
//     }
// };

// // Signup Controller
// export const signup = async (req, res) => {
//     try {
//         const { name, username, email, country, sector, organization, updates, policies, password, confirmPassword } = req.body;

//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: 'Passwords do not match' });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 12);

//         const newUser = new User({
//             name,
//             username,
//             email,
//             country,
//             sector,
//             organization,
//             updates,
//             policies,
//             password: hashedPassword,
//         });

//         await newUser.save();

//         res.status(201).json({ message: 'User signed up successfully' });
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Login Controller
// export const login = async (req, res) => {

//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// export const frontLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         console.log(email, password)

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         console.log(user.password)
//         const isMatch = await bcrypt.compare(password, user.password);
//         console.log(isMatch)
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// // Logout Controller
// export const logout = async (req, res) => {
//     res.json({ message: 'User logged out successfully' });
//     try {
//         const { username, password } = req.body;

//         // Find user by email
//         const user = await User.findOne({ username }).select('+password');
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Compare passwords
//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.json({ message: 'Login successful', token });

//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in', error: error.message });
//     }

// };

// // Get User Profile
// export const getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.userId).select('-password');
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user profile', error: error.message });
//     }
// };

// // Get One User by ID
// export const getOneUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).select('-password');
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user', error: error.message });
//     }
// };

// // Delete User Profile
// export const deleteProfile = async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting user profile', error: error.message });
//     }
// };

// // Delete User by ID
// export const deleteUserById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findByIdAndDelete(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting user', error: error.message });
//     }
// };

// // Update User Profile
// export const updateProfile = async (req, res) => {
//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, { new: true }).select('-password');
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json({ message: 'User profile updated successfully', updatedUser });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating user profile', error: error.message });
//     }
// };

// // Get All Users
// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password');
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching users', error: error.message });
//     }
// };

import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";

// Create a new admin account
export const createAccountAdmin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin account created successfully" });
  } catch (error) {
    console.error("Error creating admin account:", error); // Log the error
    res.status(500).json({ error: "Error creating admin account" });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log(admin);
    // Generate a JWT token
    const token = jwt.sign(
      { id: admin._id, name: admin.name, role: admin.role , email:admin.username , country : admin.country},
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

// Signup Controller
export const signup = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      country,
      sector,
      organization,
      updates,
      policies,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check for existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      username,
      email,
      country,
      sector,
      organization,
      updates,
      policies,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const frontLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // console.log(user);
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        sector: user.sector,
        organization: user.organization,
        country: user.country,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    // Logout typically involves client-side token deletion. If there's session info to clear, do so here.

    // Just inform that the logout was successful
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

// Get One User by ID
export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Delete User Profile
export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user profile", error: error.message });
  }
};

// Delete User by ID
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    }).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User profile updated successfully", updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user profile", error: error.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Check Username Availability
export const checkUsernameAvailability = async (req, res) => {
  try {
    const { username } = req.params;
    
    if (!username || username.trim().length === 0) {
      return res.status(400).json({ 
        available: false, 
        message: "Username is required" 
      });
    }

    const existingUser = await User.findOne({ username: username.trim() });
    const isAvailable = !existingUser;
    
    res.json({
      available: isAvailable,
      message: isAvailable ? "Username is available" : "Username is already taken"
    });
  } catch (error) {
    console.error("Error checking username availability:", error);
    res.status(500).json({ 
      available: false, 
      message: "Error checking username availability" 
    });
  }
};
