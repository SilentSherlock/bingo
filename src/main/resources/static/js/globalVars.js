//全局变量
//网页基本组件信息
//静态组件信息，组件的样式固定
let static_components = {
    component_index: {
        cname: "首页",
        cid: "index-body",
        curl: "/page/component_index",
    },
    component_user_login: {
        cname: "登录",
        cid: "user-login",
        curl: "/page/component_user_login",
    },
    component_user_register: {
        cname: "注册",
        cid: "user-register",
        curl: "/page/component_user_register",
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
        curl: "/page/component_all_game",
    },
    component_alert: {
        cname: "提示模态框",
        cid: "alert",
        curl: "/page/alert"
    },
    component_user_information: {
        cname: "我的信息",
        cid: "user-information",
        curl: "/page/component_user_information"
    },
    component_user_shopping_cart: {
        cname: "我的购物车",
        cid: "user-shopping-cart",
        curl: "/page/component_user_shopping_cart"
    },
    component_user_wish_list: {
        cname: "我的愿望单",
        cid: "user-wish-list",
        curl: "/page/component_user_wish_list"
    },
    component_user_order_list: {
        cname: "我的订单",
        cid: "user-order-list",
        curl: "/page/component_user_order_list"
    },
    component_user_evaluation: {
        cname: "我的点评",
        cid: "user-evaluation",
        curl: "/page/component_user_evaluation"
    },
    component_user_game: {
        cname: "我的游戏",
        cid: "user-game",
        curl: "/page/component_user_game"
    },
    component_community_index: {
        cname: "社区",
        cid: "community-index",
        curl: "/page/component_community_index"
    },
    component_community_new_post: {
        cname: "发布帖子",
        cid: "community-new-post",
        curl: "/page/component_community_new_post"
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
    store_search: "/store/search",
    store_search_keywords: "/store/searchGameByName",
    store_index_carousel: "/store/getAllAdvertise"
};

//用户信息
let userInfo = {
    gamelist: undefined,
    password: undefined,
    ualias: undefined,
    uavatar: undefined,
    ubirthday: undefined,
    uid: undefined,
    umail: undefined,
    uname: undefined,
    uprofile: undefined,
    usex: undefined,
    wishlist: undefined,
};

//当前展示的用户信息
let showUserPage;

//首页搜索处理的默认参数
let index_pageCount = 12;
let index_pageIndex = 0;


//默认搜索全部游戏
let searchCondition = {
    name: undefined,
    order: undefined,
    sort: undefined,
    area: undefined,
    category: undefined,
    tag: undefined,
    language: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    pageIndex: 0,
    pageCount: undefined
};