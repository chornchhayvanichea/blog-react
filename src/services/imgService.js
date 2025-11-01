export const imgService = {
  getImage: (filename) => {
    if (!filename) return null;
    if (filename.startsWith("http://") || filename.startsWith("https://")) {
      return filename;
    }
    return `http://localhost:8000/storage/${filename}`;
  },
};
