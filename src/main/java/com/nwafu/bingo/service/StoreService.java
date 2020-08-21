package com.nwafu.bingo.service;

import com.nwafu.bingo.dao.EvaluationDao;
import com.nwafu.bingo.dao.GameDao;
import com.nwafu.bingo.dao.OrderlistDao;
import com.nwafu.bingo.dao.SystemReqDao;
import com.nwafu.bingo.entity.Game;
import com.nwafu.bingo.entity.Orderlist;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Date: 2020/8/20
 * Description: 商店服务类，应包含EvaluationDao, GameDao, OrderlistDao, SystemReqDao，封装商店相关服务
 * Function: 获取所有游戏，订单(后续补充分页获取)
 * 根据游戏id或者用户id获取Evaluations
 * 根据id获取SystemReq
 * 根据用户id获取Orderlist
 * Game,Evaluation,SystemReq的添加修改删除
 * Orderlist的添加删除
 *
 * 其他后续补充
 */
@Service
public class StoreService {
    /**服务类引用**/
    @Resource
    private EvaluationDao evaluationDao;
    @Resource
    private GameDao gameDao;
    @Resource
    private OrderlistDao orderlistDao;
    @Resource
    private SystemReqDao systemReqDao;

    //函数声明
    //region 游戏相关
    /**
    * @MethodName getAllGame
    * @Description 获取数据库中全部游戏
    * @Param []
    * @return com.nwafu.bingo.service.StoreService
    * @author yolia
    * @Date 8:40 2020/8/21
    **/
    public List<Game> getAllGame() throws Exception {
        return gameDao.getAll();
    }
    /**
    * @MethodName addGame
    * @Description 向数据库中添加Game数据
    * @Param [game]
    * @return com.nwafu.bingo.service.StoreService
    * @author yolia
    * @Date 8:41 2020/8/21
    **/
    public void addGame(Game game) throws Exception {
        gameDao.add(game);
    }
    /**
    * @MethodName updateGame
    * @Description 更新数据库中的Game数据
    * @Param [game]
    * @return com.nwafu.bingo.service.StoreService
    * @author yolia
    * @Date 8:41 2020/8/21
    **/
    public void updateGame(Game game) throws Exception {
        gameDao.update(game);
    }
    /**
    * @MethodName deleteGame
    * @Description 删除数据库中相关的Game数据
    * @Param [game]
    * @return com.nwafu.bingo.service.StoreService
    * @author yolia
    * @Date 8:45 2020/8/21
    **/
    public void deleteGame(Game game) throws Exception {
        gameDao.delete(game);
    }
    //endregion

    /**
    * @MethodName getAllOrderList
    * @Description 获取所有订单
    * @Param []
    * @return com.nwafu.bingo.service.StoreService
    * @author yolia
    * @Date 8:54 2020/8/21
    **/
    public List<Orderlist> getAllOrderList() throws Exception {
        return orderlistDao.getAll();
    }
    /**
    * @MethodName getOrderListById
    * @Description 根据相应的id获取该id下的订单列表
    * @Param [idType, idValue] ------- 根据不同的id来查询comment, idType的值应为oid(),uid()
    * @return com.nwafu.bingo.service.StoreService
    * @author yolia
    * @Date 8:56 2020/8/21
    **/
    public List<Orderlist> getOrderListById(Integer idType, Integer idValue) throws Exception {
        return orderlistDao.getById(idType, idValue);
    }
}
