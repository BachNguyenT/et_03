interface Post {
    _id: string;
    title: string;
    category: "BLOG" | "EVENT";
    isShow: boolean;
    postImage: string;
    content: string;
    isEditSeo: boolean;
    titleSeoPage?: string;
    descriptionSeoPage?: string;
  }

export default Post;