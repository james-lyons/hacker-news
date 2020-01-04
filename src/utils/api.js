const api = `https://hacker-news.firebaseio.com/v0`;
const json = '.json?print=pretty';

const removeDead = (posts) => {
    return posts.filter(Boolean).filter(({ dead }) => dead !== true)
};

const removeDeleted = (posts) => {
    return posts.filter(({ dead }) => deleted !== true)
};

const onlyComments = (posts) => {
    return posts.filter(({ type }) => type === 'comment')
};

const onlyPosts = (posts) => {
    return posts.filter(({ type }) => type === 'story')
};

const fetchItem = (id) => {
    return fetch(`${ api }/item/${ id }${ json }`)
        .then((res) => res.json)
};

const fetchComments = (ids) => {
    return Promise.all(ids.map(fetchItem))
        .then((comments) => removeDeleted(onlyComments(removeDead(comments))))
};

const fetchMainPosts = (type) => {
    return fetch(`${ api }/${ type }stories${ json }`)
        .then((res) => res.json)
        .then((ids) => {
            if (!ids) {
                throw new Error(`There was an error fetching the ${ type } posts.`)
            };
            return ids.slice(0, 50)
        })
        .then((ids) => Promise.all(ids.map(fetchItem)))
        .then((posts) => removeDeleted(onlyPosts(removeDead(posts))));
};

const fetchUser = (id) => {
    return fetch(`${ api }/user/${ id }${ json }`)
        .then((res) => res.json)
};

const fetchPosts = (ids) => {
    return Promise.all(ids.map(fetchItem))
        .then((posts) => removeDeleted(onlyPosts(removeDead(posts))));
};

module.exports = {
    fetchItem,
    fetchComments,
    fetchMainPosts,
    fetchUser,
    fetchPosts
};
