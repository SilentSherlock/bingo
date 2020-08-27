package com.nwafu.bingo.control;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.nwafu.bingo.entity.*;
import com.nwafu.bingo.service.StoreService;
import com.nwafu.bingo.utils.Result;
import com.nwafu.bingo.utils.Search;
import com.nwafu.bingo.utils.Status;
import com.nwafu.bingo.utils.Tools;
import com.sun.org.apache.xpath.internal.operations.Or;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping("store")
public class StoreController {
    @Resource
    StoreService storeService;
    /**
    * @MethodName getPageAllNum
    * @Description 获取分页下标总数
    * @Param []
    * @return java.lang.Integer
    * @author yolia
    * @Date 10:00 2020/8/26
    **/
    private Integer getPageAllNum(Search search) throws Exception {
        Integer allSearchNum = storeService.searchCount(search);
        return (int)Math.ceil((double)allSearchNum / (double)search.getPageCount());
    }

    //region 游戏相关
    /**
    * @MethodName gameShow
    * @Description 向前端返回封装的游戏列表数据
    * @Param []
    * @return com.nwafu.bingo.utils.Result
     * Result里存放状态值和结果键值对，状态值：SUCCESS --- 获取数据成功，数据列表不为空
     *                                   FAILURE --- 获取数据失败，数据列表为空
     *                                   ResultMap(String, Object) --- String为键名(gameList), Object为封装数据对象。
     *                                                                 获取成功返回List<Game>对象，否则返回错误信息
    * @author yolia
    * @Date 8:33 2020/8/22
    **/
    @RequestMapping("gameShow")
    public Result gameShow() throws Exception {
        Result result = new Result();
        //获取数据
        List<Game> gameList = storeService.getAllGame();
        //无数据
        if(gameList == null || gameList.size() == 0){
            result.getResultMap().put("gameList", "游戏列表为空");
            result.setStatus(Status.FAILURE);
            return result;
        }
        result.getResultMap().put("gameList", gameList);
        result.setStatus(Status.SUCCESS);
        //返回封装数据
        return result;
    }
    /**
    * @MethodName gameDetailShow
    * @Description 前端传入商品id，后端向前端传递该商品的相关信息
    * @Param [id]
    * @return com.nwafu.bingo.utils.Result
     * Result包含状态值和键值对，状态值为SUCCESS时，传输数据成功，数据不为空，
     *                              FAILURE时，传输数据失败，数据为空。
     *                              传输成功时，返回game；否则返回提示信息。
    * @author yolia
    * @Date 14:45 2020/8/22
    **/
    @RequestMapping("gameDetailShow")
    public Result gameDetailShow(Integer id) throws Exception {
        Result result = new Result();
        //获取数据
        Game game = storeService.getGameById(id);
        if(game == null){
            result.getResultMap().put("game", "游戏不存在");
            result.setStatus(Status.FAILURE);
            return result;
        }
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("game", game);
        return result;
    }
    /**
    * @MethodName searchGameByName
    * @Description 根据Name模糊查询游戏
    * @Param [name]
    * @return com.nwafu.bingo.utils.Result
     * Result包含状态值和键值对，状态值为SUCCESS时，查询数据不为空，
     *                              FAILURE时，查询数据为空。
     *                              数据不为空是，返回gameList；否则返回提示信息。
    * @author yolia
    * @Date 16:43 2020/8/24
    **/
    @RequestMapping("searchGameByName")
    public Result searchGameByName(String name) throws Exception {
        Result result = new Result();
        //获取数据
        List<Game> gameList = storeService.getGameByName(name);
        if(gameList == null || gameList.size() == 0){
            result.getResultMap().put("searchGameListByName", "搜索游戏不存在");
            result.setStatus(Status.FAILURE);
            return result;
        }
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("searchGameListByName", gameList);
        return result;
    }
    /**
    * @MethodName searchGameByType
    * @Description 根据类别模糊查询游戏列表
    * @Param [types]
    * @return com.nwafu.bingo.utils.Result
     * Result包含状态值和键值对，状态值为SUCCESS时，查询数据存在，
     *                              FAILURE时，查询数据不存在。
     *                              如果数据存在，返回gameList；否则返回提示信息。
    * @author yolia
    * @Date 8:26 2020/8/25
    **/
    @RequestMapping("searchGameByType")
    public Result searchGameByType(@RequestParam(value = "types[]") List<String> types) throws Exception {
        Result result = new Result();
        //获取数据
        List<Game> gameList = storeService.getGameByType(types);
        if(gameList == null || gameList.size() == 0){
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("searchGameListByType", "该游戏类别不存在游戏");
            return result;
        }
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("searchGameListByType", gameList);
        return result;
    }
    /**
    * @MethodName search
    * @Description 用于搜索
    * @Param [search]  ----- 属性请到类中查看
    * @return com.nwafu.bingo.utils.Result
     * Result包括状态值和键值对，状态值为SUCCESS时，数据搜索成功，存在数据，
     *                              FAILURE时，数据搜索失败，无数据。
     *                              数据存在时，返回searchList和allSearchNum；否则返回提示信息。
    * @author yolia
    * @Date 15:21 2020/8/25
    **/
    @RequestMapping("search")
    public Result search(HttpServletRequest request, Search search) throws Exception {
        //处理前端传递过来的json字符串，将其转化能为List
        String category = request.getParameter("category");
        JSONArray categoryList = JSONArray.parseArray(category);
        search.setCategory(categoryList.toJavaList(String.class));

        String tag = request.getParameter("tag");
        JSONArray tagList = JSONArray.parseArray(tag);
        search.setTag(tagList.toJavaList(String.class));
        //
        Result result = new Result();
        List<Game> gameList = storeService.search(search);
        if(gameList == null || gameList.size() == 0){
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("searchList", "无内容");
            return result;
        }
        Integer allSearchNum = getPageAllNum(search);
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("searchList", gameList);
        result.getResultMap().put("allSearchNum", allSearchNum);
        return result;
    }
    /**
    * @MethodName gameAddHandle
    * @Description 前端传入添加的游戏信息，将其插入数据库
    * @Param [game]
    * @return com.nwafu.bingo.utils.Result
     * Result里存放状态值和结果键值对，状态值：SUCCESS --- 添加数据成功，数据合法
     *                                   FAILURE --- 添加数据失败，数据不合法
     *                                   ResultMap(String, Object) --- String为键名(addHandle), Object为添加游戏相关信息.
     *                                                                 添加成功返回Game对象，否则返回错误信息
    * @author yolia
    * @Date 8:40 2020/8/22
    **/
    @RequestMapping("gameAddHandle")
    public Result gameAddHandle(Game game) throws Exception {
        Result result = new Result();
        //查询游戏是否存在
        Game temp = storeService.getGameByNameExact(game.getGname());
        if(temp != null){
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("addGameHandle", "游戏已经存在");
            return result;
        }
        //进行游戏添加操作
        storeService.addGame(game);
        result.getResultMap().put("addGameHandle", game);
        result.setStatus(Status.SUCCESS);
        //返回封装数据
        return result;
    }
    /**
    * @MethodName gameUpdateHandle
    * @Description 前端传入要进行修改的数据，对相应的数据进行更新
    * @Param [game]
    * @return com.nwafu.bingo.utils.Result
     * Result里存放状态值和结果键值对，状态值：SUCCESS --- 更新数据成功，数据合法
     *                                   FAILURE --- 更新数据失败，数据不合法
     *                                   ResultMap(String, Object) --- String为键名(updateHandle), Object为添加游戏相关信息.
     *                                                                 修改成功返回Game对象，否则返回错误信息
    * @author yolia
    * @Date 8:49 2020/8/22
    **/
    @RequestMapping("gameUpdateHandle")
    public Result gameUpdateHandle(Game game) throws Exception {
        Result result = new Result();
        //进行游戏更新操作
        storeService.updateGame(game);
        result.getResultMap().put("updateGameHandle", game);
        result.setStatus(Status.SUCCESS);
        //返回封装数据
        return result;
    }
    /**
    * @MethodName gameDeleteHandle
    * @Description 前端传入要进行删除的数据对象，对相对应的数据进行删除操作
    * @Param [game]
    * @return com.nwafu.bingo.utils.Result
     * Result里存放状态值和结果键值对，状态值：SUCCESS --- 删除数据成功，数据合法
     *                                   FAILURE --- 删除数据失败，数据不合法
     *                                   ResultMap(String, Object) --- String为键名(updateHandle), Object为删除游戏相关信息.
     *                                                                 删除成功返回Game对象，否则返回错误信息
    * @author yolia
    * @Date 8:52 2020/8/22
    **/
    @RequestMapping("gameDeleteHandle")
    public Result gameDeleteHandle(Game game) throws Exception {
        Result result = new Result();
        //进行游戏删除操作
        storeService.deleteGame(game);
        result.getResultMap().put("deleteGameHandle", game);
        result.setStatus(Status.SUCCESS);
        //返回封装数据
        return result;
    }
    //endregion

    //region 订单相关
    /**
    * @MethodName orderListShow
    * @Description 根据相应的idType和idValue获取订单列表
    * @Param [idType, idValue]  ---- idType有oid, uid。
    * @return com.nwafu.bingo.utils.Result
     * Result里存放状态值和键值对，状态值为SUCCESS时，数据获取成功，数据不为空
     *                                FAILURE时，数据获取失败，数据为空
     *                                当数据不为空时，返回订单列表，否则返回提示。
    * @author yolia
    * @Date 9:30 2020/8/22
    **/
    @RequestMapping("orderListShow")
    public Result orderListShow(String idType, Integer idValue) throws Exception {
        Result result = new Result();
        //获取数据
        List<Orderlist> orderlists = storeService.getOrderListById(idType, idValue);
        //订单列表为空
        if(orderlists == null || orderlists.size() == 0){
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("orderList_" + idType, "数据为空");
            return result;
        }
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("orderList_" + idType, orderlists);
        return result;
    }
    /**
    * @MethodName orderListById
    * @Description 根据id类型和id值获取订单列表，并计算每单的费用
    * @Param [idType, idValue]
    * @return com.nwafu.bingo.utils.Result
     * Result包括状态值和键值对，状态值为SUCCESS时，数据查询成功，数据存在；
     *                              FAILURE时，数据查询失败，数据不存在。
     *                              数据查询成功，返回orderLists和orderListAllPrice；否则返回提示信息
    * @author yolia
    * @Date 8:31 2020/8/26
    **/
    @RequestMapping("orderListById")
    public Result orderListById(String idType, Integer idValue) throws Exception {
        Result result = new Result();
        List<Orderlist> orderlists = storeService.getOrderListById(idType, idValue);
        if(orderlists == null || orderlists.size() == 0){
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("orderLists", "无内容");
            return result;
        }
        List<Float> orderListAllPrice = new ArrayList<>();
        for(Orderlist orderlist : orderlists){
            JSONArray array = JSON.parseArray(orderlist.getOrderDetails());
            if(array == null || array.size() == 0) continue;
            Float curOrderListAllPrice = 0.0f;
            for(int i = 0; i < array.size(); i++){
                float price =  array.getJSONObject(i).getFloat("price");
                float discount = array.getJSONObject(i).getFloat("discount");
                curOrderListAllPrice += price * discount;
            }
            orderListAllPrice.add(curOrderListAllPrice);
        }
        //
        if(orderListAllPrice.size() == 0){
            result.getResultMap().put("orderListAllPrice", "订单列表为空");
            result.setStatus(Status.FAILURE);
            return result;
        }
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("orderLists", orderlists);
        result.getResultMap().put("orderListAllPrice", orderListAllPrice);
        return result;
    }
    /**
    * @MethodName orderListAddHandle
    * @Description 前端传入订单数据，后端插入数据库(不用查重)
    * @Param [orderlist]
    * @return com.nwafu.bingo.utils.Result
     * Result存放状态值和键值对，状态值为SUCCESS时，数据插入成功
     *                              FAILURE时，数据插入失败
     *                              数据插入成功时，返回插入数据；否则返回错误信息。
    * @author yolia
    * @Date 9:35 2020/8/22
    **/
    @RequestMapping("orderListAddHandle")
    public Result orderListAddHandle(Orderlist orderlist) throws Exception {
        Result result = new Result();
        //添加数据
        storeService.addOrderList(orderlist);
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("addOrderListHandle", orderlist);
        //返回封装数据
        return result;
    }
    /**
    * @MethodName orderListDeleteHandle
    * @Description 前端传入订单数据，后端将其从数据库中删除
    * @Param [orderlist]
    * @return com.nwafu.bingo.utils.Result
     * Result存放状态值和键值对，状态值为SUCCESS时，数据删除成功，
     *                              FAILURE时，数据删除失败。
     *                              数据删除成功，返回删除数据信息；否则返回错误信息。
    * @author yolia
    * @Date 9:39 2020/8/22
    **/
    @RequestMapping("orderListDeleteHandle")
    public Result orderListDeleteHandle(Orderlist orderlist) throws Exception {
        Result result = new Result();
        //删除数据
        storeService.deleteOrderList(orderlist);
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("deleteOrderListHandle", orderlist);
        //返回封装数据
        return result;
    }
    //endregion

    //region 系统配置相关
    /**
    * @MethodName systemReqShow
    * @Description 前端传入系统配置id，后端在数据库中查询相应的系统配置
    * @Param [id]
    * @return com.nwafu.bingo.utils.Result
     * Result包含状态值和键值对。状态值为SUCCESS时，数据获取成功，数据不为空
     *                              FAILURE时，数据获取失败，数据为空
     *                              数据不为空，返回SystemReq对象；否则返回提示信息。
    * @author yolia
    * @Date 9:57 2020/8/22
    **/
    @RequestMapping("systemReqShow")
    public Result systemReqShow(Integer id) throws Exception {
        Result result = new Result();
        //获取数据
        SystemReq systemReq = storeService.getSystemReq(id);
        if(systemReq == null){
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("systemReq", "查询配置为空");
            return result;
        }
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("systemReq", systemReq);
        return result;
    }
    /**
    * @MethodName systemReqAddHandle
    * @Description 前端传入系统配置信息，后端插入数据库
    * @Param [systemReq]
    * @return com.nwafu.bingo.utils.Result
    * @author yolia
    * @Date 10:00 2020/8/22
    **/
    @RequestMapping("systemReqAddHandle")
    public Result systemReqAddHandle(SystemReq systemReq) throws Exception {
        Result result = new Result();
        //检测数据是否重复
        SystemReq temp = storeService.getExact(systemReq);
        if(temp != null){
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("addSystemReqHandle", "系统配置存在");
            return result;
        }
        //添加数据
        storeService.addSystemReq(systemReq);
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("addSystemReqHandle", systemReq);
        return result;
    }
    /**
    * @MethodName systemReqUpdateHandle
    * @Description 更新系统配置信息
    * @Param [systemReq]
    * @return com.nwafu.bingo.utils.Result
     * Result包含状态值和键值对，状态值为SUCCESS时，数据更新成功
     *                              FAILURE时，数据更新失败
     *                              如果更新成功，返回更新数据；否则返回错误信息。
    * @author yolia
    * @Date 10:25 2020/8/22
    **/
    @RequestMapping("systemReqUpdateHandle")
    public Result systemReqUpdateHandle(SystemReq systemReq) throws Exception {
        Result result = new Result();
        //更新数据
        storeService.updateSystemReq(systemReq);
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("updateSystemHandle", systemReq);
        return result;
    }
    /**
    * @MethodName systemReqDeleteHandle
    * @Description 删除指定的系统配置
    * @Param [id]
    * @return com.nwafu.bingo.utils.Result
     * Result包含状态值和键值对，状态值为SUCCESS时，数据删除成功，
     *                              FAILURE时，数据删除失败。
     *                              如果删除成功，返回id；否则返回错误信息。
    * @author yolia
    * @Date 10:28 2020/8/22
    **/
    @RequestMapping("systemReqDeleteHandle")
    public Result systemReqDeleteHandle(Integer id) throws Exception {
        Result result = new Result();
        //删除数据
        storeService.deleteSystemReqById(id);
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("deleteSystemReqHandle", id);
        return result;
    }
    //endregion

    //region 评测相关
    /**
    * @MethodName evaluationShow
    * @Description 根据指定的idType和idValue获取相对应的评测列表
    * @Param [idType, idValue] ---- idType的值应为eid,uid,gid
    * @return com.nwafu.bingo.utils.Result
     * Result包含状态值和键值对，状态值为SUCCESS时，获取数据成功，
     *                              FAILURE时，获取数据失败，
     *                              获取数据成功，返回评测列表数据；否则返回提示信息。
    * @author yolia
    * @Date 10:50 2020/8/22
    **/
    @RequestMapping("evaluationShow")
    public Result evaluationShow(String idType, Integer idValue) throws Exception {
        Result result = new Result();
        //获取数据
        List<Evaluation> evaluationList =  storeService.getEvaluationById(idType, idValue);
        if(evaluationList == null || evaluationList.size() == 0){
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("evaluationList_" + idType, "查询评测为空");
            return result;
        }
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("evaluationList_" + idType, evaluationList);
        return result;
    }
    /**
    * @MethodName searchEvaluationByUidAndGid
    * @Description 根据uid和gid查找评测
    * @Param [uid, gid]
    * @return com.nwafu.bingo.utils.Result
     * Result包括状态值和键值对，状态值为SUCCESS时，数据查询成功，数据存在，
     *                              FAILURE时，数据查询失败，数据不存在。
     *                              数据存在时，返回evaluation；否则返回提示信息。
    * @author yolia
    * @Date 9:55 2020/8/26
    **/
    @RequestMapping("searchEvaluationByUidAndGid")
    public Result searchEvaluationByUidAndGid(Integer uid, Integer gid) throws Exception {
        Result result = new Result();
        //获取数据
        Evaluation evaluation = storeService.getEvaluationByUidAndGid(uid, gid);
        if(evaluation == null) {
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("evaluation", "无评测");
            return result;
        }
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("evaluation", evaluation);
        return result;
    }

    /**
    * @MethodName evaluationAddHandle
    * @Description 向数据库中添加新的评测数据（不查重）
    * @Param [evaluation]
    * @return com.nwafu.bingo.utils.Result
     * Result包含状态值和键值对。状态值为SUCCESS时。添加成功，
     *                              FAILURE时。添加失败。
     *                              添加成功时，返回添加评测的数据；否则返回错误信息。
    * @author yolia
    * @Date 10:55 2020/8/22
    **/
    @RequestMapping("evaluationAddHandle")
    public Result evaluationAddHandle(Evaluation evaluation) throws Exception {
        Result result = new Result();
        Evaluation searchEvaluation = storeService.getEvaluationByUidAndGid(evaluation.getUid(), evaluation.getGid());
        if(searchEvaluation != null){
            result.setStatus(Status.FAILURE);
            result.getResultMap().put("addEvaluationHandle", "数据已存在");
            return result;
        }
        storeService.addEvaluation(evaluation);
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("addEvaluationHandle", evaluation);
        return result;
    }
    /**
    * @MethodName evaluationDeleteHandle
    * @Description 根据指定idType和idValue删除评测数据
    * @Param [idType, idValue] ------- idType的值应为eid,uid,gid
    * @return com.nwafu.bingo.utils.Result
     * Result包含状态值和键值对，状态值为SUCCESS时，删除数据成功，
     *                              FAILURE时，删除数据失败。
     *                              删除数据成功，返回idType和idValue拼接的字符串。
    * @author yolia
    * @Date 10:59 2020/8/22
    **/
    @RequestMapping("evaluationDeleteHandle")
    public Result evaluationDeleteHandle(String idType, Integer idValue) throws Exception {
        Result result = new Result();
        storeService.deleteEvaluationById(idType, idValue);
        result.setStatus(Status.SUCCESS);
        result.getResultMap().put("deleteEvaluationHandle", idType + " " + idValue);
        return result;
    }
    //endregion
}
