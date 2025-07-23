export default {
    title: "zachwill.com",
    author: "Zach Williams, @zachwill",
    email: "git@zachwill.com",
    url: "http://zachwill.com",
    description: "Zach Williams is a superhero currently based in Portland.",

    // Social links for header buttons
    social: {
        twitter: "https://twitter.com/zachwill",
        github: "https://github.com/zachwill",
        email: "hey@zachwill.com"
    },

    // WebAwesome configuration
    webawesome: {
        version: "3.0.0-beta.3",
        theme: "wa-palette-zach wa-theme-zach",
        cdnBase: "https://early.webawesome.com/webawesome@3.0.0-beta.3/dist"
    },

    // Favorite posts for homepage showcase
    favoritePosts: [
        "2022-11-15-iterations-matter-more",
        "2020-10-28-yes-code",
        "2019-10-01-null-hypothesis",
        "2017-11-01-apprenticeship",
        "2014-01-14-build-almost-nothing"
    ],

    // Projects for homepage
    projects: [
        {
            title: "Portland Trail Blazers",
            description: "Director of Data Science for the NBA team",
            url: "https://www.nba.com/blazers/zach-williams"
        },
        {
            title: "GitHub Projects",
            description: "Open-source projects and contributions",
            url: "https://github.com/zachwill"
        }
    ],

    pageMap: {
        about: '/about/',
        resume: '/resume/'
    },

    tagPath(tag: string) {
        return `/tag/${tag}/`;
    }
}; 