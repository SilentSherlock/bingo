package com.nwafu.bingo.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Date: 2020/8/22
 * Description: optional describe the class
 */
@Controller
public class PageController {

    @RequestMapping("/login")
    public String login() {
        return "personTest";
    }
}
