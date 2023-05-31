import "./Page.scss";
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
} from "antd";
import axios from "axios";
import { useState } from "react";

const currentDate = new Date();

const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

let publicDate = currentDate.getTime,
  notCurrentTime = false;

const Page = ({ postId, setPostId, post, setPost }) => {
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

  const accessToken =
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDMwMWU4ZDE0ZmFkMDA5NGExOGI0OWQiLCJ1c2VySWQiOiI2NDMwMWU4ZDE0ZmFkMDA5NGExOGI0OWQiLCJpYXQiOjE2ODQ4MzUyOTcsImV4cCI6MTY4NTQ0MDA5N30.mYC1KAJ3eQuvBUrf5uTGupcCu1gqF7i9YAACB0vco2U";

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
    console.log(typeof isShow);
    console.log(typeof isEditSeo);
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

  const handleChange = (file) => {
    setPostImage(file);
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
    <div className="Page">
      <div className="Page__Top">
        <h3 className="Page__Top__Head">Chỉnh sửa bài viết</h3>
        <div className="Page__Top__Title">
          <Form
            className="Page__Top__Title__Forms"
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
              className="Page__Top__Title__Forms__Item"
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
                  console.log(title);
                }}
              />
            </Form.Item>

            <Form.Item
              className="Page__Top__Title__Forms__Item"
              label="Danh mục"
              rules={[
                {
                  required: true,
                  message: "Please input your Category",
                },
              ]}
            >
              <Input
                value={category}
                onChange={(e) => {
                  if (
                    e.target.value.toUpperCase() == "BLOG" ||
                    e.target.value.toUpperCase() == "EVENT"
                  ) {
                    setCategory(e.target.value.toUpperCase());
                  }
                  console.log(category);
                }}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="Page__Top__Status">
          <div className="Page__Top__Status__Left">
            <h6 className="Page__Top__Status__Left__Upper">Trạng thái</h6>
            <div className="Page__Top__Status__Left__Lower">
              <Switch
                defaultChecked
                onChange={(e) => {
                  setIsShow(e);
                  console.log(isShow);
                }}
                style={{ width: "10px" }}
              />
              <p>Hiển thị</p>
            </div>
            <div className="Page__Top__Status__Left__Check">
              <input type="checkbox" />
              <p>Thiết lập ngày đăng tự động</p>
            </div>
            <div className="Page__Top__Status__Left__Pick">
              <Form.Item>
                <DatePicker className="Page__Top__Status__Left__Pick__Picker" />
              </Form.Item>
              <Form.Item>
                <TimePicker className="Page__Top__Status__Left__Pick__Picker" />
              </Form.Item>
            </div>
          </div>
          <div className="Page__Top__Status__Right">
            <p>Ảnh đại diện bài viết</p>
            <Upload
              listType="picture-card"
              onChange={handleChange}
            >
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

        <div className="Page__Top__Content">
          <h6>Nội dung bài viết</h6>
          <TextArea
            value={content}
            rows={4}
            onChange={(e) => {
              setContent(e.target.value);
              console.log(content);
            }}
          />
        </div>
        <div className="Page__Top__SEOTitle">
          <h3>SEO</h3>
          <div className="Page__Top__SEOTitle__Right">
            <p>Chỉnh sửa SEO</p>
            <Switch
              onChange={(e) => {
                setIsEditSeo(e);
                console.log(isEditSeo);
              }}
              style={{ width: "10px" }}
            />
          </div>
        </div>

        <div className="Page__Top__SEO">
          <Form
            className="Page__Top__SEO__Form"
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
              className="Page__Top__Title__Forms__Item"
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
                  console.log(titleSeoPage);
                }}
              />
            </Form.Item>

            <Form.Item
              className="Page__Top__Title__Forms__Item"
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
                  console.log(descriptionSeoPage);
                }}
              />
            </Form.Item>

            <Form.Item
              className="Page__Top__Title__Forms__Item"
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
      <div className="Page__Footer">
        <Button className="Footer__Button" onClick={() => setPostId(0)}>
          Huỷ
        </Button>
        <Button
          className="Footer__Button"
          onClick={() => {
            submit();
            fetchArticle();
            setPostId(0);
            console.log(postId);
          }}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default Page;
