//全局变量
//网页基本组件信息
//静态组件信息，组件的样式固定
let static_components = {
    component_index: {
        cname: "首页",
        cid: "index-body",
        curl: "/page/component_index"
    },
    component_user_login: {
        cname: "登录",
        cid: "user-login",
        curl: "/page/component_user_login"
    },
    component_user_register: {
        cname: "注册",
        cid: "user-register",
        curl: "/page/component_user_register"
    },
    component_loading_animation: {
        cname: "正在加载动画",
        cid: "loading-animation",
        curl: "/page/component_loading_animation"
    },
    component_load_error: {
        cname: "加载失败",
        cid: "load-error",
        curl: "/page/component_load_error"
    },
    component_none_result: {
        cname: "没有内容",
        cid: "none-result",
        curl: "/page/component_none_result"
    },
    component_all_game: {
        cname: "所有游戏",
        cid: "all-game",
        curl: "/page/component_all_game"
    },
    component_alert: {
        cname: "提示模态框",
        cid: "alert",
        curl: "/page/alert"
    },
};

//动态组件信息，展示游戏的卡片等依赖具体数据实现的组件
let dynamic_components = {
    component_game_recommendation_card: {
        cname: "首页推荐游戏展示卡片样式",
        cid: "game_recommendation_card",
        curl: "/page/component_game_recommendation_card"
    },

};

//数据请求映射
let requestmap = {
    user_isLogged: "/person/isLogin",
    user_login: "/person/userValidate",
    user_logout: "/person/logout",
    user_register: "/person/addUser",
    user_register_validate_code: "/person/user_register_code",
    user_register_validate_uname: "/person/validateNameLegality",
    user_register_send_code: "/person/user_register_send_code",
    store_search: "/store/search"
};

//用户信息
let userInfo;

//用户当前位置
let uposition = [];

//复用搜索处理的默认参数
let index_pageCount = 12;
let index_pageIndex = 0;

//所有游戏页面
let minPrice;
let maxPrice;
let area;
let language;
let formData;
let sort;
let order = "desc";
let pageIndex = 0;
let price_sort = 0;//初始为从高到低
let category = [];
let tag = [];

let firstFormData = {
    pageIndex: pageIndex,
    order: order,
    category: JSON.stringify(category),
    tag: JSON.stringify(tag),
};