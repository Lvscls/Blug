import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { backendURL } from "../../constants/urls";
import { useAuth } from "../../authContext";
import createBlog from "../../helpers/Blog/createBlog";
import getCurrentUser from "../../helpers/User/getCurrentUser";
import handleGenerateQRCode from "../../helpers/Auth/2a";
import handleVerifyCode from "../../helpers/Auth/VerifyCode";
import changePrivacy from "../../helpers/Blog/changePrivacy";
import createPost from "../../helpers/Posts/createPost";
import modifyPost from "../../helpers/Posts/modifyPost";
import handleLogoutAll from "../../helpers/Auth/LogoutAll";


const Button = styled.button`
  background-color: #fff;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  font-weight: 700;
  padding: 0.5rem 1rem;
`;

const DivContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Profile = () => {
  const { logout } = useAuth();
  const [formValues, setFormValues] = useState({
    UserId: "",
    title: "",
    description: "",
    autor: "",
    isPrivate: false,
  });
  const [formValuesPost, setFormValuesPost] = useState({
    BlogId: "",
    title: "",
    content: "",
    img: "",
    date: "",
  });
  const [showFormBlog, setShowFormBlog] = useState(false);
  const [showFormPost, setShowFormPost] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showFormEditPost, setShowFormEditPost] = useState(false);
  const [isLogoutInitiated, setIsLogoutInitiated] = useState(false);

  const [QRCode, setQRCode] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const { isAuthenticated, userInfo } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null || token === "") {
      navigate("/");
    }

    (async () => {
      const user = await getCurrentUser(token);
      setCurrentUser(user);
    })();
  }, []);

  const handleGenerate = async () => {
    const qrcode = await handleGenerateQRCode({ username: userInfo.username });
    setQRCode(qrcode);
  };

  const handleChangePrivacy = async () => {
    await changePrivacy(currentUser.blogId);
  };
  const handleVerify = async () => {
    await handleVerifyCode(verificationCode, token);
  };

  const handleShowFormBlog = () => {
    setShowFormBlog(true);
  };

  const handleShowFormPost = () => {
    setShowFormPost(true);
  };

  const handleCreateBlog = async () => {
    try {
      const { UserId, title, description, autor, isPrivate } = formValues;

      const blogData = {
        UserId,
        title,
        description,
        autor,
        isPrivate,
      };
      setFormValues({
        UserId: currentUser.userId,
        title: "",
        description: "",
        autor: currentUser.username,
        isPrivate: false,
      });
      const createdBlog = await createBlog(blogData);
    } catch (error) {
      console.error("Erreur lors de la création du blog:", error.message);
    }
  };

  const handleCreatePost = async () => {
    try {
      const { content, title, img, date } = formValuesPost;
      const postData = {
        BlogId: currentUser.blogId,
        content,
        title,
        img,
        date,
      };
      setFormValuesPost({
        blogId: "",
        content: "",
        title: "",
        img: "",
        date: "",
      });
      const createdPost = await createPost(postData);
      console.log(createdPost);
    } catch (error) {
      console.error("Erreur lors de la création du post:", error.message);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const response = await fetch(
        `${backendURL}/posts/blogs/${currentUser.blogId}/posts`
      );
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error("Erreur lors du chargement des posts :", error);
    }
  };

  const handlePostSelect = (postId) => {
    console.log(blogPosts);
    const selectedPost = blogPosts.find((post) => post.id == postId);
    if (selectedPost) {
      setFormValuesPost({
        title: selectedPost.title,
        content: selectedPost.content,
        img: selectedPost.img,
        date: selectedPost.date,
      });
      setSelectedPostId(postId);
      setShowFormEditPost(true);
    }
  };

  const handleEditPostClick = () => {
    setShowFormEditPost(true);
  };
  const handleUpdatePost = async () => {
    try {
      console.log(formValuesPost);
      const postData = {
        ...formValuesPost,
        BlogId: currentUser.blogId,
        postId: selectedPostId,
      };
      const updatePost = await modifyPost(selectedPostId, postData);
      // Gérer la réponse de la mise à jour
      console.log(updatePost);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du post:", error.message);
    }
  };
  const initiateLogout = () => {
    setIsLogoutInitiated(true);
  };

  const handleConfirmLogout = async () => {
    try {
      // Verify the token and logout if successful
      const verificationResult = await handleVerifyCode(
        verificationCode,
        token
      );
      if (verificationResult) {
        const logoutResult = await handleLogoutAll(token);
        if (logoutResult) {
          setIsLogoutInitiated(false);
          setVerificationCode("");
          logout()
          navigate("/");
        } else {
          console.error("Error during logout process");
        }
      } else {
        console.error("Invalid verification code");
      }
    } catch (error) {
      console.error("Error during logout process:", error);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.blogId) {
      loadBlogPosts();
    }
  }, [currentUser]);

  return (
    <>
      <h1>Mon Profil</h1>
      <DivContainer>
        <div
          style={{ display: "flex", flexDirection: "column", width: "200px" }}
        >
          {currentUser && currentUser.isA2FEnabled === false && (
            <Button onClick={handleGenerate}>
              J'active l'authentification à deux facteurs
            </Button>
          )}
          {QRCode && (
            <>
              <img src={QRCode} alt="QRCode" />
              <input
                type="text"
                placeholder="Code de vérification"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                style={{ margin: "20px 0" }}
              />
              <Button onClick={handleVerify} style={{ marginBottom: "40px" }}>
                Je vérifie mon code
              </Button>
            </>
          )}
        </div>
        <div>
          {showFormBlog && (
            <>
              <input
                type="text"
                placeholder="Titre"
                value={formValues.title}
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                value={formValues.description}
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
              />
              <label>
                Passer mon blog en privé ?
                <input
                  type="checkbox"
                  checked={formValues.isPrivate}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      isPrivate: e.target.checked,
                    })
                  }
                />
              </label>
              <Button onClick={handleCreateBlog}>Valider</Button>
            </>
          )}

          {currentUser && currentUser.isA2FEnabled === true && (
            <div>
              <Button onClick={handleChangePrivacy}>
                {currentUser.blogIsPrivate
                  ? "Je passe mon blog en public"
                  : "Je passe mon blog en privé"}
              </Button>
              <Button onClick={initiateLogout}>
                Se déconnecter de tous les appareils
              </Button>
              {isLogoutInitiated && (
                <>
                  <input
                    type="text"
                    placeholder="Entrez le code de vérification du token"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <Button onClick={handleConfirmLogout}>Confirmer</Button>
                </>
              )}
            </div>
          )}

          {currentUser &&
            currentUser.isA2FEnabled === true &&
            currentUser.hasBlog === false && (
              <Button onClick={handleShowFormBlog}>Créer mon blog</Button>
            )}
          {currentUser &&
            currentUser.isA2FEnabled === true &&
            currentUser.hasBlog === true && (
              <Button onClick={handleShowFormPost}>Créer un post</Button>
            )}
          {showFormPost && (
            <div>
              <input
                type="text"
                placeholder="Titre du post"
                value={formValuesPost.title}
                onChange={(e) =>
                  setFormValuesPost({ ...formValues, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Contenu"
                value={formValuesPost.content}
                onChange={(e) =>
                  setFormValuesPost({
                    ...formValuesPost,
                    content: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="URL de l'image"
                value={formValuesPost.img}
                onChange={(e) =>
                  setFormValuesPost({ ...formValuesPost, img: e.target.value })
                }
              />
              <input
                type="date"
                placeholder="Date du post"
                value={formValuesPost.date}
                onChange={(e) =>
                  setFormValuesPost({ ...formValuesPost, date: e.target.value })
                }
              />
              <Button onClick={handleCreatePost}>Créer le post</Button>
            </div>
          )}
          {currentUser &&
            currentUser.isA2FEnabled === true &&
            currentUser.hasBlog === true && (
              <Button onClick={handleEditPostClick}>Modifier un post</Button>
            )}
        </div>

        {showFormEditPost && (
          <div>
            <select onChange={(e) => handlePostSelect(e.target.value)}>
              <option value="">Choisissez un post</option>
              {blogPosts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
            {selectedPostId && (
              <div>
                <input
                  type="text"
                  placeholder="Titre du post"
                  value={formValuesPost.title}
                  onChange={(e) =>
                    setFormValuesPost({
                      ...formValuesPost,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Contenu du post"
                  value={formValuesPost.content}
                  onChange={(e) =>
                    setFormValuesPost({
                      ...formValuesPost,
                      content: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="url de l'image"
                  value={formValuesPost.img}
                  onChange={(e) =>
                    setFormValuesPost({
                      ...formValuesPost,
                      img: e.target.value,
                    })
                  }
                />
                <Button onClick={handleUpdatePost}>
                  Mettre à jour le post
                </Button>
              </div>
            )}
          </div>
        )}
      </DivContainer>
    </>
  );
};

export default Profile;
