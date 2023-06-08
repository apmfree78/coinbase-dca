import classNames from 'classnames';
import { usePostPurchaseOrder } from 'orders/hooks';
//import { useEffect } from "react";
//import { useNavigate } from 'react-router-dom';

const NewPostButton = () => {
  const { isLoading } = usePostPurchaseOrder();
  // const navigate = useNavigate();
  const buttonClasses = classNames('button is-success', {
    'is-loading': isLoading,
  });

  // checking if post has successfully been created
  // if so navigate to new post

  // useEffect(() => {
  //   if (isSuccess && postId) navigate(`/post/${postId}`);
  // }, [isSuccess]);

  return (
    <button
      //onClick={() => postOrder()}
      disabled={isLoading}
      className={buttonClasses}
      style={{ margin: '1vh 1vw' }}
    >
      <span>
        <i className='fa-solid fa-pen-to-square'></i>
      </span>
      <span style={{ marginLeft: '0.75vw' }}>Create New Post</span>
    </button>
  );
};

export default NewPostButton;
