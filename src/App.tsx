import { useRef, useState } from 'react';
import './App.css';
import { auth, provider } from "./config/firebase-config";
import { signInWithPopup, UserCredential } from "firebase/auth";
import Cookies from 'universal-cookie';
import Auth from './component/Auth';
import Chat from './component/Chat';

interface UserDetail {
  result: UserCredential | null;
	signIn: () => void;
}

		const App: React.FC = () => {
  const [userDetail, setUserDetail] = useState<UserDetail>({ result: null, signIn: () => {} });
	const [room, setRoom] = useState<null>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);
	const cookies = new Cookies();
	const [isAuth] = useState(cookies.get("auth-token"));

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUserDetail({ result, signIn: signInWithGoogle });
      if (result && 'user' in result) {
        cookies.set("auth-token", result.user.refreshToken);
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }
  
	if (!isAuth) {
		return <Auth signIn={signInWithGoogle}  />;
	}
	return (
		<div>
			{room ? <Chat room={room} /> :
       <div className='room'>
        <label>
          Enter Room Chat
        </label>
						<input
							type="text"
							placeholder="Room"
							ref={roomInputRef}/>
					<button
						onClick={() => {
              if (roomInputRef.current && roomInputRef.current.value) {
                setRoom(roomInputRef.current.value as any);
              }              
						}}>
						Enter Chat
					</button>
        </div>}
		</div>
	);
}

export default App;
