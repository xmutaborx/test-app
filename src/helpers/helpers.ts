export const takeIdFromUrl = (url) => {
    const id = url.split('/');
    return id[id.length - 2]
};
