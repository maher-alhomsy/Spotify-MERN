import { User } from '../model/user.model.js';

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      await User.create({
        imageUrl,
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in auth callback ' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
