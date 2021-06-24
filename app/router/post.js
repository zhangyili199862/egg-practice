module.exports = app => {
    const { router, controller } = app;
    router.resources('posts', '/api/post', controller.post);
};