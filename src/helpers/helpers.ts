export const takeIdFromUrl = (url: string): string => {
    const id = url.split('/');
    return id[id.length - 2]
};
