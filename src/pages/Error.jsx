import { useRouteError } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-gray-600 gap-6">
      <h1 className="text-7xl">Oops!</h1>
      <p className="text-center text-2xl">The page you are looking for might have been removed,<br /> had its name changed, or is temporaily unavailable.</p>
      <p className="text-2xl"><i>{error.status}-{error.statusText}</i></p>
      <Link to={'home'} className="text-xl text-black bg-red-500/45 p-3 rounded-2xl hover:bg-red-500/60">Go back home</Link>
    </div>
  );
}