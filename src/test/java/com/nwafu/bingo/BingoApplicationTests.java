package com.nwafu.bingo;

import com.nwafu.bingo.dao.*;
import com.nwafu.bingo.entity.*;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@MapperScan("com.nwafu.bingo.dao")
class BingoApplicationTests {
	@Autowired
	AdminDao adminDao;
	@Autowired
	CommentDao commentDao;
	@Autowired
	EvaluationDao evaluationDao;
	@Autowired
	GameDao gameDao;
	@Autowired
	OrderlistDao orderlistDao;
	@Autowired
	UserDao userDao;
	@Autowired
	PostDao postDao;
	@Autowired
	SystemReqDao systemReqDao;
	//admin的mapper测试
	@Test
	void contextLoads() throws Exception {
		/*Admin admin = new Admin();
		admin.setAname("yangfan3");
		admin.setPassword("123456");
		adminDao.add(admin);*/

		//System.out.println("添加成功");

		//查询指定用户名
		/*List<Admin> list = adminDao.getByName("yangfan2");
		for(Admin a:list){
			System.out.println(a.getAname());
		}*/
		//删除测试
		//adminDao.deleteById(2);
		//更新测试
		Admin admi = new Admin();
		admi.setAid(100);
		admi.setAname("yangfan3");
		admi.setPassword("123456");

		 adminDao.update(admi);


		//查询所有
		List<Admin> list = adminDao.getAll();


	}
	@Test
	void testUser() throws Exception{
		User user = new User();
		user.setGamelist("test");
		user.setPassword("12021");
		user.setUalias("wanghui");
		user.setUavatar("/c/clic/c");
		user.setUbirthday("1998/7/12");
		user.setUmail("12@qq.com");
		user.setUname("晨晨");
		user.setUprofile("jfdisofo");
		user.setUsex("nannvnan");
		user.setWishlist("lol");

		//userDao.add(user);

		/*List<User> list = userDao.getAll();
		for(User u : list){
			System.out.println(u.getUname());
		}
		List<User> list2 = userDao.getByName("程冰");
		for(User u : list2){
			System.out.println(u.getUname());
		}*/
		/*User u = userDao.getById(1);
		System.out.println(u.getUname());*/

		user.setUid(2);
		userDao.update(user);
	}
	@Test
	void testGame() throws Exception{
		Game game = new Game();
		game.setChref("sfdsafaf");
		game.setDetail("fdsafsadf");
		game.setDeveloper("杨氏集团");
		game.setDiscount(Float.valueOf("4.4"));
		game.setGname("王慧");
		game.setDlclist("jdoiasjfsaigdsajg;osajo;osa");
		game.setGprice(Float.valueOf("22.3"));
		game.setGscore(Float.valueOf("4.4"));
		game.setGtype("fadfasffadsfafasfasfsafsa");
		game.setLanguage("zhongwen");
		game.setPhref("fasfdadsfsadfasf");
		game.setPlatform("dfasafafsa");
		game.setPublisher("郭氏集团");
		game.setRealeasedate("fadsfsadagssagsafsafsa");
		game.setSystemreq("windows10");
		game.setVhref("dfadasfdafasfa");
		game.setGid(102);
		//gameDao.update(game);
		//gameDao.add(game);
		//gameDao.delete(game);


		/*List<Game> list1 = gameDao.getAll();
		for(Game i: list1){
			System.out.println(i.getGname());
		}*/
		/*List<Game> list2 = gameDao.getByName("Need for Speed");

		for(Game i: list2){
			System.out.println(i.getGname());
		}*/
		Game g = gameDao.getById(1);
		System.out.println(g.getGname());

	}
	@Test
	void testCommetn() throws Exception {
		Comment comment = new Comment();
		comment.setContent("tests");
		comment.setCtime("2018/1/17");
		comment.setCtype(0);

		comment.setPid(5);
		comment.setUid(2);
		comment.setTocid(22);
		comment.setTouid(23);
		//commentDao.add(comment);

		/*List<Comment> list = commentDao.getById("uid",2);
		for(Comment c: list){
			System.out.println(c.getContent());
		}*/
		commentDao.deleteById("uid",1);
	}
	@Test
	void testEva() throws Exception{
		Evaluation evaluation = new Evaluation();
		evaluation.setContent("我是你爸爸");
		evaluation.setUid(2);
		evaluation.setEtime("1998/12/3");
		evaluation.setGid(3);
		evaluation.setScore(Float.valueOf("7.7"));
		evaluation.setEid(4);
		/*evaluationDao.add(evaluation);*/

		/*List<Evaluation> list = evaluationDao.getById("eid",1);
		for(Evaluation a:list){
			System.out.println(a.getContent());
		}*/

		//evaluationDao.deleteById("uid",1);

		evaluationDao.update(evaluation);

	}
	@Test
	void testPost() throws Exception{
		Post post = new Post();

		post.setContent("fdafafdafafa");
		post.setPlikenum(45);
		post.setPtheme("诸神");
		post.setPtime("1999/12/1");
		post.setTitle("玄远");
		post.setUid(2);
		//post.setPid(1);
		postDao.add(post);

		/*List<Post> list1 = postDao.getAll();
		for(Post a: list1){
			System.out.println(a.getContent());
		}*/
		/*List<Post> list2 = postDao.getById("uid",1);
		for(Post a: list2){
			System.out.println(a.getPtheme());
		}*/
		//postDao.update(post);
		/*postDao.deleteById("uid",2);*/
	}
	@Test
	void testOrderlist() throws Exception{
		Orderlist orderlist = new Orderlist();
		orderlist.setOrderDetails("goumai");
		orderlist.setUid(2);
		orderlist.setOtime("1992/1/1");
		orderlist.setOid(1);
		//orderlistDao.add(orderlist);

		//List<Orderlist> list = orderlistDao.getAll();
		/*List<Orderlist> list = orderlistDao.getById("uid",1);
		for(Orderlist l: list){
			System.out.println(l.getOrderDetails());
		}
		*/
		orderlistDao.delete(orderlist);
	}
	@Test
	void testSystem() throws Exception {
		SystemReq systemReq = new SystemReq();
		systemReq.setCpu("fadf");
		systemReq.setGpu("fafdsaf");
		systemReq.setHarddisk("sfsafasfaf");
		systemReq.setOs("华为");
		systemReq.setRam("fdadfafaf");
		systemReq.setSrid(1);
		//systemReqDao.updateById(systemReq);
		//systemReqDao.add(systemReq);

		/*List<SystemReq> list = systemReqDao.getAll();
		for(SystemReq i:list){
			System.out.println(i.getOs());
		}*/
		/*SystemReq s = systemReqDao.getById(1);
		System.out.println(s.getOs());*/

		systemReqDao.deleteById(1);
	}
}
