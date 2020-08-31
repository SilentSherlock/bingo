package com.nwafu.bingo.control;

import com.nwafu.bingo.service.TextSearchService;
import com.nwafu.bingo.utils.Result;
import com.nwafu.bingo.utils.Status;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * Date: 2020/8/28
 * Description: optional describe the class
 */

@Controller
@RequestMapping("/mySearch")
public class SearchController {

    @Resource
    private TextSearchService textSearchService;

    @RequestMapping("/createIndex")
    @ResponseBody
    public Result createIndex() throws Exception {
        Result result = new Result();
        textSearchService.createIndexFile();
        result.setStatus(Status.SUCCESS);
        return result;
    }

    @RequestMapping("/searchIndex")
    @ResponseBody
    public List<Result> searchIndex(@RequestParam("keyword") String keyword) throws Exception {
        List<Result> resultList = textSearchService.searchIndex(keyword);
        return resultList;
    }

    @RequestMapping("/index")
    public String index() {
        return "personTest";
    }
}
