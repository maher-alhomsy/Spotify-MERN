import cloudinary from '../lib/cloudinary';
import { Song } from '../model/song.model';
import { Album } from '../model/album.model';

const uploadToCloudinary = async (file) => {
  console.log(file);

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
    });

    return result.secure_url;
  } catch (error) {
    console.log('Error in upload file');
    throw new Error('Error uploading to cloudinary');
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: 'Please upload all files' });
    }

    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;
    const { title, artist, albumId, duration } = req.body;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log('Error in create song : ', error);

    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.log('Error in deleting song : ', error);

    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { imageFile } = req.files;
    const { title, artist, releaseYear } = req.body;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log('Error in create album: ' + error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Song.deleteMany({ albumId: id });
    await Album.findOneAndDelete(id);

    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    console.log('Error deleting album');

    next(error);
  }
};
