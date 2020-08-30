package com.nwafu.bingo.service;

import com.chenlb.mmseg4j.analysis.MMSegAnalyzer;
import com.nwafu.bingo.entity.Evaluation;
import com.nwafu.bingo.entity.Game;
import com.nwafu.bingo.entity.Post;
import com.nwafu.bingo.utils.Result;
import com.nwafu.bingo.utils.Status;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.search.highlight.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import javax.annotation.Resource;
import java.io.File;
import java.util.LinkedList;
import java.util.List;

/**
 * Date: 2020/8/26
 * Description: 该类是基于Lucene的全文本搜索
 */
@Service
public class TextSearchService {

    @Resource
    private CommunityService communityService;
    @Resource
    private StoreService storeService;
    private static String CLASSNAME = "TextSearchService";

    private void log(String status) {
        System.out.println(CLASSNAME + " " + status);
    }
    /**
    * 根据数据表创建索引文件到本地
    * @Param1:要创建索引的表数据
    * @Param2:表类型
     * 1: Game, 2: Evaluation, 3: Post
    */
    private void createIndex(List<Object> dataList, int type) throws Exception {

        //设置索引文件文件夹
        String indexFold = ResourceUtils.getURL("classpath:").getPath() + "static/src/luceneIndex/";
        File file = new File(indexFold);
        if (!file.exists()) {
            file.mkdir();
        }
        Directory directory = FSDirectory.open(file.toPath());

        //配置分词器
        Analyzer analyzer = new MMSegAnalyzer();
        IndexWriterConfig config = new IndexWriterConfig(analyzer);
        config.setOpenMode(IndexWriterConfig.OpenMode.CREATE_OR_APPEND);
        IndexWriter writer = new IndexWriter(directory, config);

        for (Object obj : dataList) {
            Game game;
            Evaluation evaluation;
            Post post;

            String objType;
            String content;
            log("create index");
            switch (type) {
                case 1:
                    game = (Game) obj;
                    objType = "Game";
                    content = game.getGid() + "<1>" + game.getGname() + "<1>" + game.getGtype() + "<1>" + game.getDetail();
                    break;
                case 2:
                    evaluation = (Evaluation) obj;
                    objType = "Evaluation";
                    content = evaluation.getEid()+ "<1>" + evaluation.getContent();
                    break;
                case 3:
                    post = (Post) obj;
                    objType = "Post";
                    content = post.getPid() + "<1>" + post.getPtheme() + "<1>" + post.getTitle() + "<1>" + post.getContent();
                    break;
                default:
                    throw new Exception("Wrong Object Type " + type);
            }

            //创建索引条目，将数据加入
            Document document = new Document();
            document.add(new StringField("objType", objType, Field.Store.YES));
            document.add(new TextField("content", content, Field.Store.YES));//需要进行分词搜索的域
            writer.addDocument(document);
        }
        writer.close();
    }

    /**
     * 创建文件方法
     * */
    public void createIndexFile() throws Exception {
        List<Post> posts = communityService.getAll();
        List<Game> games = storeService.getAllGame();
        List<Evaluation> evaluations = new LinkedList<>();
        for (Game game : games) {
            evaluations.addAll(storeService.getEvaluationById("gid", game.getGid()));
        }

        List<Object> list = new LinkedList<>(posts);
        createIndex(list, 3);
        list = new LinkedList<>(games);
        createIndex(list, 1);
        list = new LinkedList<>(evaluations);
        createIndex(list, 2);
    }

    /**
    * @Param1 查询的关键字
    * */
    public List<Result> searchIndex(String keyword) throws Exception {
        String status = "SearchIndex";
        log(status + " " + keyword);

        String indexFold = ResourceUtils.getURL("classpath:").getPath() + "static/src/luceneIndex/";
        File file = new File(indexFold);
        if (!file.exists()) {
            throw new Exception(CLASSNAME + " " + status + " " + indexFold + " isn't exist");
        }
        Directory directory = FSDirectory.open(file.toPath());
        IndexReader indexReader = DirectoryReader.open(directory);

        IndexSearcher indexSearcher = new IndexSearcher(indexReader);
        Analyzer analyzer = new MMSegAnalyzer();
        //设置查询时的分词解析器
        QueryParser queryParser = new QueryParser("content", analyzer);//对content字段进行分词搜索
        Query query = queryParser.parse(keyword);//对keyword进行搜索
        TopDocs topDocs = indexSearcher.search(query, 10);//搜索10条,结果集为document的id集合

        //设置关键字的文本高亮,构造文本高亮
        SimpleHTMLFormatter simpleHTMLFormatter = new SimpleHTMLFormatter("<b><span color='red'>", "</span></b>");
        QueryScorer queryScorer = new QueryScorer(query);
        Fragmenter fragmenter = new SimpleSpanFragmenter(queryScorer);
        Highlighter highlighter = new Highlighter(simpleHTMLFormatter, queryScorer);
        highlighter.setTextFragmenter(fragmenter);

        List<Result> results = new LinkedList<>();
        for (ScoreDoc scoreDoc : topDocs.scoreDocs) {
            int documentId = scoreDoc.doc;
            Document document = indexSearcher.doc(documentId);
            String objType = document.get("objType");
            String content = highlighter.getBestFragment(analyzer, "content", document.get("content"));
            Result result = new Result();
            result.setStatus(Status.SUCCESS);
            result.getResultMap().put("objType", objType);
            String[] contents = content.split("<1>");
            transform(objType, contents, result);
            results.add(result);
        }

        return results;
    }

    private void transform(String objType, String[] contents, Result result) throws Exception {

        switch (objType) {
            case "Game":
                result.getResultMap().put("gid", contents[0]);
                result.getResultMap().put("gname", contents[1]);
                result.getResultMap().put("gtype", contents[2]);
                result.getResultMap().put("detail", contents[3]);
                break;
            case "Evaluation":
                result.getResultMap().put("eid", contents[0]);
                result.getResultMap().put("detail", contents[1]);
                break;
            case "Post":
                result.getResultMap().put("pid", contents[0]);
                result.getResultMap().put("ptheme", contents[1]);
                result.getResultMap().put("ptitle", contents[2]);
                result.getResultMap().put("detail", contents[3]);
                break;
            default:
                throw new Exception(CLASSNAME + " wrong objType " + objType);
        }
    }
}
