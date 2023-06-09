import "./Edit.scss";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  message,
  Modal,
  Select,
  Space,
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

const Edit = ({ post, setPost }: any) => {
  const [postId, setPostId] = useState(post._id);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [isShow, setIsShow] = useState(post.isShow);
  const [content, setContent] = useState(post.content);
  const [postImage, setPostImage] = useState(post.postImage);
  const [isEditSeo, setIsEditSeo] = useState(post.isEditSeo);
  const [titleSeoPage, setTitleSeoPage] = useState(post.titleSeoPage);
  const [descriptionSeoPage, setDescriptionSeoPage] = useState(
    post.descriptionSeoPage
  );

  const token = localStorage.getItem("accessToken");
  const accessToken = `Bearer ${token}`;

  const handleSelect = (value: string) => {
    setCategory("EVENT");
  };

  const navigate = useNavigate();
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

  

  const handleCancel = () => setPreviewOpen(false);

  const handleChange = (file: any) => {
    setPostImage(file);
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
    <div className="Edit">
      <div className="Edit__Top">
        <h3 className="Edit__Top__Head">Chỉnh sửa bài viết</h3>
        <div className="Edit__Top__Title">
          <Form
            className="Edit__Top__Title__Forms"
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
              className="Edit__Top__Title__Forms__Item"
              label="Tiêu đề"
              rules={[
                {
                  required: true,
                  message: "Please input your Title",
                },
              ]}
            >
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              className="Edit__Top__Title__Forms__Item"
              label="Danh mục"
              rules={[
                {
                  required: true,
                  message: "Please input your Category",
                },
              ]}
            >
              <Space wrap>
                <Select
                  defaultValue={category}
                  style={{ width: 120 }}
                  onChange={handleSelect}
                  options={[
                    { value: "BLOG", label: "BLOG" },
                    { value: "EVENT", label: "EVENT" },
                  ]}
                />
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div className="Edit__Top__Status">
          <div className="Edit__Top__Status__Left">
            <h6 className="Edit__Top__Status__Left__Upper">Trạng thái</h6>
            <div className="Edit__Top__Status__Left__Lower">
              <Switch
                defaultChecked
                onChange={(e) => {
                  setIsShow(e);
                }}
                style={{ width: "10px" }}
              />
              <p>Hiển thị</p>
            </div>
            <div className="Edit__Top__Status__Left__Check">
              <input type="checkbox" />
              <p>Thiết lập ngày đăng tự động</p>
            </div>
            <div className="Edit__Top__Status__Left__Pick">
              <Form.Item>
                <DatePicker className="Edit__Top__Status__Left__Pick__Picker" />
              </Form.Item>
              <Form.Item>
                <TimePicker className="Edit__Top__Status__Left__Pick__Picker" />
              </Form.Item>
            </div>
          </div>
          <div className="Edit__Top__Status__Right">
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

        <div className="Edit__Top__Content">
          <h6>Nội dung bài viết</h6>
          <TextArea
            value={content}
            rows={4}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <div className="Edit__Top__SEOTitle">
          <h3>SEO</h3>
          <div className="Edit__Top__SEOTitle__Right">
            <p>Chỉnh sửa SEO</p>
            <Switch
              onChange={(e) => {
                setIsEditSeo(e);
              }}
              style={{ width: "10px" }}
            />
          </div>
        </div>

        <div className="Edit__Top__SEO">
          <Form
            className="Edit__Top__SEO__Form"
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
              className="Edit__Top__Title__Forms__Item"
              label="Tiêu đề trang"
              rules={[
                {
                  required: true,
                  message: "Please input your Page Title",
                },
              ]}
            >
              <Input
                value={titleSeoPage}
                onChange={(e) => {
                  setTitleSeoPage(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              className="Edit__Top__Title__Forms__Item"
              label="Mô tả"
              rules={[
                {
                  required: true,
                  message: "Please input your Description",
                },
              ]}
            >
              <Input.TextArea
                value={descriptionSeoPage}
                showCount
                maxLength={500}
                onChange={(e) => {
                  setDescriptionSeoPage(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              className="Edit__Top__Title__Forms__Item"
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
      <div className="Edit__Footer">
        <Button
          className="Footer__Button"
          onClick={() => {
            setPost();
            navigate("/dashboard");
          }}
        >
          Huỷ
        </Button>
        <Button
          className="Footer__Button"
          onClick={() => {
            fetchArticle();
            setPost();
            navigate("/dashboard");
          }}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default Edit;
