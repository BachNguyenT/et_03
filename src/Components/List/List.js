import "./List.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Switch } from "antd";

const List = () => {
  const [articles, setArticles] = useState([]);
  

  const fetchPosts = () => {
    axios
      .post("https://api-saomy.wisere.com/api/v1/posts/list-posts", {
        limit: 10,
        page: 1,
        search: "",
        category: "BLOG",
      })
      .then((response) => {
        console.log(response.data.docs);
        setArticles(response.data.docs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(articles);
  return (
    <div className="List">
      <div className="List__Top">
        <div className="List__Top__Left">
          <p>Tất cả (7)</p>
          <p>Công bố (7)</p>
          <p>Không công bố (0)</p>
        </div>
        <div className="List__Top__Right">
          <button
            className="List__Top__Right__Textbox"
            type="text"
            placeholder="Nhập thông tin tìm kiếm"
          />
          <button className="List__Top__Right__Button">+ Viết bài</button>
        </div>
      </div>
      <div className="List__Item">
        <div className="List__Item__Title">
          <p>Tiêu đề</p>
          <p>Trạng thái</p>
          <p>Thời gian hiển thị</p>
        </div>
        <div className="List__Item__Dashboard">
          {articles.map((article) => {
            if (articles.indexOf(article) % 2 == 0) {
              return (
                <div
                  className="List__Item__Dashboard__Articles"
                  style={{backgroundColor:"rgba(244,245,247,0.6)"}}
                  onClick={() => {
                    console.log("HI");
                  }}
                >
                  <p>{article.title}</p>
                  <div className="List__Item__Dashboard__Articles__Show">
                    <Switch
                      defaultChecked
                      onChange={() => {
                        console.log("changed");
                      }}
                      style={{ width: "10px" }}
                      className="List__Item__Dashboard__Articles__Show__Switch"
                    />
                    <p>Hiển thị</p>
                  </div>
                  <p>-/-</p>
                </div>
              );
            } else {
              return (
                <div
                  className="List__Item__Dashboard__Articles"
                  style={{backgroundColor:"white"}}
                  onClick={() => {
                    console.log("HI");
                  }}
                >
                  <p>{article.title}</p>
                  <div className="List__Item__Dashboard__Articles__Show">
                    <Switch
                      defaultChecked
                      onChange={() => {
                        console.log("changed");
                      }}
                      style={{ width: "10px" }}
                      className="List__Item__Dashboard__Articles__Show__Switch"
                    />
                    <p>Hiển thị</p>
                  </div>
                  <p>-/-</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default List;
