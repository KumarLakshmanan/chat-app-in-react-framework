import React, { useEffect, useRef, useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useDarkMode from "./useDarkMode";

const firebaseConfig = {
	apiKey: "AIzaSyDcoRjipDkw6m0FkwgpEpSII1VFYN_5MfE",
	authDomain: "chatting-app-in-react.firebaseapp.com",
	projectId: "chatting-app-in-react",
	storageBucket: "chatting-app-in-react.appspot.com",
	messagingSenderId: "65686662413",
	appId: "1:65686662413:web:1245b5920323d2a029d444",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
if (localStorage.getItem("theme")) {
	let rootElement = window.document.documentElement;
	rootElement.classList.add(localStorage.getItem("theme"));
}
function App() {
	const [user] = useAuthState(auth);

	return (
		<div className='bg-white dark:bg-gray-800 text-gray-800 dark:text-white'>
			{user ? (
				<>
					<NavBar />
					<ChatRoom />
				</>
			) : (
				<SignIn />
			)}
		</div>
	);
}

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};
	return (
		<div
			className='flex flex-col items-center justify-center w-full'
			style={{ height: "100vh" }}
		>
			<button
				className='p-2 m-3 inline-flex items-center justify-center rounded transition duration-500 mr-3 ease-in-out dark:text-white dark:border-white  dark:hover:text-gray-700 dark:hover:bg-white hover:text-white hover:bg-gray-700  text-gray-700 border-gray-700 border-2 focus:outline-none'
				onClick={signInWithGoogle}
			>
				<span
					className='flex justify-between'
					style={{ alignItems: "center" }}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='w-8 h-8 mr-3'
						viewBox='0 0 512 512'
					>
						<path
							style={{ fill: "#FBBB00" }}
							d='M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
	C103.821,274.792,107.225,292.797,113.47,309.408z'
						/>
						<path
							style={{ fill: "#518EF8" }}
							d='M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
	c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
	c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z'
						/>
						<path
							style={{ fill: "#28B446" }}
							d='M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
	c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
	c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z'
						/>
						<path
							style={{ fill: "#F14336" }}
							d='M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
	c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
	C318.115,0,375.068,22.126,419.404,58.936z'
						/>
					</svg>
					<span>CONTINUE WITH GOOGLE</span>
				</span>
			</button>
		</div>
	);
}

function NavBar() {
	const [colorTheme, setTheme] = useDarkMode();

	return (
		auth.currentUser && (
			<div className='fixed w-full flex sm:items-center justify-between py-2 border-b-2 dark:border-gray-600 border-gray-200 bg-white dark:bg-gray-800 text-gray-800 dark:text-white'>
				<div className='flex items-center space-x-2'>
					<img
						src={auth.currentUser.photoURL}
						alt='Profile'
						className='w-10 h-10 ml-3 rounded-full'
					/>
					<div className='flex flex-col leading-tight'>
						<div className='flex text-left flex-col'>
							<p className='text-base text-gray-900 dark:text-white'>
								{auth.currentUser.displayName}
							</p>
							<p className='text-xs text-gray-700 dark:text-gray-400'>
								{auth.currentUser.email}
							</p>
						</div>
					</div>
				</div>
				<div className='flex items-center'>
					<button
						type='button'
						className='inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-500 mr-3 ease-in-out dark:text-white dark:border-white  dark:hover:text-gray-700 dark:hover:bg-white hover:text-white hover:bg-gray-700  text-gray-700 border-gray-700 border-2 focus:outline-none'
						onClick={() => setTheme(colorTheme)}
					>
						{colorTheme === "light" ? (
							<svg
								fill='currentColor'
								className='w-4 h-4'
								viewBox='0 0 511 511.99982'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='m334.28125 5.109375c-5.625 5.230469-7.558594 13.277344-4.921875 20.496094 9.371094 25.648437 14.125 52.75 14.125 80.554687 0 63.273438-24.640625 122.765625-69.378906 167.519532-44.746094 44.761718-104.253907 69.410156-167.550781 69.410156-27.738282 0-54.804688-4.75-80.449219-14.125-7.214844-2.636719-15.257813-.707032-20.492188 4.921875-5.234375 5.628906-6.582031 13.796875-3.425781 20.808593 20.492188 45.566407 53.339844 84.402344 94.984375 112.304688 42.679687 28.59375 92.480469 44.140625 144.027344 44.964844 36.664062.585937 72.347656-6.21875 106.058593-20.222656 32.480469-13.492188 61.652344-33.019532 86.703126-58.035157 25.046874-25.015625 44.609374-54.15625 58.148437-86.617187 13.535156-32.464844 20.390625-66.769532 20.386719-102.027344 0-1.328125-.007813-2.664062-.027344-3.996094-.753906-51.605468-16.292969-101.492187-44.929688-144.257812-27.929687-41.707032-66.816406-74.601563-112.449218-95.121094-7.011719-3.15625-15.179688-1.8125-20.808594 3.421875zm0 0' />
							</svg>
						) : (
							<svg
								fill='currentColor'
								className='w-4 h-4'
								viewBox='-32 0 512 512'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='m384.011719 256c0 88.367188-71.632813 160-160 160-88.363281 0-160-71.632812-160-160s71.636719-160 160-160c88.367187 0 160 71.632812 160 160zm0 0' />
								<path d='m202.679688 21.332031v36.503907c0 11.796874 9.554687 21.332031 21.332031 21.332031 11.777343 0 21.332031-9.535157 21.332031-21.332031v-36.503907c0-11.796875-9.554688-21.332031-21.332031-21.332031-11.777344 0-21.332031 9.535156-21.332031 21.332031zm0 0' />
								<path d='m30.96875 122.21875c-10.519531-5.289062-23.339844-1.089844-28.675781 9.429688-5.308594 10.515624-1.085938 23.359374 9.429687 28.671874l30.933594 15.636719c3.09375 1.558594 6.378906 2.28125 9.601562 2.28125 7.785157 0 15.296876-4.265625 19.070313-11.710937 5.3125-10.515625 1.109375-23.359375-9.40625-28.671875zm0 0' />
								<path d='m42.65625 336.042969-30.933594 15.636719c-10.515625 5.3125-14.71875 18.15625-9.40625 28.671874 3.753906 7.445313 11.265625 11.710938 19.070313 11.710938 3.222656 0 6.53125-.722656 9.601562-2.28125l30.933594-15.636719c10.515625-5.3125 14.71875-18.15625 9.40625-28.671875-5.332031-10.539062-18.175781-14.761718-28.671875-9.429687zm0 0' />
								<path d='m224.011719 432.832031c-11.777344 0-21.332031 9.535157-21.332031 21.332031v36.503907c0 11.796875 9.554687 21.332031 21.332031 21.332031 11.777343 0 21.332031-9.535156 21.332031-21.332031v-36.503907c0-11.796874-9.554688-21.332031-21.332031-21.332031zm0 0' />
								<path d='m436.300781 351.679688-30.933593-15.636719c-10.496094-5.3125-23.339844-1.089844-28.671876 9.40625-5.3125 10.519531-1.109374 23.363281 9.40625 28.671875l30.933594 15.640625c3.09375 1.554687 6.378906 2.28125 9.601563 2.28125 7.785156 0 15.296875-4.265625 19.070312-11.710938 5.335938-10.496093 1.109375-23.339843-9.40625-28.652343zm0 0' />
								<path d='m417.058594 122.21875-30.933594 15.636719c-10.519531 5.3125-14.722656 18.15625-9.410156 28.671875 3.757812 7.445312 11.265625 11.710937 19.074218 11.710937 3.21875 0 6.527344-.722656 9.597657-2.28125l30.933593-15.636719c10.519532-5.3125 14.722657-18.15625 9.410157-28.671874-5.335938-10.519532-18.175781-14.761719-28.671875-9.429688zm0 0' />
							</svg>
						)}
					</button>
					<button
						type='button'
						className='inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-500 mr-3 ease-in-out dark:text-white dark:border-white  dark:hover:text-gray-700 dark:hover:bg-white hover:text-white hover:bg-gray-700  text-gray-700 border-gray-700 border-2 focus:outline-none'
						onClick={() => auth.signOut()}
					>
						<svg
							className='h-4 w-4'
							viewBox='0 0 512.00533 512'
							fill='currentColor'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M25.383,290.5c-7.2-77.5,25.9-147.7,80.8-192.3c21.4-17.4,53.4-2.5,53.4,25l0,0c0,10.1-4.8,19.4-12.6,25.7
			c-38.9,31.7-62.3,81.7-56.6,136.9c7.4,71.9,65,130.1,136.8,138.1c93.7,10.5,173.3-62.9,173.3-154.5c0-48.6-22.5-92.1-57.6-120.6
			c-7.8-6.3-12.5-15.6-12.5-25.6l0,0c0-27.2,31.5-42.6,52.7-25.6c50.2,40.5,82.4,102.4,82.4,171.8c0,126.9-107.8,229.2-236.7,219.9
			C122.183,481.8,35.283,396.9,25.383,290.5z M244.883,0c-18,0-32.5,14.6-32.5,32.5v149.7c0,18,14.6,32.5,32.5,32.5
			s32.5-14.6,32.5-32.5V32.5C277.383,14.6,262.883,0,244.883,0z'
							/>
						</svg>
					</button>
				</div>
			</div>
		)
	);
}

function ChatRoom() {
	const dummy = useRef();
	const inputReference = useRef();
	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy("createdAt", "asc").limitToLast(25);

	const [messages] = useCollectionData(query, { idField: "id" });
	const [formValue, setFormValue] = useState("");

	const scrollToBottom = () => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	};
	useEffect(() => {
		scrollToBottom();
	}, []);
	const sendMessage = async (e) => {
		e.preventDefault();
		const { displayName, uid, photoURL } = auth.currentUser;

		await messagesRef.add({
			user: displayName,
			body: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid: uid,
			photoURL: photoURL,
		});

		setFormValue("");
		dummy.current.scrollIntoView({ behavior: "smooth" });
		inputReference.current.focus();
	};

	return (
		<>
			<div className='w-full h-full bg-white dark:bg-gray-800'>
				<div className='py-16' style={{ minHeight: "100vh" }}>
					{messages &&
						messages.map((msg) => {
							return <ChatMessage key={msg.id} message={msg} />;
						})}
					<span ref={dummy}></span>
				</div>
			</div>
			<form
				onSubmit={sendMessage}
				className='w-full fixed bottom-0 z-50 bg-white dark:bg-gray-800 justify-between flex'
			>
				<div className='border-t-2 dark:border-gray-600 border-gray-200 w-full'>
					<div className='relative flex'>
						<input
							type='text'
							placeholder='Write Something'
							className={`w-full focus:outline-none focus:placeholder-gray-400 placeholder-gray-600 dark:placeholder-gray-400 focus:focus:placeholder-gray-600 text-gray-600 dark:text-white bg-gray-1	00 focus:bg-gray-100 dark:bg-gray-800 dark:focus:bg-gray-700 p-3 mr-16`}
							value={formValue}
							ref={inputReference}
							onChange={(e) => setFormValue(e.target.value)}
						/>
						<div className='absolute right-0 items-center inset-y-0 sm:flex'>
							<button
								className={`${
									formValue
										? "hover:bg-blue-400"
										: "opacity-70"
								} inline-flex items-center justify-center h-full w-16 transition duration-500 ease-in-out text-white bg-blue-500 focus:outline-none`}
								type='submit'
								disabled={!formValue}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='h-6 w-6 transform rotate-90'
								>
									<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}

function ChatMessage(props) {
	const { user, body, uid, photoURL } = props.message;

	const messageClass =
		uid === auth.currentUser.uid ? "flex-row-reverse" : "flex-row";

	return (
		<div className={`px-3 py-2 flex no-wrap items-start ${messageClass}`}>
			<div className='chat-message'>
				<div className='flex items-end'>
					<div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
						{uid === auth.currentUser.uid ? (
							<div>
								<p className='rounded-lg text-sm rounded-all rounded-br-none px-4 py-2 bg-blue-600 text-white '>
									{body}
								</p>
							</div>
						) : (
							<div>
								<p className='rounded-lg rounded-b-none text-xs px-4 py-1 dark:bg-gray-300 dark:text-gray-800 bg-gray-700 text-gray-300'>
									{user}
								</p>
								<p className='rounded-lg text-sm rounded-t-none rounded-bl-none px-4 py-1 dark:bg-gray-200 dark:text-gray-800 bg-gray-600 text-white'>
									{body}
								</p>
							</div>
						)}
					</div>
					{uid === auth.currentUser.uid ? (
						""
					) : (
						<div>
							<img
								src={photoURL}
								alt='Profile'
								className='w-6 h-6 rounded-full order-1'
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
