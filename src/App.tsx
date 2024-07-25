import { useRef, useState } from 'react';
import './App.css';
import { auth, provider } from "./config/firebase-config";
import { signInWithPopup, UserCredential, signOut } from "firebase/auth";
import Cookies from 'universal-cookie';
import Auth from './component/Auth';
import Chat from './component/Chat';

interface UserDetail {
	result: UserCredential | null;
	signIn: () => void;
}

const App: React.FC = () => {
	const [userDetail, setUserDetail] = useState<UserDetail>({ result: null, signIn: () => { } });
	const [room, setRoom] = useState<string>("");
	const roomInputRef = useRef<HTMLInputElement>(null);
	const cookies = new Cookies();
	const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

	const signInWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			setUserDetail({ result, signIn: signInWithGoogle });
			if (result && 'user' in result) {
				cookies.set("auth-token", result.user.refreshToken);
				setIsAuth(true);
			}
		} catch (error) {
			console.error("Error signing in with Google", error);
		}
	}

	async function signUserOut(): Promise<void> {
		await signOut(auth);
		cookies.remove("auth-token");
		setIsAuth(false);
		setRoom("");
	}

	if (!isAuth) {
		return <Auth signIn={signInWithGoogle} />;
	}
	return (
		<>
			<div>
				{room ? (
					<Chat room={room.toLowerCase()} />
				) :
					<div className='room'>
						<label>
							Enter Room Chat
						</label>
						<input
							type="text"
							placeholder="Room"
							ref={roomInputRef} />
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
			<div className='sign-out'>
				<button onClick={signUserOut}>sign out</button>
			</div>
		</>
	);
}

export default App;
