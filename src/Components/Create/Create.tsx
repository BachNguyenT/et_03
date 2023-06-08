import "./Create.scss";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  Modal,
} from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const currentDate = new Date();

const { TextArea } = Input;

const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

let publicDate = currentDate.getTime,
  notCurrentTime = false;

const NewArticle = () => {
  const [postId, setPostId] = useState();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState();
  const [isEditSeo, setIsEditSeo] = useState(false);
  const [titleSeoPage, setTitleSeoPage] = useState("");
  const [descriptionSeoPage, setDescriptionSeoPage] = useState("");

  const token = localStorage.getItem("accessToken");
  const accessToken = `Bearer ${token}`;
  
  const navigate = useNavigate();

  const createArticle = () => {
    axios
      .post(
        "https://api-saomy.wisere.com/api/v1/posts/create-post",
        {
          title: title,
          category: category,
          isShow: isShow,
          postImage: postImage,
          content: content,
          isEditSeo: isEditSeo,
          titleSeoPage: titleSeoPage,
          descriptionSeoPage: descriptionSeoPage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
  })};

  const fetchArticle = () => {
    axios
      .post(
        `https://api-saomy.wisere.com/api/v1/posts/update-post/${postId}`,
        {
          postId: postId,
          title: title,
          category: category,
          isShow: isShow,
          content: content,
          isEditSeo: isEditSeo,
          titleSeoPage: titleSeoPage,
          descriptionSeoPage: descriptionSeoPage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const submit = () => {
    console.log(title);
    console.log(category);
    console.log(isShow);
    console.log(publicDate);
    console.log(postImage);
    console.log(content);
    console.log(isEditSeo);
    console.log(titleSeoPage);
    console.log(descriptionSeoPage);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handleChange = (file: any) => {
    setPostImage(file.file.thumbUrl);
    console.log(postImage);
    file.file.status = "done";
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="NewArticle">
      <div className="NewArticle__Top">
        <h3 className="NewArticle__Top__Head">Tạo bài viết mới</h3>
        <div className="NewArticle__Top__Title">
          <Form
            className="NewArticle__Top__Title__Forms"
            layout="vertical"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              className="NewArticle__Top__Title__Forms__Item"
              label="Tiêu đề"
              rules={[
                {
                  required: true,
                  message: "Please input your Title",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              className="NewArticle__Top__Title__Forms__Item"
              label="Danh mục"
              rules={[
                {
                  required: true,
                  message: "Please input your Category",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  if (
                    e.target.value.toUpperCase() === "BLOG" ||
                    e.target.value.toUpperCase() === "EVENT"
                  ) {
                    setCategory(e.target.value.toUpperCase());
                  }
                }}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="NewArticle__Top__Status">
          <div className="NewArticle__Top__Status__Left">
            <h6 className="NewArticle__Top__Status__Left__Upper">Trạng thái</h6>
            <div className="NewArticle__Top__Status__Left__Lower">
              <Switch
                defaultChecked
                onChange={(e) => {
                  setIsShow(e);
                }}
                style={{ width: "10px" }}
              />
              <p>Hiển thị</p>
            </div>
            <div className="NewArticle__Top__Status__Left__Check">
              <input type="checkbox" />
              <p>Thiết lập ngày đăng tự động</p>
            </div>
            <div className="NewArticle__Top__Status__Left__Pick">
              <Form.Item>
                <DatePicker className="NewArticle__Top__Status__Left__Pick__Picker" />
              </Form.Item>
              <Form.Item>
                <TimePicker className="NewArticle__Top__Status__Left__Pick__Picker" />
              </Form.Item>
            </div>
          </div>
          <div className="NewArticle__Top__Status__Right">
            <p>Ảnh đại diện bài viết</p>
            <Upload listType="picture-card" onChange={handleChange}>
              {fileList.length > 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </div>
        </div>

        <div className="NewArticle__Top__Content">
          <h6>Nội dung bài viết</h6>
          <TextArea
            rows={4}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <div className="NewArticle__Top__SEOTitle">
          <h3>SEO</h3>
          <div className="NewArticle__Top__SEOTitle__Right">
            <p>Chỉnh sửa SEO</p>
            <Switch
              onChange={(e) => {
                setIsEditSeo(e);
              }}
              style={{ width: "10px" }}
            />
          </div>
        </div>

        <div className="NewArticle__Top__SEO">
          <Form
            className="NewArticle__Top__SEO__Form"
            layout="vertical"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Form.Item
              className="NewArticle__Top__Title__Forms__Item"
              label="Tiêu đề trang"
              rules={[
                {
                  required: true,
                  message: "Please input your NewArticle Title",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setTitleSeoPage(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              className="NewArticle__Top__Title__Forms__Item"
              label="Mô tả"
              rules={[
                {
                  required: true,
                  message: "Please input your Description",
                },
              ]}
            >
              <Input.TextArea
                showCount
                maxLength={500}
                onChange={(e) => {
                  setDescriptionSeoPage(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              className="NewArticle__Top__Title__Forms__Item"
              label="Đường dẫn"
              rules={[
                {
                  required: true,
                  message: "Please input your Link",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="NewArticle__Footer">
        <Button
          className="Footer__Button"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Huỷ
        </Button>
        <Button
          className="Footer__Button"
          onClick={() => {
            submit();
            createArticle();
            navigate("/dashboard");
          }}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default NewArticle;
