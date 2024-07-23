import React from 'react';


type Props = {
  // Define your props here, for example:
   signIn: () => void;
  //  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}


function Auth({ signIn  }: Props): React.ReactElement {

  return (
    
    <>
      <div className="auth">
        <p>Sign in with google</p>
        <button onClick={signIn}>Sign in with google</button>
      </div>
    </>
  )
}

export default Auth