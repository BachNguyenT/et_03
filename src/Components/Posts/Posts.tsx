import "./Posts.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Switch } from "antd";
import React from "react";
import Post from "../../Model/postList";
import { useLocation, useNavigate } from "react-router-dom";
import path from "path";

const Posts = ({ post, setPost, category }: any) => {
  const [postId, setPostId] = useState(0);
  const [articles, setArticles] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  let effectCalled = false;
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [show, setShow] = useState();
  const [noShow, setNoShow] = useState();
  const token = localStorage.getItem("accessToken");
  const accessToken = `Bearer ${token}`;
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [publication, setPublication] = useState("all");
  let counter = 0;
  const navigate = useNavigate();
  let color = false;
  let path = useLocation().pathname;

  const getTotalPost = () => {
    axios
      .get("https://api-saomy.wisere.com/api/v1/posts/count-total-post", {
        params: { category: category },
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setTotalPosts(response.data.total);
        setTotalPage(Math.floor((totalPosts - 1) / 10) + 1);

        setShow(response.data.show);
        setNoShow(response.data.noShow);
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
        category: category,
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
    getTotalPost();
  });

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    getTotalPost();
  }, [category]);

  useEffect(() => {
    if (effectCalled) return;
    fetchPosts();
    effectCalled = true;
  }, [category]);

  useEffect(() => {
    fetchPosts();
  }, [category, page]);

  const NumberButtons = () => {
    const buttons: React.JSX.Element[] = [];

    if (totalPage <= 4) {
      for (let i = 1; i <= totalPage; i++) {
        buttons.push(
          <Button
            className="Posts__Footer__Navigator__Nums__Button"
            onClick={() => {
              setPage(i);
            }}
            style={
              i === page
                ? {
                    backgroundColor: "white",
                    color: "orange",
                    border: "1px solid orange",
                  }
                : {}
            }
          >
            {i}
          </Button>
        );
      }
    } else {
      for (let i = 1; i <= 2; i++) {
        buttons.push(
          <Button
            className="Posts__Footer__Navigator__Nums__Button"
            onClick={() => {
              setPage(i);
            }}
          >
            {i}
          </Button>
        );
      }

      buttons.push(
        <p className="Posts__Footer__Navigator__Nums__Button">...</p>
      );

      if (
        page !== 1 &&
        page !== 2 &&
        page !== totalPage - 1 &&
        page !== totalPage
      ) {
        buttons.push(
          <Button
            className="Posts__Footer__Navigator__Nums__Button"
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
            className="Posts__Footer__Navigator__Nums__Button"
            onClick={() => {
              setPage(i);
            }}
          >
            {i}
          </Button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="Posts">
      <div className="Posts__Top">
        <div className="Posts__Top__Left">
          <p
            className="Posts__Top__Left__Filter"
            onClick={() => setPublication("all")}
            style={publication === "all" ? { color: "black", textDecoration: "underline", textUnderlineOffset: "8px", fontWeight: "650" } : {}}
          >
            Tất cả ({totalPosts})
          </p>
          <p
            className="Posts__Top__Left__Filter"
            onClick={() => setPublication("published")}
            style={publication === "published" ? { color: "black", textDecoration: "underline", textUnderlineOffset: "8px", fontWeight: "650" } : {}}
          >
            Công bố ({show})
          </p>
          <p
            className="Posts__Top__Left__Filter"
            onClick={() => setPublication("unpublished")}
            style={publication === "unpublished" ? { color: "black", textDecoration: "underline", textUnderlineOffset: "8px", fontWeight: "650" } : {}}
          >
            Không công bố ({noShow})
          </p>
        </div>
        <div className="Posts__Top__Right">
          <input
            className="Posts__Top__Right__Textbox"
            type="text"
            placeholder="Nhập thông tin tìm kiếm"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            className="Posts__Top__Right__Button"
            onClick={() => {
              navigate(`/dashboard/create`);
            }}
          >
            + Viết bài
          </button>
        </div>
      </div>
      <div className="Posts__Bottom">
        <div className="Posts__Item">
          <div className="Posts__Item__Title">
            <p>Tiêu đề</p>
            <p>Trạng thái</p>
            <p>Thời gian hiển thị</p>
          </div>
          <div className="Posts__Item__Dashboard">
            {articles.map((article) => {
              let mode = article.isShow ? "published" : "unpublished";
              
              if (
                article.title.includes(search) &&
                (publication === "all" || publication === mode)
              ) {
                color = !color;
                counter++;
                return (
                  <div
                    className="Posts__Item__Dashboard__Articles"
                    style={
                      color
                        ? { backgroundColor: "rgba(244, 245, 247, 0.6)" }
                        : { backgroundColor: "white" }
                    }
                    onClick={() => {
                      setPost(article);
                      navigate("/dashboard/edit");
                    }}
                  >
                    <p>{article.title}</p>
                    <div className="Posts__Item__Dashboard__Articles__Show">
                      <Switch
                        defaultChecked
                        onChange={() => {
                          console.log("changed");
                        }}
                        style={{ width: "10px" }}
                        className="Posts__Item__Dashboard__Articles__Show__Switch"
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

        <div className="Posts__Footer">
          <p>
            Hiển thị {counter} của {totalPosts} bài viết
          </p>
          <div className="Posts__Footer__Navigator">
            <Button
              className="Posts__Footer__Navigator__Arrows"
              onClick={() => {
                if (page > 1) {
                  setPage((prevPage) => prevPage - 1);
                  fetchPosts();
                }
              }}
            >
              {"<"}
            </Button>
            <div className="Posts__Footer__Navigator__Nums">
              {NumberButtons()}
            </div>

            <Button
              className="Posts__Footer__Navigator__Arrows"
              onClick={() => {
                if (page < totalPage) {
                  setPage((prevPage) => prevPage + 1);
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

export default Posts;
