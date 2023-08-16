import User from "../models/User";
import * as CryptoJS from "crypto-js";
import { Request, Response } from "express";

const updateUser = async (req: any, res: any) => {
  const { id } = req.params;

  if (req.user?._id === id || req.user?.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY_FOR_CRYPTOJS as string
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: "You can update only your account!",
    });
  }
};

const deleteUser = async (req: any, res: any) => {
  const { id } = req.params;

  if (req.user?._id === id || req.user?.isAdmin) {
    try {
      await User.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "User has been deleted successfully!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        errorMessage: error.message,
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: "You can delete only your account!",
    });
  }
};

const getUser = async (req: any, res: any) => {
  // console.log(req.params);
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUsers = async (req: any, res: any) => {
  const query = req.query.new;

  if (req.user?.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json("You are not allowed to see all users! " + err);
    }
  }
};

const getUserStats = async (req: Request, res: Response) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.getFullYear() - 1);

  const monthArray = [
    0, // January
    1, // February
    2, // March
    3, // April
    4, // May
    5, // June
    6, // July
    7, // August
    8, // September
    9, // October
    10, // November
    11, // December
  ];

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { updateUser, deleteUser, getUser, getAllUsers, getUserStats };
