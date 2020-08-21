//全局变量

//网页基本组件信息
let components = {
    c0: {
        cname: "登录",
        cid: "login",
        curl: "login"
    },
    c1: {
        cname: "注册",
        cid: "register",
        curl: "register"
    },
    c2: {},
    c3: {},
    c4: {},
    c5: {},
    c6: {},
    c7: {},
    c8: {}
};

//请求映射
let requestmap = {
    isLogged: "/isLogged",
    search: "/search"
};

//用户信息
let userInfo;

//用户当前所处位置
let uposition = [""];

//面包屑导航涉及的位置
let breadcrumb = {
    b1: {
        key: "游戏",
        href: ""
    },
    b2: {
        key: "社区",
        href: ""
    },
    b3: {
        key: "登录",
        href: ""
    },
    b4: {
        key: "注册",
        href: ""
    },
    b5: {
        key: "我的信息",
        href: ""
    }
};