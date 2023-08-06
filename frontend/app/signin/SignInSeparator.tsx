const SignInSeparator = () => {
  return (
    <div className='mb-8 flex items-center justify-center'>
      <span className='hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block'></span>
      <p className='w-full px-5 text-center text-base font-medium text-body-color'>
        Or, sign in with your email
      </p>
      <span className='hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block'></span>
    </div>
  );
};

export default SignInSeparator;
