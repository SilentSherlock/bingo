package com.nwafu.bingo.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author lwh
 * @Date 2020/8/25 15:30
 * @Version 1.0
 * @ClassName PageController
 * @Description 返回html的controller
 **/
@Controller
@RequestMapping("page")
public class PageController {
    //测试页面
    @RequestMapping("test")
    public String test() {
        return "test";
    }

    //静态组件----------------------------
    @RequestMapping("alert")
    public String alert() {
        return "static_components/alert";
    }

    @RequestMapping("component_index")
    public String component_index() {
        return "static_components/component_index";
    }

    @RequestMapping("component_user_login")
    public String component_user_login() {
        return "static_components/component_user_login";
    }

    @RequestMapping("component_user_register")
    public String component_user_register() {
        return "static_components/component_user_register";
    }

    @RequestMapping("component_loading_animation")
    public String component_loading_animation() {
        return "static_components/component_loading_animation";
    }

    @RequestMapping("component_load_error")
    public String component_load_error() {
        return "static_components/component_load_error";
    }

    @RequestMapping("component_none_result")
    public String component_none_result() {
        return "static_components/component_none_result";
    }

    @RequestMapping("component_all_game")
    public String component_all_game() {
        return "static_components/component_all_game";
    }

    @RequestMapping("component_user_information")
    public String component_user_information() {
        return "static_components/component_user_information";
    }

    @RequestMapping("component_user_shopping_cart")
    public String component_user_shopping_cart() {
        return "static_components/component_user_shopping_cart";
    }

    @RequestMapping("component_user_wish_list")
    public String component_user_wish_list() {
        return "static_components/component_user_wish_list";
    }

    @RequestMapping("component_user_order_list")
    public String component_user_order_list() {
        return "static_components/component_user_order_list";
    }

    @RequestMapping("component_user_game")
    public String component_user_game() {
        return "static_components/component_user_game";
    }

    @RequestMapping("component_user_evaluation")
    public String component_user_evaluation() {
        return "static_components/component_user_evaluation";
    }

    @RequestMapping("component_community_index")
    public String component_community_index() {
        return "static_components/component_community_index";
    }

    @RequestMapping("component_community_new_post")
    public String component_community_new_post() {
        return "static_components/component_community_new_post";
    }

    @RequestMapping("component_community_post_detail")
    public String component_community_post_detail() {
        return "static_components/component_post_detail";
    }

    @RequestMapping("component_game_detail")
    public String component_game_detail() {
        return "static_components/component_game_detail";
    }

    @RequestMapping("component_community_other_profile")
    public String component_community_other_profile() {
        return "static_components/component_other_profile";
    }

    //动态组件----------------------------
    @RequestMapping("component_game_recommendation_card")
    public String component_game_recommendation_card() {
        return "dynamic_components/component_game_recommendation_card";
    }

}
