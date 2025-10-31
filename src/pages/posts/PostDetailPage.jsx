import React from "react";
import {
  Layout,
  Typography,
  Card,
  Avatar,
  Tag,
  Space,
  Divider,
  Row,
  Col,
  Button,
} from "antd";
import {
  ClockCircleOutlined,
  EyeOutlined,
  HeartOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CommentForm from "../../components/comments/CommentForm";
import CommentList from "../../components/comments/CommentList";
const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function PostDetailPage() {
  const article = {
    title: "The Future of Web Development: Trends to Watch in 2025",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      bio: "Senior Developer & Tech Writer",
    },
    publishDate: "October 28, 2025",
    readTime: "8 min read",
    views: "2.4k",
    category: "Web Development",
    tags: ["React", "AI", "Web3", "Performance"],
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
  };

  const [comments, setComments] = React.useState([
    {
      id: 1,
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
      time: "2 hours ago",
      text: "Great article! I've been experimenting with React Server Components and the performance improvements are incredible. Would love to see more content about edge computing in future posts.",
      likes: 24,
      isAuthor: false,
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=5",
      time: "5 hours ago",
      text: "The section on AI-powered development tools really resonates with me. I've started using GitHub Copilot and it's changed my workflow completely. Are there other AI tools you'd recommend?",
      likes: 18,
      isAuthor: false,
      replies: [
        {
          id: 5,
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?img=1",
          time: "3 hours ago",
          text: "Thanks Emily! I'd definitely recommend checking out Cursor and Tabnine as well. Both have unique features that complement Copilot nicely. I'll be writing a detailed comparison soon!",
          likes: 12,
          isAuthor: true,
        },
      ],
    },
    {
      id: 3,
      name: "David Park",
      avatar: "https://i.pravatar.cc/150?img=8",
      time: "1 day ago",
      text: "Excellent overview of the current trends. The emphasis on Core Web Vitals is especially important. More developers need to prioritize performance from the start rather than treating it as an afterthought.",
      likes: 31,
      isAuthor: false,
    },
    {
      id: 4,
      name: "Lisa Thompson",
      avatar: "https://i.pravatar.cc/150?img=12",
      time: "2 days ago",
      text: "This is exactly what I needed to read! I'm planning to rebuild our company's web app and these insights will definitely influence our tech stack decisions. Bookmarked! 📚",
      likes: 9,
      isAuthor: false,
    },
  ]);

  const relatedPosts = [
    {
      id: 1,
      title: "Understanding React Server Components",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      date: "Oct 25, 2025",
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox: When to Use Each",
      image:
        "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=250&fit=crop",
      date: "Oct 22, 2025",
    },
    {
      id: 3,
      title: "Building Accessible Web Applications",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
      date: "Oct 20, 2025",
    },
  ];

  const handleSubmitComment = (commentText) => {
    const newComment = {
      id: comments.length + 1,
      name: "Guest User",
      avatar: "https://i.pravatar.cc/150?img=15",
      time: "Just now",
      text: commentText,
      likes: 0,
      isAuthor: false,
    };
    setComments([newComment, ...comments]);
  };

  const handleReply = (commentId) => {
    console.log("Reply to comment:", commentId);
    // Implement reply functionality
  };

  const handleLike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment,
      ),
    );
  };

  const handleLoadMore = () => {
    console.log("Load more comments");
    // Implement load more functionality
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/*
               <Header
        style={{
          background: "#fff",
          padding: "0 50px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Space size="large">
            <a href="#" style={{ color: "#000" }}>
              Home
            </a>
            <a href="#" style={{ color: "#000" }}>
              Articles
            </a>
            <a href="#" style={{ color: "#000" }}>
              About
            </a>
            <a href="#" style={{ color: "#000" }}>
              Contact
            </a>
          </Space>
        </div>
      </Header>
         *
         * */}

      <Content style={{ padding: "40px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Article Header */}
          <Card
            bordered={false}
            style={{ marginBottom: "24px" }}
            cover={
              <img
                alt="article cover"
                src={article.coverImage}
                style={{ height: "400px", objectFit: "cover" }}
              />
            }
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div>
                <Tag color="blue">{article.category}</Tag>
                <Title
                  level={1}
                  style={{ marginTop: "16px", marginBottom: "16px" }}
                >
                  {article.title}
                </Title>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Space size="large">
                  <Space>
                    <ClockCircleOutlined />
                    <Text type="secondary">{article.readTime}</Text>
                  </Space>
                  <Space>
                    <EyeOutlined />
                    <Text type="secondary">{article.views} views</Text>
                  </Space>
                  <Text type="secondary">{article.publishDate}</Text>
                </Space>
                <Space>
                  <Button icon={<HeartOutlined />} type="text">
                    Like
                  </Button>
                  <Button icon={<ShareAltOutlined />} type="text">
                    Share
                  </Button>
                </Space>
              </div>

              <Divider />

              {/* Author Info */}
              <Space>
                <Avatar
                  size={48}
                  src={article.author.avatar}
                  icon={<UserOutlined />}
                />
                <div>
                  <Text strong style={{ display: "block" }}>
                    {article.author.name}
                  </Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {article.author.bio}
                  </Text>
                </div>
              </Space>
            </Space>
          </Card>

          {/* Article Content */}
          <Card bordered={false} style={{ marginBottom: "24px" }}>
            <Typography>
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                The landscape of web development is constantly evolving, and
                2025 promises to bring even more exciting changes. As we
                navigate through this year, several key trends are emerging that
                will shape how we build and interact with web applications.
              </Paragraph>

              <Title level={2}>AI-Powered Development Tools</Title>
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                Artificial intelligence is no longer just a buzzword—it's
                becoming an integral part of the development workflow. From code
                completion to automated testing, AI tools are helping developers
                work smarter and faster. These tools can now suggest entire
                functions, identify potential bugs before they occur, and even
                generate test cases automatically.
              </Paragraph>

              <Title level={2}>Server Components and Streaming</Title>
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                React Server Components represent a paradigm shift in how we
                think about component rendering. By moving more computation to
                the server, we can deliver faster initial page loads and better
                performance overall. This approach also enables new patterns for
                data fetching and component composition that weren't possible
                before.
              </Paragraph>

              <Title level={2}>Web Performance Optimization</Title>
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                Core Web Vitals continue to be crucial for both user experience
                and SEO. Developers are focusing more on metrics like Largest
                Contentful Paint (LCP), First Input Delay (FID), and Cumulative
                Layout Shift (CLS). Tools and frameworks are evolving to make it
                easier to meet these standards out of the box.
              </Paragraph>

              <Title level={2}>The Rise of Edge Computing</Title>
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                Edge computing is bringing computation closer to users,
                resulting in dramatically reduced latency and improved
                performance. Modern frameworks are making it easier than ever to
                deploy applications to the edge, opening up new possibilities
                for global-scale applications.
              </Paragraph>

              <Divider />

              <Title level={3}>Conclusion</Title>
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                The future of web development is bright and full of
                opportunities. By staying informed about these trends and
                continuously learning, developers can create better, faster, and
                more user-friendly applications. The key is to embrace change
                while maintaining a focus on fundamentals and best practices.
              </Paragraph>
            </Typography>

            <Divider />

            <div>
              <Text strong>Tags: </Text>
              {article.tags.map((tag) => (
                <Tag key={tag} style={{ margin: "4px" }}>
                  {tag}
                </Tag>
              ))}
            </div>
          </Card>

          {/* Comments Section */}
          <Card
            bordered={false}
            title={<Title level={3}>Comments ({comments.length})</Title>}
            style={{ marginBottom: "24px" }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <CommentForm onSubmit={handleSubmitComment} />
              <Divider />
              <CommentList
                comments={comments}
                onLoadMore={handleLoadMore}
                onReply={handleReply}
                onLike={handleLike}
              />
            </Space>
          </Card>

          {/* Related Posts */}
          <Card
            bordered={false}
            title={<Title level={3}>Related Articles</Title>}
          >
            <Row gutter={[16, 16]}>
              {relatedPosts.map((post) => (
                <Col xs={24} sm={8} key={post.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={post.title}
                        src={post.image}
                        style={{ height: "150px", objectFit: "cover" }}
                      />
                    }
                  >
                    <Card.Meta
                      title={post.title}
                      description={<Text type="secondary">{post.date}</Text>}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      </Content>
    </Layout>
  );
}
