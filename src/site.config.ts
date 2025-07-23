export default {
    title: "zachwill.com",
    author: "Zach Williams, @zachwill",
    email: "git@zachwill.com",
    url: "http://zachwill.com",
    description: "Zach Williams is a superhero currently based in Portland.",

    pageMap: {
        about: '/about/',
        resume: '/resume/'
    },

    tagPath(tag: string) {
        return `/tag/${tag}/`;
    }
}; 