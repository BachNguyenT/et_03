import "./List.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Switch } from "antd";
import React from "react";
import Post from "../../Model/postList";

const List = ({ post, setPost }: any) => {
  const [postId, setPostId] = useState(0);
  const [articles, setArticles] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  let effectCalled = false;
  const [totalPosts, setTotalPosts] = useState();
  const [show, setShow] = useState();
  const [noShow, setNoShow] = useState();
  const totalPage = 2;
  const token = localStorage.getItem("accessToken");
  const accessToken =
    `Bearer ${token}`;

  console.log(accessToken);
  const getPost = () => {
    axios
      .get("https://api-saomy.wisere.com/api/v1/posts/count-total-post", {
        params: { category: "BLOG" },
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log(response);
        setTotalPosts(response.data.total);
        setShow(response.data.show);
        setNoShow(response.data.noShow);
        console.log(totalPosts);
        console.log(show);
        console.log(noShow);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPosts = () => {
    setLoading(true);
    axios
      .post("https://api-saomy.wisere.com/api/v1/posts/list-posts", {
        limit: 10,
        page: page,
        search: "",
        category: "BLOG",
      })
      .then((response) => {
        console.log(response.data.docs);
        setArticles(response.data.docs);
        console.log(page);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // const createPost = () => {
  //   axios.post("https://api-saomy.wisere.com/api/v1/posts/create-post"), {
  //     title:
  //     category:
  //     isShow:
  //     postImage:
  //     content:
  //     isEditSeo:
  //   }
  // }

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (effectCalled) return;
    fetchPosts();
    effectCalled = true;
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const NumberButtons = () => {
    const buttons: React.JSX.Element[] = [];

    if (totalPage <= 4) {
      for (let i = 1; i <= totalPage; i++) {
        buttons.push(
          <Button
            className="List__Footer__Navigator__Nums__Button"
            onClick={() => {
              setPage(i);
              console.log(i);
            }}
          >
            {i}
          </Button>
        );
      }
    } else {
      for (let i = 1; i <= 2; i++) {
        buttons.push(
          <Button
            className="List__Footer__Navigator__Nums__Button"
            onClick={() => {
              setPage(i)
            }}
          >
            {i}
          </Button>
        );
      }

      buttons.push(
        <p className="List__Footer__Navigator__Nums__Button">...</p>
      );

      if (
        page !== 1 &&
        page !== 2 &&
        page !== totalPage - 1 &&
        page !== totalPage
      ) {
        console.log(page);
        buttons.push(
          <Button
            className="List__Footer__Navigator__Nums__Button"
            onClick={() => {
              setPage(page);
            }}
          >
            {page}
          </Button>
        );
        buttons.push(<p>...</p>);
      }

      for (let i = totalPage - 1; i <= totalPage; i++) {
        buttons.push(
          <Button
            className="List__Footer__Navigator__Nums__Button"
            onClick={() => {
              setPage(i);
            }}
          >
            {i}
          </Button>
        );
      }
    }
    console.log(page);
    return buttons;
  };

  return (
    <div className="List">
      <div className="List__Top">
        <div className="List__Top__Left">
          <p>Tất cả ({totalPosts})</p>
          <p>Công bố ({show})</p>
          <p>Không công bố ({noShow})</p>
        </div>
        <div className="List__Top__Right">
          <input
            className="List__Top__Right__Textbox"
            type="text"
            placeholder="Nhập thông tin tìm kiếm"
          />
          <button className="List__Top__Right__Button">+ Viết bài</button>
        </div>
      </div>
      <div className="List__Bottom">
        <div className="List__Item">
          <div className="List__Item__Title">
            <p>Tiêu đề</p>
            <p>Trạng thái</p>
            <p>Thời gian hiển thị</p>
          </div>
          <div className="List__Item__Dashboard">
            {articles.map((article) => {
              console.log("articleCount");
              return (
                <div
                  className="List__Item__Dashboard__Articles"
                  style={
                    articles.indexOf(article) % 2 === 0
                      ? { backgroundColor: "rgba(244, 245, 247, 0.6)" }
                      : { backgroundColor: "white" }
                  }
                  onClick={() => {
                    setPost(article);
                    console.log(post);
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
            })}
          </div>
        </div>

        <div className="List__Footer">
          <p>
            Hiển thị {articles.length} của {totalPosts} bài viết
          </p>
          <div className="List__Footer__Navigator">
            <Button
              className="List__Footer__Navigator__Arrows"
              onClick={() => {
                if (page > 1) {
                  setPage((prevPage) => prevPage - 1);
                  fetchPosts();
                }
              }}
            >
              {"<"}
            </Button>
            <div className="List__Footer__Navigator__Nums">
              {NumberButtons()}
            </div>

            <Button
              className="List__Footer__Navigator__Arrows"
              onClick={() => {
                if (page < totalPage) {
                  setPage((prevPage) => prevPage + 1);
                  console.log(page);
                }
              }}
            >
              {">"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
